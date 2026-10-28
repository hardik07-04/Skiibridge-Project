import {
  Movie,
  Theater,
  Showtime,
  Seat,
  ConcessionItem,
  Booking,
  User,
  FeatureCategory,
  RoleDetail,
  EREntity,
  ERRelationship,
  ArchitectureLayer,
  UserFlowStep,
  MVCLayer,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_cust_1',
    name: 'Sarah Connor',
    email: 'sarah.c@cinema.com',
    role: 'customer',
    phone: '+1 (555) 234-8901',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user_cashier_1',
    name: 'Marcus Vance',
    email: 'marcus.v@imovies.com',
    role: 'cashier',
    phone: '+1 (555) 456-7812',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user_manager_1',
    name: 'Elena Rostova',
    email: 'elena.manager@imovies.com',
    role: 'manager',
    phone: '+1 (555) 890-1234',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'user_admin_1',
    name: 'Alex Wright (DevOps/Admin)',
    email: 'alex.admin@imovies.dev',
    role: 'admin',
    phone: '+1 (555) 999-0011',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export const MOCK_MOVIES: Movie[] = [
  {
    id: 'mov_1',
    title: 'Interstellar Horizons',
    tagline: 'Mankind was born on Earth. It was never meant to die here.',
    synopsis: 'A team of explorers travel through a newly discovered wormhole in deep space to transcend human scientific limits and ensure the survival of civilization across habitable exoplanets.',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'zSWdZVtXT7E',
    rating: 8.9,
    voteCount: 14200,
    ageRating: 'PG-13',
    durationMinutes: 169,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    releaseDate: '2026-10-15',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    formats: ['IMAX 3D', 'Dolby Atmos', 'Standard 2D'],
    status: 'now_showing',
    isFeatured: true,
  },
  {
    id: 'mov_2',
    title: 'Cyberpunk: Neon Nexus',
    tagline: 'In the shadows of Neo-Veridia, synthetic souls dare to dream.',
    synopsis: 'In a sprawling dystopian metropolis ruled by biomechanical conglomerates, a rogue bio-hacker unearths a conspiracy that threatens to overwrite the consciousness of millions.',
    posterUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'LembwKDo1Dc',
    rating: 8.5,
    voteCount: 8900,
    ageRating: 'R',
    durationMinutes: 142,
    genres: ['Cyberpunk', 'Action', 'Thriller'],
    releaseDate: '2026-10-20',
    director: 'Denis Villeneuve',
    cast: ['Ryan Gosling', 'Ana de Armas', 'Harrison Ford', 'Dave Bautista'],
    formats: ['IMAX 3D', '4DX', 'Dolby Atmos'],
    status: 'now_showing',
    isFeatured: true,
  },
  {
    id: 'mov_3',
    title: 'The Obsidian Enigma',
    tagline: 'Some secrets should remain buried in the frozen abyss.',
    synopsis: 'An archaeological expedition in the Antarctic permafrost uncovers an ancient subterranean pyramid that defies all known geological timelines—and awakens an entity that feeds on fear.',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'x_79i456mXg',
    rating: 8.1,
    voteCount: 6540,
    ageRating: 'R',
    durationMinutes: 128,
    genres: ['Mystery', 'Horror', 'Sci-Fi'],
    releaseDate: '2026-10-18',
    director: 'Guillermo del Toro',
    cast: ['Cillian Murphy', 'Florence Pugh', 'Willem Dafoe', 'Mads Mikkelsen'],
    formats: ['Dolby Atmos', 'Standard 2D'],
    status: 'now_showing',
  },
  {
    id: 'mov_4',
    title: 'Velocity: Tokyo Driftline',
    tagline: 'When the speed reaches 300 km/h, the highway becomes a battlefield.',
    synopsis: 'Underground electric drift racers clash with an international syndicate in a high-octane tournament through the neon-lit expressways and mountain passes of nocturnal Japan.',
    posterUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: '2LqzF5WauAw',
    rating: 7.9,
    voteCount: 5200,
    ageRating: 'PG-13',
    durationMinutes: 115,
    genres: ['Action', 'Thriller', 'Crime'],
    releaseDate: '2026-10-22',
    director: 'Justin Lin',
    cast: ['Sung Kang', 'Hiroyuki Sanada', 'Lucas Black', 'Rinko Kikuchi'],
    formats: ['4DX', 'IMAX 3D', 'Standard 2D'],
    status: 'now_showing',
  },
  {
    id: 'mov_5',
    title: 'The Whispering Forest',
    tagline: 'Nature speaks in frequencies only the pure of heart can comprehend.',
    synopsis: 'An orphaned botanist and an enchanted forest spirit embark on a magical odyssey across floating islands to restore the ancient harmony of the ancient elder world before it fades.',
    posterUrl: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'f0g7hR3a-4Q',
    rating: 9.1,
    voteCount: 11300,
    ageRating: 'PG',
    durationMinutes: 110,
    genres: ['Animation', 'Fantasy', 'Family'],
    releaseDate: '2026-10-10',
    director: 'Hayao Miyazaki',
    cast: ['Elle Fanning', 'Mark Rylance', 'Ken Watanabe', 'Awkwafina'],
    formats: ['Dolby Atmos', 'Standard 2D'],
    status: 'now_showing',
  },
  {
    id: 'mov_6',
    title: 'Apex Sovereign: Dawn of Empires',
    tagline: 'When kings fall, dragons rise to claim the celestial crown.',
    synopsis: 'The sweeping medieval fantasy epic detailing the rise of the House of Blackthorne, amidst royal intrigue, mythical siege engines, and legendary leviathans fighting for the iron throne.',
    posterUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4ea16e604?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: '1Roy8a6Z2jU',
    rating: 8.7,
    voteCount: 9780,
    ageRating: 'R',
    durationMinutes: 155,
    genres: ['Action', 'Fantasy', 'Drama'],
    releaseDate: '2026-11-05',
    director: 'Peter Jackson',
    cast: ['Viggo Mortensen', 'Cate Blanchett', 'Tom Hardy', 'Rebecca Ferguson'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    status: 'coming_soon',
  },
  {
    id: 'mov_7',
    title: 'Quantum Paradox',
    tagline: 'Time is not a straight line. It is an ocean.',
    synopsis: 'When a temporal particle accelerator ruptures in Geneva, multiple realities collide, forcing two versions of the same scientist to race against entropy to prevent universe collapse.',
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'v8y5fS2X46k',
    rating: 8.3,
    voteCount: 4120,
    ageRating: 'PG-13',
    durationMinutes: 134,
    genres: ['Sci-Fi', 'Mystery', 'Thriller'],
    releaseDate: '2026-11-12',
    director: 'Alex Garland',
    cast: ['Benedict Cumberbatch', 'Natalie Portman', 'Oscar Isaac', 'Domhnall Gleeson'],
    formats: ['IMAX 3D', 'Dolby Atmos'],
    status: 'coming_soon',
  },
  {
    id: 'mov_8',
    title: 'The Grand Illusionist',
    tagline: 'The hand is quicker than the eye. The mind is even easier to deceive.',
    synopsis: 'A master 1920s stage magician and mentalist enters a psychological duel with a relentless Scotland Yard inspector after performing impossible robberies in broad daylight.',
    posterUrl: 'https://images.unsplash.com/photo-1514306191717-452ec28c7814?auto=format&fit=crop&w=800&q=80',
    backdropUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    trailerYoutubeId: 'yqX7-pYwH6A',
    rating: 8.4,
    voteCount: 5600,
    ageRating: 'PG-13',
    durationMinutes: 124,
    genres: ['Drama', 'Mystery', 'History'],
    releaseDate: '2026-11-20',
    director: 'Martin Scorsese',
    cast: ['Leonardo DiCaprio', 'Robert De Niro', 'Emily Blunt', 'Jesse Plemons'],
    formats: ['Standard 2D', 'Dolby Atmos'],
    status: 'coming_soon',
  },
];

export const MOCK_THEATERS: Theater[] = [
  {
    id: 'th_grand_luxe',
    name: 'IMovies Grand Luxe Cinema',
    city: 'New York, NY',
    address: '450 Lexington Ave, Midtown Manhattan',
    distance: '0.8 miles away',
    screens: [
      {
        id: 'scr_imax_1',
        theaterId: 'th_grand_luxe',
        screenNumber: 1,
        name: 'IMAX Laser Auditorium 1',
        supportedFormats: ['IMAX 3D', 'Dolby Atmos'],
        totalSeats: 120,
        rows: 8,
        cols: 15,
      },
      {
        id: 'scr_dolby_2',
        theaterId: 'th_grand_luxe',
        screenNumber: 2,
        name: 'Dolby Cinema Hall 2',
        supportedFormats: ['Dolby Atmos', 'Standard 2D'],
        totalSeats: 96,
        rows: 8,
        cols: 12,
      },
    ],
  },
  {
    id: 'th_westside_luxe',
    name: 'IMovies Dolby Multiplex West',
    city: 'New York, NY',
    address: '120 W 42nd St, Times Square',
    distance: '1.4 miles away',
    screens: [
      {
        id: 'scr_4dx_3',
        theaterId: 'th_westside_luxe',
        screenNumber: 1,
        name: '4DX Motion Dynamic Hall',
        supportedFormats: ['4DX', 'Standard 2D'],
        totalSeats: 80,
        rows: 8,
        cols: 10,
      },
      {
        id: 'scr_vip_4',
        theaterId: 'th_westside_luxe',
        screenNumber: 2,
        name: 'VIP Recliner Suite 4',
        supportedFormats: ['Dolby Atmos', 'Standard 2D'],
        totalSeats: 60,
        rows: 6,
        cols: 10,
      },
    ],
  },
  {
    id: 'th_brooklyn_heights',
    name: 'IMovies Waterfront Palladium',
    city: 'Brooklyn, NY',
    address: '25 Old Fulton St, Brooklyn Bridge Park',
    distance: '3.2 miles away',
    screens: [
      {
        id: 'scr_pal_1',
        theaterId: 'th_brooklyn_heights',
        screenNumber: 1,
        name: 'Grand Horizon IMAX Screen',
        supportedFormats: ['IMAX 3D', 'Dolby Atmos'],
        totalSeats: 140,
        rows: 10,
        cols: 14,
      },
    ],
  },
];

// Generate Showtimes for Today and Next 3 days
const generateShowtimes = (): Showtime[] => {
  const showtimes: Showtime[] = [];
  const dates = ['2026-10-28', '2026-10-29', '2026-10-30', '2026-10-31'];
  const times = ['10:45 AM', '01:30 PM', '04:15 PM', '07:30 PM', '10:15 PM'];

  MOCK_MOVIES.filter(m => m.status === 'now_showing').forEach((movie) => {
    dates.forEach((date, dateIdx) => {
      // For Grand Luxe IMAX
      times.slice(dateIdx % 2, 4).forEach((time, tIdx) => {
        showtimes.push({
          id: `st_${movie.id}_luxe_${date}_${tIdx}`,
          movieId: movie.id,
          theaterId: 'th_grand_luxe',
          screenId: 'scr_imax_1',
          screenName: 'IMAX Laser Auditorium 1',
          date,
          time,
          format: 'IMAX 3D',
          basePrice: 20.50,
          availableSeatsCount: Math.floor(45 + Math.random() * 40),
          totalSeatsCount: 120,
        });
      });

      // For Dolby Multiplex West
      times.slice(1, 4).forEach((time, tIdx) => {
        showtimes.push({
          id: `st_${movie.id}_west_${date}_${tIdx}`,
          movieId: movie.id,
          theaterId: 'th_westside_luxe',
          screenId: 'scr_4dx_3',
          screenName: '4DX Motion Dynamic Hall',
          date,
          time,
          format: 'Dolby Atmos',
          basePrice: 17.50,
          availableSeatsCount: Math.floor(30 + Math.random() * 35),
          totalSeatsCount: 80,
        });
      });
    });
  });

  return showtimes;
};

export const MOCK_SHOWTIMES = generateShowtimes();

export const CONCESSION_ITEMS: ConcessionItem[] = [
  {
    id: 'snack_pop_butter',
    name: 'Artisan Warm Butter Popcorn (Large)',
    category: 'Popcorn',
    description: 'Freshly popped golden butterfly corn bathed in rich clarified European butter.',
    price: 8.50,
    calories: '680 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 'snack_pop_caramel',
    name: 'Sea Salt & Dark Caramel Popcorn',
    category: 'Popcorn',
    description: 'Crispy kettle glazed popcorn with French Maldon sea salt crystals and rich brown butter.',
    price: 9.25,
    calories: '750 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=400&q=80',
    popular: false,
  },
  {
    id: 'snack_combo_imax',
    name: 'IMAX Ultimate Duo Combo',
    category: 'Combos',
    description: '1 Jumbo Butter Popcorn + 2 Large Fountain Sodas + 1 Gourmet Candy box. Save 25%!',
    price: 19.99,
    calories: '1240 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 'snack_nachos_sup',
    name: 'Artisan Loaded Queso Nachos',
    category: 'Gourmet Snacks',
    description: 'Stone-ground crispy corn tortilla chips served with warm aged jalapeño cheddar and pico de gallo.',
    price: 10.50,
    calories: '820 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=400&q=80',
    popular: true,
  },
  {
    id: 'snack_hotdog_wagyu',
    name: 'Gourmet Bavarian Beef Sausage',
    category: 'Gourmet Snacks',
    description: 'Smoked frankfurter on a toasted brioche bun with dijon mustard and caramelized onions.',
    price: 9.75,
    calories: '540 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=400&q=80',
    popular: false,
  },
  {
    id: 'snack_drink_soda',
    name: 'Craft Fountain Soda (Refillable)',
    category: 'Beverages',
    description: 'Choice of Classic Cola, Wild Cherry Fizz, Blood Orange, or Ginger Ale in souvenir cup.',
    price: 5.95,
    calories: '210 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80',
    popular: false,
  },
  {
    id: 'snack_icee_blue',
    name: 'Glacier Blue Raspberry Icee',
    category: 'Beverages',
    description: 'Sub-zero frozen slushie with intense blue raspberry citrus burst.',
    price: 6.75,
    calories: '280 kcal',
    imageUrl: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
    popular: false,
  },
];

// Helper to generate seat grid for an auditorium
export const generateSeatGrid = (rowsCount = 8, colsCount = 14, occupiedIndices: string[] = []): Seat[] => {
  const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
  const seats: Seat[] = [];

  // Default predetermined occupied seats for realism if none provided
  const occupiedSet = new Set(
    occupiedIndices.length > 0
      ? occupiedIndices
      : ['D-6', 'D-7', 'D-8', 'E-7', 'E-8', 'F-5', 'F-6', 'C-10', 'C-11', 'G-12']
  );

  for (let r = 0; r < rowsCount; r++) {
    const rowChar = rowLetters[r];
    for (let c = 1; c <= colsCount; c++) {
      const seatKey = `${rowChar}-${c}`;

      let tier: Seat['tier'] = 'standard';
      let price = 16.00;

      // Wheelchair in first row edges
      if (rowChar === 'A' && (c === 1 || c === 2 || c === colsCount - 1 || c === colsCount)) {
        tier = 'wheelchair';
        price = 14.00;
      } else if (r >= rowsCount - 2) {
        // Back 2 rows are VIP Recliners
        tier = 'vip_recliner';
        price = 24.50;
      } else if (r >= 3 && r < rowsCount - 2 && c >= 4 && c <= colsCount - 3) {
        // Center prime viewing zone
        tier = 'premium';
        price = 19.50;
      }

      const isOccupied = occupiedSet.has(seatKey);

      seats.push({
        id: `seat_${rowChar}_${c}`,
        row: rowChar,
        number: c,
        tier,
        price,
        status: isOccupied ? 'occupied' : 'available',
      });
    }
  }

  return seats;
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'book_demo_101',
    referenceCode: 'IMV-8942-NY',
    userId: 'user_cust_1',
    customerName: 'Sarah Connor',
    customerEmail: 'sarah.c@cinema.com',
    customerPhone: '+1 (555) 234-8901',
    movieId: 'mov_1',
    movieTitle: 'Interstellar Horizons',
    moviePoster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    movieDuration: 169,
    movieAgeRating: 'PG-13',
    theaterId: 'th_grand_luxe',
    theaterName: 'IMovies Grand Luxe Cinema',
    screenName: 'IMAX Laser Auditorium 1',
    showtimeId: 'st_mov_1_luxe_2026-10-28_1',
    showtimeDate: '2026-10-28',
    showtimeTime: '07:30 PM',
    format: 'IMAX 3D',
    seats: [
      { id: 'seat_F_7', row: 'F', number: 7, tier: 'premium', price: 19.50 },
      { id: 'seat_F_8', row: 'F', number: 8, tier: 'premium', price: 19.50 },
    ],
    concessions: [
      { id: 'snack_combo_imax', name: 'IMAX Ultimate Duo Combo', quantity: 1, unitPrice: 19.99 },
    ],
    subtotal: 58.99,
    tax: 5.25,
    bookingFee: 2.50,
    discount: 0,
    totalPrice: 66.74,
    paymentMethod: 'apple_pay',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2026-10-27T19:20:00Z',
    qrCodeData: 'IMV-8942-NY|mov_1|F7,F8|2026-10-28T19:30',
  },
  {
    id: 'book_demo_102',
    referenceCode: 'IMV-7312-NY',
    userId: 'user_cust_1',
    customerName: 'Sarah Connor',
    customerEmail: 'sarah.c@cinema.com',
    customerPhone: '+1 (555) 234-8901',
    movieId: 'mov_2',
    movieTitle: 'Cyberpunk: Neon Nexus',
    moviePoster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    movieDuration: 142,
    movieAgeRating: 'R',
    theaterId: 'th_westside_luxe',
    theaterName: 'IMovies Dolby Multiplex West',
    screenName: '4DX Motion Dynamic Hall',
    showtimeId: 'st_mov_2_west_2026-10-29_2',
    showtimeDate: '2026-10-29',
    showtimeTime: '04:15 PM',
    format: '4DX',
    seats: [
      { id: 'seat_G_6', row: 'G', number: 6, tier: 'vip_recliner', price: 24.50 },
    ],
    concessions: [
      { id: 'snack_pop_butter', name: 'Artisan Warm Butter Popcorn (Large)', quantity: 1, unitPrice: 8.50 },
      { id: 'snack_drink_soda', name: 'Craft Fountain Soda (Refillable)', quantity: 1, unitPrice: 5.95 },
    ],
    subtotal: 38.95,
    tax: 3.45,
    bookingFee: 2.00,
    discount: 5.00,
    totalPrice: 39.40,
    paymentMethod: 'credit_card',
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2026-10-26T14:15:00Z',
    qrCodeData: 'IMV-7312-NY|mov_2|G6|2026-10-29T16:15',
  },
];

// -------------------------------------------------------------
// DOCUMENTATION DATASETS
// -------------------------------------------------------------

export const DOC_FEATURES: FeatureCategory[] = [
  {
    id: 'core_booking',
    title: '1. Core Cinema & Booking Engine',
    description: 'High-throughput movie discovery, multi-theater scheduling, and frictionless checkout workflow.',
    features: [
      {
        title: 'Movie Catalog & Rich Media Discovery',
        description: 'Browse now showing & upcoming releases with HD backdrops, ratings, runtime, genre tags, director, cast, and embedded official trailers.',
        endpoint: 'GET /api/movies?status=now_showing',
        method: 'GET',
        technology: 'Express.js, MongoDB Aggregation Pipelines, Cloudinary CDN',
        status: 'Production Ready',
      },
      {
        title: 'Multi-Theater & Showtime Filtering',
        description: 'Dynamic date picker and filtering by viewing format (IMAX 3D, Dolby Atmos, 4DX, Standard 2D) with real-time seat availability gauges.',
        endpoint: 'GET /api/theaters/:id/showtimes?date=YYYY-MM-DD',
        method: 'GET',
        technology: 'MongoDB compound indexes (movieId + theaterId + date)',
        status: 'Production Ready',
      },
      {
        title: 'Dynamic Seat Pricing & Tiers',
        description: 'Flexible tiered pricing structure: VIP Ultra Recliners ($24.50), Center Prime Acoustic ($19.50), Standard ($16.00), and ADA Wheelchair Accessible ($14.00).',
        endpoint: 'GET /api/screens/:screenId/seats',
        method: 'GET',
        technology: 'Mongoose schema validation, Dynamic rate calculation engine',
        status: 'Production Ready',
      },
      {
        title: 'Digital Concession & Combo Upsell',
        description: 'Frictionless snack bar ordering during checkout with quantity steppers, calorie indicators, and automated bundle discounts.',
        endpoint: 'POST /api/bookings/:id/concessions',
        method: 'POST',
        technology: 'Embedded documents in MongoDB order schema',
        status: 'Production Ready',
      },
    ],
  },
  {
    id: 'realtime_seat_lock',
    title: '2. Real-Time Seat Availability & Concurrency Lock',
    description: 'Eliminates race conditions and double-booking when hundreds of users access blockbusters simultaneously.',
    features: [
      {
        title: 'Distributed Temporary Seat Lock (5-Minute Hold)',
        description: 'Selected seats are instantly locked for 300 seconds across all active browser sessions while the customer completes checkout. Auto-releases if abandoned.',
        endpoint: 'POST /api/showtimes/:id/lock-seats',
        method: 'POST',
        technology: 'Redis TTL key expirations or atomic MongoDB findOneAndUpdate with lockExpiresAt timestamp',
        status: 'Real-Time',
      },
      {
        title: 'Instant WebSocket Seat Map Broadcast',
        description: 'Visual feedback when seats are taken by other users in real time, preventing disappointment at the final payment step.',
        endpoint: 'WS /ws/showtimes/:showtimeId/seats',
        method: 'WS',
        technology: 'WebSocket / Socket.io server broadcasting seat delta updates to connected room clients',
        status: 'Real-Time',
      },
      {
        title: 'Atomic Transactional Reservation',
        description: 'MongoDB multi-document transactions ensure that seat status transition from locked to occupied and payment confirmation occur atomically or roll back completely.',
        endpoint: 'POST /api/bookings/checkout',
        method: 'POST',
        technology: 'MongoDB Replica Set Sessions (client.startSession() -> withTransaction())',
        status: 'Operational',
      },
    ],
  },
  {
    id: 'identity_security',
    title: '3. Identity, Security & E-Ticket Issuance',
    description: 'Enterprise-grade authentication, role-based access control, cryptographic QR validation.',
    features: [
      {
        title: 'Secure JWT Authentication & Password Hashing',
        description: 'Stateless JSON Web Tokens with HTTP-only cookies, salted Argon2/Bcrypt password hashing, and refresh token rotation.',
        endpoint: 'POST /api/auth/login & /api/auth/register',
        method: 'POST',
        technology: 'bcryptjs, jsonwebtoken, CORS & Helmet security middleware',
        status: 'Production Ready',
      },
      {
        title: 'Cryptographic QR Code E-Ticket Generation',
        description: 'Instant generation of scannable QR codes containing signed booking payloads (Booking ID, Hall, Seat Numbers, HMAC SHA-256 signature) for usher scanning.',
        endpoint: 'GET /api/bookings/:id/ticket',
        method: 'GET',
        technology: 'qrcode canvas renderer, Web Crypto API HMAC signature verification',
        status: 'Operational',
      },
      {
        title: 'Self-Service Booking Management & Refunds',
        description: 'Customers can view active passes, download PDF tickets, add to Apple Wallet / Google Wallet, or cancel with automated refund logic before showtime.',
        endpoint: 'DELETE /api/bookings/:id/cancel',
        method: 'DELETE',
        technology: 'Stripe Refund API integration, Mongoose pre-remove hooks',
        status: 'Production Ready',
      },
    ],
  },
  {
    id: 'admin_operations',
    title: '4. Cinema Operations & Analytics Dashboard',
    description: 'Tools for theater managers and box office staff to oversee hall capacity and scheduling.',
    features: [
      {
        title: 'Real-Time Auditorium Occupancy Monitor',
        description: 'Visual overview of all active screening halls, showing live percentage occupancy, revenue generated, and VIP utilization.',
        endpoint: 'GET /api/admin/theaters/:id/occupancy',
        method: 'GET',
        technology: 'MongoDB Aggregation ($group, $sum, $facet), Recharts/Canvas',
        status: 'Operational',
      },
      {
        title: 'Box Office Cashier Quick-Reservation',
        description: 'High-speed counter booking interface for cashiers to issue walk-in paper tickets and override seating for accessibility needs.',
        endpoint: 'POST /api/cashier/quick-book',
        method: 'POST',
        technology: 'Role-based Cashier view, POS thermal ticket formatting',
        status: 'Operational',
      },
      {
        title: 'Showtime & Hall Layout Management',
        description: 'Create, reschedule, or cancel screenings, configure base ticket prices, and mark broken seats as out-of-order.',
        endpoint: 'POST /api/admin/showtimes',
        method: 'POST',
        technology: 'RESTful CRUD endpoints with manager role validation',
        status: 'Production Ready',
      },
    ],
  },
];

export const DOC_ROLES: RoleDetail[] = [
  {
    role: 'customer',
    title: 'Customer / Moviegoer',
    tagline: 'Standard registered user or walk-in digital customer seeking convenience.',
    icon: 'User',
    summary: 'Browses movie catalogs, selects showtimes and preferred seats on interactive visual seat maps, buys concessions, completes payments, and retrieves digital QR tickets.',
    responsibilities: [
      'Search and filter movies by title, genre, rating, and screening format.',
      'Check theater locations, showtimes, and seat availability.',
      'Select and lock seats on the interactive auditorium grid for up to 5 minutes.',
      'Customize concession add-on items and apply promotional vouchers.',
      'Safely checkout via credit card, Apple Pay, or Google Pay.',
      'Access booking history, download e-tickets, and manage cancellations.',
    ],
    permissions: [
      { module: 'Movie Catalog', canRead: true, canCreate: false, canUpdate: false, canDelete: false },
      { module: 'Showtimes & Seats', canRead: true, canCreate: false, canUpdate: false, canDelete: false },
      { module: 'Seat Temporary Hold', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'Bookings (Own)', canRead: true, canCreate: true, canUpdate: false, canDelete: true },
      { module: 'Snack Menu', canRead: true, canCreate: false, canUpdate: false, canDelete: false },
      { module: 'Admin Analytics', canRead: false, canCreate: false, canUpdate: false, canDelete: false },
    ],
  },
  {
    role: 'cashier',
    title: 'Box Office Cashier / Usher',
    tagline: 'On-site theater staff member operating counter POS and ticket check-in.',
    icon: 'Ticket',
    summary: 'Assists walk-in patrons at the box office window, performs rapid walk-in seat bookings with cash or card payments, and scans QR codes at auditorium entry doors.',
    responsibilities: [
      'Scan customer mobile QR codes or physical printed tickets to validate entry and check-in attendees.',
      'Process quick counter ticket reservations for guests without online accounts.',
      'Accept multiple payment forms including physical cash and cinema gift vouchers.',
      'Reprint lost ticket slips and provide directions to auditorium halls.',
      'Flag unauthorized ticket transfers or duplicate scans in real time.',
    ],
    permissions: [
      { module: 'Movie Catalog', canRead: true, canCreate: false, canUpdate: false, canDelete: false },
      { module: 'Showtimes & Seats', canRead: true, canCreate: false, canUpdate: false, canDelete: false },
      { module: 'Walk-In Booking', canRead: true, canCreate: true, canUpdate: true, canDelete: false },
      { module: 'Ticket QR Verification', canRead: true, canCreate: false, canUpdate: true, canDelete: false },
      { module: 'Concession Orders', canRead: true, canCreate: true, canUpdate: true, canDelete: false },
      { module: 'Admin Analytics', canRead: false, canCreate: false, canUpdate: false, canDelete: false },
    ],
  },
  {
    role: 'manager',
    title: 'Theater Operations Manager',
    tagline: 'Supervises single or regional theater operations, schedules, and revenue.',
    icon: 'Briefcase',
    summary: 'Configures movie showtimes, monitors real-time auditorium capacity and concession inventory, sets special holiday pricing, and resolves customer dispute escalations.',
    responsibilities: [
      'Create and schedule movie showtimes across IMAX, Dolby, and standard screens.',
      'Adjust base ticket prices according to peak hours, weekends, or special premieres.',
      'Monitor live hall occupancy rates and daily box office revenue analytics.',
      'Disable broken or damaged cinema seats in the layout configuration.',
      'Approve refund exceptions for technical hall disruptions or projector faults.',
    ],
    permissions: [
      { module: 'Movie Catalog', canRead: true, canCreate: true, canUpdate: true, canDelete: false },
      { module: 'Showtime Scheduling', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'Seat Layout Overrides', canRead: true, canCreate: false, canUpdate: true, canDelete: false },
      { module: 'All Bookings', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'Theater Occupancy Reports', canRead: true, canCreate: true, canUpdate: false, canDelete: false },
      { module: 'System Configurations', canRead: false, canCreate: false, canUpdate: false, canDelete: false },
    ],
  },
  {
    role: 'admin',
    title: 'System Administrator / Tech Lead',
    tagline: 'Oversees the entire platform infrastructure, database, and integrations.',
    icon: 'ShieldCheck',
    summary: 'Maintains system reliability, manages MongoDB cluster schemas and indexes, monitors Redis seat lock pipelines, manages employee accounts, and ensures data compliance.',
    responsibilities: [
      'Manage global application configurations, API keys, and payment gateway webhooks.',
      'Maintain database integrity, indexing strategies, and automated backups.',
      'Provision and revoke employee accounts (Cashiers, Managers) with granular RBAC.',
      'Monitor server health, API latency, error logs, and peak load concurrency.',
      'Enforce GDPR / CCPA data privacy compliance and security audit logging.',
    ],
    permissions: [
      { module: 'All Platform Modules', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'Database & Schemas', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'User & Role Management', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
      { module: 'Audit Logs & Metrics', canRead: true, canCreate: true, canUpdate: true, canDelete: true },
    ],
  },
];

export const DOC_ER_ENTITIES: EREntity[] = [
  {
    id: 'user',
    name: 'User',
    collection: 'users',
    description: 'Stores account credentials, profile details, and role-based permissions.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Unique user identifier' },
      { name: 'name', type: 'String', description: 'Full customer / staff name' },
      { name: 'email', type: 'String (Unique, Indexed)', description: 'Login credential email address' },
      { name: 'passwordHash', type: 'String', description: 'Salted bcrypt password hash' },
      { name: 'role', type: 'Enum ("customer"|"cashier"|"manager"|"admin")', description: 'Access control role' },
      { name: 'phone', type: 'String', description: 'Contact number for SMS notifications' },
      { name: 'createdAt', type: 'Date', description: 'Account creation timestamp' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210001',
      name: 'Sarah Connor',
      email: 'sarah.c@cinema.com',
      role: 'customer',
      phone: '+15552348901',
      createdAt: '2026-10-01T12:00:00Z',
    },
  },
  {
    id: 'movie',
    name: 'Movie',
    collection: 'movies',
    description: 'Catalog of films currently screening or scheduled for future release.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Unique movie identifier' },
      { name: 'title', type: 'String (Indexed)', description: 'Film title' },
      { name: 'synopsis', type: 'String', description: 'Full plot overview' },
      { name: 'durationMinutes', type: 'Number', description: 'Total runtime in minutes' },
      { name: 'ageRating', type: 'String ("PG"|"PG-13"|"R")', description: 'Content rating certificate' },
      { name: 'genres', type: 'Array[String]', description: 'List of genres (Sci-Fi, Action, etc.)' },
      { name: 'posterUrl', type: 'String', description: 'CDN URL for high-res portrait poster' },
      { name: 'backdropUrl', type: 'String', description: 'CDN URL for wide landscape backdrop' },
      { name: 'trailerYoutubeId', type: 'String', description: 'YouTube video ID for official preview' },
      { name: 'status', type: 'Enum ("now_showing"|"coming_soon")', description: 'Release status' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210002',
      title: 'Interstellar Horizons',
      durationMinutes: 169,
      ageRating: 'PG-13',
      genres: ['Sci-Fi', 'Adventure'],
      status: 'now_showing',
    },
  },
  {
    id: 'theater',
    name: 'Theater',
    collection: 'theaters',
    description: 'Physical cinema multiplex locations and address metadata.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Unique theater ID' },
      { name: 'name', type: 'String', description: 'Multiplex commercial name' },
      { name: 'city', type: 'String (Indexed)', description: 'City location' },
      { name: 'address', type: 'String', description: 'Street address' },
      { name: 'location', type: 'GeoJSON Point', description: 'Latitude and Longitude coordinates' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210003',
      name: 'IMovies Grand Luxe Cinema',
      city: 'New York, NY',
      address: '450 Lexington Ave',
    },
  },
  {
    id: 'screen',
    name: 'Screen / Hall',
    collection: 'screens',
    description: 'Individual auditorium inside a multiplex with seat geometry specifications.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Auditorium ID' },
      { name: 'theaterId', type: 'ObjectId', isForeign: true, references: 'Theater._id', description: 'Parent theater reference' },
      { name: 'name', type: 'String', description: 'Hall name (e.g. IMAX Laser Auditorium 1)' },
      { name: 'screenNumber', type: 'Number', description: 'Hall display number' },
      { name: 'totalSeats', type: 'Number', description: 'Max seating capacity' },
      { name: 'rows', type: 'Number', description: 'Row count (A to H)' },
      { name: 'cols', type: 'Number', description: 'Seats per row' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210004',
      theaterId: '65f8a123b098c76543210003',
      name: 'IMAX Laser Auditorium 1',
      totalSeats: 120,
      rows: 8,
      cols: 15,
    },
  },
  {
    id: 'showtime',
    name: 'Showtime',
    collection: 'showtimes',
    description: 'Scheduled screening of a specific movie in an auditorium at a specific date & time.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Showtime ID' },
      { name: 'movieId', type: 'ObjectId', isForeign: true, references: 'Movie._id', description: 'Screened movie' },
      { name: 'theaterId', type: 'ObjectId', isForeign: true, references: 'Theater._id', description: 'Screening theater' },
      { name: 'screenId', type: 'ObjectId', isForeign: true, references: 'Screen._id', description: 'Target hall' },
      { name: 'startTime', type: 'Date (Indexed)', description: 'Screening start timestamp' },
      { name: 'format', type: 'Enum ("IMAX 3D"|"Dolby Atmos"|"4DX"|"Standard 2D")', description: 'Projection format' },
      { name: 'basePrice', type: 'Number', description: 'Standard base ticket price' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210005',
      movieId: '65f8a123b098c76543210002',
      screenId: '65f8a123b098c76543210004',
      startTime: '2026-10-28T19:30:00Z',
      format: 'IMAX 3D',
      basePrice: 20.50,
    },
  },
  {
    id: 'seat_lock',
    name: 'SeatLock / Seat',
    collection: 'seat_locks',
    description: 'Real-time state tracking seat reservations and temporary 5-minute checkout holds.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Seat state record' },
      { name: 'showtimeId', type: 'ObjectId', isForeign: true, references: 'Showtime._id', description: 'Screening reference' },
      { name: 'row', type: 'String', description: 'Row identifier (e.g., "F")' },
      { name: 'number', type: 'Number', description: 'Seat number (e.g., 7)' },
      { name: 'tier', type: 'Enum ("standard"|"premium"|"vip_recliner"|"wheelchair")', description: 'Seat quality tier' },
      { name: 'status', type: 'Enum ("available"|"locked"|"occupied")', description: 'Real-time status' },
      { name: 'lockedByUserId', type: 'ObjectId', isForeign: true, references: 'User._id', description: 'User holding seat lock' },
      { name: 'expiresAt', type: 'Date (TTL Index)', description: 'Automatic expiration timestamp for Redis/Mongo TTL' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210006',
      showtimeId: '65f8a123b098c76543210005',
      row: 'F',
      number: 7,
      tier: 'premium',
      status: 'occupied',
    },
  },
  {
    id: 'booking',
    name: 'Booking',
    collection: 'bookings',
    description: 'Header record representing the completed transaction, customer details, and total price.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Primary booking identifier' },
      { name: 'referenceCode', type: 'String (Unique, Indexed)', description: 'Human-readable ticket ref (e.g. IMV-8942-NY)' },
      { name: 'userId', type: 'ObjectId', isForeign: true, references: 'User._id', description: 'Purchasing user' },
      { name: 'showtimeId', type: 'ObjectId', isForeign: true, references: 'Showtime._id', description: 'Screening showtime' },
      { name: 'seats', type: 'Array[SubDocument]', description: 'List of reserved row/number/tier/price objects' },
      { name: 'concessions', type: 'Array[SubDocument]', description: 'Snack items, quantities, and prices' },
      { name: 'totalAmount', type: 'Number', description: 'Final calculated charged amount' },
      { name: 'bookingStatus', type: 'Enum ("confirmed"|"cancelled"|"attended")', description: 'Ticket lifecycle status' },
      { name: 'qrCodeSignature', type: 'String', description: 'HMAC-SHA256 signature for verification' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210007',
      referenceCode: 'IMV-8942-NY',
      userId: '65f8a123b098c76543210001',
      totalAmount: 66.74,
      bookingStatus: 'confirmed',
    },
  },
  {
    id: 'payment',
    name: 'Payment',
    collection: 'payments',
    description: 'Audit log of financial transactions, gateway reference IDs, and payment status.',
    attributes: [
      { name: '_id', type: 'ObjectId', isPrimary: true, description: 'Payment record ID' },
      { name: 'bookingId', type: 'ObjectId', isForeign: true, references: 'Booking._id', description: 'Associated booking' },
      { name: 'method', type: 'Enum ("credit_card"|"apple_pay"|"google_pay"|"cash")', description: 'Payment channel' },
      { name: 'amount', type: 'Number', description: 'Total currency processed' },
      { name: 'gatewayTransactionId', type: 'String', description: 'Stripe or payment gateway charge ID' },
      { name: 'status', type: 'Enum ("succeeded"|"failed"|"refunded")', description: 'Payment state' },
      { name: 'paidAt', type: 'Date', description: 'Transaction timestamp' },
    ],
    sampleDoc: {
      _id: '65f8a123b098c76543210008',
      bookingId: '65f8a123b098c76543210007',
      method: 'apple_pay',
      amount: 66.74,
      status: 'succeeded',
    },
  },
];

