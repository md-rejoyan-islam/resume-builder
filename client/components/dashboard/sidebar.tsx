"use client";

import { logout } from "@/app/actions";
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
import { Switch } from "@/components/ui/switch";
import {
  useGetMeQuery,
  useLogoutMutation,
} from "@/lib/features/auth/auth-slice";
import clsx from "clsx";
import {
  Activity,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  Settings,
  Users,
  X
} from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Skeleton } from "../ui/skeleton";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  subItems?: { label: string; href: string }[];
}

const client_url = process.env.NEXT_PUBLIC_BASE_URL!;

export function Sidebar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  
  // Collapsed state with localStorage persistence
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]); // Track expanded accordion menus

  // Handle client-side mounting for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sidebarCollapsed");
    if (saved !== null) {
      setIsCollapsed(saved === "true");
    }
  }, []);

  // Save collapsed state to localStorage when it changes
  const toggleCollapsed = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", String(newState));
    
    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent("sidebarToggle", { 
      detail: { isCollapsed: newState }
    }));
  };

  const { data, isLoading } = useGetMeQuery("");

  const getInitials = () => {
    const firstName = data?.data?.first_name || "";
    const lastName = data?.data?.last_name || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const role = data?.data?.role || "user";

  const [clientLogout] = useLogoutMutation();

  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    await clientLogout();
    router.push(client_url + "/signin");
  };

  const userItems: SidebarItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Resumes",
      href: "/resumes",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Cover Letters",
      href: "/cover-letters",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Disclosures",
      href: "/disclosures",
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
      href: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
      role: ["user", "admin"],
    },
    {
      label: "Resumes",
      href: "/resumes",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
      subItems: [
        { label: "All Resumes", href: "/resumes" },
        { label: "Create Resume", href: "/resumes/new" },
      ],
    },
    {
      label: "Cover Letters",
      href: "/cover-letters",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
      subItems: [
        { label: "All Cover Letters", href: "/cover-letters" },
        { label: "Create Cover Letter", href: "/cover-letters/new" },
      ],
    },
    {
      label: "Disclosures",
      href: "/disclosures",
      icon: <FileText className="w-5 h-5" />,
      role: ["user"],
      subItems: [
        { label: "All Disclosures", href: "/disclosures" },
        { label: "Create Disclosure", href: "/disclosures/new" },
      ],
    },
    {
      label: "Users",
      href: "/users",
      icon: <Users className="w-5 h-5" />,
      role: ["admin"],
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="w-5 h-5" />,
      role: ["admin"],
    },
    {
      label: "Templates",
      href: "/templates",
      icon: <FileText className="w-5 h-5" />,
      role: ["admin"],
    },
  ];

  const others = [
    {
      label: "Settings",
      href: "/settings",
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
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  useEffect(() => {
    if (!data?.data && !isLoading) {
      router.push(client_url + "/signin");
    }
  }, [data, router, isLoading]);

  if (isLoading) {
    return (
      <>
        {/* Mobile Header - Loading State */}
        <div className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-card flex items-center justify-between px-4 z-40">
          {/* Logo and Name - Always Visible */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-lg hover:opacity-80 transition"
          >
            <Image src={"/logo.png"} width={40} height={40} alt="logo" />
            <span>DocBuilder</span>
          </Link>

          {/* Skeleton Menu Button */}
          <Skeleton className="w-10 h-10 rounded-lg" />
        </div>

        {/* Add padding to main content on mobile */}
        <div className="lg:hidden h-16" />

        {/* Desktop Sidebar - Loading State */}
        <aside className="hidden lg:block left-0 top-0 h-screen border-r border-border bg-card dark:bg-card/40 z-40 w-56">
          <div className="flex flex-col h-full relative overflow-y-auto">
            {/* Header Section with App Name - Always Visible */}
            <div className="mb-6 pt-4 border-b px-6">
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

            {/* MAIN Section - Skeleton Loading */}
            <div className="mb-8 pr-2">
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
                Main
              </h3>
              <nav className="space-y-1">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center gap-2">
                    <div className="w-1 h-7 rounded-r-2xl bg-transparent"></div>
                    <div className="flex items-center w-full gap-3 px-3 py-2.5">
                      <Skeleton className="w-5 h-5 rounded" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* OTHERS Section - Skeleton Loading */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
                Others
              </h3>
              <nav className="space-y-2">
                <div className="flex justify-between pr-2 items-center gap-2">
                  <div className="w-1 h-7 rounded-r-2xl bg-transparent"></div>
                  <div className="flex items-center w-full gap-3 px-4 py-2.5">
                    <Skeleton className="w-5 h-5 rounded" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              </nav>
            </div>

            {/* User Profile Section - Skeleton Loading */}
            <div className="mt-auto p-2 border-t border-border">
              <div className="flex items-center gap-3 px-2 py-3 rounded-lg">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-40" />
                </div>
              </div>
            </div>
          </div>
        </aside>
      </>
    );
  }

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
                <Link href="/settings">
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
        className={`hidden lg:block left-0 top-0 h-screen border-r border-border bg-card dark:bg-card/40 z-40 transition-all duration-300 ${
          isCollapsed ? "w-14" : "w-56"
        }`}
      >
        <div className="flex flex-col h-full relative overflow-y-auto">
          {/* Header Section with App Name */}
          <div className={`mb-6 pt-4 border-b ${isCollapsed ? "px-2" : "px-6"}`}>
            {!isCollapsed && (
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
            )}
            
            {/* Collapsed Logo */}
            {isCollapsed && (
              <Link
                href="/"
                className="flex items-center justify-center mb-4 hover:opacity-80 transition"
              >
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                  DB
                </div>
              </Link>
            )}
          </div>

          {/* MAIN Section */}
          <div className={`mb-8 ${isCollapsed ? "px-2" : "pr-2"}`}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
                Main
              </h3>
            )}
            <nav className="space-y-1">
              {items.map((item) => (
                <li
                  key={item.href}
                  className="flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center gap-2">
                    {!isCollapsed && (
                      <div
                        className={clsx(
                          "w-1 h-7 rounded-r-2xl",
                          isActive(item.href) ? "bg-primary  " : "bg-transparent"
                        )}
                      ></div>
                    )}
                    
                    {/* Main menu item - clickable if has sub-items, link if not */}
                    {item.subItems && !isCollapsed ? (
                      <button
                        onClick={() => toggleMenu(item.label)}
                        className={`flex items-center w-full gap-3 rounded-md transition-all group px-3 py-2.5 ${
                          isActive(item.href)
                            ? "bg-primary/15  text-primary"
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
                        <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
                        <ChevronRight
                          className={`w-4 h-4 transition-transform ${
                            expandedMenus.includes(item.label) ? "rotate-90" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-center w-full gap-3 rounded-md transition-all group ${
                          isCollapsed ? "justify-center p-2.5" : "px-3 py-2.5"
                        } ${
                          isActive(item.href)
                            ? "bg-primary/15  text-primary"
                            : "text-foreground hover:bg-primary/10 hover:text-foreground"
                        }`}
                        title={isCollapsed ? item.label : undefined}
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
                        {!isCollapsed && (
                          <>
                            <span className="font-medium text-sm">{item.label}</span>
                            {isActive(item.href) && !item.subItems && (
                              <ChevronRight className="w-4 h-4 ml-auto opacity-100 transition" />
                            )}
                          </>
                        )}
                      </Link>
                    )}
                  </div>
                  
                  {/* Sub-menu items with accordion animation */}
                  {item.subItems && !isCollapsed && expandedMenus.includes(item.label) && (
                    <div className="ml-5 pl-4 border-l-2 border-border/50 space-y-1 animate-in slide-in-from-top-2">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                            pathname === subItem.href
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted-foreground hover:text-foreground hover:bg-accent/10"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </nav>
          </div>

          {/* OTHERS Section */}
          <div className={`mb-8 ${isCollapsed ? "px-2" : ""}`}>
            {!isCollapsed && (
              <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider mb-4 px-2 ml-5">
                Others
              </h3>
            )}
            <nav className="space-y-2">
              <li className="flex justify-between pr-2 items-center gap-2 h-full">
                {!isCollapsed && (
                  <div
                    className={clsx(
                      "w-1 h-7 rounded-r-2xl",
                      isActive("/settings") ? "bg-primary " : "bg-transparent"
                    )}
                  ></div>
                )}
                <Link
                  href="/settings"
                  className={`flex items-center w-full gap-3 rounded-lg transition-all group ${
                    isCollapsed ? "justify-center p-2.5" : "px-4 py-2.5"
                  } ${
                    isActive("/settings")
                      ? "bg-primary/10  text-foreground"
                      : "text-foreground hover:bg-primary/10 hover:text-foreground"
                  }`}
                  title={isCollapsed ? "Settings" : undefined}
                >
                  <span
                    className={`transition-transform group-hover:scale-110 shrink-0 ${
                      isActive("/settings") ? "text-primary-foreground" : ""
                    }`}
                  >
                    <Settings
                      className={clsx(
                        "w-5 h-5",
                        isActive("/settings")
                          ? "text-primary"
                          : "text-foreground/60"
                      )}
                    />
                  </span>
                  {!isCollapsed && (
                    <>
                      <span className="font-medium text-sm">Settings</span>
                      {isActive("/settings") && (
                        <ChevronRight className="w-4 h-4 ml-auto opacity-100 transition" />
                      )}
                    </>
                  )}
                </Link>
              </li>
            </nav>
          </div>

          {/* User Profile Section */}
          <div className={`mt-auto p-2 border-t border-border ${isCollapsed ? "px-1" : ""}`}>
            <Popover>
              <PopoverTrigger asChild>
                {isCollapsed ? (
                  <div className="flex items-center justify-center p-2 rounded-lg hover:bg-accent/10 transition cursor-pointer">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                      {getInitials()}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-accent/10 transition cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold shrink-0">
                      {getInitials()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight truncate">
                        {data?.data?.first_name} {data?.data?.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {data?.data?.email}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                )}
              </PopoverTrigger>
              <PopoverContent className="w-56 p-0" align="end" side="left">
                <div className="flex flex-col">
                  {/* Dark Mode Toggle */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Dark Mode</span>
                    </div>
                    <Switch
                      checked={theme === "dark"}
                      className="cursor-pointer"
                      onCheckedChange={(checked: boolean) =>
                        setTheme(checked ? "dark" : "light")
                      }
                    />
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

                  <button
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/10 transition text-left text-destructive border-b border-border"
                    onClick={handleLogout}
                  >
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

      {/* Toggle Button using Portal - Rendered outside sidebar to avoid z-index issues */}
      {mounted && createPortal(
        <button
          onClick={toggleCollapsed}
          className="hidden lg:flex fixed top-6 items-center justify-center w-7 cursor-pointer h-7 rounded-md bg-card border-2 border-primary/40 hover:bg-primary/10 hover:border-primary transition-all shadow-lg z-[100]"
          style={{
            left: isCollapsed ? '48px' : '214px', // 14*4 - 10 = 44px collapsed, 56*4 - 10 = 214px expanded
          }}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-primary" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-primary" />
          )}
        </button>,
        document.body
      )}
    </>
  );
}
