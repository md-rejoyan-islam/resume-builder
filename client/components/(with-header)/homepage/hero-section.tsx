import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sparkles, Zap } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-10 sm:px-6 lg:px-8 lg:py-16 ">
      {/* Premium background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 -left-40 h-96 w-96 bg-linear-to-br from-blue-500/20 via-blue-500/5 to-transparent rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-40 -right-40 h-80 w-80 bg-linear-to-tl from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/3 h-72 w-72 bg-linear-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl ">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md px-4 py-2 text-sm font-semibold text-primary mb-2 w-fit">
              <Sparkles className="h-4 w-4" />
              <span>Powered by Advanced AI</span>
              <Zap className="h-3.5 w-3.5" />
            </div>

            {/* Main Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 leading-tight">
                <span className="text-foreground">Create Professional </span>
                <br />
                <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                  Documents in Seconds
                </span>
              </h1>

              <p className="mt-4 text-base sm:text-lg text-foreground/70 leading-relaxed max-w-xl font-medium">
                Craft stunning resumes, cover letters, and disclosure documents
                with our intelligent AI platform. No design skills required—just
                results.
              </p>
            </div>

            {/* Premium CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                size="lg"
                className="h-13 px-8 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <span>Start Creating</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                className="h-13 px-8 border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary font-bold rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
              >
                <span>Watch Demo</span>
              </Button>
            </div>

            {/* Premium Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/40">
              {[
                { icon: "✨", label: "AI-Powered", desc: "Smart suggestions" },
                { icon: "🔒", label: "Secure", desc: "Bank-level security" },
                {
                  icon: "⚡",
                  label: "Lightning Fast",
                  desc: "Instant results",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-primary/15 hover:bg-card/50 hover:border-primary/30 transition-all duration-300"
                >
                  <span className="text-2xl mb-2 block group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </span>
                  <p className="font-semibold text-foreground">
                    {feature.label}
                  </p>
                  <p className="text-sm text-foreground/60 mt-1">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Premium Mockup */}
          <div className="relative h-96 lg:h-full min-h-96 group">
            {/* Background floating card effect */}
            <div className="absolute -bottom-8 -right-8 w-full h-full bg-linear-to-tl from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />

            {/* Accent line top */}
            <div className="absolute -top-1 left-0 right-0 h-1 bg-linear-to-r from-transparent via-primary to-transparent rounded-full" />

            {/* Main mockup container */}
            <div className="relative h-full bg-card/50 backdrop-blur-xl border border-border/40 rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-all duration-500">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-purple-500/5" />

              {/* Floating elements background */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 h-32 w-32 bg-linear-to-br from-blue-400/10 to-transparent rounded-full blur-2xl" />
                <div className="absolute bottom-1/4 right-1/4 h-32 w-32 bg-linear-to-tl from-purple-400/10 to-transparent rounded-full blur-2xl" />
              </div>

              {/* Image */}
              <Image
                width={600}
                height={500}
                src="/resume-template-mockup.jpg"
                alt="DocBuilder Product"
                className="relative z-10 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />

              {/* Trust badge on mockup */}
              <div className="absolute bottom-6 left-6 right-6 z-20 bg-black/50 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center gap-3 group-hover:bg-black/60 transition-all duration-300">
                <Shield className="h-5 w-5 text-green-400 shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">
                    Enterprise Security
                  </p>
                  <p className="text-white/70 text-xs">Bank-level encryption</p>
                </div>
              </div>
            </div>

            {/* Corner accent glows */}
            <div className="absolute -top-20 -right-20 h-40 w-40 bg-linear-to-br from-primary/20 to-transparent rounded-full blur-3xl group-hover:from-primary/30 transition-all duration-500" />
            <div className="absolute -bottom-20 -left-20 h-40 w-40 bg-linear-to-tr from-purple-500/20 to-transparent rounded-full blur-3xl group-hover:from-purple-500/30 transition-all duration-500" />
          </div>
        </div>
      </div>
    </section>
  );
}
