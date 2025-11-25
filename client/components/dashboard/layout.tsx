"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      {/* Main Content - CSS-only responsive margin for fixed sidebar */}
      <main className="flex-1 mt-16 lg:mt-0 transition-all duration-300 bg-slate-50 h-screen overflow-y-auto dark:bg-background">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}

