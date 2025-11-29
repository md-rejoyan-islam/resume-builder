"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import clsx from "clsx";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthenticateBtns from "./authenticate-btns";
import Navlink from "./navlink";
import { ThemeToggle } from "./theme-toggle";

function Header() {
  const pathname = usePathname();
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
              <div className="absolute opacity-0  inset-0 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl blur-sm dark:opacity-75 group-hover:opacity-100 transition" />
              <Image
                src={"/logo.png"}
                alt="Logo"
                width={40}
                height={40}
                className="relative "
              />
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
          <div className="flex items-center rounded-lg border border-primary/10 bg-card/30">
            <ThemeToggle />
          </div>

          {/* Sign In Button */}
          <AuthenticateBtns />

          {/* Mobile Menu Drawer */}
          <Drawer>
            <DrawerTrigger asChild>
              <button
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-border/50 hover:bg-card/50 hover:border-primary/50 transition-all"
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6 text-foreground" />
              </button>
            </DrawerTrigger>

            <DrawerContent className="bg-linear-to-b from-background to-background/95 h-[75vh] max-h-screen rounded-none lg:hidden">
              <DrawerHeader className="border-b border-border/30 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-lg blur-sm opacity-75" />
                      <Image
                        src={"/logo.png"}
                        alt="Logo"
                        width={32}
                        height={32}
                        className="relative "
                      />
                    </div>
                  </div>
                  <DrawerClose asChild>
                    <button className="p-2 hover:bg-card/50 rounded-lg transition">
                      <X className="h-5 w-5" />
                    </button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              {/* Drawer Menu Items */}
              <div className="px-4 py-6 space-y-1.5 flex-1 overflow-y-auto">
                {navigationLinks.map((link) => {
                  const isActive = link.href === pathname;
                  return (
                    <DrawerClose key={link.href} asChild>
                      <Link
                        href={link.href}
                        className={clsx(
                          "group relative flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-200",
                          isActive
                            ? "bg-linear-to-r from-blue-600/10 to-purple-600/10 border border-primary/20"
                            : "hover:bg-card/60 border border-transparent hover:border-border/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {/* Active indicator bar */}
                          <div
                            className={clsx(
                              "w-1 h-6 rounded-full transition-all duration-200",
                              isActive
                                ? "bg-linear-to-b from-blue-600 to-purple-600"
                                : "bg-border/50 group-hover:bg-primary/30"
                            )}
                          />
                          <span
                            className={clsx(
                              "text-base font-semibold transition-colors",
                              isActive
                                ? "bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                                : "text-foreground/70 group-hover:text-foreground"
                            )}
                          >
                            {link.label}
                          </span>
                        </div>
                        <ChevronRight
                          className={clsx(
                            "h-4 w-4 transition-all duration-200",
                            isActive
                              ? "text-primary"
                              : "text-foreground/30 group-hover:text-foreground/60 group-hover:translate-x-0.5"
                          )}
                        />
                      </Link>
                    </DrawerClose>
                  );
                })}
              </div>

              {/* Drawer Footer with Buttons */}
              <div className="border-t border-border/30 px-4 py-6 space-y-3">
                <Link href="/signin" className="w-full block">
                  <Button
                    variant="outline"
                    className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 font-semibold rounded-lg transition-all"
                  >
                    Sign In
                  </Button>
                </Link>
                <DrawerClose asChild>
                  <Link href="/pricing" className="w-full block">
                    <Button className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg transition-all flex items-center justify-center gap-2">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </DrawerClose>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}

export default Header;
