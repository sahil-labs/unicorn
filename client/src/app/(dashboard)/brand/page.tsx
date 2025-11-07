import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, Users, MousePointerClick, DollarSign } from 'lucide-react'

export default function BrandDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Products"
              value="12"
              icon={Package}
              description="3 active campaigns"
            />
            <StatCard
              title="Active Creators"
              value="248"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Total Clicks"
              value="15,234"
              icon={MousePointerClick}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Total Sales"
              value="₹2,45,600"
              icon={DollarSign}
              trend={{ value: 15, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest conversions from creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20" />
                        <div>
                          <p className="text-sm font-medium">Creator {i}</p>
                          <p className="text-xs text-muted-foreground">
                            1 sale • Product Name
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹1,299</p>
                        <p className="text-xs text-muted-foreground">2h ago</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Products</CardTitle>
                <CardDescription>Best sellers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded bg-purple-100 dark:bg-purple-900/20" />
                        <div>
                          <p className="text-sm font-medium">Product {i}</p>
                          <p className="text-xs text-muted-foreground">
                            {45 - i * 5} conversions
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">₹{(45 - i * 5) * 1299}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

