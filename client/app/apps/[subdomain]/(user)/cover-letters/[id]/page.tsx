import { Metadata } from "next";
import CoverLetterBuilderClient from "./CoverLetterBuilderClient";

// Generate metadata for the cover letter detail/edit page
export const metadata: Metadata = {
  title: "Edit Cover Letter | Cover Letter Builder",
  description:
    "Edit and update your professional cover letter. Make changes to your cover letter content and customize your template.",
  keywords: [
    "edit cover letter",
    "update cover letter",
    "cover letter editor",
    "professional cover letter",
  ],
  openGraph: {
    title: "Edit Cover Letter | Cover Letter Builder",
    description:
      "Edit and update your professional cover letter with our easy-to-use editor.",
    type: "website",
  },
};

// Server component page - Cover letter detail/edit page
export default async function CoverLetterDetailPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <CoverLetterBuilderClient coverLetterId={id} />;
}
