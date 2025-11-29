"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function FilterTemplatesTabs() {
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
        badge: "Popular",
      },
      {
        name: "Creative Bold",
        category: "Design",
        rating: 4.8,
        reviews: 95,
        image: "/creative-bold-colorful-resume-design.jpg",
        color: "from-purple-500 to-purple-600",
        badge: "Trending",
      },
      {
        name: "Executive Classic",
        category: "Corporate",
        rating: 4.9,
        reviews: 156,
        image: "/executive-classic-business-resume.jpg",
        color: "from-slate-700 to-slate-800",
        badge: "Best Seller",
      },
      {
        name: "Tech Forward",
        category: "Tech",
        rating: 4.7,
        reviews: 82,
        image: "/tech-forward-developer-resume.jpg",
        color: "from-cyan-500 to-cyan-600",
        badge: "New",
      },
      {
        name: "Colorful Vibrant",
        category: "Creative",
        rating: 4.8,
        reviews: 103,
        image: "/colorful-vibrant-creative-resume.jpg",
        color: "from-pink-500 to-rose-600",
        badge: "Featured",
      },
      {
        name: "Academic Formal",
        category: "Education",
        rating: 4.6,
        reviews: 71,
        image: "/academic-formal-education-resume.jpg",
        color: "from-amber-700 to-amber-800",
        badge: "Verified",
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
        badge: "Popular",
      },
      {
        name: "Modern Friendly",
        category: "Startup",
        rating: 4.8,
        reviews: 72,
        image: "/modern-friendly-startup-cover-letter.jpg",
        color: "from-purple-600 to-purple-700",
        badge: "Trending",
      },
      {
        name: "Creative Bold",
        category: "Design",
        rating: 4.7,
        reviews: 65,
        image: "/creative-bold-design-cover-letter.jpg",
        color: "from-pink-600 to-rose-700",
        badge: "New",
      },
      {
        name: "Tech Industry",
        category: "Technology",
        rating: 4.9,
        reviews: 98,
        image: "/tech-industry-developer-cover-letter.jpg",
        color: "from-cyan-600 to-cyan-700",
        badge: "Best Seller",
      },
      {
        name: "Executive",
        category: "Management",
        rating: 4.8,
        reviews: 54,
        image: "/executive-management-cover-letter.jpg",
        color: "from-slate-700 to-slate-800",
        badge: "Featured",
      },
      {
        name: "Academic",
        category: "Education",
        rating: 4.6,
        reviews: 43,
        image: "/academic-education-cover-letter.jpg",
        color: "from-amber-700 to-amber-800",
        badge: "Verified",
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
        badge: "Popular",
      },
      {
        name: "Criminal Background",
        category: "Legal",
        rating: 4.9,
        reviews: 134,
        image: "/criminal-background-disclosure-form.jpg",
        color: "from-orange-600 to-orange-700",
        badge: "Best Seller",
      },
      {
        name: "Financial Disclosure",
        category: "Compliance",
        rating: 4.8,
        reviews: 87,
        image: "/financial-disclosure-statement.jpg",
        color: "from-yellow-600 to-yellow-700",
        badge: "Featured",
      },
      {
        name: "Medical History",
        category: "Healthcare",
        rating: 4.8,
        reviews: 76,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-red-600 to-red-700",
        badge: "New",
      },
      {
        name: "Conflict of Interest",
        category: "Corporate",
        rating: 4.7,
        reviews: 62,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-indigo-600 to-indigo-700",
        badge: "Trending",
      },
      {
        name: "Professional Conduct",
        category: "Ethics",
        rating: 4.8,
        reviews: 58,
        image: "/placeholder.svg?height=400&width=300",
        color: "from-teal-600 to-teal-700",
        badge: "Verified",
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
    <>
      {/* Filter Buttons - Premium Style */}
      <div className="flex flex-wrap gap-3 justify-center mb-16">
        {docTypes.map((docType) => (
          <button
            key={docType.id}
            onClick={() => setActiveDocType(docType.id)}
            className={`px-6  relative  cursor-pointer py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
              activeDocType === docType.id
                ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "bg-card/70 border border-primary/20  text-foreground hover:border-primary/50 hover:bg-card/80"
            }`}
          >
            {docType.label}
            <span className="ml-2 text-xs bg-primary/20 px-2.5 py-0.5 rounded-full font-bold">
              {docType.count}
            </span>
          </button>
        ))}
      </div>

      {/* Templates Grid - Premium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentTemplates.map((template, index) => (
          <div
            key={template.name}
            className="group relative"
            style={{
              transitionDelay: `${index * 50}ms`,
            }}
          >
            {/* Premium Template Card */}
            <div className="relative h-full bg-card/50 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-500 flex flex-col shadow-md hover:shadow-xl group-hover:-translate-y-1">
              {/* Background overlay on hover */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                {/* Template Preview Image */}
                <Image
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 z-20 flex items-center justify-center">
                  <Button className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-xl flex items-center gap-2">
                    <span>Preview Template</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-bold z-30">
                  {template.badge}
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent" />
              </div>

              {/* Content Section */}
              <div className="relative z-10 p-6 sm:p-8 flex flex-col grow">
                {/* Title */}
                <h3 className="font-bold text-lg sm:text-xl mb-2 text-foreground">
                  {template.name}
                </h3>

                {/* Category */}
                <p className="text-sm text-foreground/60 mb-4 font-medium">
                  {template.category}
                </p>

                {/* Ratings */}
                <div className="flex items-center gap-2 mb-6">
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
                  <span className="text-sm text-foreground/60 ml-1">
                    <span className="font-semibold">{template.rating}</span>
                    <span className="text-foreground/50">
                      {" "}
                      ({template.reviews})
                    </span>
                  </span>
                </div>

                {/* Divider */}
                <div className="mb-6 h-px bg-border/40" />

                {/* CTA Button */}
                <Button className="w-full h-11 bg-linear-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg mt-auto flex items-center justify-center gap-2">
                  <span>Use Template</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
