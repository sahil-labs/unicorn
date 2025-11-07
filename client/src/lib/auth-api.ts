// API client for email/password authentication with Express server

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface RegisterData {
  name: string
  email: string
  password: string
  role?: 'CREATOR' | 'BRAND' | 'ADMIN'
}

export interface LoginData {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message?: string
  data?: {
    user: {
      _id: string
      name: string
      email: string
      role: 'CREATOR' | 'BRAND' | 'ADMIN'
      createdAt: string
    }
    token?: string
  }
  token?: string
}

// Register new user
export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Registration failed')
  }

  return response.json()
}

// Login user
export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Important for cookies
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Login failed')
  }

  return response.json()
}

// Logout user
export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/api/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Logout failed')
  }
}

// Get current user
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/api/auth/me`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to get user')
  }

  return response.json()
}

// Update password
export async function updatePassword(currentPassword: string, newPassword: string) {
  const response = await fetch(`${API_URL}/api/auth/update-password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ currentPassword, newPassword }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Password update failed')
  }

  return response.json()
}

// Forgot password
export async function forgotPassword(email: string) {
  const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to send reset email')
  }

  return response.json()
}

// Reset password
export async function resetPassword(token: string, newPassword: string) {
  const response = await fetch(`${API_URL}/api/auth/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Password reset failed')
  }

  return response.json()
}

