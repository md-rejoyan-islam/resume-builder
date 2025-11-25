"use client";

import { DynamicForm } from "@/components/resume-builder/DynamicForm";
import { stepsConfig } from "@/lib/resume-steps";
import { RefObject } from "react";

interface StepRendererProps {
  stepId: string;
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  photoPreview?: string | null;
  handlePhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  countries: { name: string; code: string }[];
}

export function StepRenderer({
  stepId,
  formData,
  handleInputChange,
  photoPreview,
  handlePhotoUpload,
  fileInputRef,
  countries,
}: StepRendererProps) {
  const stepConfig = stepsConfig.find((s) => s.id === stepId);

  if (!stepConfig) {
    return <div>Step not found</div>;
  }

  if (stepConfig.component === "finalize") {
    return (
      <div className="text-center p-12">
        <h2 className="text-2xl font-bold mb-4">Resume Ready!</h2>
        <p>Your resume is ready to be downloaded.</p>
        {/* Add download/preview logic here */}
      </div>
    );
  }

  if (stepConfig.fields) {
    // Prepare dynamic options
    const dynamicOptions: Record<string, { label: string; value: string }[]> = {};
    
    // Inject countries if needed
    if (stepConfig.fields.some(f => f.name === "country")) {
      dynamicOptions["country"] = countries.map(c => ({ label: c.name, value: c.name }));
    }

    return (
      <DynamicForm
        fields={stepConfig.fields}
        formData={formData}
        handleInputChange={handleInputChange}
        photoPreview={photoPreview}
        handlePhotoUpload={handlePhotoUpload}
        fileInputRef={fileInputRef}
        dynamicOptions={dynamicOptions}
      />
    );
  }

  return <div>Content for {stepConfig.label}</div>;
}
