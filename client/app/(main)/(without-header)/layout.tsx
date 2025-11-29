import CheckAuthInLayout from "@/components/(without-header)/check-auth-in-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
      <CheckAuthInLayout>{children}</CheckAuthInLayout>
    </>
  );
}
