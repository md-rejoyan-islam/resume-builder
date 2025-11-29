import FilterTemplatesTabs from "@/components/(with-header)/templates/filter-templates-tabs";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Templates - Choose Your Resume Style",
  description:
    "Explore a variety of professional resume templates to find the perfect style that suits your career needs. Customize and create your resume effortlessly with our easy-to-use builder.",
};

const Page = () => {
  return (
    <>
      <div className="relative min-h-screen overflow-hidden">
        <main className="relative z-10 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-primary/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2" />
          <div className="max-w-7xl mx-auto">
            {/* Premium Header */}
            <div className="text-center mb-16 sm:mb-20">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="h-4 w-4" />
                <span className="text-sm font-semibold">Template Library</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tight">
                Professional{" "}
                <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Templates
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-foreground/60 max-w-3xl mx-auto leading-relaxed font-medium">
                Choose from our expertly-designed templates for all your
                professional documents. Each template is crafted for maximum
                impact.
              </p>
            </div>

            <FilterTemplatesTabs />
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
