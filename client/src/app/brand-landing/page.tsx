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
import {
  ArrowRight,
  Check,
  Target,
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Shield,
  Users,
  Sparkles,
  Zap,
  DollarSign,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Brands - Run Influencer Marketing Like Ads | CreatorAds",
  description:
    "Buy real influencer traffic on CPC. Reach 12,000+ micro-creators instantly. Pay only for verified clicks. Cheaper than Meta ads, more authentic than Google ads.",
  keywords: [
    "influencer marketing",
    "CPC ads",
    "brand marketing",
    "creator network",
    "performance marketing",
    "cost per click",
    "micro-influencers",
  ],
};

export default function BrandLandingPage() {
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
            <Link
              href="/pricing"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
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
              href="/"
              className="text-sm font-medium text-secondary hover:text-secondary/80 transition-colors flex items-center gap-1"
            >
              ← For Creators
            </Link>
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/signup?role=brand">
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav role="brand" />
        </div>
      </header>

      {/* Hero Section - Brand Focused */}
      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="default"
            className="mb-6 px-4 py-1.5 text-sm font-medium bg-primary"
          >
            🏢 For Brands
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Run influencer marketing
            <br />
            like ads - <span className="text-accent">pay only for clicks</span>
          </h1>

          <p className="text-2xl md:text-3xl text-foreground font-semibold mb-4">
            Buy real influencer traffic on CPC
          </p>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Cheaper than Meta ads, more authentic than Google ads - reach
            12,000+ micro-creators instantly
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup?role=brand">
              <Button
                size="lg"
                className="gap-2 bg-accent hover:bg-accent/90 text-white text-lg px-8 py-6"
              >
                Start Your Campaign <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                View Pricing
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹5-₹20</div>
              <div className="text-sm text-muted-foreground">CPC (You Set)</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">12K+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">2.4M+</div>
              <div className="text-sm text-muted-foreground">
                Verified Clicks
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5 min</div>
              <div className="text-sm text-muted-foreground">To Launch</div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Traditional Influencer Marketing is{" "}
              <span className="text-destructive">Broken</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              You know the pain...
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-lg">Endless Negotiations</CardTitle>
                <CardDescription>
                  DMs, emails, back-and-forth pricing discussions with every
                  single creator. Weeks wasted.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-lg">No ROI Visibility</CardTitle>
                <CardDescription>
                  You pay ₹10K per post but have no idea if it drove 10 clicks
                  or 10,000 clicks. Total blackbox.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-lg">Can't Scale</CardTitle>
                <CardDescription>
                  Working with 50+ creators means 50+ conversations. Impossible
                  to scale your influencer strategy.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4 bg-accent">
              The CreatorAds Solution
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Performance Marketing via Creators
            </h2>
            <p className="text-xl text-muted-foreground">
              Pay only for real, verified clicks - no wastage, full transparency
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>CPC Performance Model</CardTitle>
                <CardDescription className="text-base">
                  Set your CPC rate (₹5-₹20). Only pay for unique, verified
                  clicks. No upfront creator fees or guesswork. Total control.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Advanced Click Verification</CardTitle>
                <CardDescription className="text-base">
                  ML-powered fraud detection ensures you pay only for genuine
                  traffic. IP deduplication, bot filtering, and device tracking
                  included.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Instant Scale</CardTitle>
                <CardDescription className="text-base">
                  Reach 12,000+ micro‑creators instantly with one campaign. No
                  DMs, no negotiations. Launch in 5 minutes.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works for Brands */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Launch in 3 Simple Steps
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Create Your Campaign
                </h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Add your product/landing page URL, set your CPC rate (₹5-₹20),
                  define your daily budget, and add campaign visuals. Takes
                  under 5 minutes.
                </p>
                <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border-2">
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      Set your own CPC rate
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      Control daily budget
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      Add product images
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-accent" />
                      Target by niche (optional)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Creators Promote Instantly
                </h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Once live, your campaign appears in our marketplace. 12,000+
                  creators browse, pick campaigns that fit their audience, and
                  start promoting immediately.
                </p>
                <Card className="border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-accent" />
                      <div>
                        <div className="font-semibold">
                          Instant Distribution
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Your campaign reaches creators across Instagram,
                          YouTube, Twitter, and blogs
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Track & Pay Only for Verified Clicks
                </h3>
                <p className="text-muted-foreground text-lg mb-4">
                  Monitor real‑time clicks, top performing creators, and ROI in
                  your dashboard. Our fraud detection ensures you only pay for
                  genuine traffic.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        1,000
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Verified Clicks
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">₹12</div>
                      <div className="text-sm text-muted-foreground">
                        Your CPC
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">
                        ₹12,000
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Cost
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Why CreatorAds vs. Traditional Methods?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2">
                  <th className="text-left p-4"></th>
                  <th className="text-center p-4 font-bold text-lg">
                    CreatorAds
                  </th>
                  <th className="text-center p-4 text-muted-foreground">
                    Direct DMs
                  </th>
                  <th className="text-center p-4 text-muted-foreground">
                    Meta Ads
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Setup Time</td>
                  <td className="text-center p-4 text-accent font-bold">
                    5 minutes
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    2-3 weeks
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    1-2 days
                  </td>
                </tr>
                <tr className="border-b bg-slate-50 dark:bg-slate-900/30">
                  <td className="p-4 font-medium">Cost Model</td>
                  <td className="text-center p-4 text-accent font-bold">
                    CPC (₹5-₹20)
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    ₹5K-₹50K/post
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    CPC (₹10-₹30)
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">ROI Tracking</td>
                  <td className="text-center p-4 text-accent font-bold">
                    Real-time
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    None
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    Real-time
                  </td>
                </tr>
                <tr className="border-b bg-slate-50 dark:bg-slate-900/30">
                  <td className="p-4 font-medium">Authenticity</td>
                  <td className="text-center p-4 text-accent font-bold">
                    High (Creators)
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    High
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    Low (Ads)
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium">Scalability</td>
                  <td className="text-center p-4 text-accent font-bold">
                    12,000+ creators
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    10-20 max
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    Unlimited
                  </td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-900/30">
                  <td className="p-4 font-medium">Fraud Protection</td>
                  <td className="text-center p-4 text-accent font-bold">
                    ✓ ML-powered
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    ✗ None
                  </td>
                  <td className="text-center p-4 text-muted-foreground">
                    ✓ Basic
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Preview */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Full Analytics & Control
            </h2>
            <p className="text-xl text-muted-foreground">
              Track every click, monitor every creator, optimize in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2">
              <CardHeader>
                <MousePointerClick className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Click Analytics</CardTitle>
                <CardDescription>
                  Real-time click counts, hourly trends, device breakdown,
                  geographic data
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Users className="h-8 w-8 text-secondary mb-2" />
                <CardTitle className="text-lg">Creator Performance</CardTitle>
                <CardDescription>
                  See which creators drive the most traffic and optimize your
                  budget
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-lg">ROI Metrics</CardTitle>
                <CardDescription>
                  Track cost-per-click, conversion rates (with UTM), and
                  campaign ROI
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="h-8 w-8 text-accent mb-2" />
                <CardTitle className="text-lg">Fraud Detection</CardTitle>
                <CardDescription>
                  View detailed click logs, dispute suspicious activity, ensure
                  quality
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary via-slate-800 to-accent border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Launch Your Campaign?
              </h2>
              <p className="text-lg mb-8 text-slate-200">
                Join 500+ brands using CreatorAds to reach authentic audiences
              </p>
              <Link href="/signup?role=brand">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-white text-primary hover:bg-slate-100 text-lg px-8 py-6"
                >
                  Start Your First Campaign <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm mt-6 text-slate-300">
                Setup in 5 minutes • No monthly fees • Pay only for verified
                clicks
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <span className="font-bold text-lg text-primary">
                  CreatorAds
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                India's first CPC traffic marketplace for creators & brands
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/how-it-works"
                    className="hover:text-foreground transition-colors"
                  >
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-foreground transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/"
                    className="hover:text-foreground transition-colors"
                  >
                    For Creators
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/legal/terms"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/privacy"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/legal/refund"
                    className="hover:text-foreground transition-colors"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2025 CreatorAds Network. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
