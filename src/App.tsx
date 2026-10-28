import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { MovieCatalog } from './components/cinema/MovieCatalog';
import { MovieDetailsModal } from './components/cinema/MovieDetailsModal';
import { TrailerModal } from './components/cinema/TrailerModal';
import { ShowtimeModal } from './components/cinema/ShowtimeModal';
import { SeatMap } from './components/cinema/SeatMap';
import { ConcessionsModal } from './components/cinema/ConcessionsModal';
import { CheckoutModal } from './components/cinema/CheckoutModal';
import { TicketPassModal } from './components/cinema/TicketPassModal';
import { BookingManagement } from './components/cinema/BookingManagement';
import { AdminDashboard } from './components/cinema/AdminDashboard';
import { DocsPortal } from './components/docs/DocsPortal';
import { DemoVideoTour } from './components/docs/DemoVideoTour';
import { LiveWalkthroughModal } from './components/cinema/LiveWalkthroughModal';

import {
  INITIAL_USERS,
  MOCK_MOVIES,
  MOCK_THEATERS,
  MOCK_SHOWTIMES,
  CONCESSION_ITEMS,
  INITIAL_BOOKINGS,
  generateSeatGrid,
} from './data/mockData';
import { Movie, Theater, Showtime, Seat, ConcessionItem, Booking, User } from './types';

