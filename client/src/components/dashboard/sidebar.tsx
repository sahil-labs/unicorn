"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  Link as LinkIcon,
  DollarSign,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  role: "brand" | "creator" | "admin";
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const brandLinks = [
    { href: "/brand", label: "Dashboard", icon: LayoutDashboard },
    { href: "/brand/products", label: "Products", icon: Package },
    { href: "/brand/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/brand/settings", label: "Settings", icon: Settings },
  ];

  const creatorLinks = [
    { href: "/creator", label: "Dashboard", icon: LayoutDashboard },
    { href: "/creator/marketplace", label: "Marketplace", icon: Package },
    { href: "/creator/links", label: "My Links", icon: LinkIcon },
    { href: "/creator/earnings", label: "Earnings", icon: BarChart3 },
    { href: "/creator/payouts", label: "Payouts", icon: DollarSign },
    { href: "/creator/settings", label: "Settings", icon: Settings },
  ];

  const adminLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/products", label: "Products", icon: Package },
    { href: "/admin/payouts", label: "Payouts", icon: DollarSign },
    { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const links =
    role === "brand"
      ? brandLinks
      : role === "creator"
      ? creatorLinks
      : adminLinks;

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="border-b p-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Micro-Creator
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive =
            pathname === link.href || pathname.startsWith(link.href + "/");

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-purple-100 text-purple-900 dark:bg-purple-900/20 dark:text-purple-100"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3"
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
