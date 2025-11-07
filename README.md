# Micro-Creator Affiliate Marketplace

> India's first affiliate marketplace built for micro-creators

**Tagline:** Make ₹ per sale, not ₹ per post. No apply, no approval — just promote & earn.

## 🎯 Overview

A production-ready, full-stack SaaS platform that connects brands with micro-creators for affiliate marketing. Brands list products with commission rates, creators generate unique affiliate links, and both parties track performance in real-time with automated payouts.

## ✨ Key Features

- 🚀 **Instant Access** - No application/approval process for creators
- 💰 **Automated Payouts** - Weekly payouts via Razorpay to UPI/Bank
- 📊 **Real-time Tracking** - Cookie-based attribution with 7-day window
- 🔗 **Unique Links** - Each creator gets custom affiliate links per product
- 📈 **Analytics Dashboard** - Track clicks, conversions, and earnings
- 💳 **Payment Integration** - Razorpay for subscriptions and payouts
- 📧 **Email Automation** - Transactional emails with Resend
- ⚡ **Job Queues** - Background processing with BullMQ + Redis
- 🎨 **Modern UI** - Tailwind CSS + shadcn/ui components
- 🔐 **Secure** - RBAC, rate limiting, input validation

## 🏗️ Architecture

```
┌─────────────────┐
│   Next.js 14    │ ← App Router, Server Components, Server Actions
│   TypeScript    │
└────────┬────────┘
         │
    ┌────┴────────────────────────────┐
    │                                 │
┌───▼─────────┐              ┌───────▼────────┐
│  PostgreSQL │              │  Redis/Upstash │
│  + Prisma   │              │  + BullMQ      │
└─────────────┘              └────────────────┘
         │                            │
         │                            │
    ┌────┴────────────────────────────┴───┐
    │                                     │
┌───▼──────────┐                  ┌──────▼─────────┐
│  Razorpay    │                  │    Resend      │
│  Payouts     │                  │    Emails      │
└──────────────┘                  └────────────────┘
         │
         │
┌────────▼───────────┐
│  S3 / R2 Storage   │
└────────────────────┘
```

## 📦 Monorepo Structure

```
unicorn/
├── client/              # Next.js application (main app)
│   ├── prisma/          # Database schema & migrations
│   ├── src/
│   │   ├── app/         # App router pages
│   │   ├── components/  # React components
│   │   └── lib/         # Utilities, integrations
│   ├── .github/         # CI/CD workflows
│   └── README.md
│
├── server/              # Legacy Express server (can be deprecated)
│
└── README.md            # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Redis instance
- Razorpay account
- Google OAuth credentials

### Installation

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Then edit .env with your credentials

# Setup database
npx prisma migrate dev

# Run development server
npm run dev
```

Visit http://localhost:3000

## 🔑 Environment Setup

See `client/.env.example` for all required environment variables.

Key services to set up:
1. **Database**: Neon, Supabase, or local PostgreSQL
2. **Redis**: Upstash Redis
3. **Razorpay**: Get API keys from dashboard
4. **OAuth**: Google Cloud Console
5. **Email**: Resend API key
6. **Storage**: AWS S3 or Cloudflare R2

## 👥 User Roles

### Creator
- Browse product marketplace
- Generate affiliate links
- Track clicks & conversions
- View earnings dashboard
- Request payouts (minimum ₹500)
- KYC verification for payouts

### Brand
- Add products with commission rates
- Create discount coupons
- View creator performance
- Track sales & conversions
- Manage payouts
- Subscribe to paid plans

### Admin
- Manage users (brands & creators)
- Approve/reject products
- Handle payout disputes
- View platform analytics
- Manage feature flags
- Access audit logs

## 🔄 Affiliate Flow

1. **Creator** browses marketplace and finds product
2. **Creator** generates unique affiliate link (`/r/abc123`)
3. **Visitor** clicks link → tracked via cookie (7-day window)
4. **Visitor** makes purchase on brand's website
5. **Brand** fires conversion pixel or webhook
6. **System** attributes sale to creator
7. **Commission** calculated and credited
8. **Creator** requests payout when balance ≥ ₹500
9. **System** queues payout job
10. **Razorpay** processes payout to UPI/Bank
11. **Email** sent to confirm payout

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14, React 18, TypeScript |
| UI | Tailwind CSS, shadcn/ui, Radix UI, Framer Motion |
| Database | PostgreSQL, Prisma ORM |
| Auth | NextAuth.js, OAuth (Google) |
| Payments | Razorpay (Route for payouts) |
| Jobs | BullMQ, Redis (Upstash) |
| Email | Resend |
| Storage | AWS S3 / Cloudflare R2 |
| Analytics | PostHog |
| Monitoring | Sentry |
| Deployment | Vercel |
| CI/CD | GitHub Actions |

## 📊 Database Schema

Key models:
- **User**: Authentication & profile
- **BrandProfile**: Brand-specific data
- **CreatorProfile**: Creator stats & payout info
- **Product**: Brand products with commission
- **AffiliateLink**: Creator's unique links
- **Click**: Click tracking data
- **Transaction**: Sales & commissions
- **Payout**: Payout requests & status
- **Coupon**: Discount codes
- **AuditLog**: System audit trail

## 🔐 Security Features

- HTTPS enforced in production
- CSRF protection on all mutations
- Rate limiting via Upstash
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection (React escaping)
- Signed Razorpay webhooks
- Role-based access control (RBAC)
- Secure session management
- Password hashing (handled by NextAuth)

## 📈 Performance

- Server Components for faster loads
- Edge middleware for tracking
- Optimized images with next/image
- Code splitting automatic
- PostgreSQL indexes on key fields
- Redis caching for frequently accessed data
- Background jobs for async tasks

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

Auto-deploys on push to `main` branch.

### Manual

```bash
npm run build
npm start
```

## 🧪 Development

```bash
# Development server
npm run dev

# Database migrations
npm run db:migrate

# Prisma Studio
npm run db:studio

# Linting
npm run lint

# Type check
npx tsc --noEmit
```

## 📧 Emails

Automated emails sent for:
- Welcome (new user)
- Payout confirmation
- Weekly performance digest
- Important notifications

## 🎯 Future Enhancements

- Instagram auto-posting integration
- Mobile app (React Native)
- WhatsApp integration for sharing
- AI product recommendations
- Cryptocurrency payouts
- Advanced fraud detection
- Multi-language support (i18n)
- Dark mode polish
- Creator tiers & badges
- Referral program

## 📄 License

MIT License - see LICENSE file

## 🤝 Contributing

1. Fork the repo
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 🆘 Support

- 📧 Email: support@microcreator.app
- 📖 Docs: See `client/README.md`
- 🐛 Issues: GitHub Issues
- 💬 Discord: [Join community](#)

---

**Built for India's creator economy** 🇮🇳
