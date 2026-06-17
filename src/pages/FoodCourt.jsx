import React, { useEffect, useState } from 'react';
import { ShoppingCart, Coffee, Check, Trash2, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import concessionService from '../services/concessionService';
import bookingService from '../services/bookingService';

export default function FoodCourt() {
  const [concessions, setConcessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Cart
  const [cart, setCart] = useState({}); // { id: quantity }
  const [customerInfo, setCustomerInfo] = useState({ name: '', phone: '', cnic: '', email: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
const getCategory = (name = '') => {
  const n = name.toLowerCase();

  if (n.includes('popcorn')) return 'Popcorn';

  if (
    n.includes('soda') ||
    n.includes('water') ||
    n.includes('coffee') ||
    n.includes('tea') ||
    n.includes('slushie')
  ) {
    return 'Drinks';
  }

  if (
    n.includes('burger') ||
    n.includes('hot dog') ||
    n.includes('sandwich')
  ) {
    return 'Burgers';
  }

  if (n.includes('pizza')) return 'Pizza';

  if (
    n.includes('fries') ||
    n.includes('onion rings')
  ) {
    return 'Fries';
  }

  if (n.includes('ice cream')) return 'Ice Cream';

  return 'Snacks';
};
  useEffect(() => {
  const fetchConcessions = async () => {
    try {
      const list = await concessionService.getConcessions();

      const formatted = list.map(item => ({
        id: String(item.id),
        name: item.name,
        price: Number(item.price),
        stock: Number(item.stock),
        category: getCategory(item.name)
      }));

      setConcessions(formatted);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  fetchConcessions();
}, []);

  const categories = ['All', 'Popcorn', 'Drinks', 'Burgers', 'Snacks', 'Pizza', 'Fries', 'Ice Cream'];

  const filteredItems =
  selectedCategory === 'All'
    ? concessions
    : concessions.filter(
        item =>
          item.category &&
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      );

  const handleQty = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: next };
    });
  };

  const getCartTotal = () => {
    return Object.keys(cart).reduce((sum, id) => {
      const item = concessions.find(c => c.id === id);
      const qty = cart[id];
      if (item && qty) {
        return sum + (item.price * qty);
      }
      return sum;
    }, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) return;
    setIsSubmitting(true);

    try {
      // 1. Resolve or Create customer
      const custData = await bookingService.addCustomer({
        name: customerInfo.name,
        phone: customerInfo.phone,
        cnic: customerInfo.cnic,
        email: customerInfo.email
      });

      // 2. Create Order
      const itemsList = Object.keys(cart).map(id => ({
        concessionId: id,
        quantity: cart[id],
        price: concessions.find(c => c.id === id).price
      }));

      await concessionService.addOrder({
        customerId: custData.id,
        bookingId: "BK-POS", // standalone POS order
        items: itemsList,
        totalAmount: getCartTotal()
      });

      setOrderSuccess(true);
      setCart({});
      setCustomerInfo({ name: '', phone: '', cnic: '', email: '' });

      // Refresh concessions inventory stock values
      const updatedList = await concessionService.getConcessions();

const formatted = updatedList.map(item => ({
  id: String(item.id),
  name: item.name,
  price: Number(item.price),
  stock: Number(item.stock),
  category: getCategory(item.name)
}));

setConcessions(formatted);

      setTimeout(() => {
        setOrderSuccess(false);
      }, 4000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit order. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryEmojis = {
    'Popcorn': '🍿',
    'Drinks': '🥤',
    'Burgers': '🍔',
    'Snacks': '🍗',
    'Pizza': '🍕',
    'Fries': '🍟',
    'Ice Cream': '🍨'
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-bg pt-20">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-white tracking-tight uppercase">Concessions Food Court</h1>
          <p className="text-cinema-gray text-sm mt-2">Order your favorite cinematic snacks and meals online</p>
          <div className="w-16 h-1 bg-cinema-red mt-2"></div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Menu Catalog Columns (Left 2 Columns) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category Navigation */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-cinema-red text-white'
                      : 'bg-white/5 text-cinema-gray hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            {loading ? (
              <div className="text-center py-20 text-cinema-gray">Loading concessions...</div>
            ) : filteredItems.length === 0 ? (
              <div className="text-center py-20 text-cinema-gray">No items found in this category.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredItems.map((item) => {
                  const emoji = categoryEmojis[item.category] || '🍟';
                  const qtyInCart = cart[item.id] || 0;
                  return (
                    <div
                      key={item.id}
                      className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-cinema-gold/10 transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl p-3 bg-white/5 rounded-xl border border-white/5">{emoji}</span>
                        <div>
                          <h3 className="font-bold text-white text-base">{item.name}</h3>
                          <span className="block text-cinema-gold text-sm font-semibold mt-0.5">PKR {item.price}</span>
                          <span className={`inline-block text-[10px] font-bold px-1.5 py-0.5 rounded mt-2 uppercase ${
                            item.stock > 0 ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'
                          }`}>
                            {item.stock > 0 ? `In Stock (${item.stock} left)` : 'Out of Stock'}
                          </span>
                        </div>
                      </div>

                      {/* Add to Cart Actions */}
                      {item.stock > 0 ? (
                        <div className="flex items-center gap-2">
                          {qtyInCart > 0 ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleQty(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10"
                              >
                                -
                              </button>
                              <span className="w-4 text-center text-sm font-bold text-white">{qtyInCart}</span>
                              <button
                                onClick={() => handleQty(item.id, 1)}
                                disabled={item.stock <= qtyInCart}
                                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-bold text-white hover:bg-white/10"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleQty(item.id, 1)}
                              className="bg-cinema-red hover:bg-red-700 text-white rounded-xl px-4 py-2 text-xs font-bold uppercase transition-colors"
                            >
                              Add
                            </button>
                          )}
                        </div>
                      ) : (
                        <button
                          disabled
                          className="bg-white/5 text-cinema-gray/50 text-xs font-bold uppercase py-2 px-3 rounded-xl border border-white/5 cursor-not-allowed"
                        >
                          Sold Out
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Checkout Panel (Right Column) */}
          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 sticky top-28 space-y-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-white/5 pb-4 uppercase tracking-wider">
                <ShoppingCart className="text-cinema-gold" size={20} /> Your Basket
              </h2>

              {orderSuccess && (
                <div className="bg-green-950/80 border border-green-500/20 text-green-400 p-4 rounded-xl text-xs flex items-center gap-2">
                  <Check size={16} /> Order placed successfully! Check stock changes.
                </div>
              )}

              {Object.keys(cart).length === 0 ? (
                <div className="text-center py-12 text-cinema-gray">
                  <Coffee size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">Your basket is empty. Select concessions from the menu to start order.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Cart Items list */}
                  <div className="space-y-3 max-h-[25vh] overflow-y-auto pr-1">
                    {Object.keys(cart).map((id) => {
                      const item = concessions.find(c => c.id === id);
                      const qty = cart[id];
                      if (!item) return null;
                      return (
                        <div key={id} className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-bold text-white">{item.name}</span>
                            <span className="block text-[10px] text-cinema-gray">PKR {item.price} each</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-white font-bold">x {qty}</span>
                            <button
                              onClick={() => handleQty(id, -qty)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total payable */}
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                    <span className="text-xs text-cinema-gray font-bold uppercase tracking-wider">Basket Total</span>
                    <span className="text-xl font-black text-cinema-gold">PKR {getCartTotal()}</span>
                  </div>

                  {/* Customer Checkout Form */}
                  <form onSubmit={handlePlaceOrder} className="space-y-3 pt-4 border-t border-white/5">
                    <h3 className="text-xs font-bold text-cinema-gold uppercase tracking-wider mb-2">POS Customer Info</h3>
                    
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full bg-cinema-bg border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold"
                    />

                    <input
                      type="tel"
                      required
                      placeholder="Phone"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full bg-cinema-bg border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold"
                    />

                    <input
                      type="text"
                      required
                      placeholder="CNIC (e.g. 35201-1234567-1)"
                      value={customerInfo.cnic}
                      onChange={e => setCustomerInfo({...customerInfo, cnic: e.target.value})}
                      className="w-full bg-cinema-bg border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={customerInfo.email}
                      onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="w-full bg-cinema-bg border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cinema-gold"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cinema-red hover:bg-red-700 text-white font-bold py-3 rounded-xl tracking-wider uppercase transition-all duration-300 text-xs flex items-center justify-center gap-1.5 glow-red"
                    >
                      {isSubmitting ? 'Processing...' : 'Place Concession Order'} <ArrowRight size={14} />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
