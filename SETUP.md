# 🚀 Setup Guide - Micro-Creator Affiliate Marketplace

Complete setup instructions for local development.

## Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [PostgreSQL](https://www.postgresql.org/) 14+
- [Git](https://git-scm.com/)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd unicorn
```

## Step 2: Install Dependencies

```bash
cd client
npm install
```

This will install all required packages including:
- Next.js, React, TypeScript
- Prisma, Auth.js
- Tailwind CSS, shadcn/ui
- Razorpay, BullMQ, Resend
- And all other dependencies

## Step 3: Setup PostgreSQL Database

### Option A: Local PostgreSQL

```bash
# Create database
createdb affiliate_marketplace

# Or using psql
psql -U postgres
CREATE DATABASE affiliate_marketplace;
\q
```

### Option B: Cloud Database (Recommended)

**Neon (Recommended):**
1. Go to https://neon.tech
2. Sign up and create project
3. Copy connection string

**Supabase:**
1. Go to https://supabase.com
2. Create project
3. Get connection string from Settings → Database

## Step 4: Setup Redis

### Option A: Local Redis

```bash
# macOS
brew install redis
brew services start redis

# Ubuntu
sudo apt install redis-server
sudo systemctl start redis

# Verify
redis-cli ping
# Should return: PONG
```

### Option B: Upstash (Recommended for Production)

1. Go to https://upstash.com
2. Create Redis database
3. Copy REST URL

## Step 5: Environment Variables

Create `.env` file in `client/` directory:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/affiliate_marketplace"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"

# Google OAuth (see Step 6)
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Razorpay (see Step 7)
RAZORPAY_KEY_ID="rzp_test_xxxxx"
RAZORPAY_KEY_SECRET="your-secret"
RAZORPAY_WEBHOOK_SECRET="your-webhook-secret"
RAZORPAY_ACCOUNT_NUMBER="your-account-number"

# Redis
REDIS_URL="redis://localhost:6379"  # or Upstash URL

# Email (see Step 8)
RESEND_API_KEY="re_xxxxx"
FROM_EMAIL="noreply@yourdomain.com"

# Storage (Optional for now)
AWS_ACCESS_KEY_ID=""
AWS_SECRET_ACCESS_KEY=""
AWS_REGION="ap-south-1"
AWS_S3_BUCKET=""

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=""
NEXT_PUBLIC_POSTHOG_HOST="https://app.posthog.com"

# Monitoring (Optional)
SENTRY_DSN=""
NEXT_PUBLIC_SENTRY_DSN=""

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
ATTRIBUTION_WINDOW_DAYS=7
MINIMUM_PAYOUT_AMOUNT=500
```

## Step 6: Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Application type: "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Save Client ID and Client Secret
8. Add to `.env`

## Step 7: Razorpay Setup (For Payouts)

### Development/Testing:

1. Go to [Razorpay](https://razorpay.com)
2. Sign up and complete KYC
3. Go to Settings → API Keys
4. Generate Test Keys
5. Enable "Razorpay Route" for payouts
6. Get test account number
7. Add credentials to `.env`

### Important Notes:
- Use Test mode for development
- Switch to Live mode only in production
- Test payouts require test bank accounts

## Step 8: Resend Setup (For Emails)

1. Go to [Resend](https://resend.com)
2. Sign up
3. Verify your domain (or use `onboarding@resend.dev` for testing)
4. Generate API key
5. Add to `.env`

For testing, you can use Resend's test domain without verification.

## Step 9: Initialize Database

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed database with sample data (optional)
npm run db:seed
```

This creates all necessary tables and relationships.

## Step 10: Start Development Server

```bash
npm run dev
```

The application should now be running at:
- Frontend: http://localhost:3000
- Prisma Studio: Run `npm run db:studio` in another terminal

## Step 11: Test the Application

### 1. Access Homepage
Visit http://localhost:3000 - You should see the landing page

### 2. Sign Up
- Click "Get Started" or "Sign Up"
- Choose "Creator" or "Brand"
- Sign in with Google OAuth

### 3. Complete Onboarding
- Fill in profile information
- Choose your role (creator/brand)

### 4. Test Creator Flow
- Browse marketplace
- Generate affiliate link
- Copy link (will be in format: `/r/abc123`)
- Dashboard should show stats

### 5. Test Brand Flow
- Add a product
- Set commission rate
- View dashboard
- Check analytics

## Common Issues & Solutions

### Database Connection Error
```
Error: P1001: Can't reach database server
```
**Solution:** Check PostgreSQL is running and DATABASE_URL is correct

### Redis Connection Error
```
Error: ECONNREFUSED 127.0.0.1:6379
```
**Solution:** Start Redis server: `redis-server` or `brew services start redis`

### OAuth Error
```
Error: invalid_client
```
**Solution:** Verify GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct

### Prisma Client Error
```
Error: PrismaClient is unable to be run in the browser
```
**Solution:** Run `npx prisma generate` and restart dev server

### Port Already in Use
```
Error: Port 3000 is already in use
```
**Solution:** Kill process using port or use different port: `PORT=3001 npm run dev`

## Development Tools

### Prisma Studio
Visual editor for your database:
```bash
npm run db:studio
```
Opens at http://localhost:5555

### TypeScript Check
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

### Format Code
```bash
npx prettier --write .
```

## Testing Different Features

### Test Affiliate Link Tracking
1. Generate link as creator
2. Open link in incognito window
3. Check if cookie is set (DevTools → Application → Cookies)
4. Simulates click tracking

### Test Commission Calculation
1. Create transaction manually in Prisma Studio
2. Check if commission calculated correctly
3. Verify creator earnings updated

### Test Email Sending
1. Trigger email (e.g., signup, payout)
2. Check Resend dashboard for sent emails
3. For testing, emails go to your verified address

### Test Job Queue
1. Request payout as creator
2. Check Redis for queued job
3. Worker should process automatically

## Next Steps

1. ✅ Customize landing page content
2. ✅ Add your brand logo
3. ✅ Configure email templates
4. ✅ Set up custom domain
5. ✅ Add more products
6. ✅ Invite test creators
7. ✅ Test full flow end-to-end

## Optional Services

These are optional but recommended for production:

### AWS S3 / Cloudflare R2
For product images and media uploads

### PostHog
For product analytics and user behavior

### Sentry
For error monitoring and performance

## Documentation

- [Full Documentation](./README.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [API Documentation](./docs/API.md) (coming soon)
- [Database Schema](./prisma/schema.prisma)

## Support

If you encounter issues:

1. Check the [Common Issues](#common-issues--solutions) section
2. Review error messages in console
3. Check Vercel logs if deployed
4. Open an issue on GitHub
5. Contact support@microcreator.app

## Development Workflow

```bash
# Start development
npm run dev

# Make changes to code
# Changes auto-reload

# If you modify Prisma schema:
npx prisma migrate dev
npx prisma generate

# Before committing:
npm run lint
npx tsc --noEmit

# Commit and push
git add .
git commit -m "Your message"
git push
```

---

## Quick Start Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL installed and running
- [ ] Redis installed and running
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with all variables
- [ ] Google OAuth configured
- [ ] Razorpay account created (test mode)
- [ ] Resend account created
- [ ] Database migrated (`npx prisma migrate dev`)
- [ ] Database seeded (`npm run db:seed`)
- [ ] Dev server started (`npm run dev`)
- [ ] Can access http://localhost:3000
- [ ] OAuth login works
- [ ] Can create products/links
- [ ] Dashboard displays correctly

**You're all set!** Start building amazing features! 🎉

---

**Estimated setup time:** 30-45 minutes

