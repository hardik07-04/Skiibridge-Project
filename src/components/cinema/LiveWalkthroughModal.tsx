import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  Pause,
  Film,
  Calendar,
  Armchair,
  Popcorn,
  CreditCard,
  QrCode,
  Layers,
  Database,
} from 'lucide-react';

interface LiveWalkthroughModalProps {
  onClose: () => void;
  onNavigateTo: (tab: 'cinema' | 'docs' | 'demo' | 'bookings' | 'admin', subTab?: string) => void;
  onAutoTriggerBooking: () => void;
}

export const LiveWalkthroughModal: React.FC<LiveWalkthroughModalProps> = ({
  onClose,
  onNavigateTo,
  onAutoTriggerBooking,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const steps = [
    {
      title: '1. Movie Catalog & Format Filtering',
      icon: Film,
      description: 'IMovies offers seamless browsing with HD trailers, ratings, and format badges (IMAX 3D, Dolby Atmos, 4DX).',
      actionText: 'Inspect Movie Catalog',
      navigateTab: 'cinema' as const,
      highlight: 'Discover blockbusters and watch trailer popups.',
    },
    {
      title: '2. Theater Location & Showtime Picker',
      icon: Calendar,
      description: 'Select local multiplexes, screening dates, and times with real-time seat availability gauges.',
      actionText: 'Open Showtimes',
      navigateTab: 'cinema' as const,
      highlight: 'Calculates live available seats per hall.',
    },
    {
      title: '3. Interactive Auditorium Seat Reservation',
      icon: Armchair,
      description: 'Select VIP Ultra Recliners, Prime Acoustic Center, or Standard seats with a 5-minute atomic concurrency hold.',
      actionText: 'Experience Seat Selection',
      navigateTab: 'cinema' as const,
      highlight: 'Eliminates double-booking race conditions.',
    },
    {
      title: '4. Concessions & Combo Customization',
      icon: Popcorn,
      description: 'Pre-order Artisan Warm Butter Popcorn, Combos, and Craft Sodas to skip the counter queue.',
      actionText: 'View Concession Menu',
      navigateTab: 'cinema' as const,
      highlight: 'Increases cinema ancillary revenues.',
    },
    {
      title: '5. Fast Checkout & E-Ticket QR Issuance',
      icon: QrCode,
      description: 'Apply coupon code "IMOVIES50" for 50% discount and instantly receive an HMAC-signed digital boarding pass with a scannable QR code.',
      actionText: 'View Generated Tickets',
      navigateTab: 'bookings' as const,
      highlight: 'Generates tamper-evident boarding pass.',
    },
    {
      title: '6. Engineering Docs, ER Diagram & MVC Patterns',
      icon: Database,
      description: 'Explore the full technical documentation suite including interactive ER diagrams, Express API architecture, RBAC matrix, and MVC code.',
      actionText: 'Explore System Architecture',
      navigateTab: 'docs' as const,
      highlight: 'Complete production-grade engineering documentation.',
    },
  ];

  const active = steps[currentStep];

  useEffect(() => {
    let timer: any;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev < steps.length - 1) {
            const next = prev + 1;
            onNavigateTo(steps[next].navigateTab);
            return next;
          } else {
            setIsAutoPlaying(false);
            return prev;
          }
        });
      }, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, onNavigateTo, steps]);

  const handleStepChange = (index: number) => {
    setCurrentStep(index);
    onNavigateTo(steps[index].navigateTab);
  };

  const handleExecuteAction = () => {
    if (currentStep === 2 || currentStep === 1) {
      onClose();
      onAutoTriggerBooking();
    } else {
      onNavigateTo(active.navigateTab);
      onClose();
    }
  };

  const Icon = active.icon;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-neutral-900/95 backdrop-blur-xl border-2 border-amber-500/70 rounded-3xl p-5 shadow-2xl text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider block">
                Guided Interactive Tour ({currentStep + 1} of {steps.length})
              </span>
              <h4 className="text-xs font-bold text-white leading-tight">{active.title}</h4>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
              title={isAutoPlaying ? 'Pause Auto Tour' : 'Auto Play Tour'}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Step Body */}
        <div className="py-3 space-y-2">
          <p className="text-xs text-neutral-300 leading-relaxed">{active.description}</p>
          <div className="p-2 rounded-xl bg-neutral-950/80 border border-neutral-800 text-[11px] text-amber-400/90 font-mono">
            ★ {active.highlight}
          </div>
        </div>

        {/* Action Button & Step Controls */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            onClick={handleExecuteAction}
            className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 transition-colors"
          >
            <span>{active.actionText}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1">
            <button
              disabled={currentStep === 0}
              onClick={() => handleStepChange(currentStep - 1)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 disabled:opacity-40"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={currentStep === steps.length - 1}
              onClick={() => handleStepChange(currentStep + 1)}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 disabled:opacity-40"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
