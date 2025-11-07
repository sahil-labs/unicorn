'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, Eye, EyeOff, Ticket, Copy } from 'lucide-react'
import Link from 'next/link'
import { getBrandCoupons, toggleCouponStatus, deleteCoupon, Coupon } from '@/lib/coupons-api'

export default function BrandCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCoupons()
  }, [])

  const fetchCoupons = async () => {
    try {
      setIsLoading(true)
      const response = await getBrandCoupons()
      setCoupons(response.data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load coupons')
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      await toggleCouponStatus(id)
      setCoupons(coupons.map(c => 
        c._id === id ? { ...c, isActive: !c.isActive } : c
      ))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to update coupon status')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this coupon?')) {
      return
    }

    try {
      await deleteCoupon(id)
      setCoupons(coupons.filter(c => c._id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete coupon')
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Copied: ${code}`)
  }

  const isExpired = (date: string) => new Date(date) < new Date()

  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Coupons</h1>
              <p className="text-muted-foreground">Manage discount codes for your products</p>
            </div>
            <Link href="/brand/coupons/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create Coupon
              </Button>
            </Link>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>All Coupons</CardTitle>
              <CardDescription>
                {isLoading ? 'Loading...' : `${coupons.length} coupons created`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                </div>
              ) : coupons.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/20 p-4 mb-4">
                    <Ticket className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No coupons yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Create discount coupons to boost sales and reward your customers. Creators can share these codes to drive conversions.
                  </p>
                  <Link href="/brand/coupons/new">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create Your First Coupon
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {coupons.map((coupon) => (
                    <div
                      key={coupon._id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="h-16 w-16 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                          <Ticket className="h-8 w-8 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-semibold text-lg">{coupon.code}</h3>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handleCopyCode(coupon.code)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            {isExpired(coupon.expiresAt) && (
                              <span className="text-xs bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 px-2 py-1 rounded">
                                Expired
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{coupon.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="font-medium text-green-600">
                              {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                            </span>
                            {coupon.minimumPurchase > 0 && (
                              <>
                                <span>•</span>
                                <span>Min: ₹{coupon.minimumPurchase}</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{coupon.usageCount} / {coupon.usageLimit || '∞'} used</span>
                            <span>•</span>
                            <span>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className={`gap-2 ${coupon.isActive ? 'text-green-600' : 'text-muted-foreground'}`}
                          onClick={() => handleToggleStatus(coupon._id)}
                        >
                          {coupon.isActive ? (
                            <>
                              <Eye className="h-4 w-4" />
                              Active
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4" />
                              Inactive
                            </>
                          )}
                        </Button>
                        <Link href={`/brand/coupons/${coupon._id}/edit`}>
                          <Button variant="ghost" size="sm" title="Edit">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive"
                          onClick={() => handleDelete(coupon._id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

