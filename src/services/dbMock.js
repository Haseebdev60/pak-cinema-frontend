// Simulated Database Layer for Pakistani Cinema Management System
// Stores data in localStorage to enable dynamic CRUD operations in the frontend out-of-the-box.

const MOCK_STORAGE_KEY = 'pcms_db_v1';

// Seed Data
const defaultMovies = [
  {
    id: "1",
    title: "The Legend of Maula Jatt",
    poster: "https://images.unsplash.com/photo-1596727147705-61a532a659bd?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200",
    rating: "9.1",
    duration: "153 mins",
    genre: "Action, Drama",
    language: "Punjabi",
    cast: "Fawad Khan, Hamza Ali Abbasi, Mahira Khan, Humaima Malik",
    releaseDate: "2022-10-13",
    synopsis: "A fierce rivalry matches Maula Jatt, a legendary fighter, against Noori Natt, the brutal leader of the Natt clan. A story of revenge, honor, and raw justice in historical Punjab.",
    status: "Now Showing"
  },
  {
    id: "2",
    title: "Kamli",
    poster: "https://images.unsplash.com/photo-1579783928621-7a13d66a62d1?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200",
    rating: "8.5",
    duration: "135 mins",
    genre: "Drama, Mystery",
    language: "Urdu",
    cast: "Saba Qamar, Sania Saeed, Hamza Ali Abbasi, Nimra Bucha",
    releaseDate: "2022-06-03",
    synopsis: "Kamli is a psychological tragedy directed by Sarmad Khoosat. It portrays a young woman's struggles between her desires and the rigid traditional values surrounding her in a rural backdrop.",
    status: "Now Showing"
  },
  {
    id: "3",
    title: "Joyland",
    poster: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200",
    rating: "8.7",
    duration: "126 mins",
    genre: "Drama, Romance",
    language: "Urdu / Punjabi",
    cast: "Ali Junejo, Rasti Farooq, Alina Khan, Sarwat Gilani",
    releaseDate: "2022-11-18",
    synopsis: "A patriarchical family's youngest son secretly joins a dance theater and falls in love with a trans woman, sparking a silent rebellion within his traditional household.",
    status: "Now Showing"
  },
  {
    id: "4",
    title: "Sherdil",
    poster: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200",
    rating: "7.2",
    duration: "140 mins",
    genre: "Action, War",
    language: "Urdu / English",
    cast: "Mikaal Zulfiqar, Armeena Khan, Hassan Niazi",
    releaseDate: "2019-03-22",
    synopsis: "Set against the backdrop of the PAF Academy, a young pilot follows his grandfather's legacy while navigating intense military training, romance, and aerial combat with rivals.",
    status: "Now Showing"
  },
  {
    id: "5",
    title: "Quaid-e-Azam Zindabad",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1200",
    rating: "7.8",
    duration: "138 mins",
    genre: "Action, Comedy",
    language: "Urdu",
    cast: "Fahad Mustafa, Mahira Khan, Javed Sheikh, Nayyar Ejaz",
    releaseDate: "2022-07-09",
    synopsis: "A corrupt police officer undergoes a moral awakening when he realizes the currency notes start losing the portrait of Quaid-e-Azam, triggering chaos across the country.",
    status: "Coming Soon"
  },
  {
    id: "6",
    title: "London Nahi Jaunga",
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200",
    rating: "7.0",
    duration: "145 mins",
    genre: "Comedy, Romance",
    language: "Urdu / Punjabi",
    cast: "Humayun Saeed, Mehwish Hayat, Kubra Khan, Sohail Ahmed",
    releaseDate: "2022-07-09",
    synopsis: "A landholder from Punjab falls in love with a modern girl from London, setting off a hilarious culture-clash rom-com as he tries to win her heart and convince her to move to Pakistan.",
    status: "Coming Soon"
  }
];

const defaultScreens = [
  { id: "S1", name: "Screen 1 - Standard Hall", type: "Standard", capacity: 80, rows: 8, cols: 10 },
  { id: "S2", name: "Screen 2 - IMAX Hall", type: "IMAX", capacity: 100, rows: 10, cols: 10 },
  { id: "S3", name: "Screen 3 - VIP Lounge", type: "VIP Lounge", capacity: 40, rows: 5, cols: 8 },
  { id: "S4", name: "Screen 4 - 4DX Hall", type: "4DX Experience", capacity: 64, rows: 8, cols: 8 }
];

