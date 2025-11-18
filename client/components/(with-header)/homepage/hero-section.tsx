import { Button } from "@/components/ui/button";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 lg:py-20 max-w-7xl mx-auto">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 dark:bg-yellow-950 px-3 py-1 text-sm font-semibold text-yellow-700 dark:text-yellow-300 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-yellow-600 dark:bg-yellow-400" />
                🚀 AI-Powered Platform
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-foreground">Create Every Document</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Your Career Needs
                </span>
                <br />
                <span className="text-foreground">in Minutes</span>
              </h1>
              <p className="mt-6 text-lg text-foreground/60 leading-relaxed">
                Craft professional resumes, cover letters, disclosure letters,
                reference sheets, and more with our AI-powered platform and
                personal dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Choose Your Plan
              </Button>
              <Button size="lg" variant="outline">
                👀 Watch Demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-foreground/60">
              <span>✓ Unlimited Documents</span>
              <span>✓ Personal Dashboard</span>
              <span>✓ AI Assistance</span>
            </div>
          </div>

          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl transform -skew-y-3" />
            <div className="relative h-full bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-2xl overflow-hidden">
              <Image
                width={600}
                height={400}
                src="/resume-template-mockup.jpg"
                alt="DocBuilder Product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
