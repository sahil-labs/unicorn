# Authentication API Documentation

Base URL: `http://localhost:8000/api/auth`

## Endpoints

### 1. Register User

**POST** `/api/auth/register`

Create a new user account.

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation:**

- Name: 2-50 characters
- Email: Valid email format
- Password: Min 8 characters, must contain uppercase, lowercase, and number

**Response (201):**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Cookie Set:** `token` (httpOnly, 7 days)

---

### 2. Login User

**POST** `/api/auth/login`

Authenticate and login user.

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Cookie Set:** `token` (httpOnly, 7 days)

---

### 3. Logout User

**POST** `/api/auth/logout`

Logout user by clearing authentication cookie.

**Response (200):**

```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 4. Get Current User

**GET** `/api/auth/me`

Get currently authenticated user details.

**Headers:**

- `Authorization: Bearer <token>` OR
- Cookie: `token=<token>`

**Response (200):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-01-01T00:00:00.000Z"
  }
}
```

---

### 5. Update Password

**PUT** `/api/auth/update-password`

Update user's password (requires authentication).

**Headers:**

- `Authorization: Bearer <token>` OR
- Cookie: `token=<token>`

**Request Body:**

```json
{
  "currentPassword": "SecurePass123",
  "newPassword": "NewSecurePass456"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password updated successfully"
}
```

---

### 6. Forgot Password

**POST** `/api/auth/forgot-password`

Request password reset token.

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "If an account exists with this email, you will receive a password reset link",
  "resetToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // Only in development
}
```

**Note:** In production, the token should be sent via email, not in response.

---

### 7. Reset Password

**POST** `/api/auth/reset-password`

Reset password using token from forgot password.

**Request Body:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "newPassword": "NewSecurePass456"
}
```

**Response (200):**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

---

## Error Responses

### Validation Error (400)

```json
{
  "status": "fail",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### Authentication Error (401)

```json
{
  "status": "error",
  "message": "Invalid email or password"
}
```

### Not Found (404)

```json
{
  "status": "error",
  "message": "User not found"
}
```

### Server Error (500)

```json
{
  "status": "error",
  "message": "Internal Server Error"
}
```

---

## Authentication Methods

### 1. Cookie-based (Recommended for web)

Token is automatically sent in httpOnly cookie with each request.

```javascript
// Login request
fetch("http://localhost:8000/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // Important!
  body: JSON.stringify({ email, password }),
});

// Authenticated request
fetch("http://localhost:8000/api/auth/me", {
  credentials: "include", // Important!
});
```

### 2. Bearer Token (for mobile/API clients)

Send token in Authorization header.

```javascript
// After login, save token
const { token } = response.data;
localStorage.setItem("token", token);

// Authenticated request
fetch("http://localhost:8000/api/auth/me", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

---

## Integration with Client

### Update Login Page

```typescript
// client/src/app/(auth)/login/page.tsx

const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Redirect to dashboard
      router.push("/dashboard");
    } else {
      setError(data.message);
    }
  } catch (error) {
    setError("Login failed");
  } finally {
    setIsLoading(false);
  }
};
```

---

## Security Features

✅ **Password Hashing** - bcrypt with salt rounds of 12
✅ **JWT Tokens** - Secure token generation
✅ **HttpOnly Cookies** - Prevent XSS attacks
✅ **Token Expiration** - 7 days default
✅ **Password Requirements** - Min 8 chars, uppercase, lowercase, number
✅ **CORS Protection** - Configured allowed origins
✅ **Input Validation** - express-validator
✅ **Rate Limiting** - Add in production

---

## Testing with cURL

### Register

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Login

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123"
  }'
```

### Get Current User

```bash
curl http://localhost:8000/api/auth/me \
  -b cookies.txt
```

---

## Environment Variables

Add to `/server/.env`:

```env
PORT=8000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/unicorn
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000
```

---

## Next Steps

1. ✅ Install dependencies: `cd server && npm install`
2. ✅ Update `.env` with JWT_SECRET
3. ✅ Start server: `npm run dev`
4. ✅ Test endpoints with Postman or cURL
5. ✅ Update client login/signup pages to use email/password
6. ✅ Add rate limiting in production
7. ✅ Implement email service for password reset
8. ✅ Add refresh token mechanism (optional)
9. ✅ Add social OAuth alongside email/password
