# 🎯 Getting Started with Micro-Creator Affiliate Marketplace

## Welcome! 👋

You now have a complete, production-ready affiliate marketing platform built from scratch. This guide will help you get up and running quickly.

## 🎁 What You Have

A full-stack SaaS platform with:
- ✅ Next.js 14 + TypeScript + Tailwind CSS
- ✅ PostgreSQL database with Prisma
- ✅ Google OAuth authentication
- ✅ Razorpay payment integration
- ✅ Email notifications (Resend)
- ✅ Job queues (BullMQ + Redis)
- ✅ Analytics (PostHog) & Monitoring (Sentry)
- ✅ Three dashboards (Brand, Creator, Admin)
- ✅ Affiliate link tracking system
- ✅ Automated payout system
- ✅ CI/CD pipeline (GitHub Actions)

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
cd client
npm install
```

### 2. Create Environment File
```bash
# Copy the example
cp .env.example .env

# Generate a secret
openssl rand -base64 32
```

### 3. Add Minimal Config to `.env`
```env
DATABASE_URL="postgresql://user:password@localhost:5432/affiliate"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="paste-the-generated-secret-here"

# For now, these can be placeholder - we'll set up properly later
GOOGLE_CLIENT_ID="todo"
GOOGLE_CLIENT_SECRET="todo"
RAZORPAY_KEY_ID="todo"
RAZORPAY_KEY_SECRET="todo"
REDIS_URL="redis://localhost:6379"
RESEND_API_KEY="todo"
```

### 4. Setup Database
```bash
# Make sure PostgreSQL is running
# Create database: createdb affiliate_marketplace

# Run migrations
npx prisma migrate dev

# Seed with sample data
npm run db:seed
```

### 5. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000 🎉

## 📚 Documentation Structure

| File | Purpose |
|------|---------|
| **README.md** | Main project overview |
| **SETUP.md** | Detailed setup instructions |
| **DEPLOYMENT.md** | Production deployment guide |
| **PROJECT_SUMMARY.md** | Complete technical summary |
| **GET_STARTED.md** | This quick start guide |
| **client/README.md** | Client-specific documentation |

## 🔑 What To Do Next

### Option A: Run Locally (Development)

Follow detailed instructions in [SETUP.md](./SETUP.md)

1. Setup PostgreSQL database
2. Setup Redis
3. Configure OAuth (Google)
4. Get Razorpay test keys
5. Get Resend API key
6. Run locally

**Time needed:** ~30-45 minutes

### Option B: Deploy to Production

Follow instructions in [DEPLOYMENT.md](./DEPLOYMENT.md)

1. Use cloud database (Neon)
2. Use cloud Redis (Upstash)
3. Deploy to Vercel
4. Configure all services
5. Go live!

**Time needed:** ~1-2 hours

## 🎨 Customization Checklist

Before launching, customize these:

- [ ] Update landing page content
- [ ] Change brand name/logo
- [ ] Modify color scheme (optional)
- [ ] Configure email templates
- [ ] Add Terms & Conditions
- [ ] Add Privacy Policy
- [ ] Add Refund Policy
- [ ] Set minimum payout amount
- [ ] Configure attribution window
- [ ] Add brand logo/favicon
- [ ] Update meta tags

## 🏗️ Project Structure Quick Reference

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/           # Login, Signup, Onboarding
│   │   ├── (dashboard)/      # Brand, Creator, Admin dashboards
│   │   ├── api/              # API routes
│   │   ├── r/[slug]/         # Affiliate link redirects
│   │   └── page.tsx          # Landing page
│   ├── components/           # Reusable components
│   ├── lib/                  # Utilities, integrations
│   └── middleware.ts         # Edge middleware
├── prisma/
│   └── schema.prisma         # Database schema
└── .env                      # Environment variables
```

## 🔐 Required Services

### Must Have (For Core Functionality)
1. **PostgreSQL** - Database
2. **Google OAuth** - Authentication
3. **Razorpay** - Payments/Payouts

### Nice to Have (Can Add Later)
4. Redis - Job queues (can run without initially)
5. Resend - Emails (can skip for testing)
6. S3/R2 - Image uploads
7. PostHog - Analytics
8. Sentry - Monitoring

## 🎯 User Roles & Access

| Role | Access |
|------|--------|
| **Creator** | `/creator/*` - Browse products, generate links, track earnings |
| **Brand** | `/brand/*` - Manage products, view analytics, handle payouts |
| **Admin** | `/admin/*` - Platform management, user moderation |

## 🔗 Key URLs

