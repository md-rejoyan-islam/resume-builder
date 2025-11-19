"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";
import {
  Activity,
  BarChart3,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarProps {
  role?: "user" | "admin";
}

export function Sidebar({ role = "user" }: SidebarProps) {
  const pathname = usePathname();

  const userItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Resumes",
      href: "/dashboard/resumes",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Cover Letters",
      href: "/dashboard/cover-letters",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Disclosures",
      href: "/dashboard/disclosures",
      icon: <FileText className="w-5 h-5" />,
    },
  ];

  const adminItems: SidebarItem[] = [
    {
      label: "Overview",
      href: "/dashboard/admin",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Analytics",
      href: "/dashboard/admin/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const menuItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      role: ["user", "admin"],
    },
    {
      label: "Resumes",
      href: "/dashboard/resumes",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
    },
    {
      label: "Cover Letters",
      href: "/dashboard/cover-letters",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
    },
    {
      label: "Disclosures",
      href: "/dashboard/disclosures",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: <Users className="w-5 h-5" />,
      role: ["admin"],
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      role: ["admin"],
    },
    {
      label: "Templates",
      href: "/dashboard/templates",
      icon: <FileText className="w-5 h-5" />,
      role: ["admin"],
    },
  ];

  const others = [
    {
      label: "Settings",
      href: "/dashboard/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  // const others = [
  //   {
  //     label: "Settings",
  //     href: "/dashboard/settings",
  //     icon: <Settings className="w-5 h-5" />,
  //   },
  // ];

  // const items = role === "admin" ? adminItems : userItems;
  const items = menuItems.filter((item) => item.role.includes(role));

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile Header - Always Visible on Mobile */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-card flex items-center justify-between px-4 z-40">
        {/* Logo and Name */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition"
        >
          <Image src={"/logo.png"} width={40} height={40} alt="logo" />
          <span>DocBuilder</span>
        </Link>

        {/* Menu Open Button (Hamburger) */}
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <button
              className="p-2 rounded-lg bg-card border border-border hover:bg-accent/10 transition"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
          </DrawerTrigger>

          {/* Mobile Drawer Content */}
          <DrawerContent className="left-0 top-0 inset-y-0 h-screen w-3/4 sm:max-w-sm rounded-none p-0 flex flex-col data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=left]:w-screen data-[vaul-drawer-direction=right]:sm:max-w-[100vw] data-[vaul-drawer-direction=left]:sm:max-w-[100vw] data-[vaul-drawer-direction=right]:sm:w-screen data-[vaul-drawer-direction=left]:sm:w-screen lg:hidden">
            {/* Drawer Header - Logo, Name, and Close Button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card shrink-0">
              {/* Logo and Name */}
              <Link
                href="/"
                className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition"
              >
                <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  DB
                </div>
                <span>DocBuilder</span>
              </Link>

              {/* Close Button */}
              <DrawerClose asChild>
                <button
                  className="p-2 rounded-lg hover:bg-accent/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </DrawerClose>
            </div>

            {/* Drawer Content - Scrollable Body */}
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col">
              {/* Navigation Items */}
              <nav className="flex-1 space-y-2">
                {items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group ${
                      isActive(item.href)
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "text-foreground hover:bg-accent/10 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`transition-transform group-hover:scale-110 ${
                        isActive(item.href) ? "text-primary-foreground" : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.label}</span>
                    {/* {item.badge && (
                      <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {item.badge}
                      </span>
                    )} */}
                  </Link>
                ))}
              </nav>

              {/* Bottom Section */}
              <div className="space-y-3 pt-4 border-t border-border">
                <Link href="/dashboard/settings">
                  <Button
                    variant="outline"
                    className="w-full justify-start gap-3"
                  >
                    <Settings className="w-5 h-5" />
                    Settings
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 text-destructive hover:text-destructive"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Add padding to main content on mobile to account for header */}
      <div className="lg:hidden h-16" />

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden lg:fixed lg:block left-0 top-0 h-screen w-64 border-r border-border bg-card z-40 overflow-y-auto`}
      >
        <div className=" flex flex-col h-full">
          {/* Header Section with App Name */}
          <div className="mb-6 pt-4 px-6  border-b">
            <Link
              href="/"
              className="flex items-center gap-3 mb-4 hover:opacity-80 transition"
            >
              <div className="w-12 h-12 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                DB
              </div>
              <div className="flex-1">
                <h1 className="font-bold text-lg leading-tight">DocBuilder</h1>
                <p className="text-xs text-muted-foreground">Resume Builder</p>
              </div>
            </Link>
          </div>

          {/* MAIN Section */}
          <div className="mb-8 pr-6">
            <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
              Main
            </h3>
            <nav className="space-y-2">
              {items.map((item) => (
                <li
                  key={item.href}
                  className="flex justify-between items-center gap-2 h-full"
                >
                  <div
                    className={clsx(
                      "w-1 h-7 rounded-r-2xl",
                      isActive(item.href) ? "bg-primary " : "bg-transparent"
                    )}
                  ></div>
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg transition-all group ${
                      isActive(item.href)
                        ? "bg-primary/10  text-foreground"
                        : "text-foreground hover:bg-primary/10 hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`transition-transform group-hover:scale-110 shrink-0 ${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-foreground/60"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium text-sm">{item.label}</span>
                    {/* {item.badge && (
                      <span className="ml-auto text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {item.badge}
                      </span>
                    )} */}
                    {isActive(item.href) && (
                      <ChevronRight className="w-4 h-4 ml-auto opacity-100 transition" />
                    )}
                  </Link>
                </li>
              ))}
            </nav>
          </div>

          {/* OTHERS Section */}
          <div className="mb-8">
            <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
              Others
            </h3>
            <nav className="space-y-2">
              <li className="flex justify-between items-center gap-2 h-full">
                <div
                  className={clsx(
                    "w-1 h-7 rounded-r-2xl",
                    isActive("/dashboard/settings")
                      ? "bg-primary "
                      : "bg-transparent"
                  )}
                ></div>
                <Link
                  href="/dashboard/settings"
                  className={`flex items-center w-full gap-3 px-4 py-2.5 rounded-lg transition-all group ${
                    isActive("/dashboard/settings")
                      ? "bg-primary/10  text-foreground"
                      : "text-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`transition-transform group-hover:scale-110 shrink-0 ${
                      isActive("/dashboard/settings")
                        ? "text-primary-foreground"
                        : ""
                    }`}
                  >
                    <Settings
                      className={clsx(
                        "w-5 h-5",
                        isActive("/dashboard/settings")
                          ? "text-primary"
                          : "text-foreground/60"
                      )}
                    />
                  </span>
                  <span className="font-medium text-sm">Settings</span>
                  {isActive("/dashboard/settings") && (
                    <ChevronRight className="w-4 h-4 ml-auto opacity-100 transition" />
                  )}
                </Link>
              </li>
            </nav>
          </div>

          {/* User Profile Section */}
          <div className="mt-auto p-2 border-t border-border">
            <Popover>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-accent/10 transition cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shrink-0">
                    AT
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">
                      Arthur Taylor
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      arthur@example.com
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end" side="left">
                <div className="flex flex-col">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </div>
                    <div className="w-10 h-6 rounded-full bg-muted cursor-pointer relative">
                      <div className="w-5 h-5 rounded-full bg-background absolute top-0.5 left-0.5 transition-all" />
                    </div>
                  </div>

                  {/* Menu Items */}
                  <button className="flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition text-left border-b border-border">
                    <Activity className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Activity</span>
                  </button>

                  <button className="flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition text-left border-b border-border">
                    <Settings className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Settings</span>
                  </button>

                  <button className="flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition text-left text-destructive border-b border-border">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>

                  {/* Footer */}
                  <div className="px-4 py-3">
                    <p className="text-xs text-muted-foreground">
                      v1.5.69 ·{" "}
                      <a href="#" className="hover:underline">
                        Terms & Conditions
                      </a>
                    </p>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </aside>
    </>
  );
}
