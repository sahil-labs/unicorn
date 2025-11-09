'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DollarSign, CheckCircle2, Clock, XCircle, CreditCard, Wallet } from 'lucide-react'

interface Payout {
  id: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  method: 'upi' | 'bank'
  requestedAt: string
  completedAt?: string
  transactionId?: string
}

export default function CreatorPayoutsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [availableBalance, setAvailableBalance] = useState(0)
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [isRequesting, setIsRequesting] = useState(false)
  const [payoutMethod, setPayoutMethod] = useState<'upi' | 'bank'>('upi')
  const [upiId, setUpiId] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [ifscCode, setIfscCode] = useState('')

  useEffect(() => {
    fetchPayouts()
  }, [])

  const fetchPayouts = async () => {
    try {
      setIsLoading(true)
      
      // This would fetch actual payout data from the API
      // Endpoint: /api/creator/payouts
      
      setAvailableBalance(0)
      setPayouts([])
      
    } catch (error) {
      console.error('Failed to fetch payouts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRequestPayout = async () => {
    if (availableBalance === 0) return
    
    try {
      setIsRequesting(true)
      
      // API call to request payout
      // POST /api/creator/payouts/request
      
      alert('Payout request submitted! Processing time: 1-2 business days')
      fetchPayouts()
      
    } catch (error) {
      console.error('Failed to request payout:', error)
      alert('Failed to request payout. Please try again.')
    } finally {
      setIsRequesting(false)
    }
  }

  const getStatusIcon = (status: Payout['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-accent" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: Payout['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-accent">Completed</Badge>
      case 'pending':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>
      case 'failed':
        return <Badge variant="outline" className="border-red-500 text-red-500">Failed</Badge>
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
                <p className="text-muted-foreground">Loading payouts...</p>
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
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">Payouts</h1>
              <Badge variant="secondary">Weekly Schedule</Badge>
            </div>
            <p className="text-muted-foreground">Request and track your earnings payouts</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Left Column - Request Payout */}
            <div className="md:col-span-2 space-y-6">
              {/* Available Balance */}
              <Card className="border-2 bg-gradient-to-br from-accent/5 to-accent/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-accent" />
                    Available Balance
                  </CardTitle>
                  <CardDescription>Ready for withdrawal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold text-accent mb-6">
                    ₹{availableBalance.toLocaleString()}
                  </div>
                  
                  {availableBalance > 0 ? (
                    <>
                      {/* Payment Method Selection */}
                      <div className="space-y-4 mb-6">
                        <Label>Select Payment Method</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => setPayoutMethod('upi')}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              payoutMethod === 'upi'
                                ? 'border-secondary bg-secondary/10'
                                : 'border-border hover:border-secondary/50'
                            }`}
                          >
                            <Wallet className="h-5 w-5 mb-2 text-secondary" />
                            <div className="font-semibold">UPI</div>
                            <div className="text-xs text-muted-foreground">Instant transfer</div>
                          </button>
                          
                          <button
                            onClick={() => setPayoutMethod('bank')}
                            className={`p-4 border-2 rounded-lg text-left transition-all ${
                              payoutMethod === 'bank'
                                ? 'border-secondary bg-secondary/10'
                                : 'border-border hover:border-secondary/50'
                            }`}
                          >
                            <CreditCard className="h-5 w-5 mb-2 text-secondary" />
                            <div className="font-semibold">Bank Transfer</div>
                            <div className="text-xs text-muted-foreground">1-2 days</div>
                          </button>
                        </div>
                      </div>

                      {/* Payment Details */}
                      {payoutMethod === 'upi' ? (
                        <div className="space-y-2 mb-6">
                          <Label htmlFor="upi">UPI ID</Label>
                          <Input
                            id="upi"
                            placeholder="yourname@upi"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="border-2"
                          />
                        </div>
                      ) : (
                        <div className="space-y-4 mb-6">
                          <div className="space-y-2">
                            <Label htmlFor="account">Account Number</Label>
                            <Input
                              id="account"
                              placeholder="1234567890"
                              value={accountNumber}
                              onChange={(e) => setAccountNumber(e.target.value)}
                              className="border-2"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="ifsc">IFSC Code</Label>
                            <Input
                              id="ifsc"
                              placeholder="SBIN0001234"
                              value={ifscCode}
                              onChange={(e) => setIfscCode(e.target.value)}
                              className="border-2"
                            />
                          </div>
                        </div>
                      )}

                      <Button
                        onClick={handleRequestPayout}
                        disabled={isRequesting || (payoutMethod === 'upi' ? !upiId : !accountNumber || !ifscCode)}
                        className="w-full"
                      >
                        {isRequesting ? 'Processing...' : 'Request Payout'}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground mb-4">
                        No balance available for withdrawal
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Start promoting campaigns to earn
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Payout History */}
              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Payout History</CardTitle>
                  <CardDescription>Your past withdrawal requests</CardDescription>
                </CardHeader>
                <CardContent>
                  {payouts.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <DollarSign className="h-8 w-8 text-secondary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No Payouts Yet</h3>
                      <p className="text-muted-foreground">
                        Your payout history will appear here once you request your first withdrawal
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {payouts.map((payout) => (
                        <div
                          key={payout.id}
                          className="flex items-center justify-between p-4 border-2 rounded-lg"
                        >
                          <div className="flex items-center gap-4">
                            {getStatusIcon(payout.status)}
                            <div>
                              <div className="font-semibold">₹{payout.amount.toLocaleString()}</div>
                              <div className="text-sm text-muted-foreground">
                                {new Date(payout.requestedAt).toLocaleDateString()} • {payout.method.toUpperCase()}
                              </div>
                              {payout.transactionId && (
                                <div className="text-xs text-muted-foreground">
                                  TXN: {payout.transactionId}
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            {getStatusBadge(payout.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Info */}
            <div className="space-y-6">
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Payout Schedule</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold">Weekly Payouts</div>
                      <div className="text-muted-foreground">Every Monday</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold">No Minimum</div>
                      <div className="text-muted-foreground">Withdraw any amount</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <div className="font-semibold">Fast Processing</div>
                      <div className="text-muted-foreground">1-2 business days</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">
                    Having issues with payouts? Our support team is here to help.
                  </p>
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}


