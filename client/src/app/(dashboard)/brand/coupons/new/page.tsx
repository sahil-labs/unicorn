'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { createCoupon, CreateCouponData } from '@/lib/coupons-api'

export default function NewCouponPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState<CreateCouponData>({
    code: '',
    description: '',
    discountType: 'percentage',
    discountValue: 0,
    minimumPurchase: 0,
    usageLimit: null,
    expiresAt: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
      // Validate
      if (formData.discountType === 'percentage' && formData.discountValue > 100) {
        setError('Percentage discount cannot exceed 100%')
        setIsLoading(false)
        return
      }

      const response = await createCoupon(formData)

      if (response.success) {
        router.push('/brand/coupons')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create coupon')
      setIsLoading(false)
    }
  }

  // Generate random coupon code
  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setFormData(prev => ({ ...prev, code }))
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container max-w-3xl mx-auto p-8">
          <Link href="/brand/coupons">
            <Button variant="ghost" className="gap-2 mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to Coupons
            </Button>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-bold">Create Coupon</h1>
            <p className="text-muted-foreground">Create a new discount code for your products</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle>Coupon Details</CardTitle>
                <CardDescription>
                  Set up your discount code and conditions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="code">Coupon Code *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="code"
                      placeholder="SAVE20"
                      value={formData.code}
                      onChange={handleChange}
                      required
                      maxLength={20}
                      className="uppercase"
                    />
                    <Button type="button" variant="outline" onClick={generateCode}>
                      Generate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    3-20 characters, letters, numbers, hyphens and underscores only
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="e.g., Get 20% off on all electronics"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type *</Label>
                    <select
                      id="discountType"
                      className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.discountType}
                      onChange={handleChange}
                      required
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="discountValue">Discount Value *</Label>
                    <Input
                      id="discountValue"
                      type="number"
                      placeholder={formData.discountType === 'percentage' ? '20' : '500'}
                      value={formData.discountValue || ''}
                      onChange={handleChange}
                      required
                      min="0"
                      max={formData.discountType === 'percentage' ? 100 : undefined}
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minimumPurchase">Minimum Purchase (₹)</Label>
                    <Input
                      id="minimumPurchase"
                      type="number"
                      placeholder="0"
                      value={formData.minimumPurchase || ''}
                      onChange={handleChange}
                      min="0"
                      step="0.01"
                    />
                    <p className="text-xs text-muted-foreground">
                      0 = No minimum
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="usageLimit">Usage Limit</Label>
                    <Input
                      id="usageLimit"
                      type="number"
                      placeholder="Unlimited"
                      value={formData.usageLimit || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value ? parseInt(e.target.value) : null }))}
                      min="1"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave empty for unlimited
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="expiresAt">Expiration Date *</Label>
                  <Input
                    id="expiresAt"
                    type="datetime-local"
                    value={formData.expiresAt}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().slice(0, 16)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4 mt-6">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? 'Creating...' : 'Create Coupon'}
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

