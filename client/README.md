# Micro-Creator Affiliate Marketplace

> India's first affiliate marketplace built for micro-creators. Make ₹ per sale, not ₹ per post.

## 🚀 Features

### For Creators
- ✅ **Instant Access** - No applications or approvals needed
- ✅ **Browse Products** - Explore marketplace of products to promote
- ✅ **Generate Links** - Get unique affiliate links instantly
- ✅ **Track Earnings** - Real-time tracking of clicks, conversions, and commissions
- ✅ **Secure Payouts** - Automated weekly payouts via UPI or bank transfer

### For Brands
- ✅ **Product Management** - List unlimited products with custom commission rates
- ✅ **Creator Network** - Access 5,000+ creators across niches
- ✅ **Analytics Dashboard** - Track performance, clicks, and conversions
- ✅ **Coupon Codes** - Create discount codes for creators to share
- ✅ **Automated Payouts** - Hassle-free commission payments

### Platform Features
- ✅ **Advanced Tracking** - Cookie-based attribution with 7-day window
- ✅ **Multiple Attribution** - Support for both link clicks and coupon codes
- ✅ **Payment Integration** - Razorpay for payouts and subscriptions
- ✅ **Email Notifications** - Automated emails for key events
- ✅ **Job Queues** - Background processing with BullMQ
- ✅ **Analytics** - PostHog for product analytics
- ✅ **Monitoring** - Sentry for error tracking
- ✅ **Admin Panel** - Complete platform management tools

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router) with TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js with OAuth (Google, Instagram)
- **UI:** Tailwind CSS + shadcn/ui + Radix UI
- **Payments:** Razorpay (Payouts & Subscriptions)
- **Jobs:** BullMQ + Redis (Upstash)
- **Email:** Resend
- **Storage:** AWS S3 / R2
- **Analytics:** PostHog
- **Monitoring:** Sentry
- **Deployment:** Vercel

## 📋 Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (local or Neon/Supabase)
- Redis instance (Upstash recommended)
- Razorpay account
- Google OAuth credentials
- Resend account for emails
- AWS S3 or Cloudflare R2 for storage

## 🚀 Getting Started

### 1. Clone and Install

```bash
git clone <repository-url>
cd unicorn/client
npm install
```

### 2. Environment Variables

Create a `.env` file in the client directory with the following:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/affiliate"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Razorpay
RAZORPAY_KEY_ID="your-key-id"
RAZORPAY_KEY_SECRET="your-key-secret"
RAZORPAY_WEBHOOK_SECRET="your-webhook-secret"
RAZORPAY_ACCOUNT_NUMBER="your-account-number"

# Redis
REDIS_URL="your-upstash-redis-url"

# Email
RESEND_API_KEY="your-resend-api-key"
FROM_EMAIL="noreply@yourdomain.com"

# Storage
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="ap-south-1"
AWS_S3_BUCKET="your-bucket"

# Analytics
NEXT_PUBLIC_POSTHOG_KEY="your-posthog-key"
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
NEXT_PUBLIC_SENTRY_DSN="your-sentry-dsn"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ATTRIBUTION_WINDOW_DAYS=7
MINIMUM_PAYOUT_AMOUNT=500
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npm run db:seed

# Open Prisma Studio to view data
npm run db:studio
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
client/
├── .github/
│   └── workflows/          # CI/CD pipelines
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts            # Database seeder
├── src/
│   ├── app/
│   │   ├── (auth)/        # Auth pages (login, signup)
│   │   ├── (dashboard)/   # Dashboard pages
│   │   │   ├── brand/     # Brand dashboard
│   │   │   ├── creator/   # Creator dashboard
│   │   │   └── admin/     # Admin panel
│   │   ├── api/           # API routes
│   │   │   ├── auth/      # NextAuth
│   │   │   └── tracking/  # Tracking endpoints
│   │   ├── r/             # Affiliate link redirects
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Landing page
│   │   └── providers.tsx  # App providers
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   └── dashboard/     # Dashboard components
│   ├── lib/
│   │   ├── prisma.ts      # Prisma client
│   │   ├── utils.ts       # Utility functions
│   │   ├── analytics.ts   # PostHog integration
│   │   ├── email.ts       # Email service
│   │   ├── queue.ts       # Job queues
│   │   └── razorpay.ts    # Payment integration
│   ├── auth.ts            # NextAuth config
│   └── middleware.ts      # Edge middleware
├── public/                # Static files
├── .env                   # Environment variables
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## 🔑 Key Features Implementation

