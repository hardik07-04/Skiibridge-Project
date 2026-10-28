import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  AlertTriangle,
  CheckCircle,
  Search,
  RotateCcw,
  Film,
} from 'lucide-react';
import { Booking } from '../../types';

interface BookingManagementProps {
  bookings: Booking[];
  onViewTicket: (booking: Booking) => void;
  onCancelBooking: (bookingId: string) => void;
  onNewBookingClick: () => void;
}

export const BookingManagement: React.FC<BookingManagementProps> = ({
  bookings,
  onViewTicket,
  onCancelBooking,
  onNewBookingClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'confirmed' | 'cancelled'>('all');
  const [cancellingBookingId, setCancellingBookingId] = useState<string | null>(null);

  const filteredBookings = bookings.filter((b) => {
    if (filterStatus !== 'all' && b.bookingStatus !== filterStatus) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchRef = b.referenceCode.toLowerCase().includes(q);
      const matchMovie = b.movieTitle.toLowerCase().includes(q);
      const matchName = b.customerName.toLowerCase().includes(q);
      if (!matchRef && !matchMovie && !matchName) return false;
    }
    return true;
  });

  const handleConfirmCancel = (id: string) => {
    onCancelBooking(id);
    setCancellingBookingId(null);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2.5">
            <Ticket className="w-7 h-7 text-amber-500" />
            <span>Booking Management &amp; Tickets</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Access your cinema passes, scan QR codes at gates, or process refunds
          </p>
        </div>

        <button
          onClick={onNewBookingClick}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold self-start sm:self-auto shadow-md shadow-amber-500/20"
        >
          Book Another Movie
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-2xl">
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            All Passes ({bookings.length})
          </button>
          <button
            onClick={() => setFilterStatus('confirmed')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === 'confirmed'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Active / Confirmed ({bookings.filter(b => b.bookingStatus === 'confirmed').length})
          </button>
          <button
            onClick={() => setFilterStatus('cancelled')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === 'cancelled'
                ? 'bg-amber-500 text-neutral-950 font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Cancelled ({bookings.filter(b => b.bookingStatus === 'cancelled').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Reference Code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800">
          <Ticket className="w-12 h-12 text-neutral-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white">No bookings found</h3>
          <p className="text-xs text-neutral-400 mt-1">
            You don't have any reservations matching this filter.
          </p>
          <button
            onClick={onNewBookingClick}
            className="mt-4 px-4 py-2 rounded-xl bg-neutral-800 text-amber-400 hover:bg-neutral-700 text-xs font-semibold"
          >
            Browse Movies &amp; Showtimes
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => {
            const isCancelled = booking.bookingStatus === 'cancelled';

            return (
              <div
                key={booking.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCancelled
                    ? 'bg-neutral-950/60 border-neutral-800/80 opacity-70'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700 shadow-lg'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Movie poster & details */}
                  <div className="flex gap-4">
                    <img
                      src={booking.moviePoster}
                      alt={booking.movieTitle}
                      className="w-16 h-24 rounded-xl object-cover shrink-0 border border-neutral-800"
                    />

                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/30">
                          {booking.referenceCode}
                        </span>
                        {isCancelled ? (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                            Cancelled &amp; Refunded
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Confirmed Pass
                          </span>
                        )}
                        <span className="text-[11px] text-neutral-400 font-mono">
                          {booking.format}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-white leading-tight">
                        {booking.movieTitle}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                          {booking.theaterName} ({booking.screenName})
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-neutral-300">
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          {booking.showtimeDate} at {booking.showtimeTime}
                        </span>
                      </div>

                      {/* Seats & Snacks Summary */}
                      <div className="mt-2 text-xs text-neutral-300">
                        <span className="font-semibold text-neutral-400">Seats:</span>{' '}
                        {booking.seats.map((s) => `${s.row}${s.number} (${s.tier})`).join(', ')}
                        {booking.concessions.length > 0 && (
                          <span className="text-neutral-400 ml-2">
                            • Snacks: {booking.concessions.map((c) => `${c.name} (x${c.quantity})`).join(', ')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Price & Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-neutral-800">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                        Total Paid
                      </span>
                      <span className="text-lg font-black text-white font-mono">
                        ${booking.totalPrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewTicket(booking)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors border border-neutral-700"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-400" />
                        <span>View Pass</span>
                      </button>

                      {!isCancelled && (
                        <button
                          onClick={() => setCancellingBookingId(booking.id)}
                          className="px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-red-950/60 text-neutral-400 hover:text-red-400 text-xs font-semibold transition-colors border border-neutral-800 hover:border-red-800/60"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Inline cancellation prompt */}
                {cancellingBookingId === booking.id && (
                  <div className="mt-4 p-4 rounded-xl bg-red-950/30 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in duration-150">
                    <div className="flex items-center gap-2 text-xs text-red-200">
                      <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
                      <span>
                        Are you sure? A 100% refund of <strong>${booking.totalPrice.toFixed(2)}</strong> will be credited to {booking.paymentMethod.replace('_', ' ')}. Seats {booking.seats.map((s) => `${s.row}${s.number}`).join(', ')} will be immediately released back to the public pool.
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setCancellingBookingId(null)}
                        className="px-3 py-1 rounded-lg bg-neutral-800 text-neutral-300 text-xs font-medium hover:bg-neutral-700"
                      >
                        Keep Booking
                      </button>
                      <button
                        onClick={() => handleConfirmCancel(booking.id)}
                        className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold"
                      >
                        Confirm Cancellation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
