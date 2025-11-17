import {
  BarChart3,
  CheckCircle2,
  Globe,
  Palette,
  Settings2,
  Zap,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Multiple Documents",
      description:
        "Create resumes, cover letters, and disclosure letters all in one place",
    },
    {
      icon: Globe,
      title: "Custom Domain",
      description:
        "Get your personalized domain to showcase your professional portfolio",
    },
    {
      icon: Settings2,
      title: "Personal Dashboard",
      description:
        "Manage all your documents and applications from one dashboard",
    },
    {
      icon: Zap,
      title: "AI-Powered Content",
      description:
        "Smart suggestions and content optimization for maximum impact",
    },
    {
      icon: CheckCircle2,
      title: "ATS Optimization",
      description: "Ensure your documents pass Applicant Tracking Systems",
    },
    {
      icon: Palette,
      title: "Custom Styling",
      description: "Personalize colors, fonts, and layouts to match your brand",
    },
  ];

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20 bg-slate-50 dark:bg-slate-900/50 ">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-foreground/60">
            Everything you need for your career success
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="rounded-lg border border-border bg-background p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
