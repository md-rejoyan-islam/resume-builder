import { Metadata } from "next";
import ResumeBuilderClient from "./ResumeBuilderClient";

// Generate metadata for the resume detail/edit page
export const metadata: Metadata = {
  title: "Edit Resume | Resume Builder",
  description:
    "Edit and update your professional resume. Make changes to your resume sections, update your experience, and customize your template.",
  keywords: [
    "edit resume",
    "update resume",
    "resume editor",
    "CV editor",
    "professional resume",
  ],
  openGraph: {
    title: "Edit Resume | Resume Builder",
    description:
      "Edit and update your professional resume with our easy-to-use resume editor.",
    type: "website",
  },
};

// Server component page - Resume detail/edit page
export default async function ResumeDetailPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <ResumeBuilderClient resumeId={id} />;
}
