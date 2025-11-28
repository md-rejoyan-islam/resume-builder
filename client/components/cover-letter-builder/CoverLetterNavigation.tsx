"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";

interface CoverLetterNavigationProps {
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  hasChanges: boolean;
}

export function CoverLetterNavigation({
  onBack,
  onSave,
  isSaving,
  isFirstStep,
  isLastStep,
  hasChanges,
}: CoverLetterNavigationProps) {
  return (
    <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isSaving}
        className="gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Button
        onClick={onSave}
        disabled={isSaving}
        className="gap-2"
      >
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : hasChanges ? (
          <>
            <Save className="w-4 h-4" />
            Save & Continue
          </>
        ) : isLastStep ? (
          <>
            Finish
            <ArrowRight className="w-4 h-4" />
          </>
        ) : (
          <>
            Continue
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
