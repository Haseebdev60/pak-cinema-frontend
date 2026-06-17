import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, Search, X, Check } from 'lucide-react';
import Sidebar from '../../components/Sidebar';
import { crudConfig } from './crudConfig';
import movieService from '../../services/movieService';
import bookingService from '../../services/bookingService';
import concessionService from '../../services/concessionService';
import employeeService from '../../services/employeeService';

export default function CRUDPage() {
  const { entityType } = useParams();
  const navigate = useNavigate();

  // Validate entity parameter
  const config = crudConfig[entityType];
  if (!config) {
    useEffect(() => { navigate('/admin/dashboard'); }, [entityType]);
    return null;
  }

  // State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null); // null = adding, active id = editing
  const [formData, setFormData] = useState({});
  const [lookups, setLookups] = useState({}); // Stores lookup dropdown lists, e.g. { movies: [...], screens: [...] }

  // Resolve service for current entity
  const getService = () => {
    switch (entityType) {
      case 'movies': return movieService;
      case 'screens':
      case 'showtimes':
      case 'customers':
      case 'bookings':
      case 'tickets':
        return bookingService;
      case 'employees':
        return employeeService;
      case 'concessions':
      case 'orders':
        return concessionService;
      default:
        return null;
    }
  };

  const getMethods = () => {
    const service = getService();
    const type = entityType;
    
    // Normalize method suffixes (e.g. movies uses getMovies, concessions uses getConcessions)
    const suffix = type.charAt(0).toUpperCase() + type.slice(1);
    
    // Some exceptions for irregular plural forms
    if (type === 'movies') return {
      getAll: service.getMovies,
      getById: service.getMovieById,
      create: service.addMovie,
      update: service.updateMovie,
      remove: service.deleteMovie
    };
    if (type === 'concessions') return {
      getAll: service.getConcessions,
      getById: service.getConcessionById,
      create: service.addConcession,
      update: service.updateConcession,
      remove: service.deleteConcession
    };
    if (type === 'bookings') return {
      getAll: service.getBookings,
      getById: service.getBookingById,
      create: service.createBooking, // Transactional helper
      update: service.updateBooking || (() => null),
      remove: service.deleteBooking
    };

    return {
      getAll: service[`get${suffix}`],
      getById: service[`get${suffix.slice(0, -1)}ById`],
      create: service[`add${suffix.slice(0, -1)}`],
      update: service[`update${suffix.slice(0, -1)}`],
      remove: service[`delete${suffix.slice(0, -1)}`]
    };
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const methods = getMethods();
      const list = await methods.getAll();
      setData(list);
    } catch (err) {
      console.error("Failed to load CRUD data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    setIsModalOpen(false);
    setCurrentId(null);
    setFormData({});
  }, [entityType]);

  // Load lookup options for foreign keys (e.g. movie choices for showtime form)
  const loadLookupData = async () => {
    const lookupFields = config.fields.filter(f => f.type === 'lookup');
    if (lookupFields.length === 0) return;

    const lookupPromises = lookupFields.map(async (field) => {
      let list = [];
      if (field.lookupEntity === 'movies') list = await movieService.getMovies();
      else if (field.lookupEntity === 'screens') list = await bookingService.getScreens();
      else if (field.lookupEntity === 'customers') list = await bookingService.getCustomers();
      else if (field.lookupEntity === 'showtimes') list = await bookingService.getShowtimes();
      else if (field.lookupEntity === 'bookings') list = await bookingService.getBookings();
      return { key: field.lookupEntity, data: list };
    });

    const results = await Promise.all(lookupPromises);
    const lookupMap = {};
    results.forEach(res => {
      lookupMap[res.key] = res.data;
    });
    setLookups(lookupMap);
  };

  // Open Modal for Add
  const handleOpenAdd = async () => {
    setCurrentId(null);
    // Initialize default empty values
    const initData = {};
    config.fields.forEach(f => {
      initData[f.name] = f.type === 'number' ? 0 : '';
    });
    setFormData(initData);
    await loadLookupData();
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEdit = async (row) => {
    setCurrentId(row.id);
    const editData = {};
    config.fields.forEach(f => {
      // Prefill fields. If relational lookup, prefill lookup ID
      editData[f.name] = row[f.name] !== undefined ? row[f.name] : '';
    });
    setFormData(editData);
    await loadLookupData();
    setIsModalOpen(true);
  };

  // Delete Action
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record? This operation might cascade delete related rows.")) {
      try {
        const methods = getMethods();
        await methods.remove(id);
        loadData();
      } catch (err) {
        console.error(err);
        alert("Failed to delete record.");
      }
    }
  };

  // Submit Modal Form (Add or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const methods = getMethods();
      
      // Clean numeric inputs
      const cleanedData = { ...formData };
      config.fields.forEach(f => {
        if (f.type === 'number') {
          cleanedData[f.name] = parseFloat(cleanedData[f.name]);
        }
      });

      if (currentId === null) {
        // Create Mode
        if (entityType === 'bookings') {
          // Relies on transactional createBooking
          // Create dummy mock seats since seats aren't details fields
          await methods.create({
            customer: { id: cleanedData.customerId }, // Mock handles resolving
            showtimeId: cleanedData.showtimeId,
            seats: ["E-10"], // placeholder
            ticketType: "Standard"
          });
        } else {
          await methods.create(cleanedData);
        }
      } else {
        // Update Mode
        await methods.update(currentId, cleanedData);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error(err);
      alert("Failed to save record.");
    }
  };

  // Safe nested key reader (e.g. read 'customer.name' from booking record)
  const getNestedValue = (obj, keyStr) => {
    return keyStr.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Filtering list by search term
  const filteredData = data.filter((row) => {
    return Object.values(row).some(val => 
      val && val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-cinema-bg flex">
      <Sidebar />

      {/* Main Workspace */}
      <main className="flex-1 ml-64 p-8 min-h-screen space-y-6">
        
        {/* Header bar */}
        <div className="flex justify-between items-center border-b border-white/5 pb-6">
          <div>
            <h1 className="text-3xl font-black text-white uppercase tracking-wider">{config.title}</h1>
            <p className="text-cinema-gray text-xs mt-1 uppercase tracking-widest font-semibold">
              Admin CRUD Database Operations
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="bg-cinema-red hover:bg-red-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 glow-red"
          >
            <Plus size={16} /> Add Record
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 text-cinema-gray" size={16} />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-cinema-card border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cinema-gold"
          />
        </div>

        {/* Table View */}
        {loading ? (
          <div className="text-center py-20 text-cinema-gray text-sm">Querying database rows...</div>
        ) : filteredData.length === 0 ? (
          <div className="glass-panel p-12 text-center text-cinema-gray text-sm rounded-2xl border border-white/5">
            No rows returned in {entityType} table.
          </div>
        ) : (
          <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/5 text-cinema-gold uppercase tracking-wider border-b border-white/10">
                    {config.columns.map((col, idx) => (
                      <th key={idx} className="p-4 font-bold">{col.label}</th>
                    ))}
                    <th className="p-4 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-cinema-gray">
                  {filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-white/5 hover:text-white transition-colors duration-200">
                      {config.columns.map((col, idx) => {
                        const cellVal = col.render ? col.render(row) : getNestedValue(row, col.key);
                        return (
                          <td key={idx} className="p-4 whitespace-nowrap max-w-[200px] truncate">
                            {cellVal !== undefined ? cellVal.toString() : ''}
                          </td>
                        );
                      })}
                      {/* Action buttons */}
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(row)}
                            className="p-2 text-cinema-gold hover:bg-cinema-gold/10 rounded-lg transition-colors duration-200"
                            title="Edit row"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(row.id)}
                            className="p-2 text-cinema-red hover:bg-cinema-red/10 rounded-lg transition-colors duration-200"
                            title="Delete row"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* generic Add / Edit Modal Dialog */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-cinema-card border border-cinema-gold/20 rounded-3xl w-full max-w-xl max-h-[85vh] overflow-y-auto shadow-2xl relative">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-cinema-gray hover:text-white transition-colors"
              >
                <X size={20} />
              </button>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wider">
                    {currentId === null ? 'Insert New Row' : 'Edit Database Row'}
                  </h3>
                  <span className="text-[10px] text-cinema-gold uppercase tracking-widest font-semibold block mt-1">
                    Table: {entityType}
                  </span>
                </div>

                <div className="space-y-4">
                  {config.fields.map((field) => (
                    <div key={field.name} className="space-y-1.5">
                      <label className="block text-[11px] font-bold text-cinema-gray uppercase tracking-wider">
                        {field.label} {field.required && <span className="text-cinema-red">*</span>}
                      </label>

                      {/* Text inputs */}
                      {(field.type === 'text' || field.type === 'number') && (
                        <input
                          type={field.type}
                          required={field.required}
                          value={formData[field.name] || ''}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          placeholder={field.placeholder}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cinema-gold"
                        />
                      )}

                      {/* Date inputs */}
                      {field.type === 'date' && (
                        <input
                          type="date"
                          required={field.required}
                          value={formData[field.name]?.split('T')[0] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cinema-gold"
                        />
                      )}

                      {/* Textarea inputs */}
                      {field.type === 'textarea' && (
                        <textarea
                          required={field.required}
                          rows={3}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cinema-gold resize-none"
                        ></textarea>
                      )}

                      {/* Select Option inputs */}
                      {field.type === 'select' && (
                        <select
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cinema-gold"
                        >
                          <option value="">Select option</option>
                          {field.options.map((opt, idx) => (
                            <option key={idx} value={opt} className="bg-cinema-card">{opt}</option>
                          ))}
                        </select>
                      )}

                      {/* Lookup FK Selector Dropdown */}
                      {field.type === 'lookup' && (
                        <select
                          required={field.required}
                          value={formData[field.name] || ''}
                          onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                          className="w-full bg-cinema-bg border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cinema-gold"
                        >
                          <option value="">Select link record</option>
                          {lookups[field.lookupEntity]?.map((item) => (
                            <option key={item.id} value={item.id} className="bg-cinema-card">
                              {item.id} - {item[field.displayKey]}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  ))}
                </div>

                {/* Form Buttons */}
                <div className="pt-4 flex justify-end gap-3 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-5 py-2.5 text-xs font-bold uppercase transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-cinema-gold hover:bg-yellow-600 text-cinema-bg rounded-xl px-6 py-2.5 text-xs font-bold uppercase transition-colors flex items-center gap-1"
                  >
                    <Check size={14} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
