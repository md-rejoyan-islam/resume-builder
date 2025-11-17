import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20 bg-gradient-to-r from-blue-600 to-purple-600 ">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Build Your Perfect Resume?
        </h2>
        <p className="text-lg text-blue-50 mb-8 leading-relaxed">
          Start creating professional career documents today and land your dream
          job. Join thousands of satisfied professionals already using
          ResumeBuilder.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
          >
            Get Started Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 bg-transparent"
          >
            View Pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
