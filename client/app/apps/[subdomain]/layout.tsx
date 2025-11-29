import { DashboardLayout } from "@/components/dashboard/layout";

export const metadata = {
  title: "Dashboard - ResumeBuilder",
  description:
    "Manage your resumes, cover letters, and account settings on ResumeBuilder.",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