export default function App() {
  // Navigation & User State
  const [activeTab, setActiveTab] = useState<'cinema' | 'docs' | 'demo' | 'bookings' | 'admin'>('cinema');
  const [docsSubTab, setDocsSubTab] = useState<string>('features');
  const [users] = useState<User[]>(INITIAL_USERS);
  const [currentUser, setCurrentUser] = useState<User>(INITIAL_USERS[0]);
  const [selectedCity, setSelectedCity] = useState<string>('New York, NY');

  // Domain Data State
  const [movies] = useState<Movie[]>(MOCK_MOVIES);
  const [theaters] = useState<Theater[]>(MOCK_THEATERS);
  const [showtimes, setShowtimes] = useState<Showtime[]>(MOCK_SHOWTIMES);
  const [seats, setSeats] = useState<Seat[]>(() => generateSeatGrid(8, 14));
  const [concessionItems] = useState<ConcessionItem[]>(CONCESSION_ITEMS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  // Active Modals & Reservation Flow State
  const [detailsMovie, setDetailsMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);

  // Booking Flow State Machine
  const [bookingMovie, setBookingMovie] = useState<Movie | null>(null);
  const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(null);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [selectedConcessions, setSelectedConcessions] = useState<Record<string, number>>({});
  const [bookingStep, setBookingStep] = useState<'none' | 'showtime' | 'seats' | 'concessions' | 'checkout' | 'ticket'>('none');
  const [activeTicket, setActiveTicket] = useState<Booking | null>(null);

  // 5-minute Seat Lock Timer
  const [lockTimerSeconds, setLockTimerSeconds] = useState<number>(300);
  const [isLiveWalkthroughOpen, setIsLiveWalkthroughOpen] = useState(false);

  // Countdown timer for seat hold
  useEffect(() => {
    let interval: any;
    if (selectedSeatIds.length > 0 && (bookingStep === 'seats' || bookingStep === 'concessions' || bookingStep === 'checkout')) {
      interval = setInterval(() => {
        setLockTimerSeconds((prev) => {
          if (prev <= 1) {
            // Expire lock
            setSelectedSeatIds([]);
            setBookingStep('none');
            alert('Your 5-minute seat reservation hold has expired. Seats have been released.');
            return 300;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setLockTimerSeconds(300);
    }
    return () => clearInterval(interval);
  }, [selectedSeatIds.length, bookingStep]);

  // Initiate booking from Movie Card
  const handleStartBooking = (movie: Movie) => {
    setBookingMovie(movie);
    setSelectedSeatIds([]);
    setSelectedConcessions({});
    setBookingStep('showtime');
  };

  // Showtime selected -> open Seat Map
  const handleSelectShowtime = (showtime: Showtime, theater: Theater) => {
    setSelectedShowtime(showtime);
    setSelectedTheater(theater);
    setBookingStep('seats');
  };

  // Toggle seat selection
  const handleToggleSeat = (seat: Seat) => {
    if (seat.status === 'occupied' || seat.status === 'locked') return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds((prev) => prev.filter((id) => id !== seat.id));
    } else {
      if (selectedSeatIds.length >= 8) {
        alert('Maximum reservation limit is 8 tickets per booking.');
        return;
      }
      setSelectedSeatIds((prev) => [...prev, seat.id]);
    }
  };

  // Concession quantity changer
  const handleUpdateConcessionQuantity = (item: ConcessionItem, delta: number) => {
    setSelectedConcessions((prev) => {
      const current = prev[item.id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const copy = { ...prev };
        delete copy[item.id];
        return copy;
      }
      return { ...prev, [item.id]: next };
    });
  };

  // Final booking confirmation
  const handleBookingSuccess = (newBooking: Booking) => {
    // Add to bookings
    setBookings((prev) => [newBooking, ...prev]);

    // Mark seats as permanently occupied in state
    setSeats((prev) =>
      prev.map((s) =>
        selectedSeatIds.includes(s.id) ? { ...s, status: 'occupied' } : s
      )
    );

    // Update available seat count on showtime
    if (selectedShowtime) {
      setShowtimes((prev) =>
        prev.map((st) =>
          st.id === selectedShowtime.id
            ? { ...st, availableSeatsCount: Math.max(0, st.availableSeatsCount - selectedSeatIds.length) }
            : st
        )
      );
    }

    setActiveTicket(newBooking);
    setBookingStep('ticket');
  };

  // Quick Walk-In POS from Cashier Admin
  const handleQuickWalkinBook = (st: Showtime, count: number) => {
    const movie = movies.find((m) => m.id === st.movieId);
    const theater = theaters.find((t) => t.id === st.theaterId) || theaters[0];
    if (!movie) return;

    const available = seats.filter((s) => s.status === 'available').slice(0, count);
    if (available.length === 0) return;

    const refCode = `POS-${Math.floor(1000 + Math.random() * 9000)}-CS`;
    const walkInBooking: Booking = {
      id: `book_pos_${Date.now()}`,
      referenceCode: refCode,
      userId: currentUser.id,
      customerName: 'Box Office Walk-In Patron',
      customerEmail: 'cashier.pos@imovies.com',
      customerPhone: '+1 (555) 000-0000',
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.posterUrl,
      movieDuration: movie.durationMinutes,
      movieAgeRating: movie.ageRating,
      theaterId: theater.id,
      theaterName: theater.name,
      screenName: st.screenName,
      showtimeId: st.id,
      showtimeDate: st.date,
      showtimeTime: st.time,
      format: st.format,
      seats: available.map((s) => ({
        id: s.id,
        row: s.row,
        number: s.number,
        tier: s.tier,
        price: s.price,
      })),
      concessions: [],
      subtotal: available.reduce((acc, s) => acc + s.price, 0),
      tax: 2.50,
      bookingFee: 0,
      discount: 0,
      totalPrice: available.reduce((acc, s) => acc + s.price, 0) + 2.50,
      paymentMethod: 'cash',
      paymentStatus: 'paid',
      bookingStatus: 'confirmed',
      createdAt: new Date().toISOString(),
      qrCodeData: `${refCode}|${movie.id}|${available.map((s) => `${s.row}${s.number}`).join(',')}`,
    };

    setBookings((prev) => [walkInBooking, ...prev]);
    setSeats((prev) =>
      prev.map((s) =>
        available.some((av) => av.id === s.id) ? { ...s, status: 'occupied' } : s
      )
    );
  };

  // Toggle seat maintenance
  const handleToggleSeatMaintenance = (seatId: string) => {
    setSeats((prev) =>
      prev.map((s) => {
        if (s.id === seatId) {
          return {
            ...s,
            status: s.status === 'occupied' ? 'available' : 'occupied',
          };
        }
        return s;
      })
    );
  };

  // Cancel reservation
  const handleCancelBooking = (bookingId: string) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    // Release seats back to available
    const seatIds = booking.seats.map((s) => s.id);
    setSeats((prev) =>
      prev.map((s) => (seatIds.includes(s.id) ? { ...s, status: 'available' } : s))
    );

    // Update booking status
    setBookings((prev) =>
      prev.map((b) =>
        b.id === bookingId ? { ...b, bookingStatus: 'cancelled', paymentStatus: 'refunded' } : b
      )
    );
  };

  const handleLaunchLiveWalkthrough = () => {
    setIsLiveWalkthroughOpen(true);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        docsSubTab={docsSubTab}
        setDocsSubTab={setDocsSubTab}
        currentUser={currentUser}
        users={users}
        onSelectUser={setCurrentUser}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        bookingCount={bookings.filter((b) => b.bookingStatus === 'confirmed').length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'cinema' && (
          <MovieCatalog
            movies={movies}
            onSelectMovieForBooking={handleStartBooking}
            onOpenDetails={(movie) => setDetailsMovie(movie)}
            onWatchTrailer={(movie) => setTrailerMovie(movie)}
          />
        )}

        {activeTab === 'docs' && (
          <DocsPortal
            initialSubTab={docsSubTab}
            onLaunchLiveWalkthrough={handleLaunchLiveWalkthrough}
          />
        )}

        {activeTab === 'demo' && (
          <DemoVideoTour onLaunchLiveWalkthrough={handleLaunchLiveWalkthrough} />
        )}

        {activeTab === 'bookings' && (
          <BookingManagement
            bookings={bookings}
            onViewTicket={(b) => {
              setActiveTicket(b);
              setBookingStep('ticket');
            }}
            onCancelBooking={handleCancelBooking}
            onNewBookingClick={() => setActiveTab('cinema')}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            theaters={theaters}
            movies={movies}
            showtimes={showtimes}
            currentUser={currentUser}
            seats={seats}
            onToggleSeatMaintenance={handleToggleSeatMaintenance}
            onQuickWalkinBook={handleQuickWalkinBook}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-neutral-800 bg-neutral-950 text-neutral-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span>IMOVIES CINEMA PLATFORM</span>
              <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/30">
                v2.4
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-1 max-w-lg">
              Enterprise client-server architecture built with Express.js, MongoDB, Redis Concurrency Locking, and React 19.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <button
              onClick={() => {
                setActiveTab('docs');
                setDocsSubTab('er');
              }}
              className="hover:text-amber-400 transition-colors"
            >
              ER Diagram
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('docs');
                setDocsSubTab('architecture');
              }}
              className="hover:text-amber-400 transition-colors"
            >
              Technical Architecture
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('docs');
                setDocsSubTab('mvc');
              }}
              className="hover:text-amber-400 transition-colors"
            >
              MVC Pattern
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setActiveTab('demo');
              }}
              className="hover:text-amber-400 transition-colors text-amber-400 font-bold"
            >
              Demo Video Tour
            </button>
          </div>
        </div>
      </footer>

      {/* --- MODAL DIALOGS --- */}

      {/* Movie Details Modal */}
      {detailsMovie && (
        <MovieDetailsModal
          movie={detailsMovie}
          onClose={() => setDetailsMovie(null)}
          onBookNow={handleStartBooking}
          onWatchTrailer={(movie) => setTrailerMovie(movie)}
        />
      )}

      {/* Video Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
          onBookNow={handleStartBooking}
        />
      )}

      {/* Step 1: Showtime Picker Modal */}
      {bookingStep === 'showtime' && bookingMovie && (
        <ShowtimeModal
          movie={bookingMovie}
          theaters={theaters}
          showtimes={showtimes}
          onClose={() => setBookingStep('none')}
          onSelectShowtime={handleSelectShowtime}
        />
      )}

      {/* Step 2: Interactive Seat Map Modal */}
      {bookingStep === 'seats' && bookingMovie && selectedTheater && selectedShowtime && (
        <SeatMap
          movie={bookingMovie}
          theater={selectedTheater}
          showtime={selectedShowtime}
          seats={seats}
          selectedSeatIds={selectedSeatIds}
          onToggleSeat={handleToggleSeat}
          onProceed={() => setBookingStep('concessions')}
          onBack={() => setBookingStep('showtime')}
          lockTimerSeconds={lockTimerSeconds}
        />
      )}

      {/* Step 3: Concessions Modal */}
      {bookingStep === 'concessions' && (
        <ConcessionsModal
          concessionItems={concessionItems}
          selectedConcessions={selectedConcessions}
          onUpdateQuantity={handleUpdateConcessionQuantity}
          onProceedToCheckout={() => setBookingStep('checkout')}
          onBackToSeats={() => setBookingStep('seats')}
          onSkip={() => setBookingStep('checkout')}
        />
      )}

      {/* Step 4: Checkout Modal */}
      {bookingStep === 'checkout' && bookingMovie && selectedTheater && selectedShowtime && (
        <CheckoutModal
          movie={bookingMovie}
          theater={selectedTheater}
          showtime={selectedShowtime}
          selectedSeats={seats.filter((s) => selectedSeatIds.includes(s.id))}
          concessionItems={concessionItems}
          selectedConcessions={selectedConcessions}
          currentUser={currentUser}
          onClose={() => setBookingStep('none')}
          onBackToConcessions={() => setBookingStep('concessions')}
          onBookingSuccess={handleBookingSuccess}
        />
      )}

      {/* Step 5: Digital Ticket Pass Modal */}
      {bookingStep === 'ticket' && activeTicket && (
        <TicketPassModal
          booking={activeTicket}
          onClose={() => setBookingStep('none')}
          onViewAllBookings={() => {
            setBookingStep('none');
            setActiveTab('bookings');
          }}
        />
      )}

      {/* Floating Guided Interactive Tour Component */}
      {isLiveWalkthroughOpen && (
        <LiveWalkthroughModal
          onClose={() => setIsLiveWalkthroughOpen(false)}
          onNavigateTo={(tab, sub) => {
            setActiveTab(tab);
            if (sub) setDocsSubTab(sub);
          }}
          onAutoTriggerBooking={() => {
            handleStartBooking(movies[0]);
          }}
        />
      )}
    </div>
  );
}
