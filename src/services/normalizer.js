/**
 * Data Normalizer - Maps PHP SQL Server column names (PascalCase) to
 * camelCase field names expected by the React frontend components.
 *
 * PHP returns: CustomerId, CustomerName, Phone, CNIC, Email
 * React expects: id, name, phone, cnic, email
 */

const MOVIE_VISUALS = {
  "the legend of maula jatt": {
    poster: "https://upload.wikimedia.org/wikipedia/en/6/62/The_Legend_of_Maula_Jatt.jpeg",
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200"
  },
  "parey hut love": {
    poster: "https://upload.wikimedia.org/wikipedia/en/7/76/Parey_Hut_Love.jpeg",
    banner: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200"
  },
  "jawani phir nahi ani": {
    poster: "https://upload.wikimedia.org/wikipedia/en/f/ff/Jawani_Phir_Nahi_Ani.jpg",
    banner: "https://images.unsplash.com/photo-1496302661278-52051f524d68?q=80&w=1200"
  },
  "bin roye": {
    poster: "https://upload.wikimedia.org/wikipedia/en/5/52/Bin_Roye_film.jpg",
    banner: "https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=1200"
  },
  "cake": {
    poster: "https://upload.wikimedia.org/wikipedia/en/0/08/Cake_%282018_film%29.jpeg",
    banner: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1200"
  },
  "superstar": {
    poster: "https://upload.wikimedia.org/wikipedia/en/2/29/Superstar2019.jpeg",
    banner: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200"
  },
  "parwaaz hai junoon": {
    poster: "https://upload.wikimedia.org/wikipedia/en/6/60/Parwaaz_Hai_Junoon.jpeg",
    banner: "https://images.unsplash.com/photo-1508873696983-2df519f0397e?q=80&w=1200"
  },
  "na maloom afraad": {
    poster: "https://upload.wikimedia.org/wikipedia/en/0/0a/Na_Maloom_Afraad.jpg",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
  },
  "actor in law": {
    poster: "https://upload.wikimedia.org/wikipedia/en/d/d5/Actor_in_Law.jpg",
    banner: "https://images.unsplash.com/photo-1428908728789-d2de25dbd4e2?q=80&w=1200"
  },
  "bol": {
    poster: "https://upload.wikimedia.org/wikipedia/en/e/ec/Bol2011.jpg",
    banner: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200"
  },
  "the shawshank redemption": {
    poster: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    banner: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200"
  },
  "the dark knight": {
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200"
  },
  "inception": {
    poster: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200"
  },
  "pulp fiction": {
    poster: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
    banner: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200"
  },
  "the godfather": {
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200"
  },
  "interstellar": {
    poster: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg",
    banner: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200"
  },
  "the matrix": {
    poster: "https://upload.wikimedia.org/wikipedia/en/d/db/The_Matrix.png",
    banner: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200"
  },
  "forrest gump": {
    poster: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg",
    banner: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1200"
  },
  "the avengers": {
    poster: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Avengers_%282012_film%29_poster.jpg",
    banner: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=1200"
  },
  "titanic": {
    poster: "https://upload.wikimedia.org/wikipedia/en/1/18/Titanic_%281997_film%29_poster.png",
    banner: "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?q=80&w=1200"
  },
  "jurassic park": {
    poster: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
    banner: "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=80&w=1200"
  },
  "the social network": {
    poster: "https://upload.wikimedia.org/wikipedia/en/8/8c/The_Social_Network_film_poster.png",
    banner: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200"
  },
  "la la land": {
    poster: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%28film%29.png",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200"
  },
  "the lion king": {
    poster: "https://upload.wikimedia.org/wikipedia/en/3/3d/The_Lion_King_poster.jpg",
    banner: "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200"
  },
  "gladiator": {
    poster: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png",
    banner: "https://images.unsplash.com/photo-1503152394-c571994fd383?q=80&w=1200"
  },
  "the silence of the lambs": {
    poster: "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
    banner: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200"
  },
  "fight club": {
    poster: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg",
    banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200"
  },
  "the prestige": {
    poster: "https://upload.wikimedia.org/wikipedia/en/d/d2/Prestige_poster.jpg",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd6a?q=80&w=1200"
  },
  "whiplash": {
    poster: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg",
    banner: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200"
  },
  "the grand budapest hotel": {
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Grand_Budapest_Hotel.png",
    banner: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200"
  }
};

export const getMovieVisuals = (title = '') => {
  const normalizedTitle = title.toLowerCase().trim();
  if (MOVIE_VISUALS[normalizedTitle]) {
    return MOVIE_VISUALS[normalizedTitle];
  }
  return {
    poster: `https://placehold.co/300x450/1a1a1a/c9a84c?text=${encodeURIComponent(title || 'Movie')}`,
    banner: `https://placehold.co/1280x720/1a1a1a/c9a84c?text=${encodeURIComponent(title || 'Movie')}`
  };
};

export const normalizeCustomer = (c) => ({
  id: c.CustomerId ?? c.id,
  name: c.CustomerName ?? c.name,
  phone: c.Phone ?? c.phone,
  cnic: c.CNIC ?? c.cnic,
  email: c.Email ?? c.email,
  registeredAt: c.RegistrationDate ?? c.registeredAt ?? ''
});