export const DOC_ER_RELATIONSHIPS: ERRelationship[] = [
  { from: 'Theater', to: 'Screen', type: '1:N', description: 'One theater contains multiple auditoriums/screens' },
  { from: 'Screen', to: 'Showtime', type: '1:N', description: 'One screen hosts multiple scheduled showtimes over time' },
  { from: 'Movie', to: 'Showtime', type: '1:N', description: 'One movie is featured in many showtimes across cinemas' },
  { from: 'Showtime', to: 'SeatLock / Seat', type: '1:N', description: 'Each showtime has its own seat status map and locks' },
  { from: 'User', to: 'Booking', type: '1:N', description: 'A user creates multiple ticket bookings' },
  { from: 'Showtime', to: 'Booking', type: '1:N', description: 'A showtime aggregates many customer bookings' },
  { from: 'Booking', to: 'Payment', type: '1:1', description: 'Each booking links to a payment settlement record' },
  { from: 'User', to: 'SeatLock / Seat', type: '1:N', description: 'A user temporarily holds active seat locks' },
];

export const DOC_ARCHITECTURE: ArchitectureLayer[] = [
  {
    id: 'client_layer',
    name: '1. Client Presentation Layer (Frontend)',
    color: 'emerald',
    components: [
      {
        name: 'React 19 SPA + TypeScript',
        description: 'Component-driven user interface delivering sub-100ms transitions and typed models.',
        tech: 'React 19, TypeScript, Lucide Icons',
        icon: 'Monitor',
        details: [
          'Modular component architecture with custom hooks (useBookingFlow, useSeatLock).',
          'Responsive grid layout optimized for mobile screens, tablets, and desktop displays.',
          'Real-time seat state rendering with interactive SVG auditorium visualization.',
        ],
      },
      {
        name: 'Tailwind CSS Modern Design System',
        description: 'Dark cinema aesthetic with deep charcoal canvas, crisp typography, and electric amber highlights.',
        tech: 'Tailwind CSS, PostCSS',
        icon: 'Palette',
        details: [
          'Strict zero-pill design rules with crisp border radii and high-contrast visual hierarchy.',
          'Fluid animations for seat selection, modal sheets, and e-ticket reveals.',
        ],
      },
      {
        name: 'WebSocket & State Management',
        description: 'Bi-directional socket client synchronizing seat locks across all viewing patrons.',
        tech: 'WebSocket Client / EventSource, React State & Context',
        icon: 'Radio',
        details: [
          'Instant notification when another user reserves or locks an adjacent seat.',
          'Client-side 300s countdown timer synchronized with backend server expiration.',
        ],
      },
    ],
  },
  {
    id: 'api_layer',
    name: '2. Express.js API Gateway & Security Middleware',
    color: 'blue',
    components: [
      {
        name: 'RESTful API Routing Engine',
        description: 'High-throughput Express router handling movie queries, showtime lookup, and checkout.',
        tech: 'Express.js 4.x, Express Router',
        icon: 'Server',
        details: [
          'Strict route modularization: /api/movies, /api/theaters, /api/bookings, /api/auth.',
          'Input validation using Zod / Joi schema validation preventing injection attacks.',
        ],
      },
      {
        name: 'JWT Authentication & RBAC Guard',
        description: 'Validates tokens and enforces role-based access for Customers, Cashiers, and Managers.',
        tech: 'jsonwebtoken, bcryptjs, Passport.js',
        icon: 'Shield',
        details: [
          'Stateless token verification with role checks (requireRole("manager")).',
          'Rate limiting middleware protecting against brute-force attacks and ticket bot scraping.',
        ],
      },
      {
        name: 'WebSocket Seat Room Manager',
        description: 'Pub/Sub room dispatcher grouping active users by screening hall ID.',
        tech: 'ws / Socket.io server engine',
        icon: 'Zap',
        details: [
          'Clients join room: "showtime:scr_imax_1:2026-10-28_19:30".',
          'Emits seat:locked, seat:released, and seat:booked events in sub-20ms.',
        ],
      },
    ],
  },
  {
    id: 'controller_layer',
    name: '3. Business Logic & Concurrency Control Layer',
    color: 'purple',
    components: [
      {
        name: 'Seat Concurrency & Lock Controller',
        description: 'Prevents double-booking via atomic distributed locks with 5-minute auto-release.',
        tech: 'Atomic Redis SETNX / MongoDB findOneAndUpdate with lock expiration',
        icon: 'Lock',
        details: [
          'When user taps a seat, backend checks lock state and acquires lease atomically.',
          'Background worker or Redis TTL cleans expired reservations automatically.',
        ],
      },
      {
        name: 'Booking & Transaction Orchestrator',
        description: 'Executes atomic checkout: payment confirmation, seat persistence, and QR creation.',
        tech: 'Mongoose Transactions, Client Session',
        icon: 'Cpu',
        details: [
          'Starts MongoDB multi-document transaction to guarantee all-or-nothing execution.',
          'Calculates dynamic fees, sales taxes, and concession combo discounts.',
        ],
      },
      {
        name: 'E-Ticket & QR Signing Service',
        description: 'Generates scannable pass with tamper-evident HMAC cryptographic signatures.',
        tech: 'Crypto, QR Code Generator',
        icon: 'QrCode',
        details: [
          'Signs booking reference with theater secret key to prevent forged passes.',
          'Generates high-contrast QR matrix for rapid gate laser or phone camera scanning.',
        ],
      },
    ],
  },
  {
    id: 'data_layer',
    name: '4. Persistence & Database Layer (MongoDB & Cache)',
    color: 'amber',
    components: [
      {
        name: 'MongoDB NoSQL Document Store',
        description: 'Flexible, high-performance database storing movies, showtimes, users, and bookings.',
        tech: 'MongoDB Atlas, Mongoose ODM',
        icon: 'Database',
        details: [
          'Compound indexes on { movieId: 1, startTime: 1 } and { referenceCode: 1 } for sub-5ms queries.',
          'Embedded documents for booking seats and concessions to eliminate expensive joins.',
        ],
      },
      {
        name: 'In-Memory Cache (Redis)',
        description: 'High-speed cache for catalog showtimes and fast distributed seat lock timers.',
        tech: 'Redis v7, Key Expiration Engine',
        icon: 'Layers',
        details: [
          'Caches active movie listings with 10-minute invalidation on admin updates.',
          'Stores ephemeral seat lock states with key pattern: lock:{showtimeId}:{seatId}.',
        ],
      },
      {
        name: 'Payment & Notification Gateways',
        description: 'Third-party integrations for card processing and transactional receipts.',
        tech: 'Stripe API / Apple Pay, SendGrid / Twilio SMS',
        icon: 'CreditCard',
        details: [
          'Webhook listener for asynchronous payment settlement confirmations.',
          'Automated email and SMS dispatch with direct mobile passbook links.',
        ],
      },
    ],
  },
];

