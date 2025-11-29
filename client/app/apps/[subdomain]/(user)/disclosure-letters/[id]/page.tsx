import { Metadata } from "next";
import DisclosureLetterBuilderClient from "./DisclosureLetterBuilderClient";

// Generate metadata for the disclosure letter detail/edit page
export const metadata: Metadata = {
  title: "Edit Disclosure Letter | Disclosure Letter Builder",
  description:
    "Edit and update your disclosure letter. Make changes to your disclosure letter content and customize your template.",
  keywords: [
    "edit disclosure letter",
    "update disclosure letter",
    "disclosure letter editor",
    "professional disclosure letter",
  ],
  openGraph: {
    title: "Edit Disclosure Letter | Disclosure Letter Builder",
    description:
      "Edit and update your disclosure letter with our easy-to-use editor.",
    type: "website",
  },
};

// Server component page - Disclosure letter detail/edit page
export default async function DisclosureLetterDetailPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <DisclosureLetterBuilderClient disclosureLetterId={id} />;
}
