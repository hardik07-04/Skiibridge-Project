import React from 'react';
import { X, Film, Volume2 } from 'lucide-react';
import { Movie } from '../../types';

interface TrailerModalProps {
  movie: Movie | null;
  onClose: () => void;
  onBookNow: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({ movie, onClose, onBookNow }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 px-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                {movie.title}
                <span className="text-xs font-mono text-neutral-400 font-normal">Official Cinema Trailer</span>
              </h3>
              <p className="text-[11px] text-neutral-400">{movie.genres.join(' • ')} • {movie.ageRating}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${movie.trailerYoutubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={`${movie.title} Official Trailer`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Footer info bar */}
        <div className="p-4 px-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Best experienced with headphones or theater surround audio.</span>
          </div>

          {movie.status === 'now_showing' && (
            <button
              onClick={() => {
                onClose();
                onBookNow(movie);
              }}
              className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold transition-all shadow-md shadow-amber-500/20"
            >
              Book Tickets Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