export const DOC_USER_FLOW: UserFlowStep[] = [
  {
    stepNumber: 1,
    phase: 'Discovery',
    title: 'Browse Movies & Watch Trailers',
    actor: 'Customer / Guest',
    description: 'The user accesses IMovies landing page, filters by "Now Showing" or "Coming Soon", searches for titles, checks Rotten Tomatoes/IMDb ratings, and watches trailer popups.',
    inputs: ['Search keyword', 'Genre filter ("Sci-Fi")', 'Format preference ("IMAX")'],
    systemAction: 'Queries MongoDB movies collection with filter criteria; renders optimized responsive card grid.',
    edgeCases: ['No movies found for search query -> Displays suggestions and trending alternative titles.'],
  },
  {
    stepNumber: 2,
    phase: 'Scheduling',
    title: 'Select Theater, Date & Showtime',
    actor: 'Customer',
    description: 'User picks their preferred local theater, selects viewing date from the calendar ribbon, and chooses an available screening format and time slot.',
    inputs: ['Selected theater ID', 'Date: 2026-10-28', 'Showtime: 07:30 PM (IMAX 3D)'],
    systemAction: 'Fetches showtimes with calculated available seat counts; validates that the showtime start time is in the future.',
    edgeCases: ['Showtime is sold out -> Time slot disabled with "Sold Out" badge and alternative halls suggested.'],
  },
  {
    stepNumber: 3,
    phase: 'Seat Reservation',
    title: 'Interactive Seat Selection & Concurrency Lock',
    actor: 'Customer',
    description: 'User enters the visual auditorium layout. As they click seats (VIP Recliner, Premium Center, Standard), the seats turn green (Selected) and the backend locks them for 5 minutes.',
    inputs: ['Seat IDs: F7, F8', 'User session ID'],
    systemAction: 'Sends lock request to API. Server verifies seats are not already occupied or locked by another user; initiates 300s TTL hold.',
    edgeCases: [
      'Seat already taken by another user in the same second -> API returns 409 Conflict; UI flashes alert and refreshes seat map.',
      'User exceeds maximum tickets per order (8 seats) -> Alert notifies user of booking limit.',
    ],
    codeHighlight: 'POST /api/showtimes/:id/lock-seats -> { seatIds: ["F7", "F8"] }',
  },
  {
    stepNumber: 4,
    phase: 'Add-ons',
    title: 'Concession & Combo Customization',
    actor: 'Customer',
    description: 'Optional upsell step where the customer adds warm butter popcorn, fountain sodas, loaded nachos, or combo deals with instant bundle discounts.',
    inputs: ['Popcorn (Large) x1', 'Soda (Large) x2'],
    systemAction: 'Recalculates order subtotal, applies combo discount savings, and updates order breakdown.',
    edgeCases: ['User skips snacks -> Proceeds directly to checkout with zero concession surcharge.'],
  },
  {
    stepNumber: 5,
    phase: 'Checkout',
    title: 'Review Summary, Auth & Payment Settlement',
    actor: 'Customer',
    description: 'Customer reviews ticket breakdown (base ticket + taxes + booking fee), signs in or enters guest details, inputs promo code (e.g. "IMOVIES50"), and selects payment method.',
    inputs: ['Customer name & email', 'Promo Code "IMOVIES50"', 'Payment token (Apple Pay / Credit Card)'],
    systemAction: 'Validates payment gateway token; opens MongoDB transaction to permanently convert seat status from "locked" to "occupied".',
    edgeCases: [
      'Payment declined by bank -> Seats remain temporarily locked for remaining duration of timer allowing retry.',
      'Session timer expires before payment -> Seats unlocked automatically; user prompted to reselect.',
    ],
  },
  {
    stepNumber: 6,
    phase: 'Fulfillment',
    title: 'E-Ticket & QR Verification Issuance',
    actor: 'Customer & Cinema Staff',
    description: 'System displays instant stylized perforated cinema boarding pass with scannable QR code, booking reference code, hall number, and download/print options.',
    inputs: ['Booking ID'],
    systemAction: 'Generates HMAC-signed QR payload; sends transactional confirmation email with passbook download.',
    edgeCases: ['User navigates away -> Ticket is permanently accessible in "My Bookings" tab via email/phone lookup.'],
  },
];

