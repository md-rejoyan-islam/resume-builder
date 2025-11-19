"use client";

import {
  BarChart3,
  Brain,
  Check,
  Download,
  FileText,
  Globe,
  Hexagon,
  Lightbulb,
  Lock,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("all");

  const features = [
    {
      name: "AI-Powered Content",
      description:
        "Intelligent suggestions for better document content using machine learning",
      icon: Brain,
      color: "from-blue-500 to-blue-600",
      category: "ai",
      benefits: ["Smart phrasing", "Auto-complete", "Content optimization"],
    },
    {
      name: "ATS Optimized",
      description: "All documents optimized to pass Applicant Tracking Systems",
      icon: Shield,
      color: "from-green-500 to-green-600",
      category: "optimization",
      benefits: ["Keyword optimization", "Format compliance", "100% ATS-safe"],
    },
    {
      name: "Lightning Fast",
      description: "Create professional documents in minutes, not hours",
      icon: Zap,
      color: "from-yellow-500 to-yellow-600",
      category: "performance",
      benefits: ["Instant rendering", "Real-time preview", "Quick export"],
    },
    {
      name: "Analytics Dashboard",
      description: "Track views, downloads, and performance metrics",
      icon: BarChart3,
      color: "from-purple-500 to-purple-600",
      category: "analytics",
      benefits: ["View tracking", "Engagement metrics", "Performance insights"],
    },
    {
      name: "Export Anywhere",
      description: "Download as PDF, Word, or share with custom URLs",
      icon: Download,
      color: "from-pink-500 to-pink-600",
      category: "export",
      benefits: ["Multiple formats", "Custom links", "Easy sharing"],
    },
    {
      name: "Team Collaboration",
      description: "Share documents with mentors and recruiters for feedback",
      icon: Users,
      color: "from-cyan-500 to-cyan-600",
      category: "collaboration",
      benefits: ["Comments", "Feedback", "Version control"],
    },
    {
      name: "All Document Types",
      description:
        "Resumes, cover letters, disclosure letters, and more in one platform",
      icon: FileText,
      color: "from-orange-500 to-orange-600",
      category: "documents",
      benefits: ["6+ document types", "Multi-purpose", "Unified platform"],
    },
    {
      name: "Custom Branding",
      description: "Full control over colors, fonts, styles, and layouts",
      icon: Lightbulb,
      color: "from-indigo-500 to-indigo-600",
      category: "customization",
      benefits: ["Full control", "Brand alignment", "Professional look"],
    },
    {
      name: "Smart Templates",
      description: "AI-generated templates customized to your industry",
      icon: Sparkles,
      color: "from-rose-500 to-rose-600",
      category: "templates",
      benefits: ["Industry-specific", "Pre-designed", "Instant setup"],
    },
    {
      name: "Privacy & Security",
      description:
        "Bank-level encryption protects all your sensitive information",
      icon: Lock,
      color: "from-teal-500 to-teal-600",
      category: "security",
      benefits: ["256-bit encryption", "GDPR compliant", "Data protection"],
    },
    {
      name: "Multi-Format Export",
      description: "Export as PDF, Word, Google Docs, or HTML formats",
      icon: Globe,
      color: "from-amber-500 to-amber-600",
      category: "export",
      benefits: ["PDF export", "Word format", "Online sharing"],
    },
    {
      name: "Advanced Analytics",
      description:
        "Get detailed insights on recruiter interactions with your documents",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      category: "analytics",
      benefits: ["View duration", "Download tracking", "Recruiter insights"],
    },
  ];

  const comparisonData = [
    { feature: "All Document Types", rb: true, comp: false },
    { feature: "AI Content Suggestions", rb: true, comp: false },
    { feature: "ATS Optimization", rb: true, comp: true },
    { feature: "Unlimited Templates", rb: true, comp: false },
    { feature: "Custom Branding", rb: true, comp: false },
    { feature: "Analytics Dashboard", rb: true, comp: false },
    { feature: "Team Collaboration", rb: true, comp: false },
    { feature: "Bank-Level Encryption", rb: true, comp: false },
    { feature: "24/7 Support", rb: true, comp: false },
    { feature: "Mobile App", rb: true, comp: false },
    { feature: "Version History", rb: true, comp: true },
    { feature: "API Access", rb: true, comp: false },
  ];

  const filteredFeatures =
    activeTab === "all"
      ? features
      : features.filter((f) => f.category === activeTab);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 bg-linear-to-br from-blue-500/15 via-blue-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-96 w-96 bg-linear-to-tl from-purple-500/15 via-purple-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-80 w-80 bg-linear-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Premium Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md px-4 py-2 text-sm font-semibold text-primary mb-6 w-fit mx-auto">
              <Sparkles className="h-4 w-4" />
              <span>Comprehensive Feature Set</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-foreground">Everything You Need for </span>
              <br />
              <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Professional Document Creation
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-medium">
              Powerful tools designed to elevate your professional documents.
              From AI-powered content to enterprise security, we've got
              everything to make you stand out.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {[
              { id: "all", label: "All Features", icon: Hexagon },
              { id: "ai", label: "AI Powered", icon: Brain },
              { id: "optimization", label: "Optimization", icon: TrendingUp },
              { id: "analytics", label: "Analytics", icon: BarChart3 },
              { id: "customization", label: "Customization", icon: Workflow },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-card/50 border border-border/50 text-foreground hover:border-primary/50 hover:bg-card/80"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Premium Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {filteredFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.name}
                  className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-8 hover:border-primary/50 hover:shadow-xl hover:bg-card/80 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Gradient background on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`h-14 w-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="h-7 w-7 text-white" />
                    </div>

                    {/* Title & Description */}
                    <h3 className="font-bold text-xl mb-3 text-foreground">
                      {feature.name}
                    </h3>
                    <p className="text-foreground/70 text-sm leading-relaxed mb-5">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <div className="space-y-2 border-t border-border/30 pt-5">
                      {feature.benefits.map((benefit, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-sm text-foreground/60"
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 h-20 w-20 bg-linear-to-bl from-primary/10 to-transparent rounded-full blur-2xl -m-10 group-hover:from-primary/20 transition-all duration-300" />
                </div>
              );
            })}
          </div>

          {/* Premium Comparison Section */}
          <div className="mb-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                How We Compare
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                See what makes DocBuilder the premier choice for professional
                document creation
              </p>
            </div>

            {/* Premium Table */}
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-b border-border/50">
                      <th className="text-left py-5 px-6 font-bold text-lg text-foreground">
                        Feature
                      </th>
                      <th className="text-center py-5 px-6 font-bold text-lg">
                        <div className="flex items-center justify-center gap-2">
                          <div className="h-10 w-10 rounded-lg bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <span className="text-white font-bold">DB</span>
                          </div>
                          <span>DocBuilder</span>
                        </div>
                      </th>
                      <th className="text-center py-5 px-6 font-bold text-lg text-foreground/60">
                        Competitors
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                      >
                        <td className="py-5 px-6 font-medium text-foreground">
                          {row.feature}
                        </td>
                        <td className="text-center py-5 px-6">
                          {row.rb ? (
                            <div className="flex justify-center">
                              <div className="h-6 w-6 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-foreground/40">—</span>
                          )}
                        </td>
                        <td className="text-center py-5 px-6">
                          {row.comp ? (
                            <div className="flex justify-center">
                              <div className="h-6 w-6 rounded-lg bg-foreground/10 flex items-center justify-center">
                                <Check className="h-4 w-4 text-foreground/40" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-foreground/40">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Integration & Security Section
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
     
            <div className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-10 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-teal-500/5 to-transparent group-hover:from-teal-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-xl bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-6 shadow-lg">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Enterprise Security</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Your data is protected with bank-level encryption and GDPR
                  compliance. We take security seriously so you don't have to.
                </p>
                <ul className="space-y-3">
                  {[
                    "256-bit AES encryption",
                    "GDPR & SOC 2 compliant",
                    "Regular security audits",
                    "Two-factor authentication",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-teal-500 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-bl from-teal-500/10 to-transparent rounded-full blur-2xl -m-12 group-hover:from-teal-500/20 transition-all duration-300" />
            </div>

            <div className="group relative bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 p-10 hover:border-primary/50 hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent group-hover:from-purple-500/10 transition-all duration-300" />
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-xl bg-linear-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 shadow-lg">
                  <Workflow className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Integrations</h3>
                <p className="text-foreground/70 mb-6 leading-relaxed">
                  Connect DocBuilder with your favorite tools and platforms.
                  Seamless integration with your workflow.
                </p>
                <ul className="space-y-3">
                  {[
                    "Google Workspace",
                    "Microsoft Office",
                    "LinkedIn integration",
                    "API access",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-purple-500 shrink-0" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="absolute top-0 right-0 h-24 w-24 bg-linear-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl -m-12 group-hover:from-purple-500/20 transition-all duration-300" />
            </div>
          </div> */}

          {/* <div className="relative rounded-3xl overflow-hidden bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 border border-primary/30 backdrop-blur-xl p-12 text-center">
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 to-purple-500/5" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                Ready to Transform Your Documents?
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
                Join thousands of professionals who are already creating
                stunning documents with DocBuilder
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="h-12 px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  className="h-12 px-8 border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-lg backdrop-blur-sm transition-all"
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-linear-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl" />
          </div> */}
        </div>
      </main>
    </div>
  );
}
