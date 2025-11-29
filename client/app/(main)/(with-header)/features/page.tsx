import CategoryFilterTabs from "@/components/(with-header)/features/category-filter-tabs";
import { Check, Sparkles } from "lucide-react";

export const metadata = {
  title: "Features - ResumeBuilder",
  description:
    "Discover the powerful features of ResumeBuilder that make professional document creation effortless and efficient.",
};

export default function FeaturesPage() {
  const comparisonData = [
    { feature: "All Document Types", rb: true, comp: false },
    { feature: "AI Content Suggestions", rb: true, comp: false },
    { feature: "ATS Optimization", rb: true, comp: true },
    { feature: "Unlimited Templates", rb: true, comp: false },
    { feature: "Custom Branding", rb: true, comp: false },
    { feature: "Analytics Dashboard", rb: true, comp: false },
    { feature: "Team Collaboration", rb: true, comp: false },
    { feature: "Bank-Level Encryption", rb: true, comp: false },
    { feature: "24/7 Support", rb: true, comp: false },
    { feature: "Mobile App", rb: true, comp: false },
    { feature: "Version History", rb: true, comp: true },
    { feature: "API Access", rb: true, comp: false },
  ];

  return (
    <div className="min-h-screen  overflow-hidden">
      <main className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="max-w-7xl mx-auto">
          {/* Premium Hero Section */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md px-4 py-2 text-sm font-semibold text-primary mb-6 w-fit mx-auto">
              <Sparkles className="h-4 w-4" />
              <span>Comprehensive Feature Set</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-foreground">Everything You Need for </span>
              <br />
              <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Professional Document Creation
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed font-medium">
              Powerful tools designed to elevate your professional documents.
              From AI-powered content to enterprise security, we&apos;ve got
              everything to make you stand out.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <CategoryFilterTabs />

          {/* Premium Features Grid */}

          {/* Premium Comparison Section */}
          <div className="mb-24">
            <div className="text-center mb-14">
              <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                How We Compare
              </h2>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
                See what makes DocBuilder the premier choice for professional
                document creation
              </p>
            </div>

            {/* Premium Table */}
            <div className="rounded-2xl border border-border/50 overflow-hidden bg-card/30 backdrop-blur-sm shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-blue-600/10 to-purple-600/10 border-b border-border/50">
                      <th className="text-left py-5 px-6 font-bold text-lg text-foreground">
                        Feature
                      </th>
                      <th className="text-center py-5 px-6 font-bold text-lg">
                        <div className="flex items-center justify-center gap-2">
                          <span>ResumeBuilder</span>
                        </div>
                      </th>
                      <th className="text-center py-5 px-6 font-bold text-lg text-foreground/60">
                        Competitors
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-border/30 hover:bg-primary/5 transition-colors"
                      >
                        <td className="py-5 px-6 font-medium text-foreground">
                          {row.feature}
                        </td>
                        <td className="text-center py-5 px-6">
                          {row.rb ? (
                            <div className="flex justify-center">
                              <div className="h-6 w-6 rounded-lg bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-foreground/40">—</span>
                          )}
                        </td>
                        <td className="text-center py-5 px-6">
                          {row.comp ? (
                            <div className="flex justify-center">
                              <div className="h-6 w-6 rounded-lg bg-foreground/10 flex items-center justify-center">
                                <Check className="h-4 w-4 text-foreground/40" />
                              </div>
                            </div>
                          ) : (
                            <span className="text-foreground/40">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
