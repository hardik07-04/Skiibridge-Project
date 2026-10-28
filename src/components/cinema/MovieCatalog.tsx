import React, { useState } from 'react';
import {
  Search,
  Star,
  Clock,
  Play,
  Calendar,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Movie } from '../../types';

interface MovieCatalogProps {
  movies: Movie[];
  onSelectMovieForBooking: (movie: Movie) => void;
  onOpenDetails: (movie: Movie) => void;
  onWatchTrailer: (movie: Movie) => void;
}

export const MovieCatalog: React.FC<MovieCatalogProps> = ({
  movies,
  onSelectMovieForBooking,
  onOpenDetails,
  onWatchTrailer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<'all' | 'now_showing' | 'coming_soon'>('now_showing');

  // Featured hero movie
  const featuredMovie = movies.find(m => m.isFeatured && m.status === 'now_showing') || movies[0];

  // Unique genres
  const allGenres = ['All', ...Array.from(new Set(movies.flatMap(m => m.genres)))];
  const formats = ['All', 'IMAX 3D', 'Dolby Atmos', '4DX', 'Standard 2D'];

  // Filtered movies
  const filteredMovies = movies.filter((movie) => {
    if (statusFilter !== 'all' && movie.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = movie.title.toLowerCase().includes(q);
      const matchGenre = movie.genres.some(g => g.toLowerCase().includes(q));
      const matchCast = movie.cast.some(c => c.toLowerCase().includes(q));
      if (!matchTitle && !matchGenre && !matchCast) return false;
    }
    if (selectedFormat !== 'All' && !movie.formats.includes(selectedFormat as any)) {
      return false;
    }
    if (selectedGenre !== 'All' && !movie.genres.includes(selectedGenre)) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Hero Spotlight Banner */}
      {featuredMovie && (
        <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-950 shadow-2xl group">
          {/* Backdrop Image with Gradient Overlays */}
          <div className="relative h-[480px] w-full">
            <img
              src={featuredMovie.backdropUrl}
              alt={featuredMovie.title}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          </div>

          {/* Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-amber-500 text-neutral-950 text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-500/20">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                Featured Premiere
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-800/90 border border-neutral-700 text-neutral-300 text-xs font-mono">
                {featuredMovie.ageRating}
              </span>
              <span className="px-2 py-0.5 rounded bg-neutral-800/90 border border-neutral-700 text-neutral-300 text-xs font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-neutral-400" />
                {featuredMovie.durationMinutes} min
              </span>
              <div className="flex items-center gap-1 text-amber-400 text-xs font-bold px-2 py-0.5 bg-neutral-900/90 border border-neutral-700 rounded">
                <Star className="w-3.5 h-3.5 fill-current" />
                {featuredMovie.rating.toFixed(1)} / 10
              </div>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-none mb-3">
              {featuredMovie.title}
            </h1>

            <p className="text-amber-200/80 italic text-sm sm:text-base font-serif mb-2">
              "{featuredMovie.tagline}"
            </p>

            <p className="text-neutral-300 text-xs sm:text-sm line-clamp-2 max-w-2xl mb-6">
              {featuredMovie.synopsis}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectMovieForBooking(featuredMovie)}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Tickets &amp; Seats</span>
              </button>

              <button
                onClick={() => onWatchTrailer(featuredMovie)}
                className="px-5 py-3 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-700 text-white font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4 text-amber-400 fill-current" />
                <span>Watch Trailer</span>
              </button>

              <button
                onClick={() => onOpenDetails(featuredMovie)}
                className="px-4 py-3 rounded-xl hover:bg-neutral-900/60 text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                <span>Full Details</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search & Filter Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl self-start">
            <button
              onClick={() => setStatusFilter('now_showing')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'now_showing'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Now Showing ({movies.filter(m => m.status === 'now_showing').length})
            </button>
            <button
              onClick={() => setStatusFilter('coming_soon')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'coming_soon'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Coming Soon ({movies.filter(m => m.status === 'coming_soon').length})
            </button>
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                statusFilter === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Films
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search movies, genres, cast, or director..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-900 border border-neutral-800 focus:border-amber-500 rounded-xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Format & Genre Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {/* Formats */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-neutral-400 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              Format:
            </span>
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all ${
                  selectedFormat === fmt
                    ? 'bg-neutral-800 text-amber-400 border-amber-500/50 shadow-sm'
                    : 'bg-neutral-900/60 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                {fmt}
              </button>
            ))}
          </div>

          {/* Genres */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-neutral-400 mr-1">Genre:</span>
            {allGenres.slice(0, 6).map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                  selectedGenre === genre
                    ? 'bg-neutral-800 text-white font-semibold'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-neutral-800 bg-neutral-900/40">
          <p className="text-base font-semibold text-white">No movies match your search criteria</p>
          <p className="text-xs text-neutral-400 mt-1">Try clearing your filters or search keyword</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedFormat('All');
              setSelectedGenre('All');
              setStatusFilter('all');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-neutral-800 text-amber-400 text-xs font-semibold hover:bg-neutral-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <div
              key={movie.id}
              className="group bg-neutral-900 border border-neutral-800 hover:border-neutral-700 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:shadow-black/60"
            >
              {/* Poster Container */}
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-950">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/40 opacity-80" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-white text-[11px] font-mono">
                    {movie.ageRating}
                  </span>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/90 text-neutral-950 text-xs font-bold shadow-md">
                    <Star className="w-3 h-3 fill-current" />
                    <span>{movie.rating.toFixed(1)}</span>
                  </div>
                </div>

                {/* Floating Trailer Play Button on Hover */}
                <button
                  onClick={() => onWatchTrailer(movie)}
                  className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500/90 text-neutral-950 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100 shadow-xl hover:bg-amber-400 cursor-pointer"
                  title="Watch Trailer"
                >
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>

                {/* Formats Pills */}
                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1 pointer-events-none">
                  {movie.formats.map((fmt) => (
                    <span
                      key={fmt}
                      className="px-1.5 py-0.5 rounded bg-neutral-950/80 backdrop-blur-sm border border-neutral-700 text-[10px] font-mono text-amber-300"
                    >
                      {fmt}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-1">
                    <span>{movie.genres.join(' • ')}</span>
                    <span>•</span>
                    <span>{movie.durationMinutes}m</span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h3>

                  <p className="text-xs text-neutral-400 line-clamp-2 mt-1.5 leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center gap-2">
                  {movie.status === 'now_showing' ? (
                    <button
                      onClick={() => onSelectMovieForBooking(movie)}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-colors"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Seats</span>
                    </button>
                  ) : (
                    <div className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 text-neutral-400 text-xs font-semibold text-center border border-neutral-700">
                      Releasing {movie.releaseDate}
                    </div>
                  )}

                  <button
                    onClick={() => onOpenDetails(movie)}
                    className="p-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    title="Movie Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
