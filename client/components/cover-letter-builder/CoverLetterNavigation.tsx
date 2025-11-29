"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Save } from "lucide-react";

interface CoverLetterNavigationProps {
  onBack: () => void;
  onSave: () => void;
  onNext: () => void;
  isSaving: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  hasChanges: boolean;
}

export function CoverLetterNavigation({
  onBack,
  onSave,
  onNext,
  isSaving,
  isFirstStep,
  isLastStep,
  hasChanges,
}: CoverLetterNavigationProps) {
  // Only call onSave if there are changes, otherwise just go to next step
  const handleClick = () => {
    if (hasChanges) {
      onSave();
    } else {
      onNext();
    }
  };

  return (
    <div className="flex items-center justify-between pt-6 border-t border-border mt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep || isSaving}
        className="h-11 lg:h-12 px-6 lg:px-8 rounded-lg border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      <Button
        onClick={handleClick}
        disabled={isSaving}
        className="h-11 lg:h-12 px-6 lg:px-8 rounded-lg font-semibold transition-all bg-primary hover:bg-primary/80 text-white shadow-lg shadow-primary/20 hover:shadow-primary/30"
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
            Next
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
