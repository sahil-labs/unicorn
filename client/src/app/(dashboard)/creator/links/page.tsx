'use client'

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Copy, ExternalLink, MousePointerClick, TrendingUp, Package, Check } from 'lucide-react'
import Link from 'next/link'

interface TrackedLink {
  id: string
  productName: string
  productId: string
  trackingUrl: string
  clicks: number
  earnings: number
  cpc: number
  createdAt: string
}

export default function CreatorLinksPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [links, setLinks] = useState<TrackedLink[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    fetchLinks()
  }, [])

  const fetchLinks = async () => {
    try {
      setIsLoading(true)
      
      // Fetch tracking links from the API
      const response = await fetch('http://localhost:8000/api/creator/links', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const result = await response.json()
        
        if (result.success && result.data) {
          setLinks(result.data)
        }
      } else {
        console.error('Failed to fetch links:', response.statusText)
      }
      
    } catch (error) {
      console.error('Failed to fetch links:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (url: string, id: string) => {
    try {
      await navigator.clipboard.writeText(url)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
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
                <p className="text-muted-foreground">Loading your links...</p>
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
                  <h1 className="text-3xl font-bold">My Tracking Links</h1>
                  <Badge variant="secondary">{links.length} Active</Badge>
                </div>
                <p className="text-muted-foreground">Manage and track all your campaign links</p>
              </div>
              <Link href="/creator/marketplace">
                <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                  <Package className="h-4 w-4" />
                  Browse Campaigns
                </Button>
              </Link>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Clicks
                  </CardTitle>
                  <MousePointerClick className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {links.reduce((sum, link) => sum + link.clicks, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Across all links</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Earnings
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-accent" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-accent">
                  ₹{links.reduce((sum, link) => sum + link.earnings, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">From {links.length} campaigns</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Avg CPC
                  </CardTitle>
                  <MousePointerClick className="h-4 w-4 text-secondary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ₹{links.length > 0 ? Math.round(links.reduce((sum, link) => sum + link.cpc, 0) / links.length) : 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">Average per click</p>
              </CardContent>
            </Card>
          </div>

          {/* Links List */}
          {links.length === 0 ? (
            <Card className="border-2">
              <CardContent className="py-16">
                <div className="text-center max-w-md mx-auto">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-8 w-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No Tracking Links Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse the marketplace and generate your first tracking link to start earning per click
                  </p>
                  <Link href="/creator/marketplace">
                    <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                      <Package className="h-4 w-4" />
                      Browse Campaigns
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {links.map((link) => (
                <Card key={link.id} className="border-2 hover:border-secondary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{link.productName}</h3>
                          <Badge variant="secondary" className="text-xs">
                            ₹{link.cpc} CPC
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Created {new Date(link.createdAt).toLocaleDateString()}
                        </p>
                        
                        {/* Tracking URL */}
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 p-3 rounded-lg mb-4">
                          <code className="text-sm flex-1 truncate">{link.trackingUrl}</code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(link.trackingUrl, link.id)}
                            className="flex-shrink-0"
                          >
                            {copiedId === link.id ? (
                              <Check className="h-4 w-4 text-accent" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Clicks</div>
                            <div className="text-lg font-bold">{link.clicks.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">Earned</div>
                            <div className="text-lg font-bold text-accent">₹{link.earnings.toLocaleString()}</div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg">
                            <div className="text-xs text-muted-foreground mb-1">CPC</div>
                            <div className="text-lg font-bold">₹{link.cpc}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}


