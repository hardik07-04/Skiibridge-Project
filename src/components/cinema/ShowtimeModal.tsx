import React, { useState } from 'react';
import { X, Calendar, MapPin, Clock, Sparkles, ChevronRight } from 'lucide-react';
import { Movie, Theater, Showtime } from '../../types';

interface ShowtimeModalProps {
  movie: Movie | null;
  theaters: Theater[];
  showtimes: Showtime[];
  onClose: () => void;
  onSelectShowtime: (showtime: Showtime, theater: Theater) => void;
}

export const ShowtimeModal: React.FC<ShowtimeModalProps> = ({
  movie,
  theaters,
  showtimes,
  onClose,
  onSelectShowtime,
}) => {
  const [selectedTheaterId, setSelectedTheaterId] = useState<string>(theaters[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-28');
  const [formatFilter, setFormatFilter] = useState<string>('All');

  if (!movie) return null;

  const activeTheater = theaters.find(t => t.id === selectedTheaterId) || theaters[0];

  const dateOptions = [
    { dateStr: '2026-10-28', label: 'Today', day: 'Wed, Oct 28' },
    { dateStr: '2026-10-29', label: 'Tomorrow', day: 'Thu, Oct 29' },
    { dateStr: '2026-10-30', label: 'Friday', day: 'Fri, Oct 30' },
    { dateStr: '2026-10-31', label: 'Saturday', day: 'Sat, Oct 31' },
  ];

  // Filter showtimes for this movie, theater, and date
  const availableShowtimes = showtimes.filter((st) => {
    if (st.movieId !== movie.id) return false;
    if (st.theaterId !== selectedTheaterId) return false;
    if (st.date !== selectedDate) return false;
    if (formatFilter !== 'All' && st.format !== formatFilter) return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-12 h-16 rounded-lg object-cover shadow border border-neutral-800"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Select Showtime
                </span>
                <span className="text-xs text-neutral-400">{movie.durationMinutes} min • {movie.ageRating}</span>
              </div>
              <h2 className="text-xl font-bold text-white">{movie.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Theater Selection */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Select Theater Location</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {theaters.map((th) => (
                <button
                  key={th.id}
                  onClick={() => setSelectedTheaterId(th.id)}
                  className={`p-3 rounded-2xl text-left border transition-all ${
                    selectedTheaterId === th.id
                      ? 'bg-amber-500/10 border-amber-500/60 ring-1 ring-amber-500/30'
                      : 'bg-neutral-950/60 border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-xs font-bold text-white leading-tight">{th.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5 truncate">{th.address}</div>
                  <div className="text-[10px] text-amber-400/90 font-mono mt-1">{th.distance}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Date Ribbon */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Screening Date</span>
            </label>
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              {dateOptions.map((opt) => (
                <button
                  key={opt.dateStr}
                  onClick={() => setSelectedDate(opt.dateStr)}
                  className={`px-4 py-2.5 rounded-xl text-center shrink-0 border transition-all ${
                    selectedDate === opt.dateStr
                      ? 'bg-amber-500 text-neutral-950 border-amber-500 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono tracking-wider">{opt.label}</div>
                  <div className="text-xs font-semibold">{opt.day}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format Filter Bar */}
          <div className="flex items-center gap-2 pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-400">Filter Format:</span>
            {['All', 'IMAX 3D', 'Dolby Atmos', '4DX'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                  formatFilter === fmt
                    ? 'bg-neutral-800 text-amber-400 border-amber-500/40'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Showtimes List */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Available Screening Times</span>
            </label>

            {availableShowtimes.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-neutral-950/60 border border-neutral-800">
                <p className="text-xs text-neutral-400">No screenings available for this theater and date filter.</p>
                <p className="text-[11px] text-neutral-400 mt-1">Try switching to a different date or theater location above.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {availableShowtimes.map((st) => (
                  <button
                    key={st.id}
                    onClick={() => onSelectShowtime(st, activeTheater)}
                    className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 hover:border-amber-500/60 text-left group transition-all hover:scale-[1.02] hover:shadow-xl hover:shadow-black/50"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-black text-white group-hover:text-amber-400 transition-colors">
                        {st.time}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-500/30">
                        ${st.basePrice.toFixed(2)}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-neutral-300 truncate">
                      {st.screenName}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-neutral-800/80 text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-mono text-[10px]">
                        {st.format}
                      </span>
                      <span className="text-emerald-400 font-medium">
                        {st.availableSeatsCount} seats left
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
