export default function CoverLetterBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-background">
      {children}
    </div>
  );
}
