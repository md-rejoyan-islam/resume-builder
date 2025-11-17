import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function TemplatesSection() {
  const templates = [
    {
      name: "Modern Minimal",
      description: "Perfect for tech and creative professionals",
      image: "/minimal-resume-template.jpg",
      color: "from-slate-700 to-slate-800",
    },
    {
      name: "Professional",
      description: "Ideal for corporate and finance roles",
      image: "/professional-resume-template.jpg",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Creative",
      description: "Stand out in design and marketing",
      image: "/creative-resume-template.jpg",
      color: "from-pink-500 to-orange-400",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20 max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose Your Template
          </h2>
          <p className="text-lg text-foreground/60">
            Professional templates for every industry
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {templates.map((template, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-background border border-border hover:border-primary/50 transition-all hover:shadow-lg"
            >
              <div className="relative h-64 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700">
                <img
                  src={template.image || "/placeholder.svg"}
                  alt={template.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold">{template.name}</h3>
                <p className="mb-6 text-foreground/60 text-sm">
                  {template.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group">
                  Preview Template
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          >
            View All Templates
          </Button>
        </div>
      </div>
    </section>
  );
}
