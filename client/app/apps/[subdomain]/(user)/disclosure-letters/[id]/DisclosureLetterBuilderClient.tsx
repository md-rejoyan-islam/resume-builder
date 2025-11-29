"use client";

import { DisclosureLetterNavigation } from "@/components/disclosure-letter-builder/DisclosureLetterNavigation";
import { DisclosureLetterSidebar } from "@/components/disclosure-letter-builder/DisclosureLetterSidebar";
import { DisclosureLetterStepHeader } from "@/components/disclosure-letter-builder/DisclosureLetterStepHeader";
import { DisclosureLetterStepRenderer } from "@/components/disclosure-letter-builder/DisclosureLetterStepRenderer";
import { DisclosureLetterTipsPanel } from "@/components/disclosure-letter-builder/DisclosureLetterTipsPanel";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  DisclosureLetterProvider,
  DisclosureLetterSectionId,
  useDisclosureLetterContext,
} from "@/context/DisclosureLetterContext";
import { disclosureLetterStepsConfig } from "@/lib/disclosure-letter-steps";
import {
  useGetDisclosureLetterQuery,
  useUpdateDisclosureLetterMutation,
} from "@/lib/features/disclosure-letter/disclosure-letter-slice";
import { cn } from "@/lib/utils";
import { Lock, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface DisclosureLetterBuilderClientProps {
  disclosureLetterId: string;
}

// Inner component that uses context
function DisclosureLetterBuilderContent({
  disclosureLetterId,
}: {
  disclosureLetterId: string;
}) {
  const {
    disclosureLetterData,
    setDisclosureLetterData,
    setOriginalData,
    isSectionComplete,
    progress,
    hasUnsavedChanges,
    setTouchedFields,
  } = useDisclosureLetterContext();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial step from URL or default to "personal"
  const initialStepFromUrl = searchParams.get("step");
  const validInitialStep =
    initialStepFromUrl &&
    disclosureLetterStepsConfig.some((s) => s.id === initialStepFromUrl)
      ? initialStepFromUrl
      : "personal";

  const [currentStep, setCurrentStep] = useState(validInitialStep);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");

  // Update URL when step changes
  useEffect(() => {
    const stepInUrl = searchParams.get("step");
    if (stepInUrl !== currentStep) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("step", currentStep);
      router.replace(`?${currentParams.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Fetch disclosure letter data
  const {
    data: disclosureLetterResponse,
    isLoading,
    isError,
  } = useGetDisclosureLetterQuery(disclosureLetterId);

  const [updateDisclosureLetter] = useUpdateDisclosureLetterMutation();

  // Load data into context when fetched
  useEffect(() => {
    if (disclosureLetterResponse?.data) {
      const data = disclosureLetterResponse.data;
      const loadedData = {
        title: data.title || "Untitled Disclosure Letter",
        status: (data.status || "draft") as "draft" | "completed",
        disclosureType: (data.disclosureType || "other") as
          | "criminal"
          | "financial"
          | "medical"
          | "employment"
          | "other",
        personalInfo: {
          fullName: data.personalInfo?.fullName || "",
          jobTitle: data.personalInfo?.jobTitle || "",
          email: data.personalInfo?.email || "",
          phone: data.personalInfo?.phone || "",
          location: data.personalInfo?.location || "",
        },
        disclosureContent: {
          date:
            data.disclosureContent?.date ||
            new Date().toISOString().split("T")[0],
          recipientName: data.disclosureContent?.recipientName || "",
          recipientTitle: data.disclosureContent?.recipientTitle || "",
          company: data.disclosureContent?.company || "",
          address: data.disclosureContent?.address || "",
          subject: data.disclosureContent?.subject || "",
          salutation: data.disclosureContent?.salutation || "Dear",
          introductionParagraph:
            data.disclosureContent?.introductionParagraph || "",
          disclosureDetails: data.disclosureContent?.disclosureDetails || "",
          relevantCircumstances:
            data.disclosureContent?.relevantCircumstances || "",
          mitigatingFactors: data.disclosureContent?.mitigatingFactors || "",
          supportingDocuments:
            data.disclosureContent?.supportingDocuments || "",
          closingStatement: data.disclosureContent?.closingStatement || "",
          closing: data.disclosureContent?.closing || "Sincerely",
        },
      };
      setDisclosureLetterData(loadedData);
      // Set original data for change detection
      setOriginalData(loadedData);
    }
  }, [disclosureLetterResponse, setDisclosureLetterData, setOriginalData]);

  // Compute completed steps
  const completedSteps = useMemo(() => {
    const steps = new Set<string>();
    disclosureLetterStepsConfig.forEach((step) => {
      if (isSectionComplete(step.id as DisclosureLetterSectionId)) {
        steps.add(step.id);
      }
    });
    return steps;
  }, [isSectionComplete]);

  // Get current step index
  const currentStepIndex = useMemo(
    () => disclosureLetterStepsConfig.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  // All steps are accessible
  const isStepAccessible = useCallback(() => true, []);

  // Handle step change
  const handleStepChange = useCallback((stepId: string) => {
    setCurrentStep(stepId);
  }, []);

  // Handle Save & Continue
  const handleSaveAndContinue = useCallback(async () => {
    setIsSaving(true);
    try {
      await updateDisclosureLetter({
        id: disclosureLetterId,
        data: {
          title: disclosureLetterData.title,
          status: disclosureLetterData.status,
          disclosureType: disclosureLetterData.disclosureType,
          personalInfo: disclosureLetterData.personalInfo,
          disclosureContent: disclosureLetterData.disclosureContent,
        },
      }).unwrap();

      setTouchedFields(new Set());
      // Update original data to current data after successful save
      setOriginalData(disclosureLetterData);

      // Move to next step
      if (currentStepIndex < disclosureLetterStepsConfig.length - 1) {
        setCurrentStep(disclosureLetterStepsConfig[currentStepIndex + 1].id);
      }

      toast.success("Disclosure letter saved");
    } catch (error) {
      console.error("Failed to save:", error);
      toast.error("Failed to save disclosure letter");
    } finally {
      setIsSaving(false);
    }
  }, [
    disclosureLetterId,
    disclosureLetterData,
    currentStepIndex,
    setTouchedFields,
    setOriginalData,
    updateDisclosureLetter,
  ]);

  // Handle Back
  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(disclosureLetterStepsConfig[currentStepIndex - 1].id);
    }
  }, [currentStepIndex]);

  // Handle Next (no save, just move to next step)
  const handleNext = useCallback(() => {
    if (currentStepIndex < disclosureLetterStepsConfig.length - 1) {
      setCurrentStep(disclosureLetterStepsConfig[currentStepIndex + 1].id);
    }
  }, [currentStepIndex]);

  const currentStepConfig =
    disclosureLetterStepsConfig.find((s) => s.id === currentStep) ||
    disclosureLetterStepsConfig[0];

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="w-[30vw] text-primary" size={80} />
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fa] dark:bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive font-medium">
            Failed to load disclosure letter
          </p>
          <p className="text-muted-foreground text-sm">
            The disclosure letter may not exist or you don&apos;t have
            permission to view it.
          </p>
          <Link href="/disclosure-letters">
            <Button variant="outline">Back to Disclosure Letters</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#f8f9fa] dark:bg-background font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-card border-b border-border p-4 flex items-center justify-between z-20 shrink-0">
        <Link
          href="/disclosure-letters"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <CircularProgress value={progress} size={32} strokeWidth={3} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-card border-r border-border shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {disclosureLetterStepsConfig.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = isSectionComplete(
                    step.id as DisclosureLetterSectionId
                  );
                  const isAccessible = isStepAccessible();
                  const isDisabled = !isAccessible;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => {
                          if (isAccessible) {
                            handleStepChange(step.id);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        disabled={isDisabled}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-primary dark:bg-primary/10"
                            : isDisabled
                            ? "text-slate-400 dark:text-muted-foreground/50 cursor-not-allowed opacity-60"
                            : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-accent/10"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                            isActive
                              ? "bg-primary text-white border-primary"
                              : isCompleted
                              ? "bg-green-500 text-white border-green-500"
                              : isDisabled
                              ? "bg-slate-100 border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                              : "bg-white border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                          )}
                        >
                          {isDisabled ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        {step.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <DisclosureLetterSidebar
        steps={disclosureLetterStepsConfig}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        completedSteps={completedSteps}
        isStepAccessible={isStepAccessible}
        totalSteps={disclosureLetterStepsConfig.length}
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative bg-[#f8f9fa] dark:bg-background">
        {currentStep === "finalize" ? (
          /* Finalize Step - Full Width */
          <div className="flex-1 overflow-y-auto px-4 lg:px-6">
            <div className="">
              <DisclosureLetterStepRenderer
                stepId={currentStep}
                selectedTemplate={selectedTemplate}
                onTemplateChange={setSelectedTemplate}
              />
            </div>
          </div>
        ) : (
          /* Regular Steps Layout */
          <div className="flex-1 overflow-y-auto p-4 lg:p-12 pb-32 scroll-smooth">
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
              {/* Form Section */}
              <div className="flex-1 lg:flex-2 space-y-8">
                <DisclosureLetterStepHeader
                  title={currentStepConfig.title}
                  description={currentStepConfig.description}
                />

                <div className="bg-white dark:bg-card rounded-xl border border-border p-6">
                  <DisclosureLetterStepRenderer stepId={currentStep} />
                </div>

                <DisclosureLetterNavigation
                  onBack={handleBack}
                  onSave={handleSaveAndContinue}
                  onNext={handleNext}
                  isSaving={isSaving}
                  isFirstStep={currentStepIndex === 0}
                  isLastStep={
                    currentStepIndex === disclosureLetterStepsConfig.length - 1
                  }
                  hasChanges={hasUnsavedChanges}
                />
              </div>

              {/* Right Sidebar - Tips & Progress - Sticky */}
              <div className="lg:w-80 lg:shrink-0 sticky top-4 space-y-4 h-fit">
                {/* Progress Card */}
                <div className="bg-white dark:bg-card border border-border rounded-xl px-5 py-3">
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-slate-600 dark:text-muted-foreground">
                          Progress
                        </span>
                        <span className="text-xs font-semibold text-primary">
                          {progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-accent/30 px-3 py-1.5 rounded-full">
                        <CircularProgress
                          value={progress}
                          size={28}
                          strokeWidth={3}
                        />
                        <div className="hidden sm:block">
                          <span className="text-[10px] text-muted-foreground block leading-tight">
                            Completion
                          </span>
                          <span className="text-xs font-semibold text-primary leading-tight">
                            {progress >= 80
                              ? "Excellent"
                              : progress >= 60
                              ? "Good"
                              : progress >= 40
                              ? "Fair"
                              : "Getting Started"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Panel */}
                <DisclosureLetterTipsPanel
                  title={`${currentStepConfig.label} Tips`}
                  tips={currentStepConfig.tips}
                  didYouKnow={currentStepConfig.didYouKnow}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Main component with provider
export default function DisclosureLetterBuilderClient({
  disclosureLetterId,
}: DisclosureLetterBuilderClientProps) {
  return (
    <DisclosureLetterProvider>
      <DisclosureLetterBuilderContent disclosureLetterId={disclosureLetterId} />
    </DisclosureLetterProvider>
  );
}
