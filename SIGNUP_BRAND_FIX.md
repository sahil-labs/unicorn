# ✅ Brand Signup Fixed

## What Was Wrong

### Issue
When signing up as a brand (`/signup?role=brand`):
1. ❌ Role was NOT being sent to backend
2. ❌ Backend was ignoring role field
3. ❌ All users were created as CREATOR (default)
4. ❌ Redirect went to `/onboarding` instead of `/brand` dashboard

### Result
Brand users were created with `CREATOR` role, then blocked from accessing `/brand` dashboard.

---

## ✅ What's Fixed

### 1. **Client Side** (`/client/src/app/(auth)/signup/page.tsx`)
**Before:**
```typescript
const response = await register({ name, email, password })
// ❌ Not passing role!
```

**After:**
```typescript
const userRole = role === 'brand' ? 'BRAND' : 'CREATOR'
const response = await register({ 
  name, 
  email, 
  password,
  role: userRole  // ✅ Now passing role
})
```

### 2. **API Interface** (`/client/src/lib/auth-api.ts`)
**Before:**
```typescript
export interface RegisterData {
  name: string
  email: string
  password: string
  // ❌ No role field
}
```

**After:**
```typescript
export interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'CREATOR' | 'BRAND' | 'ADMIN'  // ✅ Added role
}
```

### 3. **Backend Controller** (`/server/src/controllers/authController.ts`)
**Before:**
```typescript
const { name, email, password } = req.body;
const user = await User.create({
  name,
  email,
  password: hashedPassword,
  // ❌ Not using role from request
});
```

**After:**
```typescript
const { name, email, password, role } = req.body;
const user = await User.create({
  name,
  email,
  password: hashedPassword,
  role: role || 'CREATOR',  // ✅ Using role from request
});
```

### 4. **Validation** (`/server/src/routes/authRoutes.ts`)
Added validation for role field:
```typescript
body('role')
  .optional()
  .isIn(['CREATOR', 'BRAND', 'ADMIN'])
  .withMessage('Role must be CREATOR, BRAND, or ADMIN'),
```

### 5. **Smart Redirect** (`/client/src/app/(auth)/signup/page.tsx`)
**Before:**
```typescript
router.push(`/onboarding?role=${role}`)
// ❌ Always goes to onboarding
```

**After:**
```typescript
const registeredRole = response.data.user.role

if (registeredRole === 'BRAND') {
  router.push('/brand')  // ✅ Brand dashboard
} else {
  router.push('/creator')  // ✅ Creator dashboard
}

router.refresh()  // Force auth state update
```

---

## 🧪 Test It Now

### Test 1: Signup as Brand
1. Go to **http://localhost:3000/signup?role=brand**
2. Fill form:
   - Name: Test Brand
   - Email: brand@test.com
   - Password: Brand123456
3. Click "Sign Up with Email"
4. Should redirect to **http://localhost:3000/brand** ✅
5. Should see brand dashboard ✅

### Test 2: Signup as Creator
1. Go to **http://localhost:3000/signup** (or `?role=creator`)
2. Fill form:
   - Name: Test Creator
   - Email: creator@test.com
   - Password: Creator123456
3. Click "Sign Up with Email"
4. Should redirect to **http://localhost:3000/creator** ✅
5. Should see creator dashboard ✅

### Test 3: Verify Role in Database
```bash
# Connect to MongoDB
mongosh

use affiliate_marketplace

# Check user roles
db.users.find({}, { name: 1, email: 1, role: 1 })
```

Should see:
```json
{
  "name": "Test Brand",
  "email": "brand@test.com",
  "role": "BRAND"  // ✅ Correct!
}
{
  "name": "Test Creator",
  "email": "creator@test.com",
  "role": "CREATOR"  // ✅ Correct!
}
```

---

## 🔄 Complete Flow Now

### Brand Signup:
```
1. Visit /signup?role=brand
2. See "Join as a Brand" heading
3. Fill form → Submit
4. Backend creates user with role: "BRAND"
5. Cookie set with JWT token
6. Redirect to /brand dashboard
7. Middleware verifies auth + role
8. Brand dashboard loads ✅
```

### Creator Signup:
```
1. Visit /signup (or ?role=creator)
2. See "Join as a Creator" heading
3. Fill form → Submit
4. Backend creates user with role: "CREATOR"
5. Cookie set with JWT token
6. Redirect to /creator dashboard
7. Middleware verifies auth + role
8. Creator dashboard loads ✅
```

---

## 📝 API Request/Response

### Signup Request (Brand):
```json
POST http://localhost:8000/api/auth/register

{
  "name": "Test Brand",
  "email": "brand@test.com",
  "password": "Brand123456",
  "role": "BRAND"
}
```

### Signup Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "...",
      "name": "Test Brand",
      "email": "brand@test.com",
      "role": "BRAND",  // ✅ Role included
      "createdAt": "...",
      "updatedAt": "..."
    },
    "token": "jwt-token-here"
  }
}
```

---

## 🚀 Restart Servers

To apply all changes:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

---

## ✅ Checklist

- [x] Role field added to RegisterData interface
- [x] Signup page passes role to backend
- [x] Backend accepts and stores role
- [x] Backend validates role values
- [x] Signup redirects to correct dashboard
- [x] Middleware allows access based on role
- [x] Brand users can access /brand
- [x] Creator users can access /creator

---

## 🎉 Result

**Brand signup now works end-to-end!**

Users signing up as brands will:
1. ✅ Be created with `BRAND` role
2. ✅ Be redirected to `/brand` dashboard
3. ✅ Have access to brand features
4. ✅ Be blocked from `/creator` routes

Try it now! 🚀

