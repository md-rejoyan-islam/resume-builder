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
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-24 max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            All Professional{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Documents You Need
            </span>
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            From resumes to disclosure letters, we provide everything for a
            complete career toolkit
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {documents.map((doc) => {
            const Icon = doc.icon;
            return (
              <div
                key={doc.title}
                className="group bg-card rounded-xl border border-border p-8 hover:border-primary/50 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div
                  className={`h-14 w-14 rounded-lg bg-gradient-to-br ${doc.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-3">{doc.title}</h3>
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  {doc.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {doc.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Create {doc.title}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
