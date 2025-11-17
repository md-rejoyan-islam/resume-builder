import {
  Award,
  BarChart3,
  Brain,
  Download,
  FileText,
  Globe,
  Lock,
  Settings,
  Shield,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

export const metadata = {
  title: "Features - DocBuilder",
  description:
    "Discover the powerful features of DocBuilder that help you create professional documents with ease.",
};

export default function FeaturesPage() {
  const features = [
    {
      name: "AI-Powered Content",
      description:
        "Intelligent suggestions for better document content using machine learning",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "ATS Optimized",
      description: "All documents optimized to pass Applicant Tracking Systems",
      icon: Shield,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Lightning Fast",
      description: "Create professional documents in minutes, not hours",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
    },
    {
      name: "Analytics Dashboard",
      description: "Track views, downloads, and performance metrics",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "Export Anywhere",
      description: "Download as PDF, Word, or share with custom URLs",
      icon: Download,
      color: "from-pink-500 to-pink-600",
    },
    {
      name: "Team Collaboration",
      description: "Share documents with mentors and recruiters for feedback",
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
    },
    {
      name: "All Document Types",
      description:
        "Resumes, cover letters, disclosure letters, and more in one platform",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Custom Branding",
      description: "Full control over colors, fonts, styles, and layouts",
      icon: Settings,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      name: "Smart Templates",
      description: "AI-generated templates customized to your industry",
      icon: Sparkles,
      color: "from-rose-500 to-rose-600",
    },
    {
      name: "Privacy & Security",
      description:
        "Bank-level encryption protects all your sensitive information",
      icon: Lock,
      color: "from-teal-500 to-teal-600",
    },
    {
      name: "Multi-Format Export",
      description: "Export as PDF, Word, Google Docs, or HTML formats",
      icon: Globe,
      color: "from-amber-500 to-amber-600",
    },
    {
      name: "Certification Support",
      description:
        "Create properly formatted documents for official certifications",
      icon: Award,
      color: "from-emerald-500 to-emerald-600",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Features
              </span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Everything you need to create winning professional documents and
              advance your career
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="bg-card rounded-xl border border-border p-6 hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div
                    className={`h-12 w-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.name}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Comparison Section */}
          <div className="mt-24">
            <h2 className="text-3xl font-bold text-center mb-12">
              How We Compare
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-bold">Feature</th>
                    <th className="text-center py-4 px-4 font-bold">
                      DocBuilder
                    </th>
                    <th className="text-center py-4 px-4 font-bold">
                      Competitors
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "All Document Types", rb: true, comp: false },
                    {
                      feature: "AI Content Suggestions",
                      rb: true,
                      comp: false,
                    },
                    { feature: "ATS Optimization", rb: true, comp: true },
                    { feature: "Unlimited Templates", rb: true, comp: false },
                    { feature: "Custom Branding", rb: true, comp: false },
                    { feature: "Analytics Dashboard", rb: true, comp: false },
                    { feature: "Team Collaboration", rb: true, comp: false },
                    { feature: "Bank-Level Encryption", rb: true, comp: false },
                    { feature: "24/7 Support", rb: true, comp: false },
                  ].map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border hover:bg-card/50 transition"
                    >
                      <td className="py-4 px-4">{row.feature}</td>
                      <td className="text-center py-4 px-4 text-green-600 dark:text-green-400 font-semibold">
                        {row.rb ? "✓" : "✗"}
                      </td>
                      <td className="text-center py-4 px-4 text-foreground/60">
                        {row.comp ? "✓" : "✗"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
