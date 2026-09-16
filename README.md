# Ember & Oak — Modern Bistro & Wood-Fired Hearth

> Portfolio Piece #3 of 12 &bull; Upscale Modern-Bistro Dining Experience

A moody, cinematic, full-bleed scroll-story web application crafted for **Ember & Oak**, an elemental wood-fired hearth dining room in the Historic Arts District. This project features high-contrast editorial serif typography, multi-layer parallax storytelling, and a production-grade Prisma-backed table reservation engine with real capacity validation and double-booking prevention.

---

## 🌟 Key Highlights & Architecture

- **Moody, Dark-First Identity**: Near-black charcoal base (`#161210`), glowing ember-orange accent (`#D97A3F`), and aged muted gold (`#C9A962`). Secondary mode is an authentic warm cream paper aesthetic (`#F4ECE0`), rather than an inverted afterthought.
- **Printed-Menu Editorial Typography**: High-contrast display serif (`Fraunces` via `next/font/google`) paired with clean grotesk sans (`Plus Jakarta Sans`), featuring traditional printed dotted leader lines (`. . . . . $48`), sommelier pairings, and dietary iconography.
- **Cinematic Parallax Scroll-Story**: Differential parallax panels utilizing Framer Motion's `useScroll` and `useTransform` with graceful `prefers-reduced-motion` fallbacks.
- **Production-Ready Reservation Engine**:
  - Live availability checking by date, party size (1–8 guests), and service times.
  - Seating area selection: *Ember Hearth Counter*, *Main Dining Room*, *The Sommelier Vault*, and *Heated Garden Terrace*.
  - Transactional table allocation with database-level double-booking prevention.
  - Automated reference generation (`EO-XXXXX`).
  - Native iCalendar invite generation (`.ics` download).
  - Simulated and live Resend confirmation email dispatch.
- **Staff Concierge Portal (`/admin/reservations`)**: Live floor management view to monitor confirmed bookings, filter by date, seat guests, and cancel tables.
- **Visual Archive Gallery**: Masonry grid with an accessible click-to-zoom Lightbox modal and keyboard navigation.

---

## 🛠 Tech Stack

- **Framework**: [Next.js 14/16](https://nextjs.org/) (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with tailored CSS custom properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/) (Scroll Parallax, Staggered Reveals, Ken-Burns Slow Zoom)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite (local zero-config) & PostgreSQL deploy-ready
- **Validation**: [Zod](https://zod.dev/) for runtime API request sanitization
- **Theme**: `next-themes` (Dark-first, persistent, zero theme-flash)
- **Icons**: `lucide-react`
- **Celebration**: `canvas-confetti`

---

## 📂 Project Structure

```
├── prisma/
│   ├── schema.prisma            # Database models: Table, Reservation, MenuItem, NewsletterSubscriber
│   └── seed.ts                  # Rich database seed (14 tables, 17 dishes, sample bookings)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── reservations/
│   │   │   │   ├── route.ts                 # POST booking with transactional locking
│   │   │   │   ├── availability/route.ts    # Live table inventory engine
│   │   │   │   └── [id]/route.ts            # Lookup, update, and cancellation
│   │   │   ├── menu/route.ts                # Categorized menu items endpoint
│   │   │   └── newsletter/route.ts          # Cellar dispatch subscriber route
│   │   ├── admin/reservations/page.tsx      # Staff Concierge Floor Dashboard
│   │   ├── menu/page.tsx                    # Full Degustation catalog & allergen filter
│   │   ├── reserve/page.tsx                 # Dedicated Reservation page
│   │   ├── globals.css                      # Design system tokens, dotted leaders, dark/cream
│   │   ├── layout.tsx                       # Root layout with Fraunces serif & ThemeProvider
│   │   └── page.tsx                         # Cinematic Homepage with Parallax Story
│   ├── components/
│   │   ├── layout/Footer.tsx                # Refined footer with legal & staff links
│   │   ├── menu/MenuCard.tsx                # Printed menu card with dotted leader
│   │   ├── navigation/Navbar.tsx            # Scroll-reactive navbar with gold CTA
│   │   ├── providers/ThemeProvider.tsx      # next-themes wrapper
│   │   ├── reservation/
│   │   │   ├── ReservationFlow.tsx          # Multi-step booking flow + .ics + email
│   │   │   └── ReservationModal.tsx         # Accessible global reservation dialog
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx              # Ken-Burns zoom & staggered line reveal
│   │   │   ├── StorySection.tsx             # 3 Parallax scroll-story panels
│   │   │   ├── MenuSection.tsx              # Tabbed category menu with stagger
│   │   │   ├── ChefSpotlight.tsx            # Chef Marcus Vance & Sommelier Rostova
│   │   │   ├── GallerySection.tsx           # Photo archive with Lightbox
│   │   │   ├── PressAccolades.tsx           # Michelin & 50 Best static quotes
│   │   │   └── LocationHours.tsx            # Hours, stylized dark map, and newsletter
│   │   └── ui/
│   │       ├── HandDrawnAccents.tsx         # Hand-drawn SVG flourishes & underlines
│   │       └── ThemeToggle.tsx              # Dark/warm cream toggle
│   ├── context/
│   │   └── ReservationModalContext.tsx      # Global modal state management
│   └── lib/
│       ├── email.ts                         # Resend integration & simulated HTML preview
│       ├── prisma.ts                        # Prisma Client singleton
│       └── rateLimit.ts                     # In-memory sliding window rate limiter
├── .env.example
├── next.config.ts                           # Security headers & Unsplash remote image rules
├── package.json
└── README.md
```

---

## 🚀 Quickstart & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-repo/ember-and-oak.git
cd ember-and-oak
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

```env
DATABASE_URL="file:./dev.db"
# Optional: Live email delivery via Resend (mocked with rich HTML preview if omitted)
# RESEND_API_KEY="re_123456789"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 3. Initialize Database & Seed Sample Data
```bash
# Push schema to SQLite
npm run db:push

# Populate tables, menu items, sample reservations, and subscribers
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Performance Features

- **Server-Side Zod Validation**: Sanitizes guest names, emails, telephone numbers, and notes before touching the database.
- **Transactional Table Allocation**: Runs within `prisma.$transaction` to guarantee that two concurrent guests cannot reserve the same table for the same time slot.
- **Sliding-Window Rate Limiting**: Protects `/api/reservations` and `/api/newsletter` against automated bot spamming.
- **Strict Security Headers**: Pre-configured in `next.config.ts`:
  - `X-Frame-Options: SAMEORIGIN`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- **Zero Raw Secrets**: All sensitive keys reside server-side.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project into the [Vercel Dashboard](https://vercel.com/new).
3. **Database Selection**:
   - For a serverless Postgres database, provision **Vercel Postgres**, **Neon**, or **Supabase**.
   - In `prisma/schema.prisma`, update the provider:
     ```prisma
     datasource db {
       provider = "postgresql"
       url      = env("POSTGRES_PRISMA_URL")
     }
     ```
   - Add your connection string in Vercel Environment Variables (`POSTGRES_PRISMA_URL`).
4. Set the Build Command in Vercel settings:
   ```bash
   npx prisma generate && npx prisma db push && npm run db:seed && next build
   ```
5. Deploy with zero additional configuration.

---

## 🍷 License & Credits

Designed and built as part of the **12 Websites Portfolio Series** (Project #3).  
Imagery curated from Unsplash under open editorial license.
