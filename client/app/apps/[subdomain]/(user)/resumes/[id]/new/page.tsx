import { Metadata } from "next";
import ResumeBuilderClient from "../ResumeBuilderClient";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Create Your Professional Resume | Resume Builder",
  description:
    "Build a professional, ATS-friendly resume from scratch with our easy-to-use resume builder. Choose from multiple templates and customize every section.",
  keywords: [
    "resume builder",
    "CV builder",
    "professional resume",
    "ATS resume",
    "job application",
    "career",
  ],
  openGraph: {
    title: "Create Your Professional Resume | Resume Builder",
    description:
      "Build a professional, ATS-friendly resume from scratch with our easy-to-use resume builder.",
    type: "website",
  },
};

// Server component page
export default async function ResumeBuilderPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <ResumeBuilderClient resumeId={id} />;
}
