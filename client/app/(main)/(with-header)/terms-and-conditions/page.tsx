import { FileText, Scale, Shield, UserCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for using our resume builder and document creation services.",
};

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    icon: UserCheck,
    content: [
      "By accessing or using our resume builder platform, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.",
      "We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the modified terms.",
    ],
  },
  {
    id: "services",
    title: "2. Services Description",
    icon: FileText,
    content: [
      "Our platform provides AI-powered tools for creating professional resumes, cover letters, and other career documents. Services include template selection, content generation, formatting, and export capabilities.",
      "We offer both free and premium subscription tiers with varying features and limitations. Premium features may require payment and are subject to our pricing terms.",
    ],
  },
  {
    id: "account",
    title: "3. User Accounts",
    icon: Shield,
    content: [
      "You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.",
      "You must provide accurate and complete information when creating an account. We reserve the right to suspend or terminate accounts that violate these terms or contain false information.",
      "You may not share your account with others or create multiple accounts for abusive purposes.",
    ],
  },
  {
    id: "content",
    title: "4. User Content & Data",
    icon: Scale,
    content: [
      "You retain ownership of all content you create using our platform, including resumes, cover letters, and other documents.",
      "By using our services, you grant us a limited license to process and store your content for the purpose of providing our services.",
      "We implement industry-standard security measures to protect your personal data. Your information will not be sold to third parties.",
    ],
  },
  {
    id: "intellectual",
    title: "5. Intellectual Property",
    icon: Shield,
    content: [
      "Our platform, including its design, features, templates, and AI technology, is protected by intellectual property laws.",
      "You may not copy, modify, distribute, or reverse engineer any part of our platform without explicit written permission.",
      "Templates and AI-generated suggestions are provided for your personal use in creating documents and may not be resold or redistributed.",
    ],
  },
  {
    id: "prohibited",
    title: "6. Prohibited Uses",
    icon: Scale,
    content: [
      "You may not use our platform for any unlawful purpose or to create fraudulent documents.",
      "Automated scraping, data mining, or unauthorized access attempts are strictly prohibited.",
      "You may not upload malicious content, viruses, or attempt to compromise our systems or other users.",
    ],
  },
  {
    id: "payment",
    title: "7. Payment & Refunds",
    icon: FileText,
    content: [
      "Premium subscriptions are billed according to the selected plan (monthly or annually). Prices are subject to change with notice.",
      "Refund requests may be considered within 14 days of purchase for unused premium features. Refunds are granted at our discretion.",
      "We reserve the right to modify pricing and features of subscription tiers with reasonable notice to existing subscribers.",
    ],
  },
  {
    id: "limitation",
    title: "8. Limitation of Liability",
    icon: Shield,
    content: [
      'Our services are provided "as is" without warranties of any kind. We do not guarantee job placement or interview success.',
      "We are not liable for any indirect, incidental, or consequential damages arising from your use of our platform.",
      "Our total liability shall not exceed the amount paid by you for our services in the twelve months preceding any claim.",
    ],
  },
  {
    id: "termination",
    title: "9. Termination",
    icon: UserCheck,
    content: [
      "We may suspend or terminate your access to our services at any time for violations of these terms or for any other reason at our discretion.",
      "Upon termination, your right to use the platform ceases immediately. You may request export of your data within 30 days of termination.",
      "Provisions relating to intellectual property, limitation of liability, and dispute resolution survive termination.",
    ],
  },
  {
    id: "governing",
    title: "10. Governing Law",
    icon: Scale,
    content: [
      "These terms are governed by applicable laws. Any disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.",
      "If any provision of these terms is found unenforceable, the remaining provisions shall continue in full force and effect.",
    ],
  },
];

const TermsAndConditionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="relative container mx-auto px-4 py-12 sm:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-primary/80 shadow-lg shadow-primary/25 mb-6">
              <Scale className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Terms and Conditions
            </h1>
            <p className="text-lg text-foreground/70 leading-relaxed">
              Please read these terms carefully before using our resume builder
              platform. By using our services, you agree to these terms.
            </p>
            <p className="mt-4 text-sm text-foreground/50">
              Last updated: November 2025
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="container mx-auto px-4 -mt-8 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              Quick Navigation
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors py-1"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-24">
        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 hover:border-primary/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground pt-1">
                      {section.title}
                    </h2>
                  </div>
                  <div className="space-y-4 pl-14">
                    {section.content.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-foreground/70 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}

          {/* Contact Section */}
          <div className="bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Questions About These Terms?
            </h2>
            <p className="text-foreground/70 mb-4">
              If you have any questions about our Terms and Conditions, please
              contact our support team.
            </p>
            <a
              href="mailto:support@resumebuilder.com"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl text-white bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg shadow-primary/25"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
