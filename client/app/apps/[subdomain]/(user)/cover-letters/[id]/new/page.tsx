import { Metadata } from "next";
import CoverLetterBuilderClient from "../CoverLetterBuilderClient";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Create Your Professional Cover Letter | Cover Letter Builder",
  description:
    "Build a professional cover letter from scratch with our easy-to-use cover letter builder. Customize every section and make a great impression.",
  keywords: [
    "cover letter builder",
    "professional cover letter",
    "job application",
    "career",
  ],
  openGraph: {
    title: "Create Your Professional Cover Letter | Cover Letter Builder",
    description:
      "Build a professional cover letter from scratch with our easy-to-use cover letter builder.",
    type: "website",
  },
};

// Server component page
export default async function CoverLetterBuilderPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <CoverLetterBuilderClient coverLetterId={id} />;
}