| URL | Purpose |
|-----|---------|
| `/` | Landing page |
| `/login` | Login page |
| `/signup` | Signup page |
| `/onboarding` | Role selection & profile |
| `/r/[slug]` | Affiliate link redirect |
| `/brand` | Brand dashboard |
| `/creator` | Creator dashboard |
| `/admin` | Admin panel |

## 📊 Sample Data

After running `npm run db:seed`, you'll have:

**Admin User:**
- Email: admin@microcreator.app
- Role: Admin

**Brand User:**
- Email: brand@example.com
- Business: Test Brand Co.
- Products: 3 sample products

**Creator Users:**
- Email: creator1@example.com (Sarah Kumar)
- Email: creator2@example.com (Rahul Tech)
- Each has affiliate links for all products

## 🧪 Test the Application

### Test Creator Flow
1. Sign up as creator
2. Browse marketplace at `/creator/marketplace`
3. Click "Generate Link" on a product
4. Copy your affiliate link
5. Open in incognito window
6. Check cookie is set
7. Dashboard should show 1 click

### Test Brand Flow
1. Sign up as brand
2. Add a product at `/brand/products/new`
3. Set commission rate (e.g., 15%)
4. View in marketplace
5. Check dashboard for stats

## 🔧 Troubleshooting

### Can't connect to database
```bash
# Check PostgreSQL is running
pg_isready

# If not, start it
# macOS: brew services start postgresql
# Ubuntu: sudo service postgresql start
```

### Port 3000 already in use
```bash
# Kill the process
lsof -ti:3000 | xargs kill

# Or use different port
PORT=3001 npm run dev
```

### Prisma Client errors
```bash
# Regenerate client
npx prisma generate

# Restart dev server
npm run dev
```

### OAuth errors
- Double-check redirect URI matches exactly
- Verify Client ID and Secret are correct
- Make sure OAuth consent screen is configured

## 📈 Scaling Considerations

When you're ready to scale:

1. **Database**
   - Use connection pooling
   - Add read replicas
   - Index optimization

2. **Redis**
   - Upstash scales automatically
   - Consider Redis cluster for very high load

3. **Background Jobs**
   - Scale workers independently
   - Monitor queue size
   - Add retries and dead letter queues

4. **Monitoring**
   - Set up alerts in Sentry
   - Monitor with Vercel Analytics
   - Track key metrics in PostHog

## 💰 Cost Estimate

**For a new startup (0-1000 users):**

| Service | Cost |
|---------|------|
| Vercel | $0 (Hobby) |
| Neon DB | $0-19/mo |
| Upstash Redis | $0-10/mo |
| Razorpay | Transaction fees only |
| Resend | $0-20/mo |
| S3/R2 | $0-5/mo |
| PostHog | $0 |
| Sentry | $0 |
| **Total** | **$0-54/mo** |

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Razorpay Docs](https://razorpay.com/docs)

## 🆘 Get Help

1. Check documentation files
2. Review error messages
3. Check console logs
4. Open GitHub issue
5. Email: support@microcreator.app

## ✅ Development Checklist

- [ ] Node.js 18+ installed
- [ ] PostgreSQL running
- [ ] Redis running (optional initially)
- [ ] Dependencies installed
- [ ] .env configured
- [ ] Database migrated
- [ ] Database seeded
- [ ] Dev server running
- [ ] Can access localhost:3000
- [ ] Landing page loads
- [ ] Can view sample products in Prisma Studio

## 🚀 Launch Checklist

- [ ] All services configured
- [ ] Environment variables set
- [ ] Database backed up
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] OAuth redirect URIs updated
- [ ] Email sending works
- [ ] Payout system tested
- [ ] Analytics tracking
- [ ] Error monitoring active
- [ ] Legal pages complete
- [ ] Terms & Privacy published

## 🎉 You're Ready!

You now have everything you need to:
1. ✅ Run the application locally
2. ✅ Develop new features
3. ✅ Deploy to production
4. ✅ Onboard real users

**Time to build something amazing!** 🚀

---

## Quick Links

- 📖 [Main README](./README.md)
- 🔧 [Setup Guide](./SETUP.md)
- 🚀 [Deployment Guide](./DEPLOYMENT.md)
- 📋 [Project Summary](./PROJECT_SUMMARY.md)
- 💻 [Client Docs](./client/README.md)

---

**Questions?** Start with [SETUP.md](./SETUP.md) for detailed instructions.

**Ready to deploy?** See [DEPLOYMENT.md](./DEPLOYMENT.md).

**Need an overview?** Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md).

---

Built with ❤️ for India's creator economy 🇮🇳

