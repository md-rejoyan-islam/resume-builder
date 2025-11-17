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
    <section className="px-4 py-12 sm:px-6 lg:px-8 lg:py-20 bg-slate-50 dark:bg-slate-900/50 ">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-foreground/60">
            Create all your professional documents in 3 simple steps
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-purple-600">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                <h3 className="mb-3 text-xl font-bold">
                  {step.number}. {step.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
