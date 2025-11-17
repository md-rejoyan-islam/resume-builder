import { CTASection } from "@/components/(with-header)/homepage/cta-section";
import { DocumentTypesSection } from "@/components/(with-header)/homepage/document-types-section";
import { FeaturesSection } from "@/components/(with-header)/homepage/features-section";
import { HeroSection } from "@/components/(with-header)/homepage/hero-section";
import { HowItWorks } from "@/components/(with-header)/homepage/how-it-works";
import { TemplatesSection } from "@/components/(with-header)/homepage/templates-section";
import { TestimonialsSection } from "@/components/(with-header)/homepage/testnimonials-section";

export const metadata = {
  title: "Home- Create Professional Documents Effortlessly",
  description:
    "DocBuilder helps you craft professional resumes, cover letters, and more with ease. Explore our features and templates to get started.",
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <DocumentTypesSection />
      <HowItWorks />
      <TemplatesSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
