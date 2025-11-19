"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Navlink from "./navlink";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/templates", label: "Templates" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/20 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Premium Background Effect */}
      <div className="absolute inset-0 pointer-events-none h-full">
        <div className="absolute top-0 left-1/4 h-32 w-32 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-2xl" />
        <div className="absolute top-0 right-1/4 h-32 w-32 bg-linear-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex h-16 max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo with Badge */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-85 transition group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition" />
              <Image
                src={"/logo.png"}
                alt="Logo"
                width={40}
                height={40}
                className="relative bg-white rounded-xl shadow-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                DocBuilder
              </span>
              <span className="text-xs font-semibold text-primary/80 -mt-1">
                Pro
              </span>
            </div>
          </Link>

          {/* Beta Badge */}
          {/* <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 ml-2">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span className="text-xs font-semibold text-blue-600">Beta</span>
          </div> */}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-1 h-16 items-end">
          {navigationLinks.map((link) => (
            <Navlink
              key={link.href}
              href={link.href}
              label={link.label}
              className="px-3.5 py-2 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-card/50 rounded-t-lg transition-all duration-200 h-full flex items-center relative"
            />
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Theme Toggle */}
          <div className="flex items-center rounded-lg border border-border/40 bg-card/30 p-1">
            <ThemeToggle />
          </div>

          {/* Sign In Button */}
          <Link href="/signin" className="hidden sm:inline-flex">
            <Button
              variant="outline"
              className="border-border/50 hover:border-primary/50 hover:bg-primary/5 text-foreground font-semibold rounded-lg transition-all"
            >
              Sign In
            </Button>
          </Link>

          {/* Get Started Button */}
          <Link href="/pricing" className="hidden sm:block">
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-border/50 hover:bg-card/50 hover:border-primary/50 transition-all"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/50 backdrop-blur animate-in fade-in slide-in-from-top-2">
          <nav className="flex flex-col gap-1 p-4">
            {navigationLinks.map((link) => (
              <Navlink
                key={link.href}
                href={link.href}
                label={link.label}
                className="px-4 py-3 text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-card/50 rounded-lg transition-all"
                onClick={() => setIsOpen(false)}
              />
            ))}

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/30">
              <Link href="/signin" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 font-semibold rounded-lg transition-all"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/pricing" className="w-full">
                <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
