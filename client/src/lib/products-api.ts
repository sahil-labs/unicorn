// API client for product management

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export interface Product {
  _id: string
  brandId: string
  name: string
  description: string
  price: number
  salePrice?: number
  productUrl: string
  commissionRate: number
  category?: string
  tags: string[]
  images: string[]
  isActive: boolean
  clicks: number
  conversions: number
  createdAt: string
  updatedAt: string
}

export interface CreateProductData {
  name: string
  description: string
  price: number
  salePrice?: number
  productUrl: string
  commissionRate: number
  category?: string
  tags?: string | string[]
  images?: string[]
}

export interface ProductsResponse {
  success: boolean
  count?: number
  data?: Product[]
  message?: string
}

export interface ProductResponse {
  success: boolean
  data?: Product
  message?: string
}

// Get brand's own products
export async function getBrandProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/api/products/my-products`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch products')
  }

  return response.json()
}

// Get all active products (marketplace)
export async function getMarketplaceProducts(): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/api/products/marketplace`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch marketplace products')
  }

  return response.json()
}

// Get single product
export async function getProduct(id: string): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to fetch product')
  }

  return response.json()
}

// Create product
export async function createProduct(data: CreateProductData): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/api/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to create product')
  }

  return response.json()
}

// Update product
export async function updateProduct(id: string, data: Partial<CreateProductData>): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to update product')
  }

  return response.json()
}

// Toggle product active status
export async function toggleProductStatus(id: string): Promise<ProductResponse> {
  const response = await fetch(`${API_URL}/api/products/${id}/toggle-status`, {
    method: 'PATCH',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to toggle product status')
  }

  return response.json()
}

// Delete product
export async function deleteProduct(id: string): Promise<{ success: boolean; message?: string }> {
  const response = await fetch(`${API_URL}/api/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Failed to delete product')
  }

  return response.json()
}

