import { CheckCircle2, FileText, Share2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: CheckCircle2,
      number: 1,
      title: "Choose Your Document",
      description:
        "Select from resume, cover letter, disclosure, or any of 6+ document types.",
    },
    {
      icon: FileText,
      number: 2,
      title: "AI-Powered Creation",
      description:
        "Our AI assists with content, formatting, and optimization for maximum impact.",
    },
    {
      icon: Share2,
      number: 3,
      title: "Export & Share",
      description:
        "Download as PDF, Word, or share your portfolio with a custom domain.",
    },
  ];

  return (
    <section className="relative px-4 pt-8  pb-12 sm:px-6 lg:px-8 lg:pb-20 lg:pt-12 overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 h-96 w-96 bg-linear-to-br from-blue-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-1/4 h-96 w-96 bg-linear-to-br from-purple-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-80 w-80 bg-linear-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl z-10">
        {/* Premium Header */}
        <div className="text-center mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-4 px-5 py-3 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm">
            <span className="h-2 w-2 rounded-full bg-linear-to-r from-blue-500 to-purple-600 animate-pulse" />
            <span className="text-sm font-semibold text-foreground/80">
              Workflow
            </span>
            <span className="h-2 w-2 rounded-full bg-linear-to-r from-purple-500 to-pink-600" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Get Started in
            <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>

          <p className="text-base sm:text-lg text-foreground/60 max-w-3xl mx-auto leading-relaxed">
            <span className="block mt-2 text-foreground/50 text-sm">
              Complete professional documents in minutes, not hours.
            </span>
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Timeline connector - desktop only */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-primary/20 to-transparent transform -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const colors = [
                "from-blue-500 to-blue-600",
                "from-purple-500 to-purple-600",
                "from-pink-500 to-pink-600",
              ];
              const currentColor = colors[index];

              return (
                <div
                  key={index}
                  className="group relative"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Premium Card */}
                  <div className="relative h-full bg-card/50 backdrop-blur-lg border border-primary/20 rounded-3xl p-6 sm:p-8 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group">
                    {/* Corner gradient accent */}
                    <div
                      className={`absolute -top-24 -right-24 h-48 w-48 bg-linear-to-br ${currentColor} rounded-full opacity-0 group-hover:opacity-15 blur-3xl transition-all duration-700`}
                    />

                    {/* Background gradient overlay on hover */}
                    <div className="absolute inset-0 bg-linear-to-br from-primary/8 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                    {/* Relative content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Step number circle - floating */}
                      <div className="mb-4 flex items-start justify-between">
                        <div
                          className={`inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-linear-to-br ${currentColor} shadow-lg group-hover:shadow-2xl text-white font-bold text-sm group-hover:scale-110 transition-all duration-500`}
                        >
                          {step.number}
                        </div>

                        {/* Shine effect badge on hover */}
                        <div className="h-6 w-6 rounded-full bg-linear-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>

                      {/* Icon Section - Smaller */}
                      <div className="mb-6 flex justify-center py-4">
                        <div className="relative">
                          {/* Animated outer glow */}
                          <div
                            className={`absolute inset-0 h-20 w-20 bg-linear-to-br ${currentColor} rounded-3xl opacity-20 blur-3xl group-hover:opacity-40 group-hover:blur-2xl group-hover:scale-110 transition-all duration-500`}
                          />

                          {/* Main icon container */}
                          <div
                            className={`relative h-16 w-16 rounded-2xl bg-linear-to-br ${currentColor} flex items-center justify-center shadow-2xl group-hover:shadow-2xl group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500`}
                          >
                            <Icon className="h-8 w-8 text-white drop-shadow-lg" />
                          </div>

                          {/* Glossy overlay effect */}
                          <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 text-center group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed text-center grow group-hover:text-foreground/80 transition-colors duration-300 mb-4">
                        {step.description}
                      </p>

                      {/* Bottom decorative elements */}
                      <div className="space-y-2">
                        {/* Progress bar */}
                        <div className="h-1 w-full bg-border/30 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${currentColor} w-0 group-hover:w-full transition-all duration-700`}
                          />
                        </div>

                        {/* Step indicator line */}
                        <div className="flex items-center justify-center gap-2">
                          <div
                            className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${currentColor}`}
                          />
                          <span className="text-xs text-foreground/50 font-medium">
                            Step {step.number} of 3
                          </span>
                          <div
                            className={`h-1.5 w-1.5 rounded-full bg-linear-to-r ${currentColor} opacity-50`}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Top accent border */}
                    <div
                      className={`absolute top-0 left-0 h-1 bg-linear-to-r ${currentColor} w-0 group-hover:w-full transition-all duration-700 rounded-full`}
                    />

                    {/* Right side accent line on hover */}
                    <div
                      className={`absolute top-0 right-0 w-1 bg-linear-to-b ${currentColor} h-0 group-hover:h-full transition-all duration-700 delay-150`}
                    />
                  </div>

                  {/* Floating step label - appears on hover */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-foreground text-background text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-y-2 whitespace-nowrap">
                    Step {step.number}
                  </div>

                  {/* Connection indicator for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden flex justify-center mt-4 mb-2">
                      <div
                        className={`text-2xl text-foreground/20 group-hover:text-primary transition-colors duration-300`}
                      >
                        ↓
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
