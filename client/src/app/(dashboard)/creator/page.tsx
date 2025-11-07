import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MousePointerClick, DollarSign, TrendingUp, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default function CreatorDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="creator" />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Track your performance and earnings</p>
            </div>
            <Link href="/creator/marketplace">
              <Button className="gap-2">
                <ExternalLink className="h-4 w-4" />
                Browse Products
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <StatCard
              title="Total Clicks"
              value="1,234"
              icon={MousePointerClick}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Conversions"
              value="45"
              icon={TrendingUp}
              description="3.6% conversion rate"
            />
            <StatCard
              title="Total Earnings"
              value="₹12,450"
              icon={DollarSign}
              trend={{ value: 18, isPositive: true }}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Active Links */}
            <Card>
              <CardHeader>
                <CardTitle>Your Active Links</CardTitle>
                <CardDescription>Products you're currently promoting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded bg-purple-100 dark:bg-purple-900/20" />
                        <div>
                          <p className="text-sm font-medium">Product Name {i}</p>
                          <p className="text-xs text-muted-foreground">
                            {45 - i * 10} clicks • {5 - i} sales
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">₹{(5 - i) * 299}</p>
                        <p className="text-xs text-muted-foreground">earned</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/creator/links">
                  <Button variant="outline" className="w-full mt-4">
                    View All Links
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Earnings Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
                <CardDescription>Your commission breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Available Balance</span>
                      <span className="text-2xl font-bold text-green-600">₹8,450</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Minimum ₹500 required for payout
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium">₹2,100</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">This Month</span>
                      <span className="font-medium">₹5,600</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">All Time</span>
                      <span className="font-medium">₹45,890</span>
                    </div>
                  </div>

                  <Link href="/creator/payouts">
                    <Button className="w-full">
                      Request Payout
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