const defaultShowtimes = [
  { id: "ST1", movieId: "1", screenId: "S2", date: "2026-06-01", time: "15:00", price: 1200, seatsBooked: ["A-3", "A-4", "C-5"] },
  { id: "ST2", movieId: "1", screenId: "S2", date: "2026-06-01", time: "19:00", price: 1200, seatsBooked: ["B-1", "B-2", "E-6", "E-7"] },
  { id: "ST3", movieId: "2", screenId: "S1", date: "2026-06-01", time: "18:00", price: 800, seatsBooked: [] },
  { id: "ST4", movieId: "3", screenId: "S3", date: "2026-06-02", time: "20:30", price: 2000, seatsBooked: ["C-1", "C-2"] },
  { id: "ST5", movieId: "4", screenId: "S4", date: "2026-06-01", time: "16:00", price: 1500, seatsBooked: ["D-4"] },
  { id: "ST6", movieId: "2", screenId: "S1", date: "2026-06-02", time: "14:00", price: 800, seatsBooked: [] },
];

const defaultCustomers = [
  { id: "CUST1", name: "Ali Ahmed", phone: "03001234567", cnic: "35201-1234567-1", email: "ali.ahmed@gmail.com", registeredAt: "2026-05-15T10:00:00Z" },
  { id: "CUST2", name: "Zainab Fatima", phone: "03217654321", cnic: "35202-7654321-2", email: "zainab.f@yahoo.com", registeredAt: "2026-05-18T14:30:00Z" },
  { id: "CUST3", name: "Bilal Khan", phone: "03339876543", cnic: "17301-9876543-3", email: "bilal.k@outlook.com", registeredAt: "2026-05-20T17:15:00Z" }
];

const defaultBookings = [
  { id: "BK1", customerId: "CUST1", showtimeId: "ST1", bookingDate: "2026-05-30T11:20:00Z", totalPrice: 2400, seatCount: 2, paymentStatus: "Paid" },
  { id: "BK2", customerId: "CUST2", showtimeId: "ST2", bookingDate: "2026-05-31T09:40:00Z", totalPrice: 2400, seatCount: 2, paymentStatus: "Paid" },
  { id: "BK3", customerId: "CUST3", showtimeId: "ST5", bookingDate: "2026-05-31T15:10:00Z", totalPrice: 1500, seatCount: 1, paymentStatus: "Paid" }
];

const defaultTickets = [
  { id: "TK1", bookingId: "BK1", seatNumber: "A-3", ticketType: "Premium", price: 1200 },
  { id: "TK2", bookingId: "BK1", seatNumber: "A-4", ticketType: "Premium", price: 1200 },
  { id: "TK3", bookingId: "BK2", seatNumber: "B-1", ticketType: "Premium", price: 1200 },
  { id: "TK4", bookingId: "BK2", seatNumber: "B-2", ticketType: "Premium", price: 1200 },
  { id: "TK5", bookingId: "BK3", seatNumber: "D-4", ticketType: "VIP", price: 1500 }
];

const defaultEmployees = [
  { id: "EMP1", name: "Haris Shah", role: "Cinema Manager", email: "haris@cinepax.pk", phone: "03001112223", salary: 75000 },
  { id: "EMP2", name: "Sana Rizvi", role: "Ticketing Agent", email: "sana.r@cinepax.pk", phone: "03214445556", salary: 35000 },
  { id: "EMP3", name: "Kamil Butt", role: "Concession Supervisor", email: "kamil@cinepax.pk", phone: "03337778889", salary: 40000 },
  { id: "EMP4", name: "Yasir Mehmood", role: "Technician", email: "yasir@cinepax.pk", phone: "03456667778", salary: 45000 }
];

