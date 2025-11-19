import { DashboardLayout } from "@/components/dashboard/layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout role="user">{children}</DashboardLayout>;
}
