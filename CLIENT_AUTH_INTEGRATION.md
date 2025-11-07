# Client Authentication Integration Guide

## ✅ Fully Integrated Pages

### 1. Login Page (`/login`)
**Location:** `/client/src/app/(auth)/login/page.tsx`

**Features:**
- ✅ Google OAuth sign-in
- ✅ Email/password login
- ✅ Error handling with user feedback
- ✅ Loading states
- ✅ "Forgot password?" link
- ✅ Redirects to dashboard on success

**Usage:**
```typescript
// Users can login with:
// 1. Google OAuth (click "Continue with Google")
// 2. Email/Password (fill form and submit)

// After successful login:
// - Cookie is set automatically
// - User is redirected to /creator or /brand dashboard
```

---

### 2. Signup Page (`/signup`)
**Location:** `/client/src/app/(auth)/signup/page.tsx`

**Features:**
- ✅ Google OAuth sign-up
- ✅ Email/password registration
- ✅ Password validation (8+ chars, uppercase, lowercase, number)
- ✅ Error handling
- ✅ Loading states
- ✅ Role selection (creator/brand via URL param)
- ✅ Redirects to onboarding on success

**Usage:**
```typescript
// Signup as creator:
// /signup?role=creator

// Signup as brand:
// /signup?role=brand

// After successful registration:
// - Account created on server
// - Cookie is set
// - User redirected to /onboarding
```

---

### 3. Forgot Password Page (`/forgot-password`)
**Location:** `/client/src/app/(auth)/forgot-password/page.tsx`

**Features:**
- ✅ Email input form
- ✅ Success message after submission
- ✅ Back to login link
- ✅ Error handling

**Usage:**
```typescript
// User enters email
// Server sends reset token (in dev, shown in console)
// User receives email with reset link
// Link format: /reset-password?token=xyz
```

---

### 4. Reset Password Page (`/reset-password`)
**Location:** `/client/src/app/(auth)/reset-password/page.tsx`

**Features:**
- ✅ Token validation from URL params
- ✅ New password input with confirmation
- ✅ Password validation
- ✅ Success message
- ✅ Auto-redirect to login after success
- ✅ Invalid token handling

**Usage:**
```typescript
// Accessed via: /reset-password?token=xyz
// User enters new password twice
// After success, redirects to /login
```

---

### 5. Update Password Component
**Location:** `/client/src/components/settings/update-password.tsx`

**Features:**
- ✅ Current password verification
- ✅ New password input with confirmation
- ✅ Password validation
- ✅ Success/error feedback
- ✅ Form auto-clears on success

**Usage:**
```typescript
// Import in settings page:
import { UpdatePasswordForm } from '@/components/settings/update-password'

// Use in settings page:
<UpdatePasswordForm />
```

---

## 📁 File Structure

```
client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx          ✅ Email + OAuth login
│   │   │   ├── signup/
│   │   │   │   └── page.tsx          ✅ Email + OAuth signup
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx          ✅ Request reset link
│   │   │   └── reset-password/
│   │   │       └── page.tsx          ✅ Reset with token
│   │   └── (dashboard)/
│   │       ├── brand/
│   │       │   └── settings/
│   │       │       └── page.tsx      → Use UpdatePasswordForm
│   │       └── creator/
│   │           └── settings/
│   │               └── page.tsx      → Use UpdatePasswordForm
│   ├── components/
│   │   └── settings/
│   │       └── update-password.tsx   ✅ Password update form
│   └── lib/
│       └── auth-api.ts               ✅ API client functions
```

---

## 🔗 API Integration Summary

All authentication functions are in `/client/src/lib/auth-api.ts`:

| Function | Endpoint | Integrated In |
|----------|----------|---------------|
| `register()` | POST /auth/register | ✅ Signup page |
| `login()` | POST /auth/login | ✅ Login page |
| `logout()` | POST /auth/logout | ⚠️ Manual call needed |
| `getCurrentUser()` | GET /auth/me | ⚠️ Use in protected routes |
| `updatePassword()` | PUT /auth/update-password | ✅ UpdatePasswordForm |
| `forgotPassword()` | POST /auth/forgot-password | ✅ Forgot password page |
| `resetPassword()` | POST /auth/reset-password | ✅ Reset password page |

---

## 🔐 Authentication Flow

