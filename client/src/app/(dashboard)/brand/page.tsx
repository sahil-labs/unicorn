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
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Users,
  MousePointerClick,
  DollarSign,
  TrendingUp,
  Sparkles,
} from "lucide-react";

interface DashboardStats {
  activeCampaigns: number;
  totalClicks: number;
  activeCreators: number;
  totalSpent: number;
  avgCPC: number;
  clicksChange?: number;
  creatorsChange?: number;
}

interface RecentClick {
  creator: string;
  campaign: string;
  clicks: number;
  cpc: number;
  time: string;
}

interface TopCampaign {
  name: string;
  clicks: number;
  spend: number;
  cpc: number;
}

export default function BrandDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [brandName, setBrandName] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    activeCampaigns: 0,
    totalClicks: 0,
    activeCreators: 0,
    totalSpent: 0,
    avgCPC: 0,
  });
  const [recentClicks, setRecentClicks] = useState<RecentClick[]>([]);
  const [topCampaigns, setTopCampaigns] = useState<TopCampaign[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all dashboard data from unified endpoint
      const response = await fetch(
        "http://localhost:8000/api/brand/dashboard",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (result.success && result.data) {
          const { brandInfo, stats, recentActivity, topCampaigns } =
            result.data;

          // Set brand name
          setBrandName(brandInfo.name || "");

          // Set stats
          setStats({
            activeCampaigns: stats.activeCampaigns,
            totalClicks: stats.totalClicks,
            activeCreators: stats.activeCreators,
            totalSpent: stats.totalSpent,
            avgCPC: stats.avgCPC,
            clicksChange: stats.clicksChange,
            creatorsChange: stats.creatorsChange,
          });

          // Set recent activity
          setRecentClicks(recentActivity);

          // Set top campaigns
          setTopCampaigns(topCampaigns);
        }
      } else {
        console.error("Failed to fetch dashboard data:", response.statusText);
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
        <Sidebar role="brand" />
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
          <div className="container mx-auto p-8">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-9 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-64"></div>
                <Badge variant="default" className="bg-accent">
                  CPC Network
                </Badge>
              </div>
              <div className="h-5 bg-slate-200 dark:bg-slate-800 rounded animate-pulse w-96"></div>
            </div>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
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
      <Sidebar role="brand" />

      <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold">
                Welcome! {brandName || "Brand"}
              </h1>
              <Badge variant="default" className="bg-accent">
                CPC Network
              </Badge>
            </div>
            <p className="text-muted-foreground">
              Track your campaigns, clicks, and creator performance
            </p>
          </div>

          {/* Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <StatCard
              title="Active Campaigns"
              value={stats.activeCampaigns.toString()}
              icon={Package}
              description={
                stats.activeCampaigns > 0
                  ? `${Math.max(
                      1,
                      Math.floor(stats.activeCampaigns / 3)
                    )} ending this week`
                  : "No active campaigns"
              }
            />
            <StatCard
              title="Verified Clicks"
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
              title="Active Creators"
              value={stats.activeCreators.toString()}
              icon={Users}
              trend={
                stats.creatorsChange
                  ? {
                      value: stats.creatorsChange,
                      isPositive: stats.creatorsChange > 0,
                    }
                  : undefined
              }
            />
            <StatCard
              title="Total Spent"
              value={`₹${stats.totalSpent.toLocaleString()}`}
              icon={DollarSign}
              description={
                stats.avgCPC > 0 ? `Avg CPC: ₹${stats.avgCPC}` : "No spend yet"
              }
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Recent Clicks */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MousePointerClick className="h-5 w-5 text-accent" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest traffic from creators</CardDescription>
              </CardHeader>
              <CardContent>
                {recentClicks.length === 0 ? (
                  <div className="text-center py-8">
                    <MousePointerClick className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      No recent activity yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Clicks will appear here once creators start promoting
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {recentClicks.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between pb-4 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
                            <Users className="h-5 w-5 text-secondary" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">
                              {item.creator}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.campaign}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-accent">
                            {item.clicks} clicks
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ₹{item.cpc} CPC • {item.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Top Performing Campaigns */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-accent" />
                  Top Performing Campaigns
                </CardTitle>
                <CardDescription>Highest traffic this month</CardDescription>
              </CardHeader>
              <CardContent>
                {topCampaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      No campaigns yet
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Create your first campaign to see performance data
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topCampaigns.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between pb-4 border-b last:border-0"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                            <Package className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{item.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.clicks.toLocaleString()} clicks • ₹
                              {item.cpc} CPC
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-primary">
                            ₹{item.spend.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Total spent
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <Card className="border-2 bg-gradient-to-br from-accent/5 to-secondary/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                      <Sparkles className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        Launch a New Campaign
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Reach 12,000+ creators in minutes
                      </p>
                    </div>
                  </div>
                  <a
                    href="/brand/products/new"
                    className="inline-flex items-center justify-center rounded-lg bg-accent hover:bg-accent/90 text-white font-medium px-6 py-3 transition-colors"
                  >
                    Create Campaign
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
