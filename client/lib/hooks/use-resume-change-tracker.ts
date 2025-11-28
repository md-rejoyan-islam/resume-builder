"use client";

import { useCallback, useRef, useMemo, useEffect } from "react";
import { ResumeFormatData } from "@/lib/resume-format";

// Step to data keys mapping
const STEP_DATA_KEYS: Record<string, (keyof ResumeFormatData)[]> = {
  contact: ["contact"],
  skills: ["skills"],
  experience: ["experiences"],
  education: ["educations"],
  certifications: ["certifications"],
  projects: ["projects"],
  references: ["references"],
  languages: ["languages"],
  volunteer: ["volunteers"],
  publications: ["publications"],
  finalize: ["sectionTitles"],
};

// Deep comparison helper
function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (a === null || b === null) return false;
  if (typeof a !== typeof b) return false;

  if (typeof a !== "object") return a === b;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => deepEqual(item, b[index]));
  }

  if (Array.isArray(a) || Array.isArray(b)) return false;

  const keysA = Object.keys(a as object);
  const keysB = Object.keys(b as object);

  if (keysA.length !== keysB.length) return false;

  return keysA.every((key) =>
    deepEqual(
      (a as Record<string, unknown>)[key],
      (b as Record<string, unknown>)[key]
    )
  );
}

// Extract step data from resume data
function extractStepData(
  resumeData: ResumeFormatData,
  stepId: string
): Record<string, unknown> {
  const keys = STEP_DATA_KEYS[stepId] || [];
  const extracted: Record<string, unknown> = {};

  keys.forEach((key) => {
    extracted[key] = resumeData[key];
  });

  return extracted;
}

// Deep clone helper
function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

interface TemplateStylesType {
  fontFamily: string;
  fontSize: Record<string, string>;
  sectionGap: number;
  paragraphGap: number;
  lineHeight: number;
  accentColor: string;
}

interface UseResumeChangeTrackerOptions {
  resumeData: ResumeFormatData;
  selectedTemplate: string;
  templateStyles: TemplateStylesType;
  currentStep: string;
}

interface UseResumeChangeTrackerReturn {
  // Check if current step has unsaved changes
  hasCurrentStepChanges: boolean;

  // Check if any step has changes
  hasAnyChanges: boolean;

  // Check if template settings changed
  hasTemplateChanges: boolean;

  // Mark current step as saved
  markCurrentStepAsSaved: () => void;

  // Mark all data as saved (call after successful API save)
  markAllAsSaved: () => void;

  // Reset saved state when loading data from backend
  initializeSavedState: () => void;

  // Get data that needs to be saved (returns null if no changes)
  getDataToSave: () => {
    resumeData: Partial<ResumeFormatData>;
    templateSettings: {
      templateId: string;
      fontFamily: string;
      fontSize: Record<string, string>;
      sectionGap: number;
      paragraphGap: number;
      lineHeight: number;
      accentColor: string;
    };
  } | null;

  // Should show "Save & Continue" or just "Next"
  shouldShowSave: boolean;
}

