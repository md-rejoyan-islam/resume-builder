"use client";

import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function TemplatesPage() {
  const [activeDocType, setActiveDocType] = useState("resume");

  const templates = {
    resume: [
      {
        name: "Modern Minimal",
        category: "Professional",
        rating: 4.9,
        reviews: 127,
        image: "/modern-minimal-professional-resume-template.jpg",
        color: "from-blue-500 to-blue-600",
      },
      {
        name: "Creative Bold",
        category: "Design",
        rating: 4.8,
        reviews: 95,
        image: "/creative-bold-colorful-resume-design.jpg",
        color: "from-purple-500 to-purple-600",
      },
      {
        name: "Executive Classic",
        category: "Corporate",
        rating: 4.9,
        reviews: 156,
        image: "/executive-classic-business-resume.jpg",
        color: "from-slate-700 to-slate-800",
      },
      {
        name: "Tech Forward",
        category: "Tech",
        rating: 4.7,
        reviews: 82,
        image: "/tech-forward-developer-resume.jpg",
        color: "from-cyan-500 to-cyan-600",
      },
      {
        name: "Colorful Vibrant",
        category: "Creative",
        rating: 4.8,
        reviews: 103,
        image: "/colorful-vibrant-creative-resume.jpg",
        color: "from-pink-500 to-rose-600",
      },
      {
        name: "Academic Formal",
        category: "Education",
        rating: 4.6,
        reviews: 71,
        image: "/academic-formal-education-resume.jpg",
        color: "from-amber-700 to-amber-800",
      },
    ],
    coverLetter: [
      {
        name: "Professional Formal",
        category: "Corporate",
        rating: 4.9,
        reviews: 89,
        image: "/professional-formal-corporate-cover-letter.jpg",
        color: "from-blue-600 to-blue-700",
      },
      {
        name: "Modern Friendly",
        category: "Startup",
        rating: 4.8,
        reviews: 72,
        image: "/modern-friendly-startup-cover-letter.jpg",
        color: "from-purple-600 to-purple-700",
      },
      {
        name: "Creative Bold",
        category: "Design",
        rating: 4.7,
        reviews: 65,
        image: "/creative-bold-design-cover-letter.jpg",
        color: "from-pink-600 to-rose-700",
      },
      {
        name: "Tech Industry",
        category: "Technology",
        rating: 4.9,
        reviews: 98,
        image: "/tech-industry-developer-cover-letter.jpg",
        color: "from-cyan-600 to-cyan-700",
      },
      {
        name: "Executive",
        category: "Management",
        rating: 4.8,
        reviews: 54,
        image: "/executive-management-cover-letter.jpg",
        color: "from-slate-700 to-slate-800",
      },
      {
        name: "Academic",
        category: "Education",
        rating: 4.6,
        reviews: 43,
        image: "/academic-education-cover-letter.jpg",
        color: "from-amber-700 to-amber-800",
      },
    ],
    disclosure: [
      {
        name: "General Disclosure",
        category: "Standard",
        rating: 4.9,
        reviews: 156,
        image: "/general-disclosure-statement-form.jpg",
        color: "from-green-600 to-green-700",
      },
      {
        name: "Criminal Background",
        category: "Legal",
        rating: 4.9,
        reviews: 134,
        image: "/criminal-background-disclosure-form.jpg",
        color: "from-orange-600 to-orange-700",
      },
      {
        name: "Financial Disclosure",
        category: "Compliance",
        rating: 4.8,
        reviews: 87,
        image: "/financial-disclosure-statement.jpg",
        color: "from-yellow-600 to-yellow-700",
      },
      {
        name: "Medical History",
        category: "Healthcare",
        rating: 4.8,
        reviews: 76,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-red-600 to-red-700",
      },
      {
        name: "Conflict of Interest",
        category: "Corporate",
        rating: 4.7,
        reviews: 62,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-indigo-600 to-indigo-700",
      },
      {
        name: "Professional Conduct",
        category: "Ethics",
        rating: 4.8,
        reviews: 58,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-teal-600 to-teal-700",
      },
    ],
  };

  const docTypes = [
    { id: "resume", label: "Resumes", count: 6 },
    { id: "coverLetter", label: "Cover Letters", count: 6 },
    { id: "disclosure", label: "Disclosure Letters", count: 6 },
  ];

  const currentTemplates = templates[activeDocType as keyof typeof templates];

  return (
    <div className="min-h-screen bg-background">
      <main className="py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Professional{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Templates
              </span>
            </h1>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Choose from our expertly-designed templates for all your
              professional documents.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {docTypes.map((docType) => (
              <Button
                key={docType.id}
                onClick={() => setActiveDocType(docType.id)}
                variant={activeDocType === docType.id ? "default" : "outline"}
                className={
                  activeDocType === docType.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600"
                    : ""
                }
              >
                {docType.label}
                <span className="ml-2 text-xs bg-primary/20 px-2 py-0.5 rounded-full">
                  {docType.count}
                </span>
              </Button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentTemplates.map((template) => (
              <div
                key={template.name}
                className="group bg-card rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all hover:shadow-lg"
              >
                {/* Image */}
                <div className="h-64 relative overflow-hidden bg-foreground/5">
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <Button
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{template.name}</h3>
                  <p className="text-sm text-foreground/60 mb-3">
                    {template.category}
                  </p>

                  <div className="flex items-center gap-1 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(template.rating)
                              ? "fill-amber-400 text-amber-400"
                              : "text-foreground/20"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foreground/60 ml-2">
                      {template.rating} ({template.reviews})
                    </span>
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Use Template
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
