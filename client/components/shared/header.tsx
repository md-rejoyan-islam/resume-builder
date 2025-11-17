"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16  max-w-7xl mx-auto items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition cursor-pointer"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-purple-600">
            <span className="text-sm font-bold text-white">DB</span>
          </div>
          <span className="text-lg font-bold">DocBuilder</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navigationLinks.map((link) => (
            <Navlink
              key={link.href}
              href={link.href}
              label={link.label}
              className="text-sm  hover:text-foreground transition"
            />
          ))}
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          <Link href="/signin" className="hidden sm:inline-flex">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/pricing" className="hidden sm:block">
            <Button className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Get Started
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center cursor-pointer justify-center p-2 rounded-lg hover:bg-accent/10 transition"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-background/50 backdrop-blur">
          <nav className="flex flex-col gap-2 p-4">
            {navigationLinks.map((link) => (
              <Navlink
                key={link.href}
                href={link.href}
                label={link.label}
                className="px-4 py-2 text-sm  hover:text-foreground hover:bg-accent/10 rounded-lg transition"
                onClick={() => setIsOpen(false)}
              />
            ))}
            <Link href="/signin" className="sm:hidden">
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