export function useResumeChangeTracker({
  resumeData,
  selectedTemplate,
  templateStyles,
  currentStep,
}: UseResumeChangeTrackerOptions): UseResumeChangeTrackerReturn {
  // Store the last saved state of each step
  const savedStepDataRef = useRef<Map<string, Record<string, unknown>>>(
    new Map()
  );

  // Store the last saved full resume data
  const savedResumeDataRef = useRef<ResumeFormatData | null>(null);

  // Store the last saved template
  const savedTemplateRef = useRef<string | null>(null);

  // Store the last saved template styles
  const savedTemplateStylesRef = useRef<TemplateStylesType | null>(null);

  // Initialize saved state - call this when data is first loaded from backend
  const initializeSavedState = useCallback((): void => {
    savedResumeDataRef.current = deepClone(resumeData);
    savedTemplateRef.current = selectedTemplate;
    savedTemplateStylesRef.current = deepClone(templateStyles);

    // Save each step's data
    savedStepDataRef.current.clear();
    Object.keys(STEP_DATA_KEYS).forEach((stepId) => {
      const currentData = extractStepData(resumeData, stepId);
      savedStepDataRef.current.set(stepId, deepClone(currentData));
    });
  }, [resumeData, selectedTemplate, templateStyles]);

  // Check if current step has changes
  const hasCurrentStepChanges = useMemo((): boolean => {
    const savedData = savedStepDataRef.current.get(currentStep);

    // If no saved data yet, no changes (data not initialized)
    if (savedData === undefined && savedResumeDataRef.current === null) {
      return false;
    }

    // If saved data exists, compare
    if (savedData) {
      const currentData = extractStepData(resumeData, currentStep);
      return !deepEqual(savedData, currentData);
    }

    return false;
  }, [resumeData, currentStep]);

  // Check if template changed
  const hasTemplateChanges = useMemo((): boolean => {
    if (savedTemplateRef.current === null) return false;
    if (savedTemplateRef.current !== selectedTemplate) return true;
    if (!deepEqual(savedTemplateStylesRef.current, templateStyles)) return true;
    return false;
  }, [selectedTemplate, templateStyles]);

  // Check if any data has changed
  const hasAnyChanges = useMemo((): boolean => {
    if (savedResumeDataRef.current === null) return false;

    // Check resume data
    if (!deepEqual(savedResumeDataRef.current, resumeData)) return true;

    // Check template changes
    return hasTemplateChanges;
  }, [resumeData, hasTemplateChanges]);

  // Mark current step as saved
  const markCurrentStepAsSaved = useCallback((): void => {
    const currentData = extractStepData(resumeData, currentStep);
    savedStepDataRef.current.set(currentStep, deepClone(currentData));
  }, [resumeData, currentStep]);

  // Mark all data as saved
  const markAllAsSaved = useCallback((): void => {
    savedResumeDataRef.current = deepClone(resumeData);
    savedTemplateRef.current = selectedTemplate;
    savedTemplateStylesRef.current = deepClone(templateStyles);

    // Save each step's data
    Object.keys(STEP_DATA_KEYS).forEach((stepId) => {
      const currentData = extractStepData(resumeData, stepId);
      savedStepDataRef.current.set(stepId, deepClone(currentData));
    });
  }, [resumeData, selectedTemplate, templateStyles]);

  // Get data to save (returns null if no changes)
  const getDataToSave = useCallback((): {
    resumeData: Partial<ResumeFormatData>;
    templateSettings: {
      templateId: string;
      fontFamily: string;
      fontSize: Record<string, string>;
      sectionGap: number;
      paragraphGap: number;
      lineHeight: number;
      accentColor: string;
    };
  } | null => {
    // If no changes at all, return null
    if (!hasCurrentStepChanges && !hasTemplateChanges) {
      return null;
    }

    return {
      resumeData: {
        contact: resumeData.contact,
        sectionTitles: resumeData.sectionTitles,
        skills: resumeData.skills,
        experiences: resumeData.experiences,
        educations: resumeData.educations,
        certifications: resumeData.certifications,
        projects: resumeData.projects,
        references: resumeData.references,
        languages: resumeData.languages,
        volunteers: resumeData.volunteers,
        publications: resumeData.publications,
      },
      templateSettings: {
        templateId: selectedTemplate,
        fontFamily: templateStyles.fontFamily,
        fontSize: templateStyles.fontSize,
        sectionGap: templateStyles.sectionGap,
        paragraphGap: templateStyles.paragraphGap,
        lineHeight: templateStyles.lineHeight,
        accentColor: templateStyles.accentColor,
      },
    };
  }, [
    resumeData,
    selectedTemplate,
    templateStyles,
    hasCurrentStepChanges,
    hasTemplateChanges,
  ]);

  // Should show save button (true) or just next (false)
  const shouldShowSave = useMemo((): boolean => {
    return hasCurrentStepChanges || hasTemplateChanges;
  }, [hasCurrentStepChanges, hasTemplateChanges]);

  return {
    hasCurrentStepChanges,
    hasAnyChanges,
    hasTemplateChanges,
    markCurrentStepAsSaved,
    markAllAsSaved,
    initializeSavedState,
    getDataToSave,
    shouldShowSave,
  };
}
