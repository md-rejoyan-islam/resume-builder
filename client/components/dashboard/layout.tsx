"use client";

import { Sidebar } from "@/components/dashboard/sidebar";
import { useGetMeQuery } from "@/lib/features/auth/auth-slice";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Spinner } from "../ui/shadcn-io/spinner";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isLoading } = useGetMeQuery("");

  const pathname = usePathname();
  // Match /resumes/[id] or /resumes/[id]/new but NOT /resumes/new (selection page)
  const isResumeBuilder = pathname?.match(/\/resumes\/[a-f0-9]{24}(\/new)?$/) !== null;
  // Match /cover-letters/[id] or /cover-letters/[id]/new but NOT /cover-letters/new
  const isCoverLetterBuilder = pathname?.match(/\/cover-letters\/[a-f0-9]{24}(\/new)?$/) !== null;
  // Match /disclosure-letters/[id] or /disclosure-letters/[id]/new but NOT /disclosure-letters/new
  const isDisclosureLetterBuilder = pathname?.match(/\/disclosure-letters\/[a-f0-9]{24}(\/new)?$/) !== null;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="w-[30vw]  text-primary" size={80} />
      </div>
    );
  }

  if (isResumeBuilder || isCoverLetterBuilder || isDisclosureLetterBuilder) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

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
