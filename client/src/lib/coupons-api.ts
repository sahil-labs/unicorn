// API client for coupon management

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Coupon {
  _id: string
  brandId: string
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minimumPurchase: number
  usageLimit: number | null
  usageCount: number
  expiresAt: string
  isActive: boolean
  applicableProducts: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateCouponData {
  code: string
  description: string
  discountType: 'percentage' | 'fixed'
  discountValue: number
  minimumPurchase?: number
  usageLimit?: number | null
  expiresAt: string
  applicableProducts?: string[]
}

export interface CouponsResponse {
  success: boolean
  count?: number
  data?: Coupon[]
  message?: string
}

export interface CouponResponse {
  success: boolean
  data?: Coupon
  message?: string
}

// Get brand's own coupons
export async function getBrandCoupons(): Promise<CouponsResponse> {
  const response = await fetch(`${API_URL}/api/coupons/my-coupons`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch coupons')
  }

  return response.json()
}

// Get single coupon
export async function getCoupon(id: string): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/api/coupons/${id}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch coupon')
  }

  return response.json()
}

// Create coupon
export async function createCoupon(data: CreateCouponData): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/api/coupons`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create coupon')
  }

  return response.json()
}

// Update coupon
export async function updateCoupon(id: string, data: Partial<CreateCouponData>): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/api/coupons/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update coupon')
  }

  return response.json()
}

// Toggle coupon active status
export async function toggleCouponStatus(id: string): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/api/coupons/${id}/toggle-status`, {
    method: 'PATCH',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to toggle coupon status')
  }

  return response.json()
}

// Delete coupon
export async function deleteCoupon(id: string): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`${API_URL}/api/coupons/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete coupon')
  }

  return response.json()
}

// Validate coupon by code
export async function validateCoupon(code: string): Promise<CouponResponse> {
  const response = await fetch(`${API_URL}/api/coupons/validate/${code}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Invalid coupon')
  }

  return response.json()
}

