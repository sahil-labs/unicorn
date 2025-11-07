'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getProduct, updateProduct, CreateProductData, Product } from '@/lib/products-api'

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params.id as string
  
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<CreateProductData & { imageUrl?: string }>({
    name: '',
    description: '',
    price: 0,
    salePrice: undefined,
    productUrl: '',
    commissionRate: 0,
    category: '',
    tags: '',
    imageUrl: '',
  })

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = async () => {
    try {
      setIsFetching(true)
      const response = await getProduct(productId)
      
      if (response.success && response.data) {
        const product = response.data
        setFormData({
          name: product.name,
          description: product.description,
          price: product.price,
          salePrice: product.salePrice,
          productUrl: product.productUrl,
          commissionRate: product.commissionRate,
          category: product.category || '',
          tags: product.tags.join(', '),
          imageUrl: product.images && product.images.length > 0 ? product.images[0] : '',
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product')
    } finally {
      setIsFetching(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value, type } = e.target
    
    setFormData(prev => ({
      ...prev,
      [id]: type === 'number' ? (value ? parseFloat(value) : 0) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validate sale price
      if (formData.salePrice && formData.salePrice >= formData.price) {
        setError('Sale price must be less than regular price')
        setIsLoading(false)
        return
      }

      // Prepare data with images array
      const productData = {
        ...formData,
        images: formData.imageUrl ? [formData.imageUrl] : [],
      }
      delete (productData as any).imageUrl // Remove temporary field

      const response = await updateProduct(productId, productData)

      if (response.success) {
        router.push('/brand/products')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product')
      setIsLoading(false)
    }
  }

  if (isFetching) {
    return (
      <div className="flex h-screen">
        <Sidebar role="brand" />
        <main className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl mx-auto p-8">
          <Link href="/brand/products">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold">Edit Product</h1>
            <p className="text-muted-foreground">Update your product details</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
                <CardDescription>
                  Update information about your product
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Premium Wireless Headphones"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[120px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Describe your product in detail..."
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (₹) *</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="2999"
                      value={formData.price || ''}
                      onChange={handleChange}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="salePrice">Sale Price (₹)</Label>
                    <Input
                      id="salePrice"
                      type="number"
                      placeholder="2499"
                      value={formData.salePrice || ''}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productUrl">Product URL *</Label>
                  <Input
                    id="productUrl"
                    type="url"
                    placeholder="https://yourstore.com/product"
                    value={formData.productUrl}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    The URL where customers will be redirected to purchase
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Commission Rate (%) *</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    placeholder="15"
                    value={formData.commissionRate || ''}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    step="0.1"
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Percentage of sale price paid to creators
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Fashion & Apparel">Fashion & Apparel</option>
                    <option value="Beauty & Personal Care">Beauty & Personal Care</option>
                    <option value="Home & Kitchen">Home & Kitchen</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Books & Stationery">Books & Stationery</option>
                    <option value="Sports & Outdoors">Sports & Outdoors</option>
                    <option value="Toys & Games">Toys & Games</option>
                    <option value="Jewelry & Accessories">Jewelry & Accessories</option>
                    <option value="Food & Beverages">Food & Beverages</option>
                    <option value="Mobile & Accessories">Mobile & Accessories</option>
                    <option value="Computers & Laptops">Computers & Laptops</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Baby Products">Baby Products</option>
                    <option value="Pet Supplies">Pet Supplies</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Music & Instruments">Music & Instruments</option>
                    <option value="Art & Crafts">Art & Crafts</option>
                    <option value="Digital Products">Digital Products</option>
                    <option value="Services">Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="wireless, audio, tech (comma separated)"
                    value={formData.tags}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Product Image URL</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={(formData as any).imageUrl || ''}
                    onChange={handleChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Provide a URL to your product image (JPEG, PNG, WebP)
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 mt-6">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Updating...' : 'Update Product'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}

