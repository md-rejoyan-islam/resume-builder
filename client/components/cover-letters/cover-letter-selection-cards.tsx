"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateCoverLetterMutation } from "@/lib/features/cover-letter/cover-letter-slice";
import { emptyCoverLetterData } from "@/lib/features/cover-letter/cover-letter-format";
import {
  ChevronRight,
  FileText,
  Loader2,
  Sparkles,
  Upload,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { CoverLetterPdfUploadDialog } from "./pdf-upload-dialog";

export function CoverLetterSelectionCards() {
  const router = useRouter();
  const [createCoverLetter, { isLoading: isCreating }] =
    useCreateCoverLetterMutation();
  const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);

  const handleBuildFromScratch = async () => {
    try {
      // Create a new cover letter with empty data in the backend
      const result = await createCoverLetter({
        title: "Untitled Cover Letter",
        status: "draft",
        personalInfo: emptyCoverLetterData.personalInfo,
        letterContent: emptyCoverLetterData.letterContent,
      }).unwrap();

      // Navigate to the cover letter builder with the MongoDB ID
      router.push(`/cover-letters/${result.data._id}/new`);
    } catch (error) {
      console.error("Failed to create cover letter:", error);
    }
  };

  const handleFromExisting = useCallback(() => {
    setIsPdfDialogOpen(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* From Scratch Card */}
      <div className="group" onClick={handleBuildFromScratch}>
        <Card className="relative h-full p-6 sm:p-8 bg-card/40 dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-2xl hover:border-accent/50 hover:shadow-xl shadow-none hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <CardContent className="relative space-y-5 p-0">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="p-2 rounded-full bg-muted group-hover:bg-primary transition-all">
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                Build From Scratch
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Create a fully customized cover letter with complete control
                over every detail.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Full Customization
              </span>
            </div>

            <Button
              className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-xl shadow-none transition-all rounded-xl font-medium"
              disabled={isCreating}
            >
              {isCreating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </CardContent>

          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        </Card>
      </div>

      {/* From Existing Card */}
      <div className="group" onClick={handleFromExisting}>
        <Card className="relative h-full p-6 sm:p-8 bg-card/40 dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-2xl hover:border-accent/50 hover:shadow-xl shadow-none hover:shadow-accent/10 transition-all duration-300 cursor-pointer overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

          <CardContent className="relative space-y-5 p-0">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-primary rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="p-2 rounded-full bg-muted group-hover:bg-primary transition-all">
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                From Existing
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Upload your existing PDF cover letter to import your
                information automatically.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-primary/10 rounded-lg">
                <Upload className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Quick Import
              </span>
            </div>

            <Button className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground hover:shadow-xl shadow-none transition-all rounded-xl font-medium">
              Upload PDF
              <Upload className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>

          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl"></div>
        </Card>
      </div>

      {/* PDF Upload Dialog */}
      <CoverLetterPdfUploadDialog
        open={isPdfDialogOpen}
        onOpenChange={setIsPdfDialogOpen}
      />

      {/* AI Powered Card - Coming Soon */}
      <div className="group relative">
        <Card className="relative h-full p-6 sm:p-8 bg-card/40 border-2 border-dashed dark:border-accent/10 border-accent/30 hover:dark:border-accent/20 rounded-2xl shadow-none overflow-hidden">
          <div className="absolute top-6 right-6 px-3 py-1 bg-primary text-accent-foreground text-xs font-bold rounded-full">
            SOON
          </div>

          <CardContent className="relative space-y-5 opacity-60 p-0">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-muted rounded-xl shadow-lg">
                <Sparkles className="w-6 h-6 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                AI Powered
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Generate a professional cover letter instantly using AI based
                on job description.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-muted rounded-lg">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
              </div>
              <span className="text-sm font-medium text-foreground">
                AI Generation
              </span>
            </div>

            <Button
              variant="outline"
              disabled
              className="w-full h-11 border-2 rounded-xl font-medium"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </CardContent>

          <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-muted/20 rounded-full blur-2xl"></div>
        </Card>
      </div>
    </div>
  );
}
