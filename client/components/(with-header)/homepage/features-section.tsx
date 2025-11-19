import {
  BarChart3,
  CheckCircle2,
  Globe,
  Palette,
  Settings2,
  Sparkles,
  Zap,
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: BarChart3,
      title: "Multiple Documents",
      description:
        "Create resumes, cover letters, and disclosure letters all in one place",
      highlight: "6+ Document Types",
    },
    {
      icon: Globe,
      title: "Custom Domain",
      description:
        "Get your personalized domain to showcase your professional portfolio",
      highlight: "Professional Branding",
    },
    {
      icon: Settings2,
      title: "Personal Dashboard",
      description:
        "Manage all your documents and applications from one dashboard",
      highlight: "Full Control",
    },
    {
      icon: Zap,
      title: "AI-Powered Content",
      description:
        "Smart suggestions and content optimization for maximum impact",
      highlight: "Instant Optimization",
    },
    {
      icon: CheckCircle2,
      title: "ATS Optimization",
      description: "Ensure your documents pass Applicant Tracking Systems",
      highlight: "100% Compatible",
    },
    {
      icon: Palette,
      title: "Custom Styling",
      description: "Personalize colors, fonts, and layouts to match your brand",
      highlight: "Unlimited Variations",
    },
  ];

  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-8  overflow-hidden">
      {/* Premium animated background with grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 h-72 w-72 bg-linear-to-br from-blue-500/15 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 h-80 w-80 bg-linear-to-br from-purple-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 h-64 w-64 bg-linear-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0  bg-[linear-gradient(#94a3b810_1px,transparent_1px),linear-gradient(90deg,#94a3b810_1px,transparent_1px)]  dark:bg-[linear-gradient(#94a3b806_1px,transparent_1px),linear-gradient(90deg,#94a3b806_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Premium Header - Keep same style */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Packed with Power</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Everything to Succeed
            <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Your Career Needs
            </span>
          </h2>

          <p className="text-base sm:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            Comprehensive suite of tools designed to elevate your professional
            documents and portfolio.
          </p>
        </div>

        {/* Features Grid - Premium Cards without hover borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colors = [
              "from-blue-500 to-blue-600",
              "from-cyan-500 to-blue-600",
              "from-purple-500 to-purple-600",
              "from-pink-500 to-rose-600",
              "from-orange-500 to-amber-600",
              "from-green-500 to-emerald-600",
            ];
            const currentColor = colors[index % colors.length];

            return (
              <div
                key={index}
                className="group relative"
                style={{
                  transitionDelay: `${index * 50}ms`,
                }}
              >
                {/* Feature Card - Clean Premium Design without borders */}
                <div className="relative h-full bg-card/50 backdrop-blur-lg rounded-2xl p-6 sm:p-8 overflow-hidden transition-all duration-500 flex flex-col shadow-md hover:shadow-lg">
                  {/* Corner gradient glow - subtle */}
                  <div
                    className={`absolute -top-20 -right-20 h-48 w-48 bg-linear-to-br ${currentColor} rounded-full opacity-5 blur-3xl transition-all duration-700 group-hover:opacity-15`}
                  />

                  {/* Background overlay - subtle on base, appears on hover */}
                  <div className="absolute inset-0 bg-linear-to-br from-primary/3 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                  {/* Relative content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon Container - Premium styling */}
                    <div className="mb-6 inline-block">
                      <div className={`relative`}>
                        {/* Icon glow background - subtle */}
                        <div
                          className={`absolute inset-0 h-16 w-16 bg-linear-to-br ${currentColor} rounded-2xl opacity-15 blur-lg group-hover:opacity-25 transition-all duration-500`}
                        />

                        {/* Icon container */}
                        <div
                          className={`relative h-14 w-14 rounded-xl bg-linear-to-br ${currentColor} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-500 group-hover:scale-105`}
                        >
                          <Icon className="h-7 w-7 text-white drop-shadow-lg" />
                        </div>

                        {/* Subtle shine effect */}
                        <div className="absolute inset-0 h-14 w-14 rounded-xl bg-linear-to-br from-white/20 to-transparent opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Highlight badge - clean style */}
                    <div className="mb-3 inline-flex px-3 py-1.5 rounded-lg bg-primary/10 text-primary">
                      <span className="text-xs font-semibold">
                        {feature.highlight}
                      </span>
                    </div>

                    {/* Title - clean, no gradient transform */}
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>

                    {/* Description - clean layout */}
                    <p className="text-sm text-foreground/65 leading-relaxed grow">
                      {feature.description}
                    </p>

                    {/* Feature benefits - visual list */}
                    <div className="mt-6 pt-4 flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary/70" />
                      <span className="text-xs text-foreground/60 font-medium">
                        Included in all plans
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
