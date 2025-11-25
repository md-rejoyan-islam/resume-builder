"use client";

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FieldConfig } from "@/lib/resume-steps";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";

interface DynamicFormProps {
  fields: FieldConfig[];
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  // Photo specific props (optional, only needed if photo field is present)
  photoPreview?: string | null;
  handlePhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  // Dynamic options (e.g. countries)
  dynamicOptions?: Record<string, { label: string; value: string }[]>;
}

export function DynamicForm({
  fields,
  formData,
  handleInputChange,
  photoPreview,
  handlePhotoUpload,
  fileInputRef,
  dynamicOptions,
}: DynamicFormProps) {
  return (
    <div className="grid grid-cols-12 gap-6">
      {fields.map((field) => {
        const colSpan = field.width === "full" ? "col-span-12" : "col-span-12 md:col-span-6";
        
        if (field.type === "photo") {
          return (
            <div key={field.name} className="col-span-12">
              <div className="flex items-center gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border">
                <div
                  onClick={() => fileInputRef?.current?.click()}
                  className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 dark:border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-blue-50 dark:hover:bg-primary/5 transition-all overflow-hidden group shrink-0"
                >
                  {photoPreview ? (
                    <Image src={photoPreview} alt="Profile" fill className="object-cover" />
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
                    Add a professional photo to your resume. Supported formats: JPG, PNG.
                  </p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div key={field.name} className={colSpan}>
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              {field.label} {field.required && <span className="text-red-500">*</span>}
            </label>
            
            {field.type === "textarea" ? (
              <Textarea
                value={formData[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                className="min-h-[120px] bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder={field.placeholder}
              />
            ) : field.type === "select" ? (
              <Select
                value={formData[field.name] || ""}
                onValueChange={(val) => handleInputChange(field.name, val)}
              >
                <SelectTrigger className="bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-full data-[size=default]:h-11">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {(dynamicOptions?.[field.name] || field.options || []).map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
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
                  type={field.type === "date" ? "date" : "text"}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  className={cn(
                    "h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                    field.type === "phone" && "pl-16"
                  )}
                  placeholder={field.placeholder}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
