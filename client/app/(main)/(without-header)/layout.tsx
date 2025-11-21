import CheckAuthInLayout from "@/components/(without-header)/check-auth-in-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CheckAuthInLayout>{children}</CheckAuthInLayout>;
}