const defaultConcessions = [
  { id: "CON1", name: "Salted Popcorn (Small)", category: "Popcorn", price: 350, available: true, stock: 150 },
  { id: "CON2", name: "Salted Popcorn (Medium)", category: "Popcorn", price: 550, available: true, stock: 120 },
  { id: "CON3", name: "Caramel Popcorn (Large)", category: "Popcorn", price: 750, available: true, stock: 90 },
  { id: "CON4", name: "Pepsi Cola (Medium)", category: "Drinks", price: 250, available: true, stock: 200 },
  { id: "CON5", name: "Mountain Dew (Medium)", category: "Drinks", price: 250, available: true, stock: 180 },
  { id: "CON6", name: "Nacho Cheese Supreme", category: "Snacks", price: 600, available: true, stock: 50 },
  { id: "CON7", name: "Crispy Chicken Burger", category: "Burgers", price: 650, available: true, stock: 40 },
  { id: "CON8", name: "Gourmet Beef Burger", category: "Burgers", price: 800, available: true, stock: 35 },
  { id: "CON9", name: "Pepperoni Pizza Slice", category: "Pizza", price: 450, available: true, stock: 60 },
  { id: "CON10", name: "Masala French Fries", category: "Fries", price: 300, available: true, stock: 100 },
  { id: "CON11", name: "Hot Chicken Wings (6pcs)", category: "Snacks", price: 500, available: true, stock: 45 },
  { id: "CON12", name: "Chocolate Scoop Waffle Cone", category: "Ice Cream", price: 400, available: true, stock: 80 }
];

const defaultOrders = [
  {
    id: "ORD1",
    customerId: "CUST1",
    bookingId: "BK1",
    orderDate: "2026-05-30T11:25:00Z",
    items: [
      { concessionId: "CON3", quantity: 1, price: 750 },
      { concessionId: "CON4", quantity: 2, price: 250 }
    ],
    totalAmount: 1250
  },
  {
    id: "ORD2",
    customerId: "CUST2",
    bookingId: "BK2",
    orderDate: "2026-05-31T09:45:00Z",
    items: [
      { concessionId: "CON6", quantity: 1, price: 600 },
      { concessionId: "CON5", quantity: 1, price: 250 }
    ],
    totalAmount: 850
  }
];

// Initialize DB if empty
const getDb = () => {
  const data = localStorage.getItem(MOCK_STORAGE_KEY);
  if (!data) {
    const initialDb = {
      movies: defaultMovies,
      screens: defaultScreens,
      showtimes: defaultShowtimes,
      customers: defaultCustomers,
      bookings: defaultBookings,
      tickets: defaultTickets,
      employees: defaultEmployees,
      concessions: defaultConcessions,
      orders: defaultOrders
    };
    localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(initialDb));
    return initialDb;
  }
  return JSON.parse(data);
};

const saveDb = (db) => {
  localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(db));
};

