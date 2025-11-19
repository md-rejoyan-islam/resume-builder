import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";

export function TemplatesSection() {
  const templates = [
    {
      name: "Modern Minimal",
      description: "Perfect for tech and creative professionals",
      image: "/minimal-resume-template.jpg",
      badge: "Trending",
      stats: "2.4K+ users",
    },
    {
      name: "Professional",
      description: "Ideal for corporate and finance roles",
      image: "/professional-resume-template.jpg",
      badge: "Popular",
      stats: "5.2K+ users",
    },
    {
      name: "Creative",
      description: "Stand out in design and marketing",
      image: "/creative-resume-template.jpg",
      badge: "New",
      stats: "1.8K+ users",
    },
  ];

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-8  max-w-7xl mx-auto overflow-hidden">
      {/* Premium animated background with grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-1/3 -left-1/3 h-80 w-80 bg-linear-to-br from-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 h-96 w-96 bg-linear-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />

        {/* Grid pattern overlay - same style as features */}
        <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(148,163,184,.05)_25%,rgba(148,163,184,.05)_26%,transparent_27%,transparent_74%,rgba(148,163,184,.05)_75%,rgba(148,163,254,.05)_76%,transparent_77%,transparent)] bg-size-[50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Premium Header - Keep same style */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Template Gallery</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Choose Your Perfect
            <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Resume Template
            </span>
          </h2>

          <p className="text-base sm:text-lg text-foreground/60 max-w-3xl mx-auto">
            Professionally designed templates that get noticed. Preview before
            you create.
          </p>
        </div>

        {/* Template Grid - Premium Cards without border creating */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {templates.map((template, index) => (
            <div
              key={index}
              className="group relative h-full"
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Card Container - Premium glassmorphism */}
              <div className="relative h-full bg-card/50 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-500 flex flex-col shadow-md hover:shadow-xl group-hover:-translate-y-1">
                {/* Subtle background gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Image Preview Section */}
                <div className="relative h-72 overflow-hidden bg-linear-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Image */}
                  <Image
                    src={template.image || "/placeholder.svg"}
                    alt={template.name}
                    width={400}
                    height={520}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Badge - positioned on image */}
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 backdrop-blur-sm text-white text-xs font-bold z-30 group-hover:bg-primary transition-all duration-300">
                    {template.badge}
                  </div>

                  {/* Preview button overlay - appears on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
                    <Button className="bg-white text-black hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg shadow-xl group-hover:scale-110 transition-transform duration-300 flex items-center gap-2">
                      <span>Quick Preview</span>
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col grow">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {template.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-foreground/60 mb-6 leading-relaxed">
                    {template.description}
                  </p>

                  {/* Stats line */}
                  <div className="mb-6 text-xs font-medium text-foreground/50">
                    {template.stats}
                  </div>

                  {/* Feature highlights */}
                  <div className="mb-6 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>ATS-Optimized Format</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-foreground/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>Fully Customizable</span>
                    </div>
                  </div>

                  {/* Button - fills remaining space */}
                  <Button className="w-full h-11 bg-linear-to-r from-primary/80 to-primary hover:from-primary hover:to-primary/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group-hover:shadow-2xl mt-auto">
                    <span>Use Template</span>
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Top accent - subtle, no animation */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/30 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
