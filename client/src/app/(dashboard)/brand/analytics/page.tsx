'use client'

import { useEffect, useState } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Eye,
  Activity
} from 'lucide-react'

export default function BrandAnalyticsPage() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    totalOrders: 0,
    ordersChange: 0,
    activeCreators: 0,
    creatorsChange: 0,
    productViews: 0,
    viewsChange: 0,
    conversionRate: 0,
    conversionChange: 0,
    avgOrderValue: 0,
    avgOrderChange: 0,
  })

  const [topProducts, setTopProducts] = useState<any[]>([])
  const [topCreators, setTopCreators] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true)
      
      const response = await fetch('http://localhost:5000/api/analytics/overview', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Failed to fetch analytics')
      }

      const result = await response.json()
      
      if (result.success && result.data) {
        setStats(result.data.stats)
        setTopProducts(result.data.topProducts || [])
        setTopCreators(result.data.topCreators || [])
      }
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
      // Keep everything at 0 if fetch fails
      setStats({
        totalRevenue: 0,
        revenueChange: 0,
        totalOrders: 0,
        ordersChange: 0,
        activeCreators: 0,
        creatorsChange: 0,
        productViews: 0,
        viewsChange: 0,
        conversionRate: 0,
        conversionChange: 0,
        avgOrderValue: 0,
        avgOrderChange: 0,
      })
      setTopProducts([])
      setTopCreators([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <p className="text-muted-foreground">Track your performance and insights</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {/* Total Revenue */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.revenueChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.revenueChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.revenueChange >= 0 ? '+' : ''}{stats.revenueChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Total Orders */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.ordersChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.ordersChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.ordersChange >= 0 ? '+' : ''}{stats.ordersChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Active Creators */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Creators</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeCreators}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.creatorsChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.creatorsChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.creatorsChange >= 0 ? '+' : ''}{stats.creatorsChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Product Views */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Product Views</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.productViews.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.viewsChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.viewsChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.viewsChange >= 0 ? '+' : ''}{stats.viewsChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Conversion Rate */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.conversionRate}%</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.conversionChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.conversionChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.conversionChange >= 0 ? '+' : ''}{stats.conversionChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>

            {/* Avg Order Value */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{stats.avgOrderValue.toLocaleString()}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  {stats.avgOrderChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                  )}
                  <span className={stats.avgOrderChange >= 0 ? 'text-green-600' : 'text-red-600'}>
                    {stats.avgOrderChange >= 0 ? '+' : ''}{stats.avgOrderChange}%
                  </span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Your best-selling products this month</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  </div>
                ) : topProducts.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No sales data yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start selling products to see analytics
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Creators */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Creators</CardTitle>
                <CardDescription>Creators driving the most conversions</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                  </div>
                ) : topCreators.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No creator data yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Creators will appear here once they start promoting your products
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topCreators.map((creator, index) => (
                      <div key={index} className="flex items-center justify-between pb-4 border-b last:border-0">
                        <div>
                          <p className="font-medium">{creator.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {creator.clicks} clicks • {creator.conversions} conversions
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{creator.earnings.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">earned</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

