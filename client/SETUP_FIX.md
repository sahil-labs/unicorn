# Quick Fix for Client Setup Issues

## Issue 1: MissingSecret Error

**Error:**
```
[auth][error] MissingSecret: Please define a `secret`
```

**Fix:**
1. Create `.env.local` file in `/client` directory (already created)
2. Add `NEXTAUTH_SECRET`:
   ```bash
   NEXTAUTH_SECRET="your-secret-here"
   ```

**To generate a secure secret:**
```bash
openssl rand -base64 32
```

---

## Issue 2: Cannot Read Property 'role' of Undefined

**Error:**
```
Cannot read properties of undefined (reading 'role')
```

**Fix:** Updated middleware to check if session.user exists before accessing role.

---

## ✅ Files Updated

1. ✅ `/client/.env.local` - Created with NEXTAUTH_SECRET
2. ✅ `/client/src/middleware.ts` - Added null checks
3. ✅ `/client/src/auth.ts` - Added explicit secret configuration

---

## 🚀 To Run the Client Now

```bash
cd client

# The .env.local file is now created
# Just restart the dev server

npm run dev
```

The client should now start without errors!

---

## 📝 Environment Variables Explained

### Required for Development:
```env
NEXTAUTH_URL="http://localhost:3000"           # Your app URL
NEXTAUTH_SECRET="base64-encoded-secret"        # Auth encryption key
NEXT_PUBLIC_API_URL="http://localhost:8000"    # Backend API URL
```

### Optional (for full features):
```env
# Google OAuth (for "Sign in with Google")
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."

# Database (for Prisma/NextAuth adapter)
DATABASE_URL="postgresql://..."
```

---

## ⚠️ Note About Email/Password Auth

Since you're using the **Express server** for email/password authentication:
- Email/password login works WITHOUT NextAuth
- It connects directly to `http://localhost:8000/api/auth/*`
- No OAuth credentials needed for email/password
- NEXTAUTH_SECRET is still required for NextAuth to initialize

---

## 🔧 What Was Fixed

### 1. Middleware Protection
**Before:**
```typescript
if (session.user.role !== 'CREATOR') // ❌ Crashes if session.user is undefined
```

**After:**
```typescript
if (!session || !session.user) {
  return redirect('/login')
}
const userRole = session.user.role  // ✅ Safe
```

### 2. NextAuth Configuration
**Before:**
```typescript
NextAuth({
  // Missing secret property
})
```

**After:**
```typescript
NextAuth({
  secret: process.env.NEXTAUTH_SECRET,  // ✅ Explicit
})
```

---

## 🎯 Testing After Fix

1. **Start Backend:**
   ```bash
   cd server
   npm run dev  # http://localhost:8000
   ```

2. **Start Frontend:**
   ```bash
   cd client
   npm run dev  # http://localhost:3000
   ```

3. **Test Email/Password Login:**
   - Go to http://localhost:3000/signup
   - Create account with email/password
   - Login at http://localhost:3000/login
   - Should work without OAuth credentials!

---

## ✅ Summary

- ✅ NEXTAUTH_SECRET configured
- ✅ Middleware null-checks added
- ✅ `.env.local` created with defaults
- ✅ Email/password auth works independently
- ✅ No need for Google OAuth credentials for email/password

The app should now run without errors! 🎉

