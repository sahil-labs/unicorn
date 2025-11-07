import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Package, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="admin" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Platform overview and management</p>
          </div>

          {/* Platform Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Total Users"
              value="5,248"
              icon={Users}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Products"
              value="1,234"
              icon={Package}
              description="from 450 brands"
            />
            <StatCard
              title="Total GMV"
              value="₹24.5L"
              icon={TrendingUp}
              trend={{ value: 18, isPositive: true }}
            />
            <StatCard
              title="Pending Payouts"
              value="₹1.2L"
              icon={DollarSign}
              description="45 requests"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Signups</CardTitle>
                <CardDescription>Latest users who joined the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/20" />
                        <div>
                          <p className="text-sm font-medium">User {i}</p>
                          <p className="text-xs text-muted-foreground">
                            {i % 2 === 0 ? 'Creator' : 'Brand'} • user{i}@example.com
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{i}h ago</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
                <CardDescription>Platform status and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Database</span>
                    </div>
                    <span className="text-xs text-green-700 dark:text-green-300">Healthy</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">API</span>
                    </div>
                    <span className="text-xs text-green-700 dark:text-green-300">Operational</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/10">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Job Queue</span>
                    </div>
                    <span className="text-xs text-yellow-700 dark:text-yellow-300">23 pending</span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-900/10">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm font-medium">Email Service</span>
                    </div>
                    <span className="text-xs text-green-700 dark:text-green-300">Active</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