### Registration Flow:
```
1. User visits /signup?role=creator
2. Fills form (name, email, password)
3. Submits → calls register()
4. Server creates account
5. Server returns token + sets cookie
6. Client redirects to /onboarding
```

### Login Flow:
```
1. User visits /login
2. Enters email & password
3. Submits → calls login()
4. Server validates credentials
5. Server returns token + sets cookie
6. Client redirects to /creator or /brand
```

### Forgot Password Flow:
```
1. User clicks "Forgot password?" on login
2. Enters email → calls forgotPassword()
3. Server sends reset token
4. User clicks link in email
5. Lands on /reset-password?token=xyz
6. Enters new password → calls resetPassword()
7. Redirects to /login
```

### Update Password Flow (Logged In):
```
1. User navigates to settings
2. Uses UpdatePasswordForm component
3. Enters current + new password
4. Submits → calls updatePassword()
5. Success message shown
6. Form clears
```

---

## 🛡️ Protected Routes

To protect routes, use the auth check:

```typescript
// Example: Check if user is logged in
import { getCurrentUser } from '@/lib/auth-api'

async function checkAuth() {
  try {
    const response = await getCurrentUser()
    return response.data
  } catch (error) {
    // Redirect to login
    router.push('/login')
  }
}
```

---

## 🎨 UI Components Used

All pages use shadcn/ui components:
- `Button` - Primary actions
- `Card` - Container layout
- `Input` - Form fields
- `Label` - Field labels
- Icons from `lucide-react`

---

## ⚠️ TODO: Additional Integration Needed

### 1. Logout Functionality
Add logout button in dashboard:

```typescript
// In sidebar or header
import { logout } from '@/lib/auth-api'

const handleLogout = async () => {
  await logout()
  router.push('/login')
}

<Button onClick={handleLogout}>
  <LogOut className="h-4 w-4" />
  Logout
</Button>
```

### 2. Settings Pages
Add UpdatePasswordForm to settings pages:

```typescript
// /client/src/app/(dashboard)/creator/settings/page.tsx
import { UpdatePasswordForm } from '@/components/settings/update-password'

export default function CreatorSettings() {
  return (
    <div className="space-y-6">
      <h1>Settings</h1>
      <UpdatePasswordForm />
      {/* Other settings */}
    </div>
  )
}
```

### 3. Auth State Management (Optional)
Consider adding context for user state:

```typescript
// /client/src/contexts/auth-context.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCurrentUser } from '@/lib/auth-api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser()
      setUser(response.data)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
```

---

## 🧪 Testing

### Test Registration:
1. Go to http://localhost:3000/signup
2. Fill in name, email, password
3. Click "Sign Up with Email"
4. Should redirect to /onboarding

### Test Login:
1. Go to http://localhost:3000/login
2. Enter registered email & password
3. Click "Sign In with Email"
4. Should redirect to dashboard

### Test Forgot Password:
1. Go to http://localhost:3000/login
2. Click "Forgot password?"
3. Enter email
4. Check server console for reset token
5. Go to /reset-password?token=<token>
6. Enter new password
7. Should redirect to login

### Test Update Password:
1. Login to dashboard
2. Go to settings
3. Use UpdatePasswordForm
4. Enter current + new password
5. Should show success message

---

## 📝 Notes

1. **Cookie-based auth**: All requests automatically include the `token` cookie
2. **Error handling**: All forms show error messages to users
3. **Loading states**: Buttons show loading text during API calls
4. **Password validation**: Client-side validation before API call
5. **Redirects**: Automatic redirects after success

---

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   cd server
   npm run dev
   # Server runs on http://localhost:8000
   ```

2. **Start the client:**
   ```bash
   cd client
   npm run dev
   # Client runs on http://localhost:3000
   ```

3. **Test the flow:**
   - Visit http://localhost:3000/signup
   - Create an account
   - Login at http://localhost:3000/login
   - Access dashboard

---

## ✅ Integration Checklist

- [x] Login page with email/password
- [x] Signup page with email/password
- [x] Forgot password page
- [x] Reset password page
- [x] Update password component
- [x] API client library
- [x] Error handling
- [x] Loading states
- [x] Password validation
- [x] Success messages
- [ ] Logout button (add to dashboards)
- [ ] Auth context (optional)
- [ ] Protected route HOC (optional)

---

**Status: 90% Complete** ✅

All core authentication flows are integrated. Only need to add logout buttons to dashboards and optionally implement auth context for better state management.