export const dbMock = {
  // --- MOVIES ---
  getMovies: () => getDb().movies,
  getMovieById: (id) => getDb().movies.find(m => m.id === id),
  addMovie: (movie) => {
    const db = getDb();
    const newMovie = { ...movie, id: (db.movies.length + 1).toString() };
    db.movies.push(newMovie);
    saveDb(db);
    return newMovie;
  },
  updateMovie: (id, movieData) => {
    const db = getDb();
    const index = db.movies.findIndex(m => m.id === id);
    if (index !== -1) {
      db.movies[index] = { ...db.movies[index], ...movieData };
      saveDb(db);
      return db.movies[index];
    }
    return null;
  },
  deleteMovie: (id) => {
    const db = getDb();
    db.movies = db.movies.filter(m => m.id !== id);
    // Cascade delete showtimes associated with movie
    db.showtimes = db.showtimes.filter(s => s.movieId !== id);
    saveDb(db);
    return true;
  },

  // --- SCREENS ---
  getScreens: () => getDb().screens,
  getScreenById: (id) => getDb().screens.find(s => s.id === id),
  addScreen: (screen) => {
    const db = getDb();
    const newScreen = { ...screen, id: "S" + (db.screens.length + 1).toString() };
    db.screens.push(newScreen);
    saveDb(db);
    return newScreen;
  },
  updateScreen: (id, screenData) => {
    const db = getDb();
    const index = db.screens.findIndex(s => s.id === id);
    if (index !== -1) {
      db.screens[index] = { ...db.screens[index], ...screenData };
      saveDb(db);
      return db.screens[index];
    }
    return null;
  },
  deleteScreen: (id) => {
    const db = getDb();
    db.screens = db.screens.filter(s => s.id !== id);
    db.showtimes = db.showtimes.filter(s => s.screenId !== id);
    saveDb(db);
    return true;
  },

  // --- SHOWTIMES ---
  getShowtimes: () => {
    const db = getDb();
    return db.showtimes.map(st => ({
      ...st,
      movie: db.movies.find(m => m.id === st.movieId),
      screen: db.screens.find(s => s.id === st.screenId)
    }));
  },
  getShowtimeById: (id) => {
    const db = getDb();
    const st = db.showtimes.find(s => s.id === id);
    if (!st) return null;
    return {
      ...st,
      movie: db.movies.find(m => m.id === st.movieId),
      screen: db.screens.find(s => s.id === st.screenId)
    };
  },
  addShowtime: (showtime) => {
    const db = getDb();
    const newShowtime = {
      ...showtime,
      id: "ST" + (db.showtimes.length + 1).toString(),
      seatsBooked: showtime.seatsBooked || []
    };
    db.showtimes.push(newShowtime);
    saveDb(db);
    return newShowtime;
  },
  updateShowtime: (id, showtimeData) => {
    const db = getDb();
    const index = db.showtimes.findIndex(s => s.id === id);
    if (index !== -1) {
      db.showtimes[index] = { ...db.showtimes[index], ...showtimeData };
      saveDb(db);
      return db.showtimes[index];
    }
    return null;
  },
  deleteShowtime: (id) => {
    const db = getDb();
    db.showtimes = db.showtimes.filter(s => s.id !== id);
    // Cascade delete bookings associated
    db.bookings = db.bookings.filter(b => b.showtimeId !== id);
    saveDb(db);
    return true;
  },

  // --- CUSTOMERS ---
  getCustomers: () => getDb().customers,
  getCustomerById: (id) => getDb().customers.find(c => c.id === id),
  addCustomer: (customer) => {
    const db = getDb();
    const newCustomer = {
      ...customer,
      id: "CUST" + (db.customers.length + 1).toString(),
      registeredAt: new Date().toISOString()
    };
    db.customers.push(newCustomer);
    saveDb(db);
    return newCustomer;
  },
  updateCustomer: (id, customerData) => {
    const db = getDb();
    const index = db.customers.findIndex(c => c.id === id);
    if (index !== -1) {
      db.customers[index] = { ...db.customers[index], ...customerData };
      saveDb(db);
      return db.customers[index];
    }
    return null;
  },
  deleteCustomer: (id) => {
    const db = getDb();
    db.customers = db.customers.filter(c => c.id !== id);
    saveDb(db);
    return true;
  },

  // --- BOOKINGS & TRANSACTIONS ---
  getBookings: () => {
    const db = getDb();
    return db.bookings.map(bk => ({
      ...bk,
      customer: db.customers.find(c => c.id === bk.customerId),
      showtime: db.showtimes.find(st => st.id === bk.showtimeId),
      movie: db.showtimes.find(st => st.id === bk.showtimeId)
        ? db.movies.find(m => m.id === db.showtimes.find(st => st.id === bk.showtimeId).movieId)
        : null,
      tickets: db.tickets.filter(t => t.bookingId === bk.id)
    }));
  },
  getBookingById: (id) => {
    const db = getDb();
    const bk = db.bookings.find(b => b.id === id);
    if (!bk) return null;
    const showtime = db.showtimes.find(st => st.id === bk.showtimeId);
    return {
      ...bk,
      customer: db.customers.find(c => c.id === bk.customerId),
      showtime,
      screen: showtime ? db.screens.find(s => s.id === showtime.screenId) : null,
      movie: showtime ? db.movies.find(m => m.id === showtime.movieId) : null,
      tickets: db.tickets.filter(t => t.bookingId === bk.id)
    };
  },
  
  // Transactional Booking Creator (Customers Table, Bookings Table, Tickets Table)
  createBooking: (data) => {
    const db = getDb();
    const { customer, showtimeId, seats, ticketType, concessionsOrdered } = data;

    // 1. Resolve or Create Customer (by CNIC or Phone)
    let custRecord = db.customers.find(c => c.cnic === customer.cnic || c.phone === customer.phone);
    if (!custRecord) {
      custRecord = {
        id: "CUST" + (db.customers.length + 1).toString(),
        name: customer.name,
        phone: customer.phone,
        cnic: customer.cnic,
        email: customer.email,
        registeredAt: new Date().toISOString()
      };
      db.customers.push(custRecord);
    }

    // Find showtime
    const showtimeIndex = db.showtimes.findIndex(s => s.id === showtimeId);
    if (showtimeIndex === -1) throw new Error("Showtime not found");
    const showtime = db.showtimes[showtimeIndex];

    // Lock seats
    db.showtimes[showtimeIndex].seatsBooked = [
      ...new Set([...showtime.seatsBooked, ...seats])
    ];

    // Compute prices
    const ticketUnitPrice = showtime.price;
    const ticketsTotal = ticketUnitPrice * seats.length;
    
    let concessionsTotal = 0;
    const concessionItemsList = [];
    
    if (concessionsOrdered && concessionsOrdered.length > 0) {
      concessionsOrdered.forEach(orderedItem => {
        const itemIndex = db.concessions.findIndex(c => c.id === orderedItem.concessionId);
        if (itemIndex !== -1) {
          const item = db.concessions[itemIndex];
          // Deduct stock
          db.concessions[itemIndex].stock = Math.max(0, item.stock - orderedItem.quantity);
          concessionsTotal += item.price * orderedItem.quantity;
          concessionItemsList.push({
            concessionId: item.id,
            quantity: orderedItem.quantity,
            price: item.price
          });
        }
      });
    }

    const totalBookingPrice = ticketsTotal;

    // 2. Save Booking Record
    const newBooking = {
      id: "BK" + (db.bookings.length + 1).toString(),
      customerId: custRecord.id,
      showtimeId: showtimeId,
      bookingDate: new Date().toISOString(),
      totalPrice: totalBookingPrice,
      seatCount: seats.length,
      paymentStatus: "Paid"
    };
    db.bookings.push(newBooking);

    // 3. Save Ticket Records
    const newTickets = seats.map((seat, index) => {
      const ticket = {
        id: "TK" + (db.tickets.length + 1).toString() + index,
        bookingId: newBooking.id,
        seatNumber: seat,
        ticketType: ticketType || "Standard",
        price: ticketUnitPrice
      };
      db.tickets.push(ticket);
      return ticket;
    });

    // 4. Save Concession Order if applicable
    let newOrder = null;
    if (concessionItemsList.length > 0) {
      newOrder = {
        id: "ORD" + (db.orders.length + 1).toString(),
        customerId: custRecord.id,
        bookingId: newBooking.id,
        orderDate: new Date().toISOString(),
        items: concessionItemsList,
        totalAmount: concessionsTotal
      };
      db.orders.push(newOrder);
    }

    saveDb(db);

    return {
      booking: newBooking,
      customer: custRecord,
      tickets: newTickets,
      order: newOrder
    };
  },
  
  deleteBooking: (id) => {
    const db = getDb();
    const booking = db.bookings.find(b => b.id === id);
    if (!booking) return false;
    
    // Release seats from showtime
    const stIndex = db.showtimes.findIndex(s => s.id === booking.showtimeId);
    if (stIndex !== -1) {
      const bkTickets = db.tickets.filter(t => t.bookingId === id).map(t => t.seatNumber);
      db.showtimes[stIndex].seatsBooked = db.showtimes[stIndex].seatsBooked.filter(
        seat => !bkTickets.includes(seat)
      );
    }
    
    // Remove tickets, bookings, orders
    db.bookings = db.bookings.filter(b => b.id !== id);
    db.tickets = db.tickets.filter(t => t.bookingId !== id);
    db.orders = db.orders.filter(o => o.bookingId !== id);
    
    saveDb(db);
    return true;
  },

  // --- TICKETS ---
  getTickets: () => getDb().tickets,
  getTicketById: (id) => getDb().tickets.find(t => t.id === id),
  addTicket: (ticket) => {
    const db = getDb();
    const newTicket = { ...ticket, id: "TK" + (db.tickets.length + 1).toString() };
    db.tickets.push(newTicket);
    saveDb(db);
    return newTicket;
  },
  updateTicket: (id, ticketData) => {
    const db = getDb();
    const index = db.tickets.findIndex(t => t.id === id);
    if (index !== -1) {
      db.tickets[index] = { ...db.tickets[index], ...ticketData };
      saveDb(db);
      return db.tickets[index];
    }
    return null;
  },
  deleteTicket: (id) => {
    const db = getDb();
    db.tickets = db.tickets.filter(t => t.id !== id);
    saveDb(db);
    return true;
  },

  // --- EMPLOYEES ---
  getEmployees: () => getDb().employees,
  getEmployeeById: (id) => getDb().employees.find(e => e.id === id),
  addEmployee: (employee) => {
    const db = getDb();
    const newEmployee = { ...employee, id: "EMP" + (db.employees.length + 1).toString() };
    db.employees.push(newEmployee);
    saveDb(db);
    return newEmployee;
  },
  updateEmployee: (id, employeeData) => {
    const db = getDb();
    const index = db.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      db.employees[index] = { ...db.employees[index], ...employeeData };
      saveDb(db);
      return db.employees[index];
    }
    return null;
  },
  deleteEmployee: (id) => {
    const db = getDb();
    db.employees = db.employees.filter(e => e.id !== id);
    saveDb(db);
    return true;
  },

  // --- CONCESSIONS ---
  getConcessions: () => getDb().concessions,
  getConcessionById: (id) => getDb().concessions.find(c => c.id === id),
  addConcession: (concession) => {
    const db = getDb();
    const newConcession = { ...concession, id: "CON" + (db.concessions.length + 1).toString() };
    db.concessions.push(newConcession);
    saveDb(db);
    return newConcession;
  },
  updateConcession: (id, concessionData) => {
    const db = getDb();
    const index = db.concessions.findIndex(c => c.id === id);
    if (index !== -1) {
      db.concessions[index] = { ...db.concessions[index], ...concessionData };
      saveDb(db);
      return db.concessions[index];
    }
    return null;
  },
  deleteConcession: (id) => {
    const db = getDb();
    db.concessions = db.concessions.filter(c => c.id !== id);
    saveDb(db);
    return true;
  },

  // --- ORDERS ---
  getOrders: () => {
    const db = getDb();
    return db.orders.map(ord => ({
      ...ord,
      customer: db.customers.find(c => c.id === ord.customerId),
      booking: db.bookings.find(b => b.id === ord.bookingId),
      itemsDetailed: ord.items.map(it => ({
        ...it,
        detail: db.concessions.find(c => c.id === it.concessionId)
      }))
    }));
  },
  getOrderById: (id) => {
    const db = getDb();
    const ord = db.orders.find(o => o.id === id);
    if (!ord) return null;
    return {
      ...ord,
      customer: db.customers.find(c => c.id === ord.customerId),
      booking: db.bookings.find(b => b.id === ord.bookingId),
      itemsDetailed: ord.items.map(it => ({
        ...it,
        detail: db.concessions.find(c => c.id === it.concessionId)
      }))
    };
  },
  addOrder: (order) => {
    const db = getDb();
    const newOrder = {
      ...order,
      id: "ORD" + (db.orders.length + 1).toString(),
      orderDate: new Date().toISOString()
    };
    db.orders.push(newOrder);
    saveDb(db);
    return newOrder;
  },
  updateOrder: (id, orderData) => {
    const db = getDb();
    const index = db.orders.findIndex(o => o.id === id);
    if (index !== -1) {
      db.orders[index] = { ...db.orders[index], ...orderData };
      saveDb(db);
      return db.orders[index];
    }
    return null;
  },
  deleteOrder: (id) => {
    const db = getDb();
    db.orders = db.orders.filter(o => o.id !== id);
    saveDb(db);
    return true;
  }
};
