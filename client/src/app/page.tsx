import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, Check, Zap, Shield, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Micro-Creator
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
              How it Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/blog" className="text-sm font-medium hover:text-primary">
              Blog
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-purple-100 rounded-full text-sm font-medium text-purple-700 mb-4">
            India's first affiliate marketplace built for micro-creators
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Make <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">₹ per sale</span>,
            <br />
            not ₹ per post
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            No apply, no approval — just promote & earn
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/signup?role=creator">
              <Button size="lg" className="gap-2">
                Start Earning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup?role=brand">
              <Button size="lg" variant="outline">
                List Your Products
              </Button>
            </Link>
          </div>
          
          <div className="pt-8 text-sm text-muted-foreground">
            Join 1,000+ creators earning commissions daily
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-purple-50/50 to-white dark:from-purple-950/10 dark:to-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Built for Creators Like You
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to monetize your influence
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Instant Access</CardTitle>
                <CardDescription>
                  No applications or approvals. Start promoting products immediately after signup.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Transparent Earnings</CardTitle>
                <CardDescription>
                  Real-time tracking of clicks, conversions, and commissions. Know exactly what you earn.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Secure Payouts</CardTitle>
                <CardDescription>
                  Automated weekly payouts via UPI or bank transfer. Powered by Razorpay.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
            Start Earning in 3 Steps
          </h2>
          
          <div className="space-y-12">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Browse & Choose</h3>
                <p className="text-muted-foreground text-lg">
                  Explore our marketplace and pick products that match your audience. From fashion to tech, we have it all.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Get Your Link</h3>
                <p className="text-muted-foreground text-lg">
                  Generate your unique affiliate link instantly. Share it anywhere — Instagram, YouTube, WhatsApp, your blog.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Earn Commission</h3>
                <p className="text-muted-foreground text-lg">
                  When someone buys through your link, you earn. Track everything in real-time and get paid weekly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-white to-purple-50/50 dark:from-background dark:to-purple-950/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-12">
            Trusted by Creators & Brands
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">5,000+</div>
              <div className="text-sm text-muted-foreground">Active Creators</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Brands</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">₹2Cr+</div>
              <div className="text-sm text-muted-foreground">Paid Out</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-lg mb-8 text-purple-100">
                Join thousands of creators making money from their influence
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="gap-2">
                  Get Started — It's Free <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Micro-Creator</h3>
              <p className="text-sm text-muted-foreground">
                India's first affiliate marketplace for micro-creators
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/how-it-works" className="hover:text-foreground">How it Works</Link></li>
                <li><Link href="/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-foreground">About</Link></li>
                <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
                <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/legal/terms" className="hover:text-foreground">Terms & Conditions</Link></li>
                <li><Link href="/legal/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link href="/legal/refund" className="hover:text-foreground">Refund Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 Micro-Creator Affiliate. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  )
}

