"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: "user" | "admin";
}

export function DashboardLayout({
  children,
  role = "user",
}: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar role={role} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 mt-16 lg:mt-0">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
