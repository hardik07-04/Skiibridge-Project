import React from 'react';
import { X, Star, Clock, Calendar, Film, User, Play, Sparkles } from 'lucide-react';
import { Movie } from '../../types';

interface MovieDetailsModalProps {
  movie: Movie | null;
  onClose: () => void;
  onBookNow: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onBookNow,
  onWatchTrailer,
}) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-neutral-900 border border-neutral-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-400 hover:text-white flex items-center justify-center border border-neutral-700 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Banner */}
        <div className="relative h-64 w-full bg-neutral-950">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

          {/* Play Trailer Floating Button */}
          <button
            onClick={() => onWatchTrailer(movie)}
            className="absolute bottom-6 right-6 px-4 py-2 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Play Official Trailer</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 -mt-16 relative z-10 space-y-6">
          <div className="flex gap-5">
            {/* Poster Thumbnail */}
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-24 sm:w-28 rounded-xl object-cover shadow-2xl border-2 border-neutral-800 shrink-0"
            />
            <div className="pt-8 sm:pt-10">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px] font-mono">
                  {movie.ageRating}
                </span>
                <span className="px-2 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-300 text-[11px] font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-400" />
                  {movie.durationMinutes}m
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold px-2 py-0.5 bg-neutral-950 border border-neutral-800 rounded">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {movie.rating.toFixed(1)} / 10 ({movie.voteCount.toLocaleString()} votes)
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">{movie.title}</h2>
              <p className="text-amber-300/80 italic text-xs sm:text-sm font-serif mt-0.5">
                "{movie.tagline}"
              </p>
            </div>
          </div>

          {/* Formats and Genres */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-400">Available Formats:</span>
            {movie.formats.map((fmt) => (
              <span
                key={fmt}
                className="px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-semibold"
              >
                {fmt}
              </span>
            ))}
            <span className="mx-2 text-neutral-600">|</span>
            <span className="text-xs text-neutral-400">Genres:</span>
            {movie.genres.map((g) => (
              <span
                key={g}
                className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 text-xs"
              >
                {g}
              </span>
            ))}
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
              Plot Overview
            </h4>
            <p className="text-sm text-neutral-300 leading-relaxed">{movie.synopsis}</p>
          </div>

          {/* Cast & Director */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-950/60 border border-neutral-800/80">
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Director</span>
              <div className="flex items-center gap-2 text-sm font-medium text-white">
                <Film className="w-4 h-4 text-amber-400" />
                <span>{movie.director}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 block mb-1">Starring Cast</span>
              <div className="flex items-center gap-2 text-xs font-medium text-white">
                <User className="w-4 h-4 text-amber-400" />
                <span className="truncate">{movie.cast.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Bottom Call to Action */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-neutral-400 hover:text-white text-xs font-semibold hover:bg-neutral-800"
            >
              Close
            </button>
            {movie.status === 'now_showing' ? (
              <button
                onClick={() => {
                  onClose();
                  onBookNow(movie);
                }}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <Calendar className="w-4 h-4" />
                <span>Select Showtime &amp; Reserve Seats</span>
              </button>
            ) : (
              <div className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-400 text-xs font-medium">
                Advance Booking Opens Soon
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
