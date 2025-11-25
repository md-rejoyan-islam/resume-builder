"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";

interface AdditionalField {
  id: string;
  label: string;
}

interface ResumeContactFormProps {
  formData: any;
  handleInputChange: (field: string, value: string) => void;
  countries: { name: string; code: string }[];
  photoPreview: string | null;
  handlePhotoUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  activeAdditionalFields: string[];
  toggleAdditionalField: (fieldId: string) => void;
  additionalFieldsList: AdditionalField[];
}

export function ResumeContactForm({
  formData,
  handleInputChange,
  countries,
  photoPreview,
  handlePhotoUpload,
  fileInputRef,
  activeAdditionalFields,
  toggleAdditionalField,
  additionalFieldsList,
}: ResumeContactFormProps) {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-12 gap-6">
        {/* Photo Upload */}
        <div className="col-span-12">
          <div className="flex items-center gap-6 p-6 bg-white dark:bg-card rounded-xl border border-border">
            <div
              onClick={() => fileInputRef.current?.click()}
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
                Profile Photo
              </h3>
              <p className="text-sm text-slate-500 dark:text-muted-foreground mt-1 max-w-[300px]">
                Add a professional photo to your resume. Supported formats: JPG, PNG.
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="col-span-12 grid grid-cols-2 gap-6">
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              First Name
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. John"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Last Name
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. Doe"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Desired Job Title
            </label>
            <Input
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Email
            </label>
            <Input
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. john.doe@example.com"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Phone
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 border-r border-slate-200 pr-2 mr-2">
                <div className="w-5 h-3 bg-green-600 rounded-sm" />
              </div>
              <Input
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="h-12 pl-16 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="e.g. +1 234 567 890"
              />
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Country
            </label>
            <Select
              value={formData.country}
              onValueChange={(val) => handleInputChange("country", val)}
            >
              <SelectTrigger className=" bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all  w-full   data-[size=default]:h-11">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.length > 0 ? (
                  countries.map((country) => (
                    <SelectItem key={country.code} value={country.name}>
                      {country.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="loading" disabled>
                    Loading countries...
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              City
            </label>
            <Input
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. New York"
            />
          </div>

          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              State or Province
            </label>
            <Input
              value={formData.state}
              onChange={(e) => handleInputChange("state", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. NY"
            />
          </div>
          <div className="col-span-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
              Postal Code
            </label>
            <Input
              value={formData.postalCode}
              onChange={(e) => handleInputChange("postalCode", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="e.g. 10001"
            />
          </div>

          {/* Dynamic Additional Fields */}
          {activeAdditionalFields.map((fieldId) => {
            const field = additionalFieldsList.find((f) => f.id === fieldId);
            if (!field) return null;
            return (
              <div
                key={fieldId}
                className="col-span-2 relative group animate-in fade-in slide-in-from-top-2 duration-300"
              >
                <label className="block text-xs font-bold text-slate-700 dark:text-muted-foreground mb-2 uppercase tracking-wide">
                  {field.label}
                </label>
                <div className="relative">
                  <Input
                    value={formData[fieldId as keyof typeof formData]}
                    onChange={(e) => handleInputChange(fieldId, e.target.value)}
                    className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all   pr-10"
                  />
                  <button
                    onClick={() => toggleAdditionalField(fieldId)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Details Accordion */}
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="additional-details"
          className="border border-slate-200 dark:border-border rounded-xl overflow-hidden bg-white dark:bg-card"
        >
          <AccordionTrigger className="flex items-center justify-between px-6 py-4 hover:bg-slate-50 dark:hover:bg-accent/5 transition-colors hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-primary/10 flex items-center justify-center text-primary">
                <Plus className="w-4 h-4" />
              </div>
              <span className="text-sm font-semibold text-slate-700 dark:text-foreground">
                Add more details
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6 pt-2 bg-slate-50/50 dark:bg-accent/5">
            <p className="text-xs text-muted-foreground mb-4">
              Choose additional fields to add to your resume:
            </p>
            <div className="flex flex-wrap gap-3">
              {additionalFieldsList
                .filter((f) => !activeAdditionalFields.includes(f.id))
                .map((field) => (
                  <button
                    key={field.id}
                    onClick={() => toggleAdditionalField(field.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-card border border-slate-200 dark:border-border rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary hover:shadow-md transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {field.label}
                  </button>
                ))}
              {additionalFieldsList.filter(
                (f) => !activeAdditionalFields.includes(f.id)
              ).length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  All fields added
                </p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
