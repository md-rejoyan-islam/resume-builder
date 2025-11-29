import { Metadata } from "next";
import DisclosureLetterBuilderClient from "../DisclosureLetterBuilderClient";

// Generate metadata for the page
export const metadata: Metadata = {
  title: "Create Your Disclosure Letter | Disclosure Letter Builder",
  description:
    "Build a professional disclosure letter from scratch with our easy-to-use disclosure letter builder. Customize every section for accurate and compliant disclosure.",
  keywords: [
    "disclosure letter builder",
    "professional disclosure letter",
    "background disclosure",
    "compliance",
  ],
  openGraph: {
    title: "Create Your Disclosure Letter | Disclosure Letter Builder",
    description:
      "Build a professional disclosure letter from scratch with our easy-to-use disclosure letter builder.",
    type: "website",
  },
};

// Server component page
export default async function DisclosureLetterBuilderPage({
  params,
}: {
  params: Promise<{ id: string; subdomain: string }>;
}) {
  const { id } = await params;

  return <DisclosureLetterBuilderClient disclosureLetterId={id} />;
}
