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
  Sparkles,
  MousePointerClick,
  Shield,
  CheckCircle2,
  Users,
  DollarSign,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function HowItWorksPage() {
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
              className="text-sm font-medium text-primary"
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

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            For Creators
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            How to Start Earning <span className="text-accent">Per Click</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From signup to first payout - everything you need to know about
            earning with CreatorAds
          </p>
        </div>
      </section>

      {/* 3 Steps Section */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {/* Step 1 */}
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Sign Up for Free
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Create your CreatorAds account in under 30 seconds. No
                      approval process, no waiting period - instant access to
                      our marketplace.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                          <div className="font-semibold">
                            No Follower Minimum
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Whether you have 500 or 50,000 followers, you're
                          welcome
                        </p>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-accent" />
                          <div className="font-semibold">
                            Any Platform Works
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Instagram, YouTube, Twitter, blog, WhatsApp — all
                          supported
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Browse & Pick Campaigns
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Explore hundreds of active campaigns across 20+
                      categories. Each campaign shows the CPC rate upfront, so
                      you know exactly what you'll earn per click.
                    </p>

                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30 p-6 rounded-lg mb-4 border-2">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                          <MousePointerClick className="h-8 w-8 text-accent" />
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-lg mb-1">
                            Premium Headphones Launch
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            Electronics • Brand: AudioTech
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                CPC:
                              </span>
                              <span className="font-bold text-accent ml-1">
                                ₹12
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Budget:
                              </span>
                              <span className="font-semibold ml-1">₹50K</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">
                                Active:
                              </span>
                              <span className="font-semibold ml-1">
                                15 days left
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="w-full bg-secondary">
                        Get Tracking Link
                      </Button>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      💡 <strong>Pro tip:</strong> Pick campaigns that match
                      your audience's interests for better click-through rates
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="border-2 hover:border-secondary transition-colors">
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center font-bold text-xl">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Get Your Unique Tracking Link
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Click "Promote" and instantly receive your personalized
                      tracking link. This link tracks every click you drive and
                      attributes earnings to your account.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg mb-4 border-2">
                      <div className="text-xs text-muted-foreground mb-1">
                        Your Tracking Link:
                      </div>
                      <code className="text-sm text-secondary break-all block bg-white dark:bg-slate-950 p-3 rounded">
                        https://creatorads.in/track/XK92P?creator=yourname&campaign=headphones
                      </code>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3 text-sm">
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center">
                        <div className="font-semibold mb-1">📱 Instagram</div>
                        <div className="text-xs text-muted-foreground">
                          Story, Bio, DM
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center">
                        <div className="font-semibold mb-1">🎥 YouTube</div>
                        <div className="text-xs text-muted-foreground">
                          Description, Comments
                        </div>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg text-center">
                        <div className="font-semibold mb-1">💬 WhatsApp</div>
                        <div className="text-xs text-muted-foreground">
                          Groups, Status, DM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="border-2 hover:border-accent transition-colors">
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Share & Watch Earnings Grow
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Share your link anywhere your audience hangs out. Every
                      unique click earns you money instantly. Track everything
                      live in your dashboard.
                    </p>

                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg text-center border-2 border-accent/20">
                        <div className="text-3xl font-bold text-accent">
                          ₹10
                        </div>
                        <div className="text-sm text-muted-foreground">
                          CPC Rate
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg text-center border-2 border-accent/20">
                        <div className="text-3xl font-bold text-accent">
                          500
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Clicks Today
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-accent/10 to-accent/5 p-4 rounded-lg text-center border-2 border-accent/20">
                        <div className="text-3xl font-bold text-accent">
                          ₹5,000
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Earned
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-accent" />
                        <span className="font-semibold">
                          Real-time tracking:
                        </span>
                        <span className="text-muted-foreground">
                          See earnings update instantly with every click
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 5 */}
            <Card className="border-2 hover:border-accent transition-colors bg-gradient-to-br from-accent/5 to-transparent">
              <CardContent className="p-8">
                <div className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">
                      Get Paid Every Week
                    </h3>
                    <p className="text-muted-foreground text-lg mb-4">
                      Every Monday, your earnings are automatically transferred
                      to your UPI ID or bank account. No minimum payout
                      threshold, no hassle.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border-2">
                        <div className="flex items-center gap-3 mb-2">
                          <DollarSign className="h-6 w-6 text-accent" />
                          <div className="font-bold">Weekly Payouts</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Every Monday via UPI or bank transfer
                        </p>
                      </div>
                      <div className="bg-white dark:bg-slate-950 p-4 rounded-lg border-2">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="h-6 w-6 text-accent" />
                          <div className="font-bold">No Minimum</div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Even ₹100 earnings get paid out
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Click Verification Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge variant="default" className="mb-4 bg-accent">
              Trust & Safety
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Verify Clicks (So You Get Fair Pay)
            </h2>
            <p className="text-lg text-muted-foreground">
              Only genuine, unique clicks count toward your earnings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-accent mb-3" />
                <CardTitle className="text-lg">Unique IP Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Only one click per IP address per campaign within 24 hours. If
                  someone clicks your link multiple times, you're paid once -
                  fair for both you and brands.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-secondary mb-3" />
                <CardTitle className="text-lg">Device Fingerprinting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We track unique device signatures to prevent duplicate
                  counting. This protects your earnings from fraudulent
                  activity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-3" />
                <CardTitle className="text-lg">Bot Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  ML-powered bot filtering automatically removes fake clicks.
                  Only real human traffic counts, so you never lose earnings to
                  bots.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <Shield className="h-10 w-10 text-accent mb-3" />
                <CardTitle className="text-lg">Self-Click Prevention</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  You can't earn by clicking your own links - our system
                  automatically detects and filters your own clicks to keep
                  everything fair.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 border-2 border-accent/20 bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-lg mb-2">
                    Your Earnings Are Protected
                  </h3>
                  <p className="text-muted-foreground">
                    Every click is logged with timestamp, IP, device, and
                    location. You can view detailed click logs in your dashboard
                    and dispute any issues within 48 hours.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common Questions
          </h2>

          <div className="space-y-4 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What if no one clicks my link?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                That's okay! There's no penalty or minimum requirement. You can
                promote as many or as few campaigns as you want. Many creators
                start small and grow over time as they learn what works.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I promote multiple campaigns at once?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Absolutely! Most successful creators promote 5-10 campaigns
                simultaneously. The more campaigns you share, the more earning
                opportunities you have.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I know which campaigns to pick?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Pick campaigns that align with your audience's interests. If
                your followers love tech, promote tech products. If they're into
                fashion, share fashion campaigns. Authentic recommendations get
                more clicks.
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <p className="text-muted-foreground mb-4">Have more questions?</p>
            <Link href="/faq">
              <Button variant="outline" size="lg">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 12,000+ creators earning per click today
          </p>
          <Link href="/signup?role=creator">
            <Button
              size="lg"
              className="gap-2 bg-secondary hover:bg-secondary/90 text-lg px-8 py-6"
            >
              Get Started - It's Free <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm mt-4 text-muted-foreground">
            No approval needed • Start promoting in 30 seconds
          </p>
        </div>
      </section>

      {/* Brand CTA */}
      <section className="container mx-auto px-4 py-12">
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-accent/10 to-accent/5 border-2 border-accent/20">
          <CardContent className="p-8 text-center">
            <Badge variant="default" className="mb-4 bg-accent">
              For Brands
            </Badge>
            <h3 className="text-2xl font-bold mb-2">
              Looking to Run a Campaign?
            </h3>
            <p className="text-muted-foreground mb-6">
              Learn how brands use CreatorAds to reach creators and drive
              traffic
            </p>
            <Link href="/brand-landing">
              <Button
                variant="default"
                className="gap-2 bg-accent hover:bg-accent/90"
              >
                View Brand Solutions <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
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