### Affiliate Link Tracking

1. **Link Generation**: Creator generates unique link for a product
2. **Click Tracking**: Middleware tracks clicks and sets cookies
3. **Attribution**: 7-day cookie-based attribution window
4. **Conversion**: Postback pixel tracks conversions
5. **Commission**: Automatically calculated and credited

```typescript
// Generate affiliate link
const link = await prisma.affiliateLink.create({
  data: {
    slug: nanoid(),
    creatorId,
    productId,
    fullUrl: `${APP_URL}/r/${slug}`,
  }
})

// Redirect and track
// GET /r/[slug] -> Track click -> Redirect to product
```

### Payout System

1. **Creator Requests**: Creator requests payout from dashboard
2. **Validation**: Check minimum threshold and KYC
3. **Queue Job**: Add payout to BullMQ queue
4. **Razorpay**: Create payout via Razorpay Route
5. **Notification**: Send email confirmation

```typescript
// Request payout
await queuePayout(payoutId, creatorId, amount)

// Worker processes payout
await createPayout({
  amount,
  fund_account_id: creator.razorpayFundAccountId,
  mode: 'UPI',
})
```

### Commission Calculation

```typescript
const saleAmount = 2999 // Product price
const commissionRate = 15 // 15%
const commission = (saleAmount * commissionRate) / 100 // ₹449.85
```

## 📊 API Endpoints

### Public
- `GET /` - Landing page
- `GET /r/[slug]` - Affiliate link redirect
- `GET /api/tracking/pixel` - Conversion tracking pixel

### Creator
- `GET /creator` - Creator dashboard
- `GET /creator/marketplace` - Browse products
- `POST /creator/links` - Generate affiliate link
- `GET /creator/earnings` - View earnings
- `POST /creator/payouts` - Request payout

### Brand
- `GET /brand` - Brand dashboard
- `GET /brand/products` - List products
- `POST /brand/products` - Create product
- `PUT /brand/products/[id]` - Update product
- `DELETE /brand/products/[id]` - Delete product
- `GET /brand/analytics` - View analytics

### Admin
- `GET /admin` - Admin dashboard
- `GET /admin/users` - Manage users
- `GET /admin/products` - Manage products
- `GET /admin/payouts` - Manage payouts

## 🔐 Security

- ✅ HTTPS only in production
- ✅ CSRF protection on mutations
- ✅ Rate limiting (Upstash)
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma)
- ✅ XSS prevention (React)
- ✅ Signed webhooks (Razorpay)
- ✅ Role-based access control (RBAC)

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Manual deploy
vercel --prod
```

### CI/CD

GitHub Actions workflow included:
- Lint and type check
- Build application
- Run migrations
- Deploy to Vercel (preview/production)

## 📧 Email Templates

- Welcome email (on signup)
- Payout confirmation
- Weekly digest
- Conversion notifications

## 🎨 Design System

Custom design tokens defined in `tailwind.config.ts`:

- Primary: Purple (#7c3aed)
- Accent: Pink (#ec4899)
- Semantic colors for success, error, warning
- Dark mode support
- Responsive breakpoints

## 🧪 Testing

```bash
# Run linter
npm run lint

# Type check
npx tsc --noEmit

# Format code
npx prettier --write .
```

## 📈 Analytics Events

Key events tracked:
- User signup/login
- Product views
- Link generation
- Clicks and conversions
- Payout requests
- Search and filters

## 🐛 Debugging

- Prisma Studio: `npm run db:studio`
- PostHog: Check dashboard for events
- Sentry: Monitor errors in real-time
- Logs: Check Vercel logs or local console

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

MIT

## 🆘 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Email: support@microcreator.app
- Discord: [Join our community](#)

## 🎯 Roadmap

- [ ] Instagram integration for auto-posting
- [ ] Advanced analytics and insights
- [ ] Mobile app (React Native)
- [ ] WhatsApp integration
- [ ] AI-powered product recommendations
- [ ] Multi-language support
- [ ] Cryptocurrency payouts

---

Built with ❤️ for Indian creators
