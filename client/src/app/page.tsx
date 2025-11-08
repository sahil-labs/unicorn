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
  Zap,
  Shield,
  MousePointerClick,
  DollarSign,
  Users,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function Home() {
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

          {/* Desktop Navigation */}
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
            <Link href="/signup?role=creator">
              <Button size="sm" className="bg-secondary hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <MobileNav role="creator" />
        </div>
      </header>

      {/* Hero Section - Creator Focused */}
      <section className="container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            🇮🇳 For Creators
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            India's first traffic marketplace
            <br />
            built for{" "}
            <span className="bg-gradient-to-r from-accent to-green-400 bg-clip-text text-transparent">
              micro‑creators
            </span>
          </h1>

          <p className="text-2xl md:text-3xl text-foreground font-semibold mb-4">
            Make ₹ per click, not ₹ per post.
          </p>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
            No apply, no approval - just promote & earn
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/signup?role=creator">
              <Button
                size="lg"
                className="gap-2 bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-6"
              >
                Start Earning per Click <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹5-₹15</div>
              <div className="text-sm text-muted-foreground">Per Click</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">12K+</div>
              <div className="text-sm text-muted-foreground">Creators</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">₹3.2Cr+</div>
              <div className="text-sm text-muted-foreground">Paid Out</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">Weekly</div>
              <div className="text-sm text-muted-foreground">Payouts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Get Paid for Every Click
            </h2>
            <p className="text-xl text-muted-foreground">
              No sales targets, no pressure - just promote and earn
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Instant Access</CardTitle>
                <CardDescription className="text-base">
                  No applications or approvals needed. Sign up and start
                  promoting immediately. Access hundreds of campaigns instantly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <MousePointerClick className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Earn Per Click</CardTitle>
                <CardDescription className="text-base">
                  Get paid for every unique verified click - typically ₹5-₹15
                  per click. Track real‑time earnings in your dashboard.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Weekly Payouts</CardTitle>
                <CardDescription className="text-base">
                  Automated weekly payouts via UPI or bank transfer. No minimum
                  threshold. Powered by Razorpay for secure transactions.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            Start Earning in 3 Steps
          </h2>

          <div className="space-y-12">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Sign Up for Free</h3>
                <p className="text-muted-foreground text-lg">
                  Create your account in 30 seconds. No approval process -
                  instant access to our marketplace with hundreds of campaigns.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Get Your Tracking Link
                </h3>
                <p className="text-muted-foreground text-lg">
                  Pick campaigns that match your audience, get your unique
                  click‑tracking link instantly. Share on Instagram, YouTube,
                  WhatsApp, Twitter, or your blog.
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Earn Per Click, Get Paid Weekly
                </h3>
                <p className="text-muted-foreground text-lg">
                  Every time someone clicks your link, you earn ₹5-₹15. Watch
                  earnings grow in real‑time. Get paid every week via UPI or
                  bank transfer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Creators Choose CreatorAds
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">No Sales Pressure</h3>
                  <p className="text-muted-foreground">
                    Unlike traditional affiliate marketing, you earn per click -
                    not per sale. No conversion worries, just drive traffic.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Instant Approval</h3>
                  <p className="text-muted-foreground">
                    No waiting for brand approvals. Browse campaigns, click
                    promote, and start earning immediately.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Real‑time Tracking</h3>
                  <p className="text-muted-foreground">
                    See every click, monitor earnings live, and get detailed
                    analytics in your dashboard. Full transparency, always.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Verified Clicks Only
                  </h3>
                  <p className="text-muted-foreground">
                    Advanced fraud detection ensures fair earnings. Only
                    genuine, unique clicks count - no spam or fake traffic.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary via-slate-800 to-secondary border-0 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
            <CardContent className="p-12 text-center relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Ready to Start Earning?
              </h2>
              <p className="text-lg mb-8 text-slate-200">
                Join 12,000+ creators making money from their influence today
              </p>
              <Link href="/signup?role=creator">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-white text-primary hover:bg-slate-100 text-lg px-8 py-6"
                >
                  Start Earning Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-sm mt-6 text-slate-300">
                No credit card required • Free forever • No approval needed
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
                India's first traffic marketplace built for micro‑creators
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
                    href="/brand-landing"
                    className="hover:text-foreground transition-colors"
                  >
                    For Brands
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
