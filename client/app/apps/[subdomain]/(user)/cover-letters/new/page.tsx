import { CoverLetterSelectionCards } from "@/components/cover-letters/cover-letter-selection-cards";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New Cover Letter | Professional Cover Letter Builder",
  description:
    "Create professional cover letters from scratch, use existing templates, or generate with AI. Build your perfect cover letter in minutes.",
};

export default function CoverLetterCreatePage() {
  return (
    <div className="min-h-screen space-y-12 pb-12">
      {/* Clean Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Create Professional Cover Letters
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Choose Your Method
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
          Select how you&apos;d like to create your cover letter and get started
          in seconds
        </p>
      </div>

      {/* Cards Grid */}
      <CoverLetterSelectionCards />

      {/* Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 shadow-none">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <FileText className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Templates</h4>
              <p className="text-sm text-muted-foreground">Standard formats</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-xl hover:border-accent/50 hover:shadow-lg transition-all duration-300 shadow-none">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <Zap className="w-5 h-5 text-accent group-hover:text-accent-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Fast</h4>
              <p className="text-sm text-muted-foreground">Create in minutes</p>
            </div>
          </CardContent>
        </Card>

        <Card className="group p-5 sm:p-6 bg-card/40 dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300 shadow-none sm:col-span-2 lg:col-span-1">
          <CardContent className="flex items-start gap-4 p-0">
            <div className="p-2.5 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:scale-110 transition-all">
              <Sparkles className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
            </div>
            <div className="flex-1 space-y-1">
              <h4 className="font-semibold text-foreground">Professional</h4>
              <p className="text-sm text-muted-foreground">
                Stand out from others
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
