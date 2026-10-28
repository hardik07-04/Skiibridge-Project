import React, { useState } from 'react';
import {
  X,
  CreditCard,
  CheckCircle,
  Tag,
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Banknote,
  Sparkles,
  Ticket,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  Movie,
  Theater,
  Showtime,
  Seat,
  ConcessionItem,
  User,
  Booking,
} from '../../types';

interface CheckoutModalProps {
  movie: Movie;
  theater: Theater;
  showtime: Showtime;
  selectedSeats: Seat[];
  concessionItems: ConcessionItem[];
  selectedConcessions: Record<string, number>;
  currentUser: User;
  onClose: () => void;
  onBackToConcessions: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  movie,
  theater,
  showtime,
  selectedSeats,
  concessionItems,
  selectedConcessions,
  currentUser,
  onClose,
  onBackToConcessions,
  onBookingSuccess,
}) => {
  const [customerName, setCustomerName] = useState(currentUser.name);
  const [customerEmail, setCustomerEmail] = useState(currentUser.email);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone || '+1 (555) 234-8901');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'apple_pay' | 'google_pay' | 'cash'>('apple_pay');

  // Promo code state
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState<number>(0);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Card details
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('888');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculation
  const seatsSubtotal = selectedSeats.reduce((sum, s) => sum + s.price, 0);
  const snacksList = concessionItems
    .filter((item) => (selectedConcessions[item.id] || 0) > 0)
    .map((item) => ({
      id: item.id,
      name: item.name,
      quantity: selectedConcessions[item.id] || 0,
      unitPrice: item.price,
    }));

  const snacksSubtotal = snacksList.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const bookingFee = selectedSeats.length * 1.50;
  const rawSubtotal = seatsSubtotal + snacksSubtotal + bookingFee;
  const discountAmount = promoDiscount;
  const taxableAmount = Math.max(0, rawSubtotal - discountAmount);
  const tax = Number((taxableAmount * 0.08875).toFixed(2));
  const totalPrice = Number((taxableAmount + tax).toFixed(2));

  const handleApplyPromo = () => {
    setPromoError(null);
    const code = promoCode.trim().toUpperCase();
    if (code === 'IMOVIES50') {
      const disc = Number((rawSubtotal * 0.5).toFixed(2));
      setPromoDiscount(disc);
      setAppliedPromo('IMOVIES50 (50% Off)');
    } else if (code === 'POPCORNFREE') {
      setPromoDiscount(8.50);
      setAppliedPromo('POPCORNFREE ($8.50 Off)');
    } else {
      setPromoError('Invalid promo code. Try "IMOVIES50" or "POPCORNFREE".');
    }
  };

  const handleSubmitBooking = async () => {
    setIsProcessing(true);

    // Simulate server-side atomic reservation with MongoDB session
    setTimeout(() => {
      // Fire confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#10B981', '#3B82F6', '#FFFFFF'],
        });
      } catch (e) {
        // Safe fallback if confetti isn't supported
      }

      const refCode = `IMV-${Math.floor(1000 + Math.random() * 9000)}-${theater.city.slice(0, 2).toUpperCase()}`;
      const seatLabels = selectedSeats.map((s) => `${s.row}${s.number}`).join(',');

      const newBooking: Booking = {
        id: `book_${Date.now()}`,
        referenceCode: refCode,
        userId: currentUser.id,
        customerName: customerName.trim() || 'Moviegoer',
        customerEmail: customerEmail.trim() || 'guest@imovies.com',
        customerPhone: customerPhone.trim() || '+1 (555) 000-0000',
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.posterUrl,
        movieDuration: movie.durationMinutes,
        movieAgeRating: movie.ageRating,
        theaterId: theater.id,
        theaterName: theater.name,
        screenName: showtime.screenName,
        showtimeId: showtime.id,
        showtimeDate: showtime.date,
        showtimeTime: showtime.time,
        format: showtime.format,
        seats: selectedSeats.map((s) => ({
          id: s.id,
          row: s.row,
          number: s.number,
          tier: s.tier,
          price: s.price,
        })),
        concessions: snacksList,
        subtotal: seatsSubtotal + snacksSubtotal,
        tax,
        bookingFee,
        discount: discountAmount,
        totalPrice,
        paymentMethod,
        paymentStatus: 'paid',
        bookingStatus: 'confirmed',
        createdAt: new Date().toISOString(),
        qrCodeData: `${refCode}|${movie.id}|${seatLabels}|${showtime.date}T${showtime.time}`,
      };

      setIsProcessing(false);
      onBookingSuccess(newBooking);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-4 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToConcessions}
              className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <Ticket className="w-5 h-5 text-amber-400" />
                Checkout &amp; Ticket Issuance
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Atomic reservation secured with 256-bit SSL encryption
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Customer Info & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details Form */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center justify-between">
                <span>1. Customer &amp; Ticket Holder Details</span>
                <span className="text-[10px] font-mono text-emerald-400">Persona: {currentUser.role}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-neutral-400 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-neutral-400 block mb-1">Email (Ticket QR will be sent here)</label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                2. Select Payment Method
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple_pay')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'apple_pay'
                      ? 'bg-amber-500/10 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-5 h-5 text-amber-400" />
                  <span className="text-xs">Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('google_pay')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'google_pay'
                      ? 'bg-amber-500/10 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <span className="text-xs">Google Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('credit_card')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all ${
                    paymentMethod === 'credit_card'
                      ? 'bg-amber-500/10 border-amber-500 text-white font-bold ring-1 ring-amber-500/30'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-amber-400" />
                  <span className="text-xs">Card</span>
                </button>

                {(currentUser.role === 'cashier' || currentUser.role === 'manager' || currentUser.role === 'admin') && (
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`col-span-2 sm:col-span-3 p-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs">Box Office Counter Cash Payment (Staff Override)</span>
                  </button>
                )}
              </div>

              {/* Credit Card Input fields if card chosen */}
              {paymentMethod === 'credit_card' && (
                <div className="pt-2 space-y-3 animate-in fade-in duration-200">
                  <div>
                    <label className="text-[11px] text-neutral-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">Expires</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-neutral-400 block mb-1">CVV Security</label>
                      <input
                        type="password"
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Promo Code Coupon */}
            <div className="p-4 rounded-2xl bg-neutral-900/60 border border-neutral-800">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-400" />
                <span>Promo Code / Voucher</span>
              </label>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Try IMOVIES50 or POPCORNFREE"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-xl text-xs uppercase font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </div>

              {appliedPromo && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Promo active: {appliedPromo}</span>
                </div>
              )}
              {promoError && (
                <div className="text-xs text-red-400 mt-2">{promoError}</div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Ledger */}
          <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-800">
                Order Summary
              </h3>

              {/* Movie info snippet */}
              <div className="flex gap-3 mb-4">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-12 h-16 rounded-lg object-cover shrink-0 border border-neutral-800"
                />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-white truncate">{movie.title}</div>
                  <div className="text-xs text-neutral-400 truncate">{theater.name}</div>
                  <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">
                    {showtime.date} • {showtime.time} ({showtime.format})
                  </div>
                </div>
              </div>

              {/* Line Items */}
              <div className="space-y-2.5 text-xs border-t border-neutral-800 pt-3">
                <div className="flex items-center justify-between text-neutral-300">
                  <span>Seats ({selectedSeats.map((s) => `${s.row}${s.number}`).join(', ')})</span>
                  <span className="font-mono">${seatsSubtotal.toFixed(2)}</span>
                </div>

                {snacksList.map((snack) => (
                  <div key={snack.id} className="flex items-center justify-between text-neutral-400">
                    <span className="truncate pr-2">
                      {snack.name} (x{snack.quantity})
                    </span>
                    <span className="font-mono shrink-0">
                      ${(snack.unitPrice * snack.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-between text-neutral-400">
                  <span>Auditorium Facility Fee</span>
                  <span className="font-mono">${bookingFee.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-400 font-semibold">
                    <span>Discount Coupon</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-neutral-400">
                  <span>City Entertainment Tax (8.875%)</span>
                  <span className="font-mono">${tax.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-neutral-800 mt-6 space-y-4">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                  Total Amount Due
                </span>
                <span className="text-2xl font-black text-amber-400 font-mono">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                disabled={isProcessing}
                onClick={handleSubmitBooking}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                  isProcessing
                    ? 'bg-amber-500/50 text-neutral-900 cursor-wait'
                    : 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/25 hover:scale-[1.01] cursor-pointer'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    <span>Processing Atomic Transaction...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ${totalPrice.toFixed(2)} &amp; Issue Ticket</span>
                  </>
                )}
              </button>

              <p className="text-[10px] text-center text-neutral-400">
                Tickets are 100% refundable up to 2 hours before scheduled screening time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
