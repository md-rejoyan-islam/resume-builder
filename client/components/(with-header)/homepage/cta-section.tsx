import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative px-4 py-12 sm:px-6 lg:px-8 lg:py-28 overflow-hidden">
      {/* Premium animated background with grid */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 h-96 w-96 bg-linear-to-br from-blue-600/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 bg-linear-to-br from-purple-600/30 to-transparent rounded-full blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0  bg-[linear-gradient(#94a3b810_1px,transparent_1px),linear-gradient(90deg,#94a3b810_1px,transparent_1px)]  dark:bg-[linear-gradient(#94a3b806_1px,transparent_1px),linear-gradient(90deg,#94a3b806_1px,transparent_1px)] bg-size-[50px_50px]" />
      </div>

      <div className="relative mx-auto max-w-5xl z-10">
        {/* Premium CTA Card */}
        <div className="relative bg-linear-to-br from-card/60 to-card/40 backdrop-blur-2xl rounded-3xl p-8 sm:p-12 lg:p-16 overflow-hidden border border-border/60 shadow-xl">
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-linear-to-br from-blue-600/5 via-transparent to-purple-600/5 rounded-3xl" />
          <div className="absolute top-0 left-0 h-96 w-96 bg-linear-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 right-0 h-96 w-96 bg-linear-to-br from-purple-500/10 to-transparent rounded-full blur-3xl -z-10" />

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-semibold">Limited Time Offer</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 text-foreground tracking-tight">
              Start Building Your
              <span className="block bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Perfect Resume Today
              </span>
            </h2>

            {/* Description */}
            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-8 font-medium">
              Join thousands of professionals who have successfully landed their
              dream jobs using ResumeBuilder. Create, customize, and deploy your
              professional portfolio in minutes.
            </p>

            {/* Features list */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="h-5 w-5 rounded-full bg-linear-to-r from-blue-600 to-blue-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground/80">
                  Completely Free
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="h-5 w-5 rounded-full bg-linear-to-r from-purple-600 to-purple-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground/80">
                  No Credit Card
                </span>
              </div>
              <div className="flex items-center gap-3 justify-center sm:justify-start">
                <div className="h-5 w-5 rounded-full bg-linear-to-r from-pink-600 to-pink-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-semibold text-foreground/80">
                  5 Minutes to Start
                </span>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base h-auto"
              >
                <span>Start Creating</span>
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/40 text-foreground hover:bg-primary/5 font-semibold px-10 py-6 rounded-xl transition-all hover:text-foreground duration-300 text-base h-auto"
              >
                View All Features
              </Button>
            </div>

            {/* Trust text */}
            <p className="text-xs sm:text-sm text-foreground/60">
              ✓ Used by 50,000+ professionals | ✓ 4.9/5 average rating | ✓ 100%
              secure
            </p>
          </div>

          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-transparent via-blue-600 to-transparent" />

          {/* Corner accents */}
          <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br from-blue-600/20 to-transparent blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-linear-to-br from-purple-600/20 to-transparent blur-2xl" />
        </div>
      </div>
    </section>
  );
}
