import { Sidebar } from '@/components/dashboard/sidebar'
import { StatCard } from '@/components/dashboard/stat-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Package, Users, MousePointerClick, DollarSign, TrendingUp, Sparkles } from 'lucide-react'

export default function BrandDashboard() {
  return (
    <div className="flex h-screen">
      <Sidebar role="brand" />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Brand Dashboard</h1>
              <Badge variant="default" className="bg-accent">CPC Network</Badge>
            </div>
            <p className="text-muted-foreground">Track your campaigns, clicks, and creator performance</p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Active Campaigns"
              value="12"
              icon={Package}
              description="3 ending this week"
            />
            <StatCard
              title="Verified Clicks"
              value="15,234"
              icon={MousePointerClick}
              trend={{ value: 12, isPositive: true }}
            />
            <StatCard
              title="Active Creators"
              value="248"
              icon={Users}
              trend={{ value: 8, isPositive: true }}
            />
            <StatCard
              title="Total Spent"
              value="₹1,52,340"
              icon={DollarSign}
              description="Avg CPC: ₹10"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Clicks */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-5 w-5 text-accent" />
                  Recent Clicks
                </CardTitle>
                <CardDescription>Latest traffic from creators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { creator: '@fashion_lover', campaign: 'Summer Collection', clicks: 45, cpc: 10, time: '2m ago' },
                    { creator: '@tech_reviews', campaign: 'Smart Watch Launch', clicks: 38, cpc: 12, time: '15m ago' },
                    { creator: '@lifestyle_hub', campaign: 'Home Decor Sale', clicks: 52, cpc: 8, time: '1h ago' },
                    { creator: '@beauty_guru', campaign: 'Skincare Bundle', clicks: 29, cpc: 15, time: '2h ago' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                          <Users className="h-5 w-5 text-secondary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.creator}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.campaign}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-accent">{item.clicks} clicks</p>
                        <p className="text-xs text-muted-foreground">₹{item.cpc} CPC • {item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Campaigns */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Top Performing Campaigns
                </CardTitle>
                <CardDescription>Highest traffic this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Summer Fashion Collection', clicks: 2450, spend: 24500, cpc: 10 },
                    { name: 'Smart Home Devices', clicks: 1890, spend: 22680, cpc: 12 },
                    { name: 'Fitness Equipment Sale', clicks: 1650, spend: 13200, cpc: 8 },
                    { name: 'Premium Headphones', clicks: 1520, spend: 22800, cpc: 15 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                          <Package className="h-5 w-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.clicks.toLocaleString()} clicks • ₹{item.cpc} CPC
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">₹{item.spend.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Total spent</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card className="border-2 bg-gradient-to-br from-accent/5 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Launch a New Campaign</h3>
                      <p className="text-sm text-muted-foreground">Reach 12,000+ creators in minutes</p>
                    </div>
                  </div>
                  <a 
                    href="/brand/products/new"
                    className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 transition-colors"
                  >
                    Create Campaign
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
