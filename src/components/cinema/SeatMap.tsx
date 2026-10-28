import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Sparkles,
  Armchair,
  Accessibility,
  Crown,
  ChevronRight,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';
import { Movie, Theater, Showtime, Seat, SeatTier } from '../../types';

interface SeatMapProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  seats: Seat[];
  selectedSeatIds: string[];
  onToggleSeat: (seat: Seat) => void;
  onProceed: () => void;
  onBack: () => void;
  lockTimerSeconds: number;
}

export const SeatMap: React.FC<SeatMapProps> = ({
  movie,
  theater,
  showtime,
  seats,
  selectedSeatIds,
  onToggleSeat,
  onProceed,
  onBack,
  lockTimerSeconds,
}) => {
  // Format remaining seconds into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Group seats by row
  const rowMap = new Map<string, Seat[]>();
  seats.forEach((seat) => {
    if (!rowMap.has(seat.row)) {
      rowMap.set(seat.row, []);
    }
    rowMap.get(seat.row)!.push(seat);
  });

  const rows = Array.from(rowMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const subtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);

  const getSeatColor = (seat: Seat) => {
    const isSelected = selectedSeatIds.includes(seat.id);
    if (isSelected) {
      return 'bg-emerald-500 text-neutral-950 font-bold border-emerald-400 ring-2 ring-emerald-400/40 shadow-lg shadow-emerald-500/30 scale-105';
    }
    if (seat.status === 'occupied') {
      return 'bg-neutral-800/50 text-neutral-600 border-neutral-800/80 cursor-not-allowed';
    }
    if (seat.status === 'locked') {
      return 'bg-amber-500/20 text-amber-500 border-amber-500/40 cursor-not-allowed animate-pulse';
    }

    // Available tiers
    switch (seat.tier) {
      case 'vip_recliner':
        return 'bg-purple-950/40 text-purple-300 border-purple-500/40 hover:border-purple-400 hover:bg-purple-900/60';
      case 'premium':
        return 'bg-blue-950/40 text-blue-300 border-blue-500/40 hover:border-blue-400 hover:bg-blue-900/60';
      case 'wheelchair':
        return 'bg-teal-950/40 text-teal-300 border-teal-500/40 hover:border-teal-400 hover:bg-teal-900/60';
      default:
        return 'bg-neutral-900 text-neutral-300 border-neutral-700/80 hover:border-neutral-500 hover:bg-neutral-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl relative my-4 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-neutral-900 border-b border-neutral-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold"
            >
              Back
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white">{movie.title}</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[11px] font-mono">
                  {showtime.format}
                </span>
              </div>
              <div className="text-xs text-neutral-400 mt-0.5">
                {theater.name} • {showtime.screenName} • {showtime.date} at {showtime.time}
              </div>
            </div>
          </div>

          {/* Seat Hold Timer */}
          <div className="flex items-center gap-3">
            {selectedSeatIds.length > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold animate-pulse">
                <Clock className="w-3.5 h-3.5" />
                <span>Seats Held: {formatTime(lockTimerSeconds)}</span>
              </div>
            )}
            <button
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auditorium Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col items-center select-none">
          {/* Cinema Screen Curve */}
          <div className="w-full max-w-2xl flex flex-col items-center mb-10">
            <div className="w-full h-3 rounded-[100%] bg-gradient-to-r from-amber-500/20 via-amber-400 to-amber-500/20 shadow-[0_0_30px_rgba(245,158,11,0.5)] border-t border-amber-400/50" />
            <div className="w-3/4 h-8 bg-gradient-to-b from-amber-400/10 to-transparent blur-md -mt-1 pointer-events-none" />
            <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-neutral-400 mt-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-400" />
              All Eyes On Curved {showtime.format} Screen
              <Sparkles className="w-3 h-3 text-amber-400" />
            </span>
          </div>

          {/* Seating Grid */}
          <div className="space-y-2.5 max-w-full overflow-x-auto pb-4 px-2">
            {rows.map(([rowChar, seatList]) => (
              <div key={rowChar} className="flex items-center gap-2 sm:gap-3">
                {/* Row Label Left */}
                <span className="w-5 text-center text-xs font-mono font-bold text-neutral-400">
                  {rowChar}
                </span>

                {/* Seat Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  {seatList.map((seat, index) => {
                    const isOccupied = seat.status === 'occupied';
                    const isLocked = seat.status === 'locked';
                    const isAisle = index === 2 || index === seatList.length - 3;

                    return (
                      <React.Fragment key={seat.id}>
                        <button
                          disabled={isOccupied || isLocked}
                          onClick={() => onToggleSeat(seat)}
                          title={`${rowChar}${seat.number} - ${seat.tier.replace('_', ' ').toUpperCase()} ($${seat.price.toFixed(2)})`}
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border text-[10px] sm:text-xs font-mono flex items-center justify-center transition-all ${getSeatColor(
                            seat
                          )}`}
                        >
                          {seat.tier === 'wheelchair' ? (
                            <Accessibility className="w-3.5 h-3.5" />
                          ) : seat.tier === 'vip_recliner' ? (
                            <Crown className="w-3.5 h-3.5" />
                          ) : (
                            seat.number
                          )}
                        </button>

                        {/* Visual Aisle Spacer */}
                        {isAisle && <div className="w-3 sm:w-5" />}
                      </React.Fragment>
                    );
                  })}
                </div>

                {/* Row Label Right */}
                <span className="w-5 text-center text-xs font-mono font-bold text-neutral-400">
                  {rowChar}
                </span>
              </div>
            ))}
          </div>

          {/* Seat Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-8 p-3 rounded-2xl bg-neutral-900/60 border border-neutral-800 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-neutral-900 border border-neutral-700" />
              <span className="text-neutral-300">Standard ($16.00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-blue-950/60 border border-blue-500/50" />
              <span className="text-neutral-300">Premium ($19.50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-purple-950/60 border border-purple-500/50" />
              <span className="text-neutral-300">VIP Recliner ($24.50)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-teal-950/60 border border-teal-500/50" />
              <span className="text-neutral-300">ADA Wheelchair ($14.00)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-500 border border-emerald-400" />
              <span className="text-white font-medium">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-neutral-800/80 border border-neutral-800" />
              <span className="text-neutral-400">Occupied</span>
            </div>
          </div>
        </div>

        {/* Footer Checkout Drawer */}
        <div className="p-4 sm:p-5 bg-neutral-900 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {selectedSeats.length === 0 ? (
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>Please select at least 1 seat on the auditorium map to proceed (Max 8).</span>
              </div>
            ) : (
              <div>
                <div className="text-xs text-neutral-400">
                  Selected Seats ({selectedSeats.length}):
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {selectedSeats.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-mono font-bold"
                    >
                      {s.row}{s.number} (${s.price.toFixed(2)})
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
            <div className="text-right">
              <div className="text-[11px] uppercase font-mono text-neutral-400">Seats Subtotal</div>
              <div className="text-xl font-black text-white">${subtotal.toFixed(2)}</div>
            </div>

            <button
              disabled={selectedSeats.length === 0}
              onClick={onProceed}
              className={`px-6 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
                selectedSeats.length > 0
                  ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-lg shadow-amber-500/25 hover:scale-105 cursor-pointer'
                  : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
              }`}
            >
              <span>Add Concessions &amp; Snacks</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
