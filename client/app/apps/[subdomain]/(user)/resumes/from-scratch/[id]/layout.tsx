import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Builder - Create Your Resume | Resume Genius",
  description: "Build your professional resume from scratch with our easy-to-use builder.",
};

export default function ResumeBuilderLayout({
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
