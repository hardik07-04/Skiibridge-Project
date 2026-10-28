/**
 * IMovies System & Cinema Booking Types
 */

export type UserRole = 'customer' | 'cashier' | 'manager' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar: string;
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  posterUrl: string;
  backdropUrl: string;
  trailerYoutubeId: string;
  rating: number; // e.g. 8.8
  voteCount: number;
  ageRating: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  durationMinutes: number;
  genres: string[];
  releaseDate: string;
  director: string;
  cast: string[];
  formats: ('IMAX 3D' | 'Dolby Atmos' | '4DX' | 'Standard 2D')[];
  status: 'now_showing' | 'coming_soon';
  isFeatured?: boolean;
}

export interface Theater {
  id: string;
  name: string;
  city: string;
  address: string;
  distance: string;
  screens: Screen[];
}

export interface Screen {
  id: string;
  theaterId: string;
  screenNumber: number;
  name: string;
  supportedFormats: ('IMAX 3D' | 'Dolby Atmos' | '4DX' | 'Standard 2D')[];
  totalSeats: number;
  rows: number;
  cols: number;
}

export type SeatTier = 'standard' | 'premium' | 'vip_recliner' | 'wheelchair';
export type SeatStatus = 'available' | 'selected' | 'locked' | 'occupied' | 'disabled';

export interface Seat {
  id: string;
  row: string; // 'A', 'B', etc.
  number: number; // 1, 2, 3...
  tier: SeatTier;
  price: number;
  status: SeatStatus;
  lockedBy?: string;
  lockExpiresAt?: number;
}

export interface Showtime {
  id: string;
  movieId: string;
  theaterId: string;
  screenId: string;
  screenName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "14:30"
  format: 'IMAX 3D' | 'Dolby Atmos' | '4DX' | 'Standard 2D';
  basePrice: number;
  availableSeatsCount: number;
  totalSeatsCount: number;
}

export interface ConcessionItem {
  id: string;
  name: string;
  category: 'Popcorn' | 'Combos' | 'Beverages' | 'Gourmet Snacks';
  description: string;
  price: number;
  calories?: string;
  imageUrl: string;
  popular?: boolean;
}

export interface SelectedConcession {
  item: ConcessionItem;
  quantity: number;
}

export interface Booking {
  id: string;
  referenceCode: string; // e.g. "IMV-8924-NY"
  userId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  movieId: string;
  movieTitle: string;
  moviePoster: string;
  movieDuration: number;
  movieAgeRating: string;
  theaterId: string;
  theaterName: string;
  screenName: string;
  showtimeId: string;
  showtimeDate: string;
  showtimeTime: string;
  format: string;
  seats: {
    id: string;
    row: string;
    number: number;
    tier: SeatTier;
    price: number;
  }[];
  concessions: {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
  }[];
  subtotal: number;
  tax: number;
  bookingFee: number;
  discount: number;
  totalPrice: number;
  paymentMethod: 'credit_card' | 'apple_pay' | 'google_pay' | 'cash';
  paymentStatus: 'paid' | 'pending' | 'refunded';
  bookingStatus: 'confirmed' | 'cancelled' | 'attended';
  createdAt: string;
  qrCodeData: string;
}

// Documentation Types
export interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    endpoint?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'WS';
    technology: string;
    status: 'Operational' | 'Real-Time' | 'Production Ready';
  }[];
}

export interface RoleDetail {
  role: UserRole;
  title: string;
  tagline: string;
  icon: string;
  summary: string;
  responsibilities: string[];
  permissions: {
    module: string;
    canRead: boolean;
    canCreate: boolean;
    canUpdate: boolean;
    canDelete: boolean;
  }[];
}

export interface EREntity {
  id: string;
  name: string;
  collection: string;
  description: string;
  attributes: {
    name: string;
    type: string;
    isPrimary?: boolean;
    isForeign?: boolean;
    references?: string;
    description: string;
  }[];
  sampleDoc: Record<string, any>;
}

export interface ERRelationship {
  from: string;
  to: string;
  type: '1:1' | '1:N' | 'M:N';
  description: string;
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  color: string;
  components: {
    name: string;
    description: string;
    tech: string;
    icon: string;
    details: string[];
  }[];
}

export interface UserFlowStep {
  stepNumber: number;
  phase: string;
  title: string;
  actor: string;
  description: string;
  inputs: string[];
  systemAction: string;
  edgeCases: string[];
  codeHighlight?: string;
}

export interface MVCLayer {
  title: 'Model' | 'View' | 'Controller';
  icon: string;
  color: string;
  description: string;
  role: string;
  files: {
    name: string;
    path: string;
    purpose: string;
    snippet: string;
  }[];
}
