'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MousePointerClick, DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'
import Link from 'next/link'

interface EarningsData {
  totalEarnings: number
  availableBalance: number
  pendingBalance: number
  thisWeek: number
  thisMonth: number
  lastMonth: number
}

interface Transaction {
  id: string
  type: 'click' | 'payout'
  campaignName: string
  amount: number
  clicks: number
  date: string
  status: 'completed' | 'pending'
}

export default function CreatorEarningsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [earnings, setEarnings] = useState<EarningsData>({
    totalEarnings: 0,
    availableBalance: 0,
    pendingBalance: 0,
    thisWeek: 0,
    thisMonth: 0,
    lastMonth: 0,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'week' | 'month'>('all')

  useEffect(() => {
    fetchEarnings()
  }, [])

  const fetchEarnings = async () => {
    try {
      setIsLoading(true)
      
      // This would fetch actual earnings data from the API
      // Endpoint: /api/creator/earnings
      
      // For now, showing empty state
      setEarnings({
        totalEarnings: 0,
        availableBalance: 0,
        pendingBalance: 0,
        thisWeek: 0,
        thisMonth: 0,
        lastMonth: 0,
      })
      setTransactions([])
      
    } catch (error) {
      console.error('Failed to fetch earnings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar role="creator" />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading earnings...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="creator" />
      
      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold">Earnings</h1>
                  <Badge variant="default" className="bg-accent">
                    CPC Tracking
                  </Badge>
                </div>
                <p className="text-muted-foreground">Track your click earnings and payouts</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-8">
            <Card className="border-2 bg-gradient-to-br from-accent/5 to-accent/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Available Balance
                </CardTitle>
                <CardDescription>Ready for payout</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-accent mb-4">
                  ₹{earnings.availableBalance.toLocaleString()}
                </div>
                <Link href="/creator/payouts">
                  <Button 
                    className="w-full" 
                    disabled={earnings.availableBalance === 0}
                  >
                    Request Payout
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-secondary" />
                  Total Earnings
                </CardTitle>
                <CardDescription>All time earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold mb-4">
                  ₹{earnings.totalEarnings.toLocaleString()}
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending:</span>
                    <span className="font-medium">₹{earnings.pendingBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">This Week:</span>
                    <span className="font-medium">₹{earnings.thisWeek.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Period Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{earnings.thisWeek.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Last 7 days</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{earnings.thisMonth.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Current month</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Last Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{earnings.lastMonth.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">Previous month</p>
              </CardContent>
            </Card>
          </div>

          {/* Transactions */}
          <Card className="border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Your click earnings and payouts</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={filter === 'week' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('week')}
                  >
                    Week
                  </Button>
                  <Button
                    variant={filter === 'month' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('month')}
                  >
                    Month
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No Transactions Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start promoting campaigns to see your earnings here
                  </p>
                  <Link href="/creator/marketplace">
                    <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                      Browse Campaigns
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 border-2 rounded-lg hover:border-secondary/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          transaction.type === 'click' 
                            ? 'bg-accent/10' 
                            : 'bg-secondary/10'
                        }`}>
                          {transaction.type === 'click' ? (
                            <MousePointerClick className="h-5 w-5 text-accent" />
                          ) : (
                            <DollarSign className="h-5 w-5 text-secondary" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold">{transaction.campaignName}</div>
                          <div className="text-sm text-muted-foreground">
                            {transaction.type === 'click' 
                              ? `${transaction.clicks} clicks` 
                              : 'Payout'} • {new Date(transaction.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-bold ${
                          transaction.type === 'click' ? 'text-accent' : 'text-secondary'
                        }`}>
                          {transaction.type === 'click' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                        </div>
                        <Badge 
                          variant={transaction.status === 'completed' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {transaction.status}
                        </Badge>
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