export const DOC_MVC_LAYERS: MVCLayer[] = [
  {
    title: 'Model',
    icon: 'Database',
    color: 'emerald',
    description: 'Defines MongoDB data schemas, field types, validation rules, virtuals, and Mongoose pre/post hooks.',
    role: 'Represents the enterprise domain entities (Movie, Showtime, Booking, User) and handles all direct database interactions without business logic bleed.',
    files: [
      {
        name: 'Movie.model.js',
        path: 'server/models/Movie.js',
        purpose: 'Schema for film metadata, ratings, duration, genres, and media assets.',
        snippet: `const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, index: true },
  tagline: { type: String },
  synopsis: { type: String, required: true },
  posterUrl: { type: String, required: true },
  backdropUrl: { type: String },
  trailerYoutubeId: { type: String },
  rating: { type: Number, default: 0, min: 0, max: 10 },
  durationMinutes: { type: Number, required: true },
  genres: [{ type: String, index: true }],
  ageRating: { type: String, enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'] },
  formats: [{ type: String, enum: ['IMAX 3D', 'Dolby Atmos', '4DX', 'Standard 2D'] }],
  status: { type: String, enum: ['now_showing', 'coming_soon'], default: 'now_showing' }
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);`,
      },
      {
        name: 'Booking.model.js',
        path: 'server/models/Booking.js',
        purpose: 'Schema for completed reservations, seat lists, concessions, and QR verification codes.',
        snippet: `const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  referenceCode: { type: String, required: true, unique: true, uppercase: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  showtime: { type: mongoose.Schema.Types.ObjectId, ref: 'Showtime', required: true },
  seats: [{
    row: { type: String, required: true },
    number: { type: Number, required: true },
    tier: { type: String, enum: ['standard', 'premium', 'vip_recliner', 'wheelchair'] },
    price: { type: Number, required: true }
  }],
  concessions: [{
    itemId: { type: String },
    name: { type: String },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number }
  }],
  subtotal: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['paid', 'pending', 'refunded'], default: 'paid' },
  bookingStatus: { type: String, enum: ['confirmed', 'cancelled', 'attended'], default: 'confirmed' },
  qrCodeSignature: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);`,
      },
    ],
  },
  {
    title: 'View',
    icon: 'Monitor',
    color: 'blue',
    description: 'Client-side presentation layer built with React, styled with Tailwind CSS, and rendered in the user browser.',
    role: 'Presents dynamic cinema data received from the backend controllers, captures user gestures (seat clicks, filter toggles), and displays instant visual feedback.',
    files: [
      {
        name: 'SeatMap.tsx',
        path: 'src/components/cinema/SeatMap.tsx',
        purpose: 'Interactive visual SVG layout rendering rows, seat tiers, availability colors, and live 5-minute countdown timer.',
        snippet: `export const SeatMap = ({ seats, selectedSeats, onToggleSeat, lockTimerSeconds }) => {
  return (
    <div className="flex flex-col items-center p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
      {/* Cinema Screen Curve */}
      <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] mb-12 text-center">
        <span className="text-xs uppercase tracking-widest text-neutral-400">All Eyes On Screen</span>
      </div>

      {/* Grid of Seats */}
      <div className="space-y-3">
        {renderSeatRows(seats, selectedSeats, onToggleSeat)}
      </div>

      {/* Real-time hold timer */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 flex items-center gap-2 text-amber-400 text-sm font-medium">
          <Clock className="w-4 h-4 animate-spin" />
          Seats held for {Math.floor(lockTimerSeconds / 60)}:{(lockTimerSeconds % 60).toString().padStart(2, '0')}
        </div>
      )}
    </div>
  );
};`,
      },
      {
        name: 'TicketPassModal.tsx',
        path: 'src/components/cinema/TicketPassModal.tsx',
        purpose: 'Realistic perforated e-ticket with live QR code, barcode, tear-off stub, and wallet buttons.',
        snippet: `export const TicketPassModal = ({ booking, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-6 bg-gradient-to-br from-amber-500/10 to-red-500/10 border-b border-neutral-800">
          <h3 className="text-xl font-bold text-white">{booking.movieTitle}</h3>
          <p className="text-sm text-neutral-400">{booking.theaterName} • {booking.screenName}</p>
        </div>
        <div className="p-6 flex flex-col items-center">
          <QRCodeCanvas value={booking.qrCodeData} size={180} />
          <span className="font-mono text-amber-400 mt-3 font-bold">{booking.referenceCode}</span>
        </div>
      </div>
    </div>
  );
};`,
      },
    ],
  },
  {
    title: 'Controller',
    icon: 'Cpu',
    color: 'purple',
    description: 'Express.js route controllers coordinating requests, enforcing business rules, and communicating with Models.',
    role: 'Receives HTTP / WebSocket events, verifies authentication and input integrity, executes concurrency locks, calls payment APIs, and outputs formatted JSON responses.',
    files: [
      {
        name: 'bookingController.js',
        path: 'server/controllers/bookingController.js',
        purpose: 'Handles seat locking, transaction checkout, payment verification, and ticket issuance.',
        snippet: `const Booking = require('../models/Booking');
const Showtime = require('../models/Showtime');
const { generateQRSig } = require('../services/cryptoService');

exports.createBooking = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { showtimeId, seats, concessions, paymentToken } = req.body;
    const userId = req.user.id;

    // Verify seats are still held by this user and not expired
    const showtime = await Showtime.findById(showtimeId).session(session);
    const areSeatsValid = await checkSeatLockValidity(showtimeId, seats, userId);
    if (!areSeatsValid) {
      await session.abortTransaction();
      return res.status(409).json({ error: 'Seat lock expired or taken by another user' });
    }

    // Process payment through gateway
    const payment = await processPayment(paymentToken, calculateTotal(seats, concessions));

    // Create Booking Document
    const referenceCode = generateRefCode();
    const qrSignature = generateQRSig(referenceCode, userId, seats);

    const booking = new Booking({
      referenceCode,
      user: userId,
      showtime: showtimeId,
      seats,
      concessions,
      totalPrice: payment.amount,
      qrCodeSignature: qrSignature
    });

    await booking.save({ session });
    await markSeatsOccupied(showtimeId, seats, session);

    await session.commitTransaction();
    res.status(201).json({ success: true, booking });
  } catch (err) {
    await session.abortTransaction();
    res.status(500).json({ error: err.message });
  } finally {
    session.endSession();
  }
};`,
      },
      {
        name: 'seatLockController.js',
        path: 'server/controllers/seatLockController.js',
        purpose: 'Atomic 5-minute seat locking to prevent double-booking race conditions.',
        snippet: `const redis = require('../config/redis');

exports.lockSeats = async (req, res) => {
  const { showtimeId } = req.params;
  const { seatIds } = req.body;
  const userId = req.user.id;
  const LOCK_DURATION = 300; // 5 minutes

  // Acquire locks atomically
  const pipeline = redis.pipeline();
  seatIds.forEach(seatId => {
    pipeline.set(\`lock:\${showtimeId}:\${seatId}\`, userId, 'NX', 'EX', LOCK_DURATION);
  });
  const results = await pipeline.exec();

  const allAcquired = results.every(([err, status]) => status === 'OK');
  if (!allAcquired) {
    // Release any partial locks acquired
    seatIds.forEach(seatId => redis.del(\`lock:\${showtimeId}:\${seatId}\`));
    return res.status(409).json({ error: 'One or more seats are already locked or booked' });
  }

  // Broadcast lock event to other users in hall via WebSocket
  req.io.to(\`showtime:\${showtimeId}\`).emit('seats:locked', { seatIds, lockedBy: userId });
  res.json({ success: true, expiresAt: Date.now() + LOCK_DURATION * 1000 });
};`,
      },
    ],
  },
];

