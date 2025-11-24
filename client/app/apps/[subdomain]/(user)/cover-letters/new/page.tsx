"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

const NewCoverLetterPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Create New Cover Letter</h1>
        <p className="text-muted-foreground">
          Choose how you want to create your cover letter
        </p>
      </div>

      {/* Options */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* From Scratch */}
        <Link href="/cover-letters/new/from-scratch">
          <div className="p-6 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all cursor-pointer h-full group">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="text-lg font-semibold mb-2">From Scratch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Build a custom cover letter from the ground up with full control
              over content and formatting.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 group-hover:border-primary"
            >
              Get Started
            </Button>
          </div>
        </Link>

        {/* AI Generated (Future) */}
        <div className="p-6 border border-border rounded-lg opacity-50 cursor-not-allowed h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold mb-2">AI Generated</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Let our AI generate a professional cover letter based on job
            description.
          </p>
          <Button variant="outline" size="sm" disabled className="gap-2">
            Coming Soon
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewCoverLetterPage;
