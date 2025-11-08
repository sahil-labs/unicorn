import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MobileNav } from "@/components/mobile-nav";
import { ArrowRight, Sparkles } from "lucide-react";

export default function FAQPage() {
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
            <Link href="/faq" className="text-sm font-medium text-primary">
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
            Frequently Asked Questions
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Got Questions?{" "}
            <span className="text-accent">We've Got Answers</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about the CPC creator ads network
          </p>
        </div>
      </section>

      {/* General FAQs */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">General</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What is CreatorAds?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                CreatorAds is India's first CPC (Cost-Per-Click) traffic
                marketplace connecting brands with micro-creators. Brands pay
                only for verified clicks, and creators earn per click without
                needing to make sales. Think of it as a performance ad network
                powered by influencers instead of algorithms.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How is this different from traditional affiliate marketing?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Traditional affiliate programs pay only on sales (CPA model),
                which puts pressure on creators and can be demotivating.
                CreatorAds uses a CPC model - creators earn for every click they
                drive, regardless of whether it converts to a sale. This makes
                earnings more predictable and fair for creators.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Is CreatorAds free to use?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! Creators can sign up and start promoting for free. Brands
                only pay for the verified clicks they receive - there are no
                monthly fees, no subscription charges, and no hidden costs.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Who can join as a creator?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Anyone with an audience on Instagram, YouTube, Twitter,
                WhatsApp, Telegram, or a blog can join. There's no minimum
                follower requirement. We're built specifically for
                micro-creators (1K-100K followers), but everyone is welcome.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Creators FAQs */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            For Creators
          </Badge>
          <h2 className="text-2xl font-bold mb-6">Creator Questions</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How much can I earn per click?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                CPC rates vary by campaign and typically range from ₹5 to ₹15
                per verified click. Higher-value niches (tech, finance) may
                offer ₹20+ per click. You can see the CPC rate before promoting
                any campaign.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do I need approval to promote a campaign?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                No! That's the beauty of CreatorAds. Once you sign up, you can
                instantly browse all active campaigns and start promoting any of
                them without waiting for brand approval. Just pick a campaign,
                get your link, and share it.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  When and how do I get paid?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Payouts happen every Monday via automated UPI or bank transfer.
                There's no minimum payout threshold - even if you earned ₹100,
                you'll get paid. All payments are powered by Razorpay and
                typically take 1-2 business days to reflect in your account.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What if someone clicks my link but doesn't buy anything?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                You still earn! That's the advantage of the CPC model. You get
                paid for every verified click, regardless of whether the user
                purchases. Your job is to drive traffic - conversion is the
                brand's responsibility.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I promote multiple campaigns at once?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Absolutely! You can promote as many campaigns as you like.
                There's no limit. Many creators mix campaigns across different
                niches (fashion, tech, beauty) to maximize their earnings.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I track my clicks and earnings?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Your dashboard shows real-time click counts, earnings,
                top-performing campaigns, and payout history. You can also see
                detailed click logs with timestamps and verification status.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What prevents click fraud?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We use advanced fraud detection including IP deduplication,
                device fingerprinting, and bot detection. Only genuine, unique
                clicks are counted. Clicking your own link or asking friends to
                spam-click won't work - it'll be flagged and won't earn you
                money.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I use my links on Instagram stories, reels, or bio?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! You can share your tracking links anywhere: Instagram
                stories, reels, bio, YouTube descriptions, tweets, WhatsApp
                groups, Telegram channels, or your blog. We support all
                platforms.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* For Brands FAQs */}
      <section className="container mx-auto px-4 pb-16 bg-slate-50 dark:bg-slate-900/30 py-16">
        <div className="max-w-4xl mx-auto">
          <Badge variant="default" className="mb-4 bg-primary">
            For Brands
          </Badge>
          <h2 className="text-2xl font-bold mb-6">Brand Questions</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Why should I use CreatorAds instead of Meta or Google ads?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Influencer marketing has higher trust and engagement than
                traditional ads, but it's usually expensive and hard to scale.
                CreatorAds gives you the reach of 12,000+ micro-creators at
                performance ad pricing. You pay the same CPC you'd set on Meta
                ads but get authentic creator-driven traffic.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I set my CPC rate?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                When creating a campaign, you choose your CPC rate (typically
                ₹5-₹20). Higher CPC means your campaign gets more visibility in
                the creator marketplace and attracts more creators. We recommend
                starting at ₹10-₹12 for optimal results.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I control my budget?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! You set both daily and total campaign budgets. Once your
                daily budget is hit, your campaign pauses until the next day.
                You also get alerts when your balance is running low. You're
                always in control.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I know the clicks are real?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Our ML-powered fraud detection includes IP deduplication, device
                fingerprinting, bot detection, and behavioral analysis. Every
                click is logged with timestamp, IP, device, and location. You
                can view detailed analytics in your dashboard and dispute any
                suspicious activity.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I choose which creators promote my campaign?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                By default, your campaign is visible to all creators in our
                marketplace. You can optionally filter by creator niche
                (fashion, tech, beauty, etc.) or set minimum follower
                requirements. However, most brands find that letting all
                creators promote yields the best results.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What kind of analytics do I get?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Your dashboard shows real-time clicks, top-performing creators,
                traffic sources, device breakdown, geographic data, hourly
                trends, and cost-per-click. You can also add UTM parameters to
                track conversions in Google Analytics.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What if I want to stop my campaign?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                You can pause or stop your campaign anytime with one click. Any
                remaining budget stays in your account and can be used for
                future campaigns or withdrawn (minus payment processing fees).
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do I need to negotiate with individual creators?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                No! That's the main benefit of our platform. You create one
                campaign, set one CPC rate, and our marketplace distributes it
                to 12,000+ creators instantly. No DMs, no negotiations, no
                follow-ups.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What types of campaigns work best?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                E-commerce products, SaaS tools, app downloads, lead gen pages,
                and content offers all work well. The key is a compelling
                landing page and a clear call-to-action. Campaigns with strong
                visuals and creator-friendly copy perform best.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical FAQs */}
      <section className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Technical & Payment</h2>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What payment methods do you accept?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Brands can add funds via credit/debit cards, UPI, net banking,
                or wallets through Razorpay. Creators receive payouts via UPI or
                bank transfer (IMPS/NEFT).
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Are there any transaction fees?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Creators receive 100% of their CPC earnings - no deductions.
                Brands pay exactly the CPC they set. Payment gateway fees
                (Razorpay) of ~2% apply when adding funds, which is standard
                industry practice.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How long do clicks get tracked?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Clicks are tracked for 30 days. If someone clicks a creator's
                link today but revisits your site within 30 days, that original
                click is still counted (but only once). This is similar to
                cookie duration in traditional ad networks.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Can I integrate CreatorAds with my existing analytics?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes! All tracking links support custom UTM parameters. You can
                append your own UTM codes to track campaigns in Google
                Analytics, Mixpanel, or any analytics tool you use.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Do you offer an API for integration?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We're currently building our API for brands and creators. If you
                need API access for bulk campaign management or custom
                integrations, reach out to our team at api@creatorads.in.
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  What kind of support do you offer?
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                We offer email support (support@creatorads.in) with 24-hour
                response times, live chat during business hours (10 AM - 7 PM
                IST), and a comprehensive help center with guides and tutorials.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our team is here to help — or just get started and see how it works
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="outline" className="gap-2">
                Contact Support
              </Button>
            </Link>
            <Link href="/signup">
              <Button
                size="lg"
                className="gap-2 bg-secondary hover:bg-secondary/90"
              >
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 CreatorAds Network. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
