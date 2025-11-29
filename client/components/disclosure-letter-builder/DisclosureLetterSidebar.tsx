"use client";

import { CircularProgress } from "@/components/ui/circular-progress";
import { useDisclosureLetterContext } from "@/context/DisclosureLetterContext";
import { cn } from "@/lib/utils";
import { Check, Eye, Lock, X } from "lucide-react";
import { useState } from "react";
import {
  disclosureLetterTemplates,
  getDisclosureLetterTemplateComponent,
  defaultDisclosureLetterStyles,
} from "./templates";

interface Step {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}

interface DisclosureLetterSidebarProps {
  steps: Step[];
  currentStep: string;
  onStepChange: (stepId: string) => void;
  completedSteps: Set<string>;
  isStepAccessible: (stepId: string) => boolean;
  totalSteps?: number;
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function DisclosureLetterSidebar({
  steps,
  currentStep,
  onStepChange,
  completedSteps,
  isStepAccessible,
  totalSteps = 7,
  selectedTemplate,
  onTemplateChange,
}: DisclosureLetterSidebarProps) {
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [modalSelectedTemplate, setModalSelectedTemplate] = useState(selectedTemplate);
  const progressPercent = Math.round((completedSteps.size / totalSteps) * 100);

  const { disclosureLetterData } = useDisclosureLetterContext();

  // Get disclosure type label
  const getDisclosureTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      criminal: "Criminal History",
      financial: "Financial Matter",
      medical: "Medical/Health",
      employment: "Employment History",
      other: "Other",
    };
    return labels[type] || "Disclosure";
  };

  // Handle template selection in modal
  const handleTemplateSelect = (templateId: string) => {
    setModalSelectedTemplate(templateId);
    onTemplateChange(templateId);
  };

  // Render template preview
  const renderTemplatePreview = (templateId: string = selectedTemplate) => {
    const TemplateComponent = getDisclosureLetterTemplateComponent(templateId);
    const styles = {
      ...defaultDisclosureLetterStyles,
      accentColor: "#1e40af",
    };

    return <TemplateComponent data={disclosureLetterData} styles={styles} />;
  };

  return (
    <>
      <aside className="hidden lg:flex w-64 bg-white dark:bg-card border-r border-border flex-col h-full z-10 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
        {/* Navigation Steps */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = completedSteps.has(step.id);
              const isAccessible = isStepAccessible(step.id);
              const isDisabled = !isAccessible;

              return (
                <li key={step.id}>
                  <button
                    onClick={() => isAccessible && onStepChange(step.id)}
                    disabled={isDisabled}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-blue-50 text-primary dark:bg-primary/10 cursor-pointer"
                        : isDisabled
                        ? "text-slate-400 dark:text-muted-foreground/50 cursor-not-allowed opacity-60"
                        : "text-slate-600 dark:text-muted-foreground hover:bg-slate-50 dark:hover:bg-accent/10 hover:text-slate-900 dark:hover:text-foreground cursor-pointer"
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
                          : "bg-white border-slate-200 text-slate-400 dark:bg-card dark:border-border group-hover:border-slate-300"
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

        {/* Mini Preview Section */}
        <div className="rounded-md border bg-gray-50 mx-4">
          {/* Progress Display */}
          <div className="flex items-center justify-center gap-3 py-3">
            <CircularProgress
              value={progressPercent}
              size={36}
              strokeWidth={3}
            />
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Progress: {progressPercent}%
            </span>
          </div>

          <div className="relative group">
            {/* Preview Button Overlay */}
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center py-4 bg-gradient-to-t from-white via-white/95 to-transparent dark:from-slate-800 dark:via-slate-800/95 cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center gap-2 bg-white dark:bg-card px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-border group-hover:bg-primary group-hover:border-primary transition-all duration-200">
                <Eye className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                <span className="text-sm font-medium text-primary group-hover:text-white transition-colors">
                  Preview
                </span>
              </div>
            </button>

            {/* Mini Preview Container */}
            <div className="border-border overflow-hidden rounded-b-md transition-all duration-200 group-hover:shadow-lg group-hover:ring-primary/30">
              <div
                className="overflow-hidden transition-transform duration-200 group-hover:scale-[1.02]"
                style={{
                  width: "230px",
                  height: "160px",
                }}
              >
                <div
                  className="origin-top-left"
                  style={{
                    transform: "scale(0.37)",
                    width: "600px",
                    transformOrigin: "top left",
                  }}
                >
                  <div className="pointer-events-none">{renderTemplatePreview()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Preview Modal - Split View with Template Selection */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsPreviewModalOpen(false)}
          />

          {/* Modal Content - Split View */}
          <div className="relative z-10 bg-white dark:bg-card rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border shrink-0">
              <h3 className="text-lg font-semibold text-foreground">
                Disclosure Letter Preview & Templates
              </h3>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-accent rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Split Content */}
            <div className="flex flex-1 overflow-hidden">
              {/* Left Side - Template Options (2 per row grid) */}
              <div className="w-80 border-r border-border bg-slate-50 dark:bg-slate-900/50 overflow-y-auto shrink-0 p-4">
                <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Choose Template
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {disclosureLetterTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template.id)}
                      className={cn(
                        "text-left rounded-lg border-2 transition-all duration-200 overflow-hidden",
                        modalSelectedTemplate === template.id
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-slate-300 dark:hover:border-slate-600"
                      )}
                    >
                      {/* Template Mini Preview - A4 ratio container */}
                      <div
                        className="bg-white dark:bg-slate-800 overflow-hidden relative"
                        style={{
                          width: "100%",
                          aspectRatio: "1 / 1.414",
                        }}
                      >
                        <div
                          className="absolute inset-0"
                          style={{
                            transform: "scale(0.22)",
                            width: "600px",
                            height: "848px",
                            transformOrigin: "top left",
                          }}
                        >
                          <div className="pointer-events-none">
                            {renderTemplatePreview(template.id)}
                          </div>
                        </div>
                        {/* Selected Indicator */}
                        {modalSelectedTemplate === template.id && (
                          <div className="absolute top-1 right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </div>
                      {/* Template Info */}
                      <div className="p-1.5 bg-white dark:bg-slate-800 border-t border-border">
                        <p className="text-[10px] font-medium text-slate-800 dark:text-slate-200 truncate text-center">
                          {template.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Side - Full Preview */}
              <div className="flex-1 overflow-auto p-6 bg-slate-100 dark:bg-slate-900">
                {/* Type Badge */}
                <div className="text-center mb-4">
                  <span className="inline-block px-4 py-1.5 bg-white dark:bg-card rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 shadow-sm border border-border">
                    {getDisclosureTypeLabel(disclosureLetterData.disclosureType)}{" "}
                    Letter
                  </span>
                </div>
                <div
                  className="mx-auto bg-white shadow-lg"
                  style={{ width: "595px", minHeight: "842px" }}
                >
                  {renderTemplatePreview(modalSelectedTemplate)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
