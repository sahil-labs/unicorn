import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "@/components/mobile-nav";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">CreatorAds</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              How it Works
            </Link>
            <Link href="/pricing" className="text-sm font-medium text-primary">
              Pricing
            </Link>
            <Link
              href="/faq"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              FAQ
            </Link>
            <div className="h-4 w-px bg-border"></div>
            <Link
              href="/brand-landing"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors flex items-center gap-1"
            >
              Are you a Brand? →
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav role="creator" />
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Pay Only for <span className="text-accent">Verified Clicks</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            No hidden fees. No subscriptions. Just performance-based pricing.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Creator Pricing */}
            <Card className="border-2 border-secondary relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-secondary text-white px-4 py-1 text-sm font-medium">
                For Creators
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-3xl mb-2">
                  100% Free to Join
                </CardTitle>
                <CardDescription className="text-lg">
                  No signup fees, no monthly charges
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="text-5xl font-bold mb-2">₹5-₹15</div>
                  <div className="text-muted-foreground">
                    per verified click
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Instant Earnings</div>
                      <div className="text-sm text-muted-foreground">
                        Get paid for every unique click you drive
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Weekly Payouts</div>
                      <div className="text-sm text-muted-foreground">
                        Via UPI or bank transfer, no minimum threshold
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Real-time Dashboard</div>
                      <div className="text-sm text-muted-foreground">
                        Track clicks and earnings live
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">No Sales Pressure</div>
                      <div className="text-sm text-muted-foreground">
                        Earn per click, not per conversion
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Unlimited Campaigns</div>
                      <div className="text-sm text-muted-foreground">
                        Promote as many products as you want
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/signup?role=creator" className="block">
                  <Button
                    className="w-full bg-secondary hover:bg-secondary/90"
                    size="lg"
                  >
                    Start Earning Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Brand Pricing */}
            <Card className="border-2 border-accent relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white px-4 py-1 text-sm font-medium">
                For Brands
              </div>
              <CardHeader className="pt-12">
                <CardTitle className="text-3xl mb-2">
                  CPC Performance Model
                </CardTitle>
                <CardDescription className="text-lg">
                  You set the price, you control the budget
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-8">
                  <div className="text-5xl font-bold mb-2">₹5-₹20</div>
                  <div className="text-muted-foreground">
                    per verified click (you decide)
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Set Your Own CPC</div>
                      <div className="text-sm text-muted-foreground">
                        Higher CPC = more creator visibility
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">
                        Pay Only for Verified Clicks
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Advanced fraud detection included
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Daily Budget Control</div>
                      <div className="text-sm text-muted-foreground">
                        Set maximum daily/monthly spend limits
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Instant Creator Network</div>
                      <div className="text-sm text-muted-foreground">
                        Reach 12,000+ creators immediately
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">Real-time Analytics</div>
                      <div className="text-sm text-muted-foreground">
                        UTM tracking, click-through rates, ROI metrics
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">No Platform Fee</div>
                      <div className="text-sm text-muted-foreground">
                        You pay exactly what you set as CPC
                      </div>
                    </div>
                  </div>
                </div>

                <Link href="/signup?role=brand" className="block">
                  <Button
                    className="w-full bg-accent hover:bg-accent/90"
                    size="lg"
                  >
                    Launch Campaign <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Example Calculations */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            How the CPC Model Works
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-2">
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">
                  Creator Example
                </Badge>
                <CardTitle>Your Earnings Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">Campaign CPC Rate</div>
                  <div className="font-bold">₹10 per click</div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">Clicks you drove</div>
                  <div className="font-bold">500 clicks</div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">Your Earnings</div>
                  <div className="font-bold text-accent text-xl">₹5,000</div>
                </div>
                <div className="text-sm text-muted-foreground pt-2">
                  ✓ Paid weekly via UPI
                  <br />
                  ✓ No deductions or platform fees
                  <br />✓ Track earnings in real-time
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Badge variant="default" className="w-fit mb-2 bg-accent">
                  Brand Example
                </Badge>
                <CardTitle>Your Campaign Cost</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">Your Set CPC Rate</div>
                  <div className="font-bold">₹12 per click</div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">
                    Verified clicks received
                  </div>
                  <div className="font-bold">1,000 clicks</div>
                </div>
                <div className="flex justify-between items-center pb-3 border-b">
                  <div className="text-muted-foreground">
                    Total Campaign Cost
                  </div>
                  <div className="font-bold text-primary text-xl">₹12,000</div>
                </div>
                <div className="text-sm text-muted-foreground pt-2">
                  ✓ Only pay for verified, unique clicks
                  <br />
                  ✓ No hidden fees or platform charges
                  <br />✓ Set daily/monthly budget limits
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Pricing FAQs
          </h2>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How is CPC different from CPM or CPA?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                CPC (Cost Per Click) means you only pay when someone actually
                clicks your link - not just sees it (CPM) or buys something
                (CPA). This gives brands predictable costs and creators
                guaranteed earnings.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I change my CPC rate as a brand?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! You can adjust your CPC rate anytime. Higher rates give
                your campaign more visibility to creators, while lower rates are
                budget-friendly. We recommend ₹8-₹15 for optimal results.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do creators get paid?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Creators receive automated weekly payouts via UPI or bank
                transfer. There's no minimum payout threshold, and all earnings
                are tracked in real-time in your dashboard.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What prevents click fraud?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We use ML-powered fraud detection including IP deduplication,
                device fingerprinting, bot detection, and behavioral analysis.
                Only genuine, unique clicks are counted and billed.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Are there any hidden fees?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                No. Creators keep 100% of their CPC earnings. Brands pay exactly
                the CPC rate they set - no platform fees, no surprises. Payment
                processing fees (Razorpay) are minimal and transparent.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 12,000+ creators and 500+ brands today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?role=creator">
              <Button size="lg" variant="secondary" className="gap-2">
                I'm a Creator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/signup?role=brand">
              <Button size="lg" className="gap-2 bg-accent hover:bg-accent/90">
                I'm a Brand <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 CreatorAds Network. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
