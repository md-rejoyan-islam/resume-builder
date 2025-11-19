import { Button } from "@/components/ui/button";
import { Award, BookOpen, FileText } from "lucide-react";

export function DocumentTypesSection() {
  const documents = [
    {
      icon: FileText,
      title: "Resume",
      description:
        "Professional resume highlighting your skills, experience, and achievements",
      features: ["ATS Optimized", "Multiple Formats", "AI Suggestions"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: BookOpen,
      title: "Cover Letter",
      description:
        "Compelling cover letters tailored to job descriptions and companies",
      features: ["Job-Matched Content", "Professional Tone", "Quick Generate"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Award,
      title: "Disclosure Letter",
      description:
        "Transparency documents for background disclosures and declarations",
      features: ["Legal Templates", "Customizable", "Compliance Ready"],
      color: "from-pink-500 to-pink-600",
    },
    // {
    //   icon: LayoutList,
    //   title: "Reference Sheet",
    //   description:
    //     "Professional reference list with contact information and descriptions",
    //   features: ["Easy Formatting", "Multiple Layouts", "Quick Updates"],
    //   color: "from-green-500 to-green-600",
    // },
    // {
    //   icon: Share2,
    //   title: "Portfolio Summary",
    //   description:
    //     "Professional portfolio overview showcasing your best work and projects",
    //   features: ["Project Showcase", "Links Integration", "Custom Branding"],
    //   color: "from-orange-500 to-orange-600",
    // },
    // {
    //   icon: Briefcase,
    //   title: "Professional Bio",
    //   description:
    //     "Concise professional biography for LinkedIn, websites, and speaking events",
    //   features: ["Multiple Lengths", "Tone Variants", "Brand Aligned"],
    //   color: "from-cyan-500 to-cyan-600",
    // },
  ];

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8 lg:pt-24 lg:pb-16 max-w-7xl mx-auto overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-72 w-72 bg-linear-to-br from-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 h-96 w-96 bg-linear-to-br from-purple-500/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Professional Documents
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            All Tools You{" "}
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Actually Need
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Professionally crafted documents powered by AI. Create, customize,
            and export in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc, idx) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.title}
                className="group relative"
                style={{
                  transitionDelay: `${idx * 100}ms`,
                }}
              >
                {/* Card container with premium border */}
                <div className="relative h-full bg-card/50 backdrop-blur-sm border border-primary/30 rounded-3xl p-8 sm:p-10 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
                  {/* Background gradient overlay - appears on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  {/* Glowing corner accent */}
                  <div
                    className={`absolute -top-20 -right-20 h-40 w-40 bg-linear-to-br ${doc.color} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-500`}
                  />

                  {/* Content wrapper */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon with premium styling */}
                    <div className="mb-8 flex justify-center">
                      <div className="relative">
                        {/* Animated background glow */}
                        <div className="absolute inset-0 h-24 w-24 rounded-3xl bg-linear-to-br from-blue-500/30 to-purple-500/30 blur-2xl group-hover:blur-3xl group-hover:scale-125 transition-all duration-500" />

                        {/* Main icon container */}
                        <div
                          className={`relative h-20 w-20 rounded-2xl bg-linear-to-br ${doc.color} flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                        >
                          <Icon className="h-10 w-10 text-white drop-shadow-lg" />
                        </div>

                        {/* Shine effect overlay */}
                        <div className="absolute inset-0 h-20 w-20 rounded-2xl bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Title section */}
                    <div className="mb-2">
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {doc.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-foreground/60 text-sm sm:text-base leading-relaxed mb-8 group-hover:text-foreground/80 transition-colors duration-300">
                      {doc.description}
                    </p>

                    {/* Features list - premium styling */}
                    <div className="mb-8 space-y-3 grow">
                      {doc.features.map((feature, index) => (
                        <div
                          key={feature}
                          className="flex items-center gap-3 text-sm text-foreground/70 group-hover:text-foreground/90 transition-all duration-300"
                          style={{
                            transitionDelay: `${100 + index * 50}ms`,
                          }}
                        >
                          {/* Animated checkmark dot */}
                          <div className="relative flex items-center justify-center">
                            <div
                              className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${doc.color} group-hover:h-2 group-hover:w-2 transition-all duration-300`}
                            />
                            <div
                              className={`absolute h-1.5 w-1.5 rounded-full bg-linear-to-r ${doc.color} opacity-0 group-hover:opacity-0 animate-pulse`}
                            />
                          </div>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button - premium styling */}
                    <Button
                      className={`w-full h-12 font-semibold bg-linear-to-r ${doc.color} text-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 relative overflow-hidden group/btn`}
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />

                      <span className="relative flex items-center justify-center gap-2">
                        Create {doc.title}
                        <span className="group-hover/btn:translate-x-1 transition-transform duration-300">
                          →
                        </span>
                      </span>
                    </Button>
                  </div>

                  {/* Top border accent line - animates on hover */}
                  <div
                    className={`absolute top-0 left-0 h-0.5 bg-linear-to-r ${doc.color} w-0 group-hover:w-full transition-all duration-700 rounded-full`}
                  />

                  {/* Bottom gradient accent */}
                  <div
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-linear-to-r ${doc.color} group-hover:w-3/4 transition-all duration-700 delay-100`}
                  />
                </div>

                {/* Floating label on hover */}
                <div className="absolute -top-3 right-6 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2">
                  Premium
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
