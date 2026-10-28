import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize2,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Film,
  Calendar,
  Armchair,
  Popcorn,
  CreditCard,
  QrCode,
  LayoutDashboard,
  CheckCircle,
} from 'lucide-react';
import { DEMO_CHAPTERS } from '../../data/mockData';

interface DemoVideoTourProps {
  onLaunchLiveWalkthrough: () => void;
}

export const DemoVideoTour: React.FC<DemoVideoTourProps> = ({ onLaunchLiveWalkthrough }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Auto-progress simulation when playing
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgressPercent((prev) => {
          if (prev >= 100) {
            // Move to next chapter or loop
            if (currentChapterIndex < DEMO_CHAPTERS.length - 1) {
              setCurrentChapterIndex(idx => idx + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return prev + (1.2 * playbackSpeed);
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentChapterIndex, playbackSpeed]);

  const activeChapter = DEMO_CHAPTERS[currentChapterIndex] || DEMO_CHAPTERS[0];

  const handleSelectChapter = (index: number) => {
    setCurrentChapterIndex(index);
    setProgressPercent(0);
    setIsPlaying(true);
  };

  // Render high-fidelity mock frame corresponding to active chapter
  const renderChapterVisual = () => {
    switch (currentChapterIndex) {
      case 0:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Film className="w-4 h-4" /> SCENE 1: DISCOVERY &amp; TRAILERS
              </span>
              <span>FILTER: IMAX 3D, DOLBY ATMOS</span>
            </div>

            <div className="flex gap-6 items-center">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80"
                alt="Poster"
                className="w-32 h-44 rounded-2xl object-cover shadow-2xl border-2 border-amber-500/50"
              />
              <div className="space-y-2">
                <span className="px-2 py-0.5 rounded bg-amber-500 text-neutral-950 text-xs font-black">
                  NOW SHOWING
                </span>
                <h3 className="text-2xl font-black text-white">Interstellar Horizons</h3>
                <p className="text-xs text-neutral-300 max-w-md">
                  Christopher Nolan's space odyssey screening in pristine dual 4K laser projection with uncompressed 12-channel audio.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-xs text-neutral-300 font-mono">PG-13</span>
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-xs text-neutral-300 font-mono">169 min</span>
                  <span className="text-xs font-bold text-amber-400">★ 8.9 / 10 IMDb</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "Patrons browse upcoming releases, filter by IMAX or Dolby Atmos, and preview official HD trailers in sub-second latency."</span>
              <span className="text-[10px] font-mono text-amber-400">00:00 / 04:30</span>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-blue-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Calendar className="w-4 h-4" /> SCENE 2: THEATER &amp; SHOWTIME SELECTION
              </span>
              <span>DATE: OCT 28, 2026</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-neutral-900 border border-amber-500 text-left">
                <div className="text-sm font-bold text-white">Grand Luxe Cinema</div>
                <div className="text-xs text-neutral-400">Midtown Manhattan</div>
                <div className="text-lg font-black text-amber-400 font-mono mt-2">07:30 PM</div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">IMAX Laser • $20.50</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left opacity-60">
                <div className="text-sm font-bold text-white">Dolby Multiplex West</div>
                <div className="text-xs text-neutral-400">Times Square</div>
                <div className="text-lg font-black text-neutral-300 font-mono mt-2">08:15 PM</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-1">4DX Motion • $17.50</div>
              </div>
              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-left opacity-60">
                <div className="text-sm font-bold text-white">Waterfront Palladium</div>
                <div className="text-xs text-neutral-400">Brooklyn Heights</div>
                <div className="text-lg font-black text-neutral-300 font-mono mt-2">09:00 PM</div>
                <div className="text-[11px] text-neutral-400 font-mono mt-1">Dolby Atmos • $18.00</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "The client queries MongoDB compound indexes to display real-time hall capacities, projection formats, and dynamic base prices."</span>
              <span className="text-[10px] font-mono text-blue-400">00:45 / 04:30</span>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Armchair className="w-4 h-4" /> SCENE 3: REAL-TIME SEAT RESERVATION &amp; LOCK
              </span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                TTL HOLD: 04:52 REMAINING
              </span>
            </div>

            {/* Visual Curved Seat Mini Grid */}
            <div className="flex flex-col items-center">
              <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] mb-6 text-center">
                <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest -mt-4 block">
                  Curved IMAX Screen
                </span>
              </div>

              <div className="flex gap-2">
                {['F4', 'F5', 'F6', 'F7', 'F8', 'F9'].map((s) => (
                  <div
                    key={s}
                    className={`w-10 h-10 rounded-xl border flex flex-col items-center justify-center font-mono text-xs ${
                      s === 'F7' || s === 'F8'
                        ? 'bg-emerald-500 text-neutral-950 font-bold border-emerald-400 ring-2 ring-emerald-400/50 shadow-lg'
                        : s === 'F5'
                        ? 'bg-neutral-800 text-neutral-600 border-neutral-700'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-700'
                    }`}
                  >
                    <span>{s}</span>
                    <span className="text-[8px]">{s === 'F7' || s === 'F8' ? 'VIP' : '$19'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "Atomic Redis locks prevent double booking by leasing seats for 300 seconds, with live updates pushed via WebSockets."</span>
              <span className="text-[10px] font-mono text-emerald-400">01:30 / 04:30</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span className="flex items-center gap-1.5 font-bold">
                <Popcorn className="w-4 h-4" /> SCENE 4: CONCESSIONS &amp; COMBO UPSELL
              </span>
              <span>PRE-ORDER PICKUP</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  🍿
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Artisan Warm Butter Popcorn</div>
                  <div className="text-[11px] text-amber-400 font-mono">$8.50 • 680 kcal</div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-amber-500/50 flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                  🥤
                </div>
                <div>
                  <div className="text-xs font-bold text-white">IMAX Ultimate Duo Combo</div>
                  <div className="text-[11px] text-emerald-400 font-mono">$19.99 (Save 25%)</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "Moviegoers pre-order cinema snacks to skip the counter line, increasing theater ancillary concession revenues by 35%."</span>
              <span className="text-[10px] font-mono text-purple-400">02:15 / 04:30</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400">
              <span className="flex items-center gap-1.5 font-bold">
                <CreditCard className="w-4 h-4" /> SCENE 5: CHECKOUT &amp; VOUCHER REDEMPTION
              </span>
              <span>PROMO: IMOVIES50 ACTIVE</span>
            </div>

            <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
              <div>
                <div className="text-xs text-neutral-400">Total Calculated Invoice</div>
                <div className="text-2xl font-black text-amber-400 font-mono">$39.40</div>
                <div className="text-[11px] text-emerald-400 font-mono">Includes Promo Code IMOVIES50 (50% Off)</div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs">
                Apple Pay / 1-Touch Confirm
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "The Express controller wraps the payment gateway charge and MongoDB document writes inside an atomic replica set transaction."</span>
              <span className="text-[10px] font-mono text-amber-400">03:00 / 04:30</span>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="flex items-center gap-1.5 font-bold">
                <QrCode className="w-4 h-4" /> SCENE 6: E-TICKET &amp; QR CRYPTOGRAPHIC PASS
              </span>
              <span>REF: IMV-8942-NY</span>
            </div>

            <div className="flex items-center justify-center gap-6">
              <div className="p-3 bg-white rounded-xl shadow-2xl">
                <div className="w-24 h-24 bg-neutral-950 flex items-center justify-center text-white font-mono text-xs text-center p-2">
                  [SCANNABLE QR CODE]
                </div>
              </div>
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold">IMOVIES GOLDEN PASS</span>
                <h4 className="text-lg font-black text-white">Interstellar Horizons</h4>
                <div className="text-xs text-neutral-300">Auditorium 1 • Seats F7, F8</div>
                <div className="text-xs text-emerald-400 font-mono mt-1">HMAC SHA-256 Validated</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "Usher gates scan the digital pass QR code. The system checks digital signatures to prevent counterfeiting or duplicate entries."</span>
              <span className="text-[10px] font-mono text-emerald-400">03:45 / 04:30</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
            <div className="flex items-center justify-between text-xs font-mono text-purple-400">
              <span className="flex items-center gap-1.5 font-bold">
                <LayoutDashboard className="w-4 h-4" /> SCENE 7: CINEMA OPERATIONS &amp; TELEMETRY
              </span>
              <span>MANAGER DASHBOARD</span>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400">Gross Box Office</span>
                <div className="text-xl font-black text-white font-mono mt-1">$4,850.00</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400">Occupancy Rate</span>
                <div className="text-xl font-black text-amber-400 font-mono mt-1">74.2%</div>
              </div>
              <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800">
                <span className="text-[10px] text-neutral-400">Active Screens</span>
                <div className="text-xl font-black text-emerald-400 font-mono mt-1">8 Halls</div>
              </div>
            </div>

            <div className="p-3 bg-neutral-950/80 rounded-xl border border-neutral-800 text-xs text-neutral-300 flex items-center justify-between">
              <span>Voiceover: "Managers inspect live auditorium utilization, toggle broken seats for maintenance, and cashiers dispatch walk-in POS sales."</span>
              <span className="text-[10px] font-mono text-purple-400">04:30 / 04:30</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Film className="w-6 h-6 text-red-500" />
            <span>Interactive Demo Video &amp; System Walkthrough</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Simulated video walkthrough covering all core user and administrative cinema journeys
          </p>
        </div>

        {/* Live Walkthrough CTA */}
        <button
          onClick={onLaunchLiveWalkthrough}
          className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition-transform hover:scale-105"
        >
          <Sparkles className="w-4 h-4 fill-current" />
          <span>Launch Live Interactive Walkthrough</span>
        </button>
      </div>

      {/* Simulated 16:9 Video Frame */}
      <div className="rounded-3xl bg-neutral-950 border border-neutral-800 overflow-hidden shadow-2xl relative flex flex-col">
        {/* Video Screen Content */}
        <div className="relative aspect-[16/9] w-full bg-neutral-950 overflow-hidden flex items-center justify-center">
          {renderChapterVisual()}

          {/* Central Play/Pause Watermark Overlay when paused */}
          {!isPlaying && (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-neutral-950 flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer"
            >
              <Play className="w-7 h-7 fill-current ml-1" />
            </button>
          )}
        </div>

        {/* Video Scrubber Timeline Bar */}
        <div className="relative w-full h-2 bg-neutral-800 cursor-pointer group">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-100"
            style={{
              width: `${((currentChapterIndex * 100) / DEMO_CHAPTERS.length) + (progressPercent / DEMO_CHAPTERS.length)}%`,
            }}
          />
        </div>

        {/* Player Controls Bar */}
        <div className="p-4 bg-neutral-900 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => {
                setProgressPercent(0);
                setCurrentChapterIndex(0);
                setIsPlaying(true);
              }}
              className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
              title="Restart Video"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="text-xs font-mono text-neutral-300 ml-2">
              <span className="text-amber-400 font-bold">{activeChapter.time}</span>
              <span className="text-neutral-500"> / 04:30</span>
            </div>
          </div>

          {/* Active Chapter Title in Controller */}
          <div className="text-xs font-bold text-white hidden md:block">
            {activeChapter.title}
          </div>

          <div className="flex items-center gap-2">
            {/* Speed toggle */}
            <button
              onClick={() => setPlaybackSpeed(s => (s === 1 ? 1.5 : s === 1.5 ? 2 : 1))}
              className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300"
            >
              {playbackSpeed}x Speed
            </button>

            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Chapters Carousel */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
          Video Chapter Index (Click to jump)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {DEMO_CHAPTERS.map((ch, idx) => {
            const isSelected = currentChapterIndex === idx;

            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(idx)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-amber-500/10 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                    : 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 mb-1">
                  <span>{ch.time}</span>
                  {isSelected && <span className="text-[10px] text-emerald-400 font-bold">PLAYING</span>}
                </div>
                <div className="text-xs font-bold text-white line-clamp-1">{ch.title}</div>
                <div className="text-[10px] text-neutral-400 line-clamp-2 mt-1">{ch.description}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
