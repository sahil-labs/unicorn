# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. ✅ GitHub repository with your code
2. ✅ Vercel account
3. ✅ PostgreSQL database (Neon/Supabase)
4. ✅ Redis instance (Upstash)
5. ✅ Razorpay account with API keys
6. ✅ Google OAuth credentials
7. ✅ Resend API key
8. ✅ AWS S3 or Cloudflare R2 bucket
9. ✅ PostHog account (optional)
10. ✅ Sentry account (optional)

## Step-by-Step Deployment

### 1. Database Setup (Neon)

1. Go to https://neon.tech
2. Create new project
3. Copy connection string
4. Save as `DATABASE_URL` for later

```bash
# Connection string format
postgresql://user:password@host/database?sslmode=require
```

### 2. Redis Setup (Upstash)

1. Go to https://upstash.com
2. Create Redis database
3. Copy REST URL
4. Save as `REDIS_URL`

### 3. Razorpay Setup

1. Go to https://razorpay.com
2. Sign up / Login
3. Navigate to Settings → API Keys
4. Generate Live/Test API keys
5. Save `key_id` and `key_secret`
6. Enable Razorpay Route for payouts
7. Get account number for payouts

### 4. Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI:
   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://yourdomain.com/api/auth/callback/google`
6. Save Client ID and Client Secret

### 5. Resend Setup

1. Go to https://resend.com
2. Sign up and verify domain
3. Generate API key
4. Save API key

### 6. S3 / R2 Setup

**AWS S3:**
1. Create S3 bucket in AWS Console
2. Create IAM user with S3 access
3. Generate Access Key and Secret Key
4. Configure CORS for bucket

**Cloudflare R2:**
1. Go to Cloudflare dashboard
2. Create R2 bucket
3. Generate API token
4. Save credentials

### 7. Deploy to Vercel

#### Option A: Via Vercel Dashboard

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select `client` as root directory
5. Add environment variables (see below)
6. Click "Deploy"

#### Option B: Via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd client
vercel --prod
```

### 8. Environment Variables in Vercel

Add all these environment variables in Vercel dashboard:

```env
# Database
DATABASE_URL=

# NextAuth
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=

# OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Razorpay
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
RAZORPAY_ACCOUNT_NUMBER=

# Redis
REDIS_URL=

# Email
RESEND_API_KEY=
FROM_EMAIL=noreply@yourdomain.com

# Storage
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=ap-south-1
AWS_S3_BUCKET=

# Analytics
NEXT_PUBLIC_POSTHOG_KEY=
NEXT_PUBLIC_POSTHOG_HOST=

# Monitoring
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=

# App Config
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ATTRIBUTION_WINDOW_DAYS=7
MINIMUM_PAYOUT_AMOUNT=500
```

### 9. Run Database Migrations

After deployment, run migrations:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed database (optional)
npm run db:seed
```

Or use Vercel's build command to include migrations:

```json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build"
  }
}
```

### 10. Setup Webhooks

#### Razorpay Webhooks

1. Go to Razorpay Dashboard → Webhooks
2. Create webhook endpoint: `https://yourdomain.com/api/webhooks/razorpay`
3. Select events:
   - `payout.processed`
   - `payout.failed`
   - `subscription.charged`
4. Save webhook secret

### 11. Configure Domain

1. Add custom domain in Vercel
2. Update DNS records as instructed
3. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL`
4. Update OAuth redirect URIs

### 12. Post-Deployment Checks

- ✅ Can access homepage
- ✅ OAuth login works
- ✅ Database queries work
- ✅ Can create affiliate links
- ✅ Tracking pixel works
- ✅ Emails are sent
- ✅ Job queues process
- ✅ Webhooks receive data
- ✅ Analytics tracking
- ✅ Error monitoring

## CI/CD Setup

The repository includes GitHub Actions workflow that:

1. Runs on push to `main` or PR
2. Lints code
3. Type checks
4. Builds application
5. Deploys to Vercel (preview for PRs, production for main)

### GitHub Secrets Required

Add these secrets in GitHub repository settings:

```
VERCEL_TOKEN=         # From Vercel account settings
VERCEL_ORG_ID=        # From Vercel project settings
VERCEL_PROJECT_ID=    # From Vercel project settings
```

## Scaling

### Database
- Neon: Auto-scales, use connection pooling
- Consider read replicas for heavy read loads

### Redis
- Upstash scales automatically
- Monitor usage in dashboard

### Vercel
- Automatically scales based on traffic
- Upgrade to Pro/Enterprise for more resources

### Background Jobs
- BullMQ workers can be scaled independently
- Deploy workers as separate Vercel functions if needed

## Monitoring

### Sentry
- Error tracking and performance monitoring
- Set up alerts for critical errors
- Configure release tracking

### PostHog
- Product analytics
- User behavior tracking
- Feature flag management

### Vercel Analytics
- Built-in Web Vitals tracking
- Real User Monitoring
- Traffic analytics

## Backup Strategy

### Database
```bash
# Backup
pg_dump $DATABASE_URL > backup.sql

# Restore
psql $DATABASE_URL < backup.sql
```

Set up automated backups:
- Neon: Automatic backups included
- Supabase: Point-in-time recovery

### Redis
- Upstash provides automatic backups
- Data is non-critical (can be regenerated)

## Security Checklist

- ✅ All secrets in environment variables
- ✅ HTTPS enforced
- ✅ Rate limiting enabled
- ✅ Input validation on all forms
- ✅ CSRF tokens on mutations
- ✅ Webhook signatures verified
- ✅ Database connection pooling
- ✅ Error messages don't leak info
- ✅ Dependencies up to date
- ✅ Security headers configured

## Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify Prisma schema is valid
- Check for TypeScript errors

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check connection pooling settings
- Ensure database is accessible from Vercel

### OAuth Not Working
- Verify redirect URIs match exactly
- Check CLIENT_ID and CLIENT_SECRET
- Ensure NEXTAUTH_URL is correct

### Webhooks Not Receiving
- Check webhook URL is publicly accessible
- Verify webhook secret matches
- Check Vercel function logs

### Job Queue Not Processing
- Verify Redis connection
- Check worker is running
- Monitor queue in Upstash dashboard

## Performance Optimization

1. Enable Vercel Edge Functions for tracking
2. Use ISR for static pages
3. Optimize images with next/image
4. Enable database query caching
5. Use Redis for frequently accessed data
6. Implement CDN for static assets
7. Monitor with Vercel Analytics

## Cost Estimation

**Monthly costs (approximate):**

- Vercel Hobby: $0 (free tier) or Pro: $20
- Neon: $0-$19 (based on usage)
- Upstash: $0-$10 (based on usage)
- Razorpay: Transaction fees only
- Resend: $0-$20 (based on email volume)
- S3/R2: $0-$5 (based on storage)
- PostHog: $0-$20 (based on events)
- Sentry: $0-$26 (based on events)

**Total: ~$0-$100/month** for small to medium scale

---

## Quick Deploy Checklist

- [ ] Database created and migrated
- [ ] Redis instance created
- [ ] All API keys obtained
- [ ] Environment variables configured
- [ ] Domain configured (if custom)
- [ ] OAuth redirect URIs updated
- [ ] Webhooks configured
- [ ] GitHub Actions secrets added
- [ ] First deployment successful
- [ ] Test login/signup works
- [ ] Test affiliate link creation
- [ ] Test tracking works
- [ ] Monitoring enabled

**Congratulations! Your application is deployed!** 🎉

