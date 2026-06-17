// Configuration schemas for all 9 database management system entities.
// Outlines form inputs, headers, and lookup strategies for movies, screens, showtimes, customers, bookings, tickets, employees, concessions, and orders.

export const crudConfig = {
  movies: {
    title: "Movies Management",
    apiKey: "movies",
    fields: [
      { name: "title", label: "Movie Title", type: "text", required: true },
      { name: "poster", label: "Poster URL", type: "text", required: true },
      { name: "banner", label: "Banner URL", type: "text", required: true },
      { name: "rating", label: "Rating (e.g. 8.5)", type: "number", required: true, min: 0, max: 10, step: 0.1 },
      { name: "duration", label: "Duration (e.g. 120 mins)", type: "text", required: true },
      { name: "genre", label: "Genre", type: "text", required: true },
      { name: "language", label: "Language", type: "text", required: true },
      { name: "cast", label: "Cast Credits", type: "text", required: true },
      { name: "releaseDate", label: "Release Date", type: "date", required: true },
      { name: "synopsis", label: "Synopsis", type: "textarea", required: true },
      { name: "status", label: "Status", type: "select", options: ["Now Showing", "Coming Soon"], required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "title", label: "Title" },
      { key: "genre", label: "Genre" },
      { key: "rating", label: "Rating" },
      { key: "language", label: "Language" },
      { key: "status", label: "Status" }
    ]
  },

  screens: {
    title: "Screens Management",
    apiKey: "screens",
    fields: [
      { name: "name", label: "Screen Name", type: "text", required: true },
      { name: "type", label: "Screen Type", type: "select", options: ["Standard", "IMAX", "VIP Lounge", "4DX Experience"], required: true },
      { name: "capacity", label: "Seating Capacity", type: "number", required: true },
      { name: "rows", label: "Number of Rows", type: "number", required: true },
      { name: "cols", label: "Seats Per Row (Cols)", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Screen Name" },
      { key: "type", label: "Format" },
      { key: "capacity", label: "Capacity" },
      { key: "rows", label: "Rows" },
      { key: "cols", label: "Cols" }
    ]
  },

  showtimes: {
    title: "Showtimes Management",
    apiKey: "showtimes",
    fields: [
      { name: "movieId", label: "Movie ID (Foreign Key)", type: "lookup", lookupEntity: "movies", displayKey: "title", required: true },
      { name: "screenId", label: "Screen ID (Foreign Key)", type: "lookup", lookupEntity: "screens", displayKey: "name", required: true },
      { name: "date", label: "Show Date", type: "date", required: true },
      { name: "time", label: "Show Time (PKT)", type: "text", placeholder: "e.g. 18:30", required: true },
      { name: "price", label: "Ticket Price (PKR)", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "movie.title", label: "Movie", render: (row) => row.movie?.title || row.movieId },
      { key: "screen.name", label: "Screen", render: (row) => row.screen?.name || row.screenId },
      { key: "date", label: "Date" },
      { key: "time", label: "Time" },
      { key: "price", label: "Price (PKR)" }
    ]
  },

  customers: {
    title: "Customers Records",
    apiKey: "customers",
    fields: [
      { name: "name", label: "Customer Name", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "text", required: true },
      { name: "cnic", label: "CNIC Number", type: "text", required: true },
      { name: "email", label: "Email Address", type: "text", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "phone", label: "Phone" },
      { key: "cnic", label: "CNIC" },
      { key: "email", label: "Email" }
    ]
  },

  bookings: {
    title: "Bookings Records",
    apiKey: "bookings",
    fields: [
      { name: "customerId", label: "Customer ID (Foreign Key)", type: "lookup", lookupEntity: "customers", displayKey: "name", required: true },
      { name: "showtimeId", label: "Showtime ID (Foreign Key)", type: "lookup", lookupEntity: "showtimes", displayKey: "time", required: true },
      { name: "bookingDate", label: "Booking Date", type: "date", required: true },
      { name: "totalPrice", label: "Total Price (PKR)", type: "number", required: true },
      { name: "seatCount", label: "Seats Count", type: "number", required: true },
      { name: "paymentStatus", label: "Payment Status", type: "select", options: ["Paid", "Unpaid", "Cancelled"], required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "customer.name", label: "Customer", render: (row) => row.customer?.name || row.customerId },
      { key: "movie.title", label: "Movie", render: (row) => row.movie?.title || "N/A" },
      { key: "showtime.time", label: "Showtime", render: (row) => row.showtime ? `${row.showtime.date} ${row.showtime.time}` : row.showtimeId },
      { key: "seatCount", label: "Seats" },
      { key: "totalPrice", label: "Total (PKR)" },
      { key: "paymentStatus", label: "Status" }
    ]
  },

  tickets: {
    title: "Tickets Records",
    apiKey: "tickets",
    fields: [
      { name: "bookingId", label: "Booking ID (Foreign Key)", type: "lookup", lookupEntity: "bookings", displayKey: "id", required: true },
      { name: "seatNumber", label: "Seat Number (e.g. A-5)", type: "text", required: true },
      { name: "ticketType", label: "Seat Class", type: "select", options: ["Standard", "Premium", "VIP"], required: true },
      { name: "price", label: "Price (PKR)", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "bookingId", label: "Booking ID" },
      { key: "seatNumber", label: "Seat" },
      { key: "ticketType", label: "Type" },
      { key: "price", label: "Price (PKR)" }
    ]
  },

  employees: {
    title: "Employees Directory",
    apiKey: "employees",
    fields: [
      { name: "name", label: "Full Name", type: "text", required: true },
      { name: "role", label: "Role/Designation", type: "text", required: true },
      { name: "email", label: "Email Address", type: "text", required: true },
      { name: "phone", label: "Phone Number", type: "text", required: true },
      { name: "salary", label: "Monthly Salary (PKR)", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Name" },
      { key: "role", label: "Role" },
      { key: "phone", label: "Phone" },
      { key: "salary", label: "Salary (PKR)" }
    ]
  },

  concessions: {
    title: "Concessions Inventory",
    apiKey: "concessions",
    fields: [
      { name: "name", label: "Item Name", type: "text", required: true },
      { name: "category", label: "Category", type: "select", options: ["Popcorn", "Drinks", "Snacks", "Burgers", "Pizza", "Fries", "Ice Cream"], required: true },
      { name: "price", label: "Price (PKR)", type: "number", required: true },
      { name: "available", label: "Availability Status", type: "select", options: ["true", "false"], required: true },
      { name: "stock", label: "In Stock Count", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "name", label: "Item Name" },
      { key: "category", label: "Category" },
      { key: "price", label: "Price (PKR)" },
      { key: "stock", label: "Stock" },
      { key: "available", label: "Active", render: (row) => row.available ? "Yes" : "No" }
    ]
  },

  orders: {
    title: "Concession Orders",
    apiKey: "orders",
    fields: [
      { name: "customerId", label: "Customer ID (Foreign Key)", type: "lookup", lookupEntity: "customers", displayKey: "name", required: true },
      { name: "bookingId", label: "Booking ID (Foreign Key)", type: "text", required: true },
      { name: "orderDate", label: "Order Date", type: "date", required: true },
      { name: "totalAmount", label: "Total Cost (PKR)", type: "number", required: true }
    ],
    columns: [
      { key: "id", label: "ID" },
      { key: "customer.name", label: "Customer", render: (row) => row.customer?.name || row.customerId },
      { key: "bookingId", label: "Link Booking" },
      { key: "orderDate", label: "Date" },
      { key: "totalAmount", label: "Total (PKR)" }
    ]
  }
};
