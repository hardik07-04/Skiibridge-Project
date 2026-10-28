import React, { useState } from 'react';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Armchair,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Plus,
  RefreshCw,
  Film,
  Shield,
  Layers,
} from 'lucide-react';
import { Theater, Movie, Showtime, Seat, User } from '../../types';

interface AdminDashboardProps {
  theaters: Theater[];
  movies: Movie[];
  showtimes: Showtime[];
  currentUser: User;
  seats: Seat[];
  onToggleSeatMaintenance: (seatId: string) => void;
  onQuickWalkinBook: (showtime: Showtime, count: number) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  theaters,
  movies,
  showtimes,
  currentUser,
  seats,
  onToggleSeatMaintenance,
  onQuickWalkinBook,
}) => {
  const [selectedTheaterId, setSelectedTheaterId] = useState(theaters[0]?.id || '');
  const [notification, setNotification] = useState<string | null>(null);

  const activeTheater = theaters.find(t => t.id === selectedTheaterId) || theaters[0];

  // Calculate live stats
  const totalOccupiedSeats = seats.filter(s => s.status === 'occupied').length;
  const totalAvailableSeats = seats.filter(s => s.status === 'available').length;
  const occupancyPercentage = Math.round((totalOccupiedSeats / seats.length) * 100);
  const estimatedRevenue = seats
    .filter(s => s.status === 'occupied')
    .reduce((sum, s) => sum + s.price, 0) + 1450.00;

  const handleSeatClick = (seat: Seat) => {
    onToggleSeatMaintenance(seat.id);
    setNotification(`Seat ${seat.row}${seat.number} status toggled.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleQuickCounterIssue = (st: Showtime) => {
    onQuickWalkinBook(st, 2);
    setNotification(`Issued 2 walk-in counter tickets for ${st.screenName} (${st.time}).`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-amber-950/30 border border-neutral-800 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              Operations &amp; Box Office Portal
            </span>
            <span className="text-xs text-neutral-400">
              Active Persona: <strong className="text-white">{currentUser.name} ({currentUser.role})</strong>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Cinema Telemetry &amp; Hall Management
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time multi-theater monitoring, seat availability overrides, and cashier POS dispatch
          </p>
        </div>

        {/* Theater Switcher */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400">Multiplex:</span>
          <select
            value={selectedTheaterId}
            onChange={(e) => setSelectedTheaterId(e.target.value)}
            className="px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white font-medium focus:outline-none focus:border-amber-500"
          >
            {theaters.map((th) => (
              <option key={th.id} value={th.id}>
                {th.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {notification && (
        <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded-xl text-xs text-amber-300 flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase">Gross Box Office</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ${estimatedRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% vs previous Wednesday</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase">Auditorium Occupancy</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {occupancyPercentage}%
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${occupancyPercentage}%` }}
            />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase">Active Screenings</span>
            <Film className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {showtimes.filter(s => s.theaterId === selectedTheaterId).length}
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            Across {activeTheater.screens.length} auditoriums
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
          <div className="flex items-center justify-between text-neutral-400 mb-2">
            <span className="text-xs font-mono uppercase">Live Seat Capacity</span>
            <Armchair className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalAvailableSeats} <span className="text-sm font-normal text-neutral-400">/ {seats.length} left</span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-1">
            {totalOccupiedSeats} seats locked or confirmed
          </div>
        </div>
      </div>

      {/* Screenings and Rapid Counter POS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Screenings & Quick Cashier POS */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-amber-400" />
                <span>Today's Screenings &amp; Walk-In POS Dispatch</span>
              </h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Issue counter paper tickets or inspect remaining capacity
              </p>
            </div>
            <span className="text-xs font-mono text-neutral-400">Oct 28, 2026</span>
          </div>

          <div className="space-y-3">
            {showtimes
              .filter(st => st.theaterId === selectedTheaterId && st.date === '2026-10-28')
              .map((st) => {
                const movie = movies.find(m => m.id === st.movieId);
                if (!movie) return null;

                return (
                  <div
                    key={st.id}
                    className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-10 h-14 rounded-lg object-cover border border-neutral-800 shrink-0"
                      />
                      <div>
                        <div className="text-xs font-bold text-white">{movie.title}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {st.screenName} • <span className="text-amber-400">{st.format}</span>
                        </div>
                        <div className="text-xs font-mono font-bold text-emerald-400 mt-1">
                          {st.time} — ${st.basePrice.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <div className="text-right text-[11px] text-neutral-400 mr-2 hidden sm:block">
                        <span className="font-bold text-white">{st.availableSeatsCount}</span> seats open
                      </div>
                      <button
                        onClick={() => handleQuickCounterIssue(st)}
                        className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 hover:text-amber-300 text-xs font-semibold flex items-center gap-1 border border-neutral-700 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Issue 2 Walk-In Tickets</span>
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Live Seat Map Maintenance Override */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
          <div className="pb-3 border-b border-neutral-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Armchair className="w-4 h-4 text-amber-400" />
              <span>Auditorium Seat Maintenance Override</span>
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Click any seat below to mark as broken / maintenance or toggle availability
            </p>
          </div>

          {/* Mini Seat Matrix */}
          <div className="p-3 bg-neutral-950 rounded-2xl border border-neutral-800/80 overflow-x-auto">
            <div className="text-[10px] text-center font-mono uppercase tracking-widest text-neutral-500 mb-3">
              Screen Projection
            </div>
            <div className="grid grid-cols-12 gap-1.5 max-w-fit mx-auto">
              {seats.slice(0, 72).map((seat) => {
                const isOccupied = seat.status === 'occupied';

                return (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    title={`Click to toggle seat ${seat.row}${seat.number}`}
                    className={`w-5 h-5 rounded text-[8px] font-mono flex items-center justify-center transition-all ${
                      isOccupied
                        ? 'bg-neutral-800 text-neutral-600'
                        : seat.tier === 'vip_recliner'
                        ? 'bg-purple-950 text-purple-300 border border-purple-500/40'
                        : 'bg-neutral-900 text-neutral-400 hover:bg-amber-500/20 hover:text-amber-400 border border-neutral-700/60'
                    }`}
                  >
                    {seat.row}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-neutral-800" />
              <span>Occupied / Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-purple-950 border border-purple-500/40" />
              <span>VIP Ultra Recliner Tier</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded bg-neutral-900 border border-neutral-700" />
              <span>Available for Public Reservation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
