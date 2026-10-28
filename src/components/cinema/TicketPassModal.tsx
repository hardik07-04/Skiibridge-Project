import React from 'react';
import {
  X,
  CheckCircle,
  Download,
  Printer,
  Calendar,
  Share2,
  Sparkles,
  QrCode,
  Film,
  MapPin,
  Clock,
} from 'lucide-react';
import { Booking } from '../../types';

interface TicketPassModalProps {
  booking: Booking | null;
  onClose: () => void;
  onViewAllBookings: () => void;
}

export const TicketPassModal: React.FC<TicketPassModalProps> = ({
  booking,
  onClose,
  onViewAllBookings,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="max-w-lg w-full flex flex-col items-center my-4 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Success Banner */}
        <div className="flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
          <CheckCircle className="w-4 h-4" />
          <span>Booking Confirmed &amp; Seats Reserved</span>
        </div>

        {/* Perforated Cinema Boarding Pass Ticket */}
        <div className="w-full bg-neutral-900 border border-neutral-700/80 rounded-3xl overflow-hidden shadow-2xl relative text-neutral-100">
          {/* Ticket Header */}
          <div className="relative p-6 bg-gradient-to-br from-amber-600/30 via-neutral-900 to-neutral-950 border-b border-neutral-800">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold block mb-1">
                  IMovies Official Digital Pass
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {booking.movieTitle}
                </h2>
                <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
                  <span>{booking.format}</span>
                  <span>•</span>
                  <span>{booking.movieDuration}m</span>
                  <span>•</span>
                  <span>{booking.movieAgeRating}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Ticket Body Metadata */}
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Cinema &amp; Hall
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {booking.theaterName}
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  {booking.screenName}
                </span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Date &amp; Time
                </span>
                <span className="text-xs font-bold text-white block mt-0.5">
                  {booking.showtimeDate}
                </span>
                <span className="text-xs text-emerald-400 font-bold font-mono">
                  {booking.showtimeTime}
                </span>
              </div>
            </div>

            {/* Reserved Seats & Holder */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Reserved Seats ({booking.seats.length})
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {booking.seats.map((s) => (
                    <span
                      key={s.id}
                      className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-mono font-black"
                    >
                      {s.row}{s.number}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase font-mono text-neutral-400 block">
                  Ticket Holder
                </span>
                <span className="text-xs font-semibold text-white block mt-1 truncate">
                  {booking.customerName}
                </span>
                <span className="text-[11px] text-neutral-400 block truncate">
                  {booking.customerEmail}
                </span>
              </div>
            </div>

            {/* Concessions if any */}
            {booking.concessions.length > 0 && (
              <div className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs">
                <span className="text-[10px] uppercase font-mono text-amber-400/90 block mb-1">
                  Concession Pick-up Counter Voucher
                </span>
                <div className="text-neutral-300 font-mono text-[11px]">
                  {booking.concessions.map((c) => `${c.name} (x${c.quantity})`).join(', ')}
                </div>
              </div>
            )}
          </div>

          {/* Perforated Divider Line */}
          <div className="relative py-2 flex items-center justify-between">
            <div className="w-5 h-7 bg-neutral-950 rounded-r-full -ml-1 border-r border-t border-b border-neutral-700/60" />
            <div className="flex-1 border-b-2 border-dashed border-neutral-700 mx-2" />
            <div className="w-5 h-7 bg-neutral-950 rounded-l-full -mr-1 border-l border-t border-b border-neutral-700/60" />
          </div>

          {/* Ticket Stub / QR Verification Section */}
          <div className="p-6 bg-neutral-950 flex flex-col items-center text-center">
            {/* Visual High-Contrast QR Code */}
            <div className="p-3 bg-white rounded-2xl shadow-lg border-2 border-amber-500/40">
              {/* Scalable SVG QR Matrix pattern */}
              <svg
                viewBox="0 0 100 100"
                className="w-36 h-36"
                shapeRendering="crispEdges"
              >
                <rect width="100" height="100" fill="#FFFFFF" />
                {/* QR corner anchors */}
                <rect x="10" y="10" width="24" height="24" fill="#000000" />
                <rect x="14" y="14" width="16" height="16" fill="#FFFFFF" />
                <rect x="18" y="18" width="8" height="8" fill="#000000" />

                <rect x="66" y="10" width="24" height="24" fill="#000000" />
                <rect x="70" y="14" width="16" height="16" fill="#FFFFFF" />
                <rect x="74" y="18" width="8" height="8" fill="#000000" />

                <rect x="10" y="66" width="24" height="24" fill="#000000" />
                <rect x="14" y="70" width="16" height="16" fill="#FFFFFF" />
                <rect x="18" y="74" width="8" height="8" fill="#000000" />

                {/* Simulated QR Payload matrix */}
                <rect x="38" y="12" width="6" height="6" fill="#000000" />
                <rect x="48" y="14" width="6" height="4" fill="#000000" />
                <rect x="40" y="24" width="8" height="6" fill="#000000" />
                <rect x="52" y="22" width="6" height="6" fill="#000000" />
                <rect x="12" y="38" width="6" height="6" fill="#000000" />
                <rect x="24" y="44" width="6" height="6" fill="#000000" />
                <rect x="38" y="38" width="12" height="12" fill="#000000" />
                <rect x="56" y="38" width="6" height="8" fill="#000000" />
                <rect x="70" y="38" width="8" height="6" fill="#000000" />
                <rect x="82" y="44" width="6" height="8" fill="#000000" />
                <rect x="38" y="56" width="6" height="6" fill="#000000" />
                <rect x="48" y="54" width="8" height="8" fill="#000000" />
                <rect x="62" y="56" width="6" height="6" fill="#000000" />
                <rect x="76" y="56" width="10" height="6" fill="#000000" />
                <rect x="38" y="68" width="8" height="6" fill="#000000" />
                <rect x="52" y="70" width="6" height="8" fill="#000000" />
                <rect x="68" y="68" width="6" height="6" fill="#000000" />
                <rect x="80" y="74" width="8" height="8" fill="#000000" />
                <rect x="44" y="82" width="12" height="6" fill="#000000" />
                <rect x="62" y="80" width="6" height="8" fill="#000000" />
              </svg>
            </div>

            <div className="mt-3">
              <span className="text-[10px] uppercase font-mono text-neutral-400">
                Booking Reference Code
              </span>
              <div className="text-xl font-mono font-black text-amber-400 tracking-wider">
                {booking.referenceCode}
              </div>
              <span className="text-[10px] text-neutral-400 block mt-0.5">
                Scan at Auditorium Gate for Express Entry
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Below Pass */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4 w-full">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Pass</span>
          </button>

          <button
            onClick={onViewAllBookings}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Go to My Tickets</span>
          </button>
        </div>
      </div>
    </div>
  );
};
