"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ResumeNavigationProps {
  onBack: () => void;
  onSave: () => void;
  isSaving: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isStepValid: boolean;
}

export function ResumeNavigation({
  onBack,
  onSave,
  isSaving,
  isFirstStep,
  isLastStep,
  isStepValid
}: ResumeNavigationProps) {
  return (
    <div className="w-full mx-auto flex items-center justify-between gap-4 pt-4 border-t border-border">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={isFirstStep}
        className={cn(
          "h-11 lg:h-12 px-6 lg:px-8 rounded-lg border-slate-300 hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors",
          isFirstStep && "opacity-50 cursor-not-allowed"
        )}
      >
        Back
      </Button>
      <Button
        onClick={onSave}
        disabled={isSaving || !isStepValid}
        className={cn(
          "h-11 lg:h-12 px-6 lg:px-8 rounded-lg bg-primary hover:bg-primary/80 text-white font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all",
          !isStepValid && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSaving ? "Saving..." : isLastStep ? "Finish" : "Save & Continue"}
      </Button>
    </div>
  );
}
