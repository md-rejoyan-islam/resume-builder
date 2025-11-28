"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FieldConfig } from "@/lib/resume-steps";
import { cn } from "@/lib/utils";
import { ChevronDown, Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { RefObject, useState } from "react";

interface DynamicFormProps {
  fields: FieldConfig[];
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
  // Photo specific props (optional, only needed if photo field is present)
  photoPreview?: string | null;
  handlePhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  // Dynamic options (e.g. countries)
  dynamicOptions?: Record<string, { label: string; value: string }[]>;
  // Validation - fields that have been touched and are invalid
  touchedFields?: Set<string>;
  // Optional fields for accordion
  optionalFields?: FieldConfig[];
  // Track which optional fields have been added
  addedOptionalFields?: Set<string>;
  onAddOptionalField?: (fieldName: string) => void;
  onRemoveOptionalField?: (fieldName: string) => void;
}

export function DynamicForm({
  fields,
  formData,
  handleInputChange,
  photoPreview,
  handlePhotoUpload,
  fileInputRef,
  dynamicOptions,
  touchedFields = new Set(),
  optionalFields = [],
  addedOptionalFields = new Set(),
  onAddOptionalField,
  onRemoveOptionalField,
}: DynamicFormProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Get available optional fields (not yet added)
  const availableOptionalFields = optionalFields.filter(
    (f) => !addedOptionalFields.has(f.name)
  );

  // Get added optional fields config
  const addedOptionalFieldConfigs = optionalFields.filter((f) =>
    addedOptionalFields.has(f.name)
  );

  // Render a single form field
  const renderField = (
    field: FieldConfig,
    showRemoveButton: boolean = false
  ) => {
    const colSpan =
      field.width === "full" ? "col-span-12" : "col-span-12 md:col-span-6";
    const fieldValue = formData[field.name];
    const isEmpty = !fieldValue || fieldValue.toString().trim() === "";
    const hasError = field.required && touchedFields.has(field.name) && isEmpty;

    if (field.type === "photo") {
      return (
        <div key={field.name} className="col-span-12">
          <div className="flex items-center gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border">
            <div
              onClick={() => fileInputRef?.current?.click()}
              className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 dark:hover:bg-primary/5 transition-all overflow-hidden group shrink-0"
            >
              {photoPreview ? (
                <Image
                  src={photoPreview}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <Upload className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                  <span className="text-[10px] font-medium text-slate-500 group-hover:text-primary">
                    Upload
                  </span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-foreground">
                {field.label}
              </h3>
              <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 max-w-[300px]">
                Add a professional photo to your resume. Supported formats: JPG,
                PNG.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div key={field.name} className={colSpan}>
        <label
          className={cn(
            "block text-xs font-bold mb-2 uppercase tracking-wide",
            hasError
              ? "text-red-500"
              : "text-slate-700 dark:text-muted-foreground"
          )}
        >
          {field.label}{" "}
          {field.required && <span className="text-red-500">*</span>}
        </label>

        <div className="relative">
          {field.type === "textarea" ? (
            <TextEditor
              value={formData[field.name] || ""}
              onChange={(value) => handleInputChange(field.name, value)}
            />
          ) : field.type === "select" ? (
            <Select
              value={formData[field.name] || ""}
              onValueChange={(val) => handleInputChange(field.name, val)}
            >
              <SelectTrigger
                className={cn(
                  "bg-white dark:bg-card transition-all w-full data-[size=default]:h-11",
                  hasError
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  showRemoveButton && "pr-12"
                )}
              >
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {(dynamicOptions?.[field.name] || field.options || []).map(
                  (opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          ) : (
            <div className="relative">
              {field.type === "phone" && (
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                  <div className="w-5 h-3 bg-green-600 rounded-sm" />
                </div>
              )}
              <Input
                type={
                  field.type === "date"
                    ? "date"
                    : field.type === "url"
                    ? "url"
                    : field.type === "email"
                    ? "email"
                    : "text"
                }
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className={cn(
                  "h-12 bg-white dark:bg-card transition-all",
                  hasError
                    ? "border-red-500 focus:ring-red-500/20 focus:border-red-500"
                    : "border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary",
                  field.type === "phone" && "pl-16",
                  showRemoveButton && "pr-12"
                )}
                placeholder={field.placeholder}
              />
            </div>
          )}

          {/* Remove button for optional fields */}
          {showRemoveButton && onRemoveOptionalField && (
            <button
              type="button"
              onClick={() => onRemoveOptionalField(field.name)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title={`Remove ${field.label}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {hasError && (
          <p className="text-red-500 text-xs mt-1">{field.label} is required</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Fields */}
      <div className="grid grid-cols-12 gap-6">
        {fields.map((field) => renderField(field, false))}
      </div>

      {/* Added Optional Fields */}
      {addedOptionalFieldConfigs.length > 0 && (
        <div className="grid grid-cols-12 gap-6">
          {addedOptionalFieldConfigs.map((field) => renderField(field, true))}
        </div>
      )}

      {/* Optional Fields Accordion */}
      {availableOptionalFields.length > 0 && (
        <div className="border border-slate-200 dark:border-border rounded-xl bg-card dark:bg-card overflow-hidden">
          {/* Accordion Header */}
          <button
            type="button"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-100 dark:hover:bg-accent/10 transition-colors"
          >
            <span className="text-sm font-medium text-slate-700 dark:text-muted-foreground flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add more details (Date of birth, Nationality, etc.)
            </span>
            <ChevronDown
              className={cn(
                "w-5 h-5 text-slate-500 dark:text-muted-foreground transition-transform duration-200",
                isAccordionOpen && "rotate-180"
              )}
            />
          </button>

          {/* Accordion Content */}
          {isAccordionOpen && (
            <div className="px-5 pb-5 pt-2 border-t border-slate-200 dark:border-border">
              <div className="flex flex-wrap gap-3">
                {availableOptionalFields.map((field) => (
                  <button
                    key={field.name}
                    type="button"
                    onClick={() => onAddOptionalField?.(field.name)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-muted-foreground bg-white dark:bg-card border border-slate-200 dark:border-border rounded-full hover:border-slate-400 hover:text-slate-800 dark:hover:border-slate-500 transition-all shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {field.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
