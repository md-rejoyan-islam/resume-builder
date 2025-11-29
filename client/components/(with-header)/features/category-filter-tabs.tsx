"use client";

import {
  BarChart3,
  Brain,
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

const CategoryFilterTabs = () => {
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

  const filteredFeatures =
    activeTab === "all"
      ? features
      : features.filter((f) => f.category === activeTab);

  return (
    <>
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
              className={`px-6  relative  cursor-pointer py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-card/70 border border-primary/20  text-foreground hover:border-primary/50 hover:bg-card/80"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
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
                  className={`h-14 w-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}
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
    </>
  );
};

export default CategoryFilterTabs;
