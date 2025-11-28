"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCoverLetterContext, PersonalInfo, LetterContent } from "@/context/CoverLetterContext";
import {
  coverLetterStepsConfig,
  FieldConfig,
} from "@/lib/cover-letter-steps";
import { cn } from "@/lib/utils";
import { CoverLetterFinalizeStep } from "./CoverLetterFinalizeStep";

interface CoverLetterStepRendererProps {
  stepId: string;
  selectedTemplate?: string;
  onTemplateChange?: (template: string) => void;
}

export function CoverLetterStepRenderer({
  stepId,
  selectedTemplate,
  onTemplateChange,
}: CoverLetterStepRendererProps) {
  const {
    formData,
    updatePersonalInfo,
    updateLetterContent,
    touchedFields,
    markFieldTouched,
  } = useCoverLetterContext();

  const stepConfig = coverLetterStepsConfig.find((s) => s.id === stepId);

  if (!stepConfig) return null;

  // Handle finalize step
  if (stepConfig.component === "finalize") {
    return (
      <CoverLetterFinalizeStep
        selectedTemplate={selectedTemplate || "classic"}
        onTemplateChange={onTemplateChange || (() => {})}
      />
    );
  }

  const handleFieldChange = (field: FieldConfig, value: string) => {
    // Determine if this field belongs to personalInfo or letterContent
    const personalInfoFields = [
      "fullName",
      "jobTitle",
      "email",
      "phone",
      "location",
    ];
    const letterContentFields = [
      "date",
      "recipientName",
      "recipientTitle",
      "company",
      "address",
      "salutation",
      "greeting",
      "bodyParagraph1",
      "bodyParagraph2",
      "bodyParagraph3",
      "closingParagraph",
      "closing",
    ];

    if (personalInfoFields.includes(field.name)) {
      updatePersonalInfo(field.name as keyof PersonalInfo, value);
    } else if (letterContentFields.includes(field.name)) {
      updateLetterContent(field.name as keyof LetterContent, value);
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name] || "";
    const isTouched = touchedFields.has(field.name);
    const isRequired = field.required;
    const hasError = isTouched && isRequired && !value;

    return (
      <div
        key={field.name}
        className={cn(
          field.width === "half" ? "col-span-1" : "col-span-2",
          "space-y-2"
        )}
      >
        <Label
          htmlFor={field.name}
          className={cn(
            "text-sm font-medium",
            hasError && "text-destructive"
          )}
        >
          {field.label}
          {isRequired && <span className="text-destructive ml-1">*</span>}
        </Label>

        {field.type === "select" ? (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field, val)}
          >
            <SelectTrigger
              className={cn(
                "w-full",
                hasError && "border-destructive focus:ring-destructive"
              )}
            >
              <SelectValue placeholder={field.placeholder || "Select..."} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === "richtext" ? (
          <TextEditor
            value={value}
            onChange={(val) => {
              handleFieldChange(field, val);
              markFieldTouched(field.name);
            }}
          />
        ) : field.type === "textarea" ? (
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => markFieldTouched(field.name)}
            placeholder={field.placeholder}
            rows={field.rows || 4}
            className={cn(
              "resize-none",
              hasError && "border-destructive focus:ring-destructive"
            )}
          />
        ) : (
          <Input
            id={field.name}
            type={field.type === "email" ? "email" : field.type === "date" ? "date" : "text"}
            value={value}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            onBlur={() => markFieldTouched(field.name)}
            placeholder={field.placeholder}
            className={cn(
              hasError && "border-destructive focus:ring-destructive"
            )}
          />
        )}

        {hasError && (
          <p className="text-xs text-destructive">This field is required</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {stepConfig.fields?.map(renderField)}
      </div>
    </div>
  );
}
