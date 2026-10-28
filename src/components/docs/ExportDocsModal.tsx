import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Sparkles } from 'lucide-react';

interface ExportDocsModalProps {
  onClose: () => void;
}

export const ExportDocsModal: React.FC<ExportDocsModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);

  const markdownContent = `# IMovies: Seamless Online Cinema Booking Platform
## Complete Technical Architecture & System Documentation

---

### 1. Executive Summary
**IMovies** is an enterprise-grade cinema booking platform engineered with a high-performance **Express.js and MongoDB** client-server architecture. It provides moviegoers with seamless movie browsing, theater selection, dynamic pricing, and **real-time seat availability tracking with atomic 5-minute concurrency holds** to prevent double-booking.

---

### 2. Core Features Breakdown

#### A. Cinema Booking Engine
- **Rich Media Discovery:** HD posters, trailer previews, age ratings, IMDb scores, duration, and format badges (IMAX 3D, Dolby Atmos, 4DX).
- **Multi-Theater & Showtime Filtering:** Dynamic date pickers with live hall occupancy gauges.
- **Dynamic Tiered Pricing:** VIP Ultra Recliners ($24.50), Prime Acoustic Center ($19.50), Standard ($16.00), ADA Wheelchair ($14.00).
- **Concessions & Combos:** In-app snack bar pre-ordering with automated bundle discounts.

#### B. Real-Time Seat Availability & Concurrency Lock
- **Atomic 5-Minute Hold:** Distributed lock lease (\`lockExpiresAt\` timestamp with Redis/Mongo TTL) to eliminate race conditions.
- **WebSocket Broadcast:** Instant seat map synchronization across all active patrons.
- **MongoDB Transactions:** Multi-document sessions (\`session.withTransaction()\`) ensure payment and seat reservations are committed atomically.

#### C. Identity, Security & E-Ticketing
- **JWT Authentication & RBAC Guard:** Stateless tokens with HTTP-only cookies and bcrypt password salting.
- **Cryptographic QR Passports:** HMAC SHA-256 signed digital boarding passes with booking reference (\`IMV-XXXX-XX\`).
- **Self-Service Refunds:** Automated cancellation and seat release prior to showtime.

---

### 3. Roles and Responsibilities (RBAC Matrix)

| Module / Resource | Customer | Cashier / Usher | Theater Manager | System Admin |
| :--- | :---: | :---: | :---: | :---: |
| **Movie Catalog** | Read | Read | Read / Write | Full (CRUD) |
| **Showtimes** | Read | Read | Read / Write / Delete | Full (CRUD) |
| **Seat Locking (TTL)** | Read / Write | Read / Write | Override | Full (CRUD) |
| **Bookings** | Read (Own) / Cancel | Read / Create / Check-in | Read / Write / Refund | Full (CRUD) |
| **Concessions** | Read / Order | Read / Create | Read / Update Menu | Full (CRUD) |
| **Hall Occupancy KPIs** | None | None | Read / Export | Full (CRUD) |
| **Database & Audits** | None | None | None | Full (CRUD) |

---

### 4. Entity-Relationship (ER) Diagram Specification

#### Entities & MongoDB Collections:
1. **User (\`users\`):** \`_id\`, \`name\`, \`email\` (unique), \`passwordHash\`, \`role\`, \`phone\`, \`createdAt\`
2. **Movie (\`movies\`):** \`_id\`, \`title\` (indexed), \`synopsis\`, \`durationMinutes\`, \`ageRating\`, \`genres\`, \`posterUrl\`, \`status\`
3. **Theater (\`theaters\`):** \`_id\`, \`name\`, \`city\` (indexed), \`address\`, \`screens\`
4. **Screen (\`screens\`):** \`_id\`, \`theaterId\` [FK], \`name\`, \`totalSeats\`, \`rows\`, \`cols\`
5. **Showtime (\`showtimes\`):** \`_id\`, \`movieId\` [FK], \`screenId\` [FK], \`startTime\` (indexed), \`format\`, \`basePrice\`
6. **SeatLock (\`seat_locks\`):** \`_id\`, \`showtimeId\` [FK], \`row\`, \`number\`, \`tier\`, \`status\`, \`expiresAt\` (TTL Index)
7. **Booking (\`bookings\`):** \`_id\`, \`referenceCode\` (unique), \`userId\` [FK], \`showtimeId\` [FK], \`seats\` [Array], \`totalPrice\`, \`qrCodeSignature\`
8. **Payment (\`payments\`):** \`_id\`, \`bookingId\` [FK], \`method\`, \`amount\`, \`status\`, \`paidAt\`

#### Relational Cardinalities:
- **Theater (1) -> (N) Screen**
- **Screen (1) -> (N) Showtime**
- **Movie (1) -> (N) Showtime**
- **Showtime (1) -> (N) SeatLock / Seat**
- **User (1) -> (N) Booking**
- **Booking (1) -> (1) Payment**

---

### 5. Technical Architecture
1. **Client Presentation Tier:** React 19 SPA, TypeScript, Tailwind CSS, SVG Auditorium visualizer, WebSocket client.
2. **API Gateway & Security:** Express.js 4.x Router, JWT auth guard, Rate limiter, Helmet, CORS.
3. **Business Logic & Concurrency:** Concurrency Lock Controller (atomic 300s lease), Booking Transaction Orchestrator, HMAC QR generator.
4. **Data Persistence Tier:** MongoDB Atlas with Mongoose ODM, In-memory Redis Cache, Stripe Payment Gateway.

---

### 6. User Flow & State Machine
1. **Discovery:** Browse Now Showing / Coming Soon -> Filter Formats -> Watch Trailer.
2. **Scheduling:** Select Cinema Location -> Pick Date -> Select Showtime.
3. **Seat Reservation:** View Curved Screen Layout -> Tap Seats -> 5-Minute Atomic Hold Activated.
4. **Concessions:** Add Popcorn, Nachos, Combos, Sodas -> Bundle Discount Applied.
5. **Checkout & Auth:** Review Invoice -> Enter Promo Code -> Settle Payment (Apple Pay / Card).
6. **Fulfillment:** Instant Digital Pass with QR Code -> Gate Usher Scanning.

---

### 7. Model-View-Controller (MVC) Implementation
- **Model:** \`server/models/Movie.js\`, \`server/models/Booking.js\`, \`server/models/Showtime.js\` (Mongoose Schema definition, validation, indexes).
- **View:** \`src/components/cinema/SeatMap.tsx\`, \`TicketPassModal.tsx\`, \`MovieCatalog.tsx\` (React user interface).
- **Controller:** \`server/controllers/bookingController.js\`, \`seatLockController.js\` (Express request routing, transactions, and Redis locking).

---

### 8. Quickstart & Setup Guide
\`\`\`bash
# 1. Clone repository
git clone https://github.com/imovies/imovies-cinema-platform.git
cd imovies-cinema-platform

# 2. Install dependencies
npm install

# 3. Configure environment variables (.env)
PORT=3000
MONGODB_URI="mongodb+srv://<user>:<pwd>@cluster0.mongodb.net/imovies"
REDIS_URL="redis://localhost:6379"
JWT_SECRET="super-secure-jwt-key"

# 4. Launch development server
npm run dev
\`\`\`
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'IMovies_System_Documentation.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl relative my-4 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Export Technical Documentation
                <span className="text-xs font-mono text-amber-400 px-2 py-0.5 rounded bg-amber-400/10 border border-amber-500/30">
                  Markdown (.md)
                </span>
              </h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Complete engineering specification, ER schemas, architecture, and MVC documentation
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

        {/* Content Body Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-neutral-950 font-mono text-xs text-neutral-300 leading-relaxed space-y-4">
          <pre className="whitespace-pre-wrap">{markdownContent}</pre>
        </div>

        {/* Actions Footer */}
        <div className="p-4 sm:p-6 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between shrink-0">
          <div className="text-xs text-neutral-400">
            Ready for project submission, README.md, or architecture reviews.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold flex items-center gap-2 transition-colors border border-neutral-700"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-400" />
                  <span>Copy Markdown</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download .md File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
