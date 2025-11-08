"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface MobileNavProps {
  role?: "creator" | "brand";
}

export function MobileNav({ role = "creator" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      console.log("Menu opened - body scroll locked");
    } else {
      document.body.style.overflow = "unset";
      console.log("Menu closed - body scroll unlocked");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const closeMenu = () => {
    console.log("Closing menu");
    setIsOpen(false);
  };

  const toggleMenu = () => {
    console.log("Toggling menu from", isOpen, "to", !isOpen);
    setIsOpen(!isOpen);
  };

  console.log("MobileNav rendering, isOpen:", isOpen);

  return (
    <div className="md:hidden">
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="p-2 hover:bg-accent/10 rounded-lg transition-colors relative"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        style={{ zIndex: 60 }}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* Debug indicator */}
      {isOpen && (
        <div 
          className="fixed top-20 left-4 bg-red-500 text-white p-2 text-xs"
          style={{ zIndex: 9999 }}
        >
          Menu State: OPEN
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80"
          style={{ zIndex: 998 }}
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div 
          className="fixed top-0 right-0 h-full w-72 bg-white dark:bg-slate-950 border-l shadow-2xl"
          style={{ zIndex: 999 }}
        >
          <div className="flex flex-col h-full p-6">
            {/* Close Button */}
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={closeMenu}
                className="p-2 hover:bg-accent/10 rounded-lg transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-4 mb-8">
              <Link
                href="/how-it-works"
                className="text-base font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={closeMenu}
              >
                How it Works
              </Link>
              <Link
                href="/pricing"
                className="text-base font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={closeMenu}
              >
                Pricing
              </Link>
              <Link
                href="/faq"
                className="text-base font-medium hover:text-primary transition-colors py-2 border-b"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <div className="h-px bg-border my-2" />
              <Link
                href={role === "creator" ? "/brand-landing" : "/"}
                className="text-base font-medium text-accent hover:text-accent/80 transition-colors py-2 border-b"
                onClick={closeMenu}
              >
                {role === "creator" ? "Are you a Brand? →" : "← For Creators"}
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="mt-auto flex flex-col gap-3">
              <Link href="/login" onClick={closeMenu}>
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link
                href={`/signup?role=${role}`}
                onClick={closeMenu}
              >
                <Button
                  className={`w-full ${
                    role === "creator"
                      ? "bg-secondary hover:bg-secondary/90"
                      : "bg-accent hover:bg-accent/90"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