export const DEMO_CHAPTERS = [
  {
    id: 'ch_browse',
    time: '00:00',
    title: '1. Movie Catalog & Formats',
    description: 'Customer browses rich movie listings, filters by IMAX / Dolby Atmos / 4DX, checks ratings, and previews the video trailer.',
    actionLabel: 'Browse Movies',
  },
  {
    id: 'ch_showtime',
    time: '00:45',
    title: '2. Theater & Showtime Selection',
    description: 'Customer picks IMovies Grand Luxe Cinema, selects today’s 07:30 PM IMAX 3D screening with live availability gauges.',
    actionLabel: 'Select Showtime',
  },
  {
    id: 'ch_seats',
    time: '01:30',
    title: '3. Real-Time Seat Reservation & Lock',
    description: 'Visual curved auditorium screen, choosing VIP Recliners (Row G) and Premium acoustic center seats with 5-minute atomic lock.',
    actionLabel: 'Pick Seats',
  },
  {
    id: 'ch_snacks',
    time: '02:15',
    title: '4. Concession Upsell & Combos',
    description: 'Adding Artisan Warm Butter Popcorn and Large Craft Fountain Sodas with automatic combo package savings.',
    actionLabel: 'Add Snacks',
  },
  {
    id: 'ch_checkout',
    time: '03:00',
    title: '5. Fast Checkout & Promo Discount',
    description: 'Entering promo code "IMOVIES50" for 50% discount, selecting Apple Pay, and executing atomic transaction.',
    actionLabel: 'Complete Checkout',
  },
  {
    id: 'ch_ticket',
    time: '03:45',
    title: '6. E-Ticket & QR Verification',
    description: 'Instant perforated cinema pass with live scannable QR code, booking ID "IMV-8942-NY", and Apple/Google wallet support.',
    actionLabel: 'View Ticket',
  },
  {
    id: 'ch_admin',
    time: '04:30',
    title: '7. Admin Dashboard & Occupancy Metrics',
    description: 'Theater manager checks real-time hall occupancy percentage, gross box office revenue, and seat status overrides.',
    actionLabel: 'Admin Metrics',
  },
];
