"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MousePointerClick,
  DollarSign,
  Package,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

interface CreatorStats {
  totalClicks: number;
  totalEarnings: number;
  activeCampaigns: number;
  clicksChange?: number;
  earningsChange?: number;
}

export default function CreatorDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState<CreatorStats>({
    totalClicks: 0,
    totalEarnings: 0,
    activeCampaigns: 0,
  });
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0);
  const [thisWeekEarnings, setThisWeekEarnings] = useState(0);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch creator stats from the API
      const response = await fetch("http://localhost:8000/api/creator/stats", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data) {
          const data = result.data;

          setStats({
            totalClicks: data.totalClicks || 0,
            totalEarnings: data.totalEarnings || 0,
            activeCampaigns: data.activeCampaigns || 0,
            clicksChange: data.clicksChange || 0,
            earningsChange: data.earningsChange || 0,
          });

          setAvailableBalance(data.availableBalance || 0);
          setPendingBalance(data.pendingBalance || 0);
          setThisWeekEarnings(data.thisWeekEarnings || 0);
        }
      } else {
        console.error("Failed to fetch creator stats:", response.statusText);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar role="creator" />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading dashboard...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar role="creator" />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">Creator Dashboard</h1>
                <Badge variant="secondary">CPC Network</Badge>
              </div>
              <p className="text-muted-foreground">
                Track your clicks and earnings
              </p>
            </div>
            <Link href="/creator/marketplace">
              <Button className="gap-2 bg-secondary hover:bg-secondary/90">
                <ExternalLink className="h-4 w-4" />
                Browse Campaigns
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <StatCard
              title="Total Clicks"
              value={stats.totalClicks.toLocaleString()}
              icon={MousePointerClick}
              trend={
                stats.clicksChange
                  ? {
                      value: stats.clicksChange,
                      isPositive: stats.clicksChange > 0,
                    }
                  : undefined
              }
            />
            <StatCard
              title="Active Campaigns"
              value={stats.activeCampaigns.toString()}
              icon={Package}
              description="Campaigns you're promoting"
            />
            <StatCard
              title="Total Earnings"
              value={`₹${stats.totalEarnings.toLocaleString()}`}
              icon={DollarSign}
              trend={
                stats.earningsChange
                  ? {
                      value: stats.earningsChange,
                      isPositive: stats.earningsChange > 0,
                    }
                  : undefined
              }
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Get Started Card */}
            <Card className="border-2 bg-gradient-to-br from-secondary/5 to-accent/5">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-3">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Start Earning Per Click</CardTitle>
                <CardDescription>
                  Browse active campaigns, get your tracking link, and start
                  earning ₹5-₹15 per click
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/creator/marketplace">
                  <Button className="w-full gap-2 bg-secondary hover:bg-secondary/90">
                    <Package className="h-4 w-4" />
                    View All Campaigns
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Earnings Overview */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-accent" />
                  Earnings Overview
                </CardTitle>
                <CardDescription>Your balance and payouts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Available Balance
                      </span>
                      <span className="text-2xl font-bold text-accent">
                        ₹{availableBalance.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Weekly payouts via UPI • No minimum threshold
                    </p>
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Pending</span>
                      <span className="font-medium">
                        ₹{pendingBalance.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">This Week</span>
                      <span className="font-medium">
                        ₹{thisWeekEarnings.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">All Time</span>
                      <span className="font-medium">
                        ₹{stats.totalEarnings.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link href="/creator/payouts">
                    <Button
                      className="w-full"
                      variant={availableBalance > 0 ? "default" : "outline"}
                      disabled={availableBalance === 0}
                    >
                      {availableBalance > 0
                        ? "Request Payout"
                        : "No Balance Yet"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works - Quick Guide */}
          <div className="mt-8">
            <Card className="border-2">
              <CardHeader>
                <CardTitle>How to Start Earning</CardTitle>
                <CardDescription>Get started in 3 simple steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                      1
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Browse Campaigns</div>
                      <p className="text-sm text-muted-foreground">
                        Pick campaigns that match your audience from the
                        marketplace
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                      2
                    </div>
                    <div>
                      <div className="font-semibold mb-1">
                        Get Tracking Link
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Click "Get Tracking Link" to generate your unique URL
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                      3
                    </div>
                    <div>
                      <div className="font-semibold mb-1">Share & Earn</div>
                      <p className="text-sm text-muted-foreground">
                        Share on Instagram, YouTube, WhatsApp and earn per click
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