export const normalizeMovie = (m) => {
  const title = m.Title ?? m.title ?? '';
  const visuals = getMovieVisuals(title);
  return {
    id: m.MovieId ?? m.id,
    title,
    poster: m.Poster ?? m.poster ?? visuals.poster,
    banner: m.Banner ?? m.banner ?? visuals.banner,
    rating: m.Rating ?? m.rating ?? '0',
    duration: m.Duration ?? m.duration ?? 'N/A',
    genre: m.Genre ?? m.genre ?? '',
    language: m.Language ?? m.language ?? '',
    cast: m.Cast ?? m.cast ?? '',
    releaseDate: m.ReleaseDate ?? m.releaseDate ?? '',
    synopsis: m.Synopsis ?? m.synopsis ?? '',
    status: m.Status ?? m.status ?? 'Now Showing',
  };
};

export const normalizeScreen = (s) => ({
  id: s.ScreenId ?? s.id,
  name: s.ScreenName ?? s.name,
  type: s.ScreenType ?? s.type,
  capacity: s.Capacity ?? s.capacity ?? 0,
  rows: s.Rows ?? s.rows ?? 8,
  cols: s.Cols ?? s.cols ?? 10,
});

export const normalizeShowtime = (st, movies = [], screens = []) => {
  const movieId = st.MovieId ?? st.movieId;
  const screenId = st.ScreenId ?? st.screenId;
  const movieTitle = st.Title ?? st.movie?.title ?? '';
  const visuals = movieTitle ? getMovieVisuals(movieTitle) : null;
  
  const dbScreen = screens.find(s => s.id == screenId);
  const screenCapacity = dbScreen ? dbScreen.capacity : (st.Capacity ? parseInt(st.Capacity) : 80);
  const screenType = dbScreen ? dbScreen.type : (st.ScreenType ?? st.type ?? 'Standard');
  const screenName = dbScreen ? dbScreen.name : (st.ScreenName ?? st.name ?? '');
  const rows = dbScreen ? dbScreen.rows : 8;
  const cols = dbScreen ? dbScreen.cols : Math.ceil(screenCapacity / rows);
  
  const seatsBookedList = st.seatsBooked ?? (st.SeatsBooked ? (typeof st.SeatsBooked === 'string' ? st.SeatsBooked.split(',') : st.SeatsBooked) : []);

  return {
    id: st.ShowtimeId ?? st.id,
    movieId,
    screenId,
    date: st.ShowDate ?? st.date ?? '',
    time: st.ShowTime ?? st.time ?? '',
    price: st.Price !== undefined ? parseFloat(st.Price) : (st.price ?? 0),
    seatsBooked: seatsBookedList,
    movie: movies.find(m => m.id == movieId) || (movieTitle ? { 
      title: movieTitle,
      genre: st.Genre ?? '',
      duration: st.Duration ? `${st.Duration} min` : '',
      poster: visuals ? visuals.poster : ''
    } : null),
    screen: {
      id: screenId,
      name: screenName,
      type: screenType,
      capacity: screenCapacity,
      rows: rows,
      cols: cols,
      seatsBooked: seatsBookedList
    }
  };
};

export const normalizeBooking = (b) => ({
  id: b.BookingId ?? b.id,
  customerId: b.Customer_Id ?? b.customerId,
  showtimeId: b.Show_Id ?? b.showtimeId,
  bookingDate: b.BookingDate ?? b.bookingDate ?? '',
  totalPrice: b.TotalAmount ?? b.totalPrice ?? 0,
  seatCount: b.NumberOfSeats ?? b.seatCount ?? 0,
  paymentStatus: b.PaymentStatus ?? b.paymentStatus ?? 'Paid',
  // Joined fields from SQL JOIN query
  customer: b.CustomerName ? { name: b.CustomerName } : b.customer,
  movie: b.Title ? { title: b.Title } : b.movie,
  showtime: (b.ShowDate || b.ShowTime) ? {
    date: b.ShowDate ?? '',
    time: b.ShowTime ?? '',
  } : b.showtime,
  tickets: b.tickets ?? []
});

export const normalizeTicket = (t) => ({
  id: t.TicketId ?? t.id,
  bookingId: t.BookingId ?? t.bookingId,
  seatNumber: t.SeatNumber ?? t.seatNumber,
  ticketType: t.TicketType ?? t.ticketType ?? 'Standard',
  price: t.Price ?? t.price ?? 0,
});

export const normalizeEmployee = (e) => ({
  id: e.EmployeeId ?? e.id,
  name: e.EmployeeName ?? (e.FirstName && e.LastName ? `${e.FirstName} ${e.LastName}` : e.FirstName ?? e.name ?? 'Unknown'),
  role: e.Position ?? e.Role ?? e.role,
  email: e.Email ?? e.email,
  phone: e.Phone ?? e.phone,
  salary: e.Salary ?? e.salary ?? 0,
});

export const normalizeConcession = (c) => ({
  id: c.ItemId ?? c.ConcessionId ?? c.id,
  name: c.ItemName ?? c.name,
  category: c.Category ?? c.category ?? 'Snacks',
  price: c.Price !== undefined ? parseFloat(c.Price) : (c.price ?? 0),
  available: c.IsAvailable !== undefined ? !!c.IsAvailable : (c.available ?? ((c.Stock ?? c.stock ?? 0) > 0)),
  stock: c.Stock !== undefined ? parseInt(c.Stock) : (c.stock ?? 0),
});

export const normalizeOrder = (o) => ({
  id: o.OrderId ?? o.id,
  customerId: o.CustomerId ?? o.customerId,
  bookingId: o.BookingId ?? o.bookingId,
  orderDate: o.OrderDate ?? o.orderDate ?? '',
  totalAmount: o.TotalAmount ?? o.totalAmount ?? 0,
  customer: o.CustomerName ? { name: o.CustomerName } : o.customer,
  items: o.items ?? [],
});
