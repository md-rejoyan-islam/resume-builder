"use client";

import {
  calculateProgress,
  ContactData,
  defaultResumeData,
  getAllSectionCompletions,
  isSectionCompleted,
  ResumeData,
  SectionId,
  Certification,
  Education,
  Experience,
  Language,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
} from "@/lib/resume-data";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// Template styles type
export interface TemplateStyles {
  fontFamily: string;
  fontSize: {
    name: string;
    sectionTitle: string;
    itemTitle: string;
    body: string;
    small: string;
  };
  sectionGap: number;
  paragraphGap: number;
  lineHeight: number;
  accentColor: string;
}

// Default template styles
export const defaultTemplateStyles: TemplateStyles = {
  fontFamily: "Roboto, sans-serif",
  fontSize: {
    name: "24px",
    sectionTitle: "14px",
    itemTitle: "13px",
    body: "12px",
    small: "10px",
  },
  sectionGap: 16,
  paragraphGap: 8,
  lineHeight: 1.5,
  accentColor: "#2563eb",
};

// Context value type
interface ResumeContextValue {
  // Resume data
  resumeData: ResumeData;

  // Form data as Record for legacy compatibility
  formData: Record<string, string>;

  // Individual section data
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  projects: Project[];
  references: Reference[];
  languages: Language[];
  volunteers: Volunteer[];
  publications: Publication[];

  // Update functions
  updateContact: (field: string, value: string) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  updateEducations: (educations: Education[]) => void;
  updateCertifications: (certifications: Certification[]) => void;
  updateProjects: (projects: Project[]) => void;
  updateReferences: (references: Reference[]) => void;
  updateLanguages: (languages: Language[]) => void;
  updateVolunteers: (volunteers: Volunteer[]) => void;
  updatePublications: (publications: Publication[]) => void;

  // Template settings
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
  templateStyles: TemplateStyles;
  setTemplateStyles: (styles: TemplateStyles) => void;

  // Completion tracking
  isSectionComplete: (sectionId: SectionId) => boolean;
  sectionCompletions: Record<SectionId, boolean>;
  progress: number;

  // Photo
  photoPreview: string | null;
  setPhotoPreview: (photo: string | null) => void;

  // Optional fields management
  addedOptionalFields: Set<string>;
  addOptionalField: (fieldName: string) => void;
  removeOptionalField: (fieldName: string) => void;

  // Touched fields for validation
  touchedFields: Set<string>;
  setTouchedFields: (fields: Set<string>) => void;
  markFieldTouched: (fieldName: string) => void;
}

// Create context
const ResumeContext = createContext<ResumeContextValue | undefined>(undefined);

// Provider props
interface ResumeProviderProps {
  children: ReactNode;
  initialData?: Partial<ResumeData>;
}

// Provider component
export function ResumeProvider({ children, initialData }: ResumeProviderProps) {
  // Initialize resume data with defaults and any initial data
  const [resumeData, setResumeData] = useState<ResumeData>(() => ({
    ...defaultResumeData,
    ...initialData,
  }));

  // Template state
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const [templateStyles, setTemplateStyles] =
    useState<TemplateStyles>(defaultTemplateStyles);

  // Photo state
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  // Optional fields state
  const [addedOptionalFields, setAddedOptionalFields] = useState<Set<string>>(
    new Set()
  );

  // Touched fields for validation
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Form data as Record (for legacy compatibility with existing components)
  const formData = useMemo(
    () => resumeData.contact as unknown as Record<string, string>,
    [resumeData.contact]
  );

  // Update contact field
  const updateContact = useCallback((field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      } as ContactData,
    }));
  }, []);

  // Update functions for each section
  const updateSkills = useCallback((skills: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  }, []);

  const updateExperiences = useCallback((experiences: Experience[]) => {
    setResumeData((prev) => ({ ...prev, experiences }));
  }, []);

  const updateEducations = useCallback((educations: Education[]) => {
    setResumeData((prev) => ({ ...prev, educations }));
  }, []);

  const updateCertifications = useCallback((certifications: Certification[]) => {
    setResumeData((prev) => ({ ...prev, certifications }));
  }, []);

  const updateProjects = useCallback((projects: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  }, []);

  const updateReferences = useCallback((references: Reference[]) => {
    setResumeData((prev) => ({ ...prev, references }));
  }, []);

  const updateLanguages = useCallback((languages: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  }, []);

  const updateVolunteers = useCallback((volunteers: Volunteer[]) => {
    setResumeData((prev) => ({ ...prev, volunteers }));
  }, []);

  const updatePublications = useCallback((publications: Publication[]) => {
    setResumeData((prev) => ({ ...prev, publications }));
  }, []);

  // Section completion helpers
  const isSectionComplete = useCallback(
    (sectionId: SectionId) => isSectionCompleted(sectionId, resumeData),
    [resumeData]
  );

  const sectionCompletions = useMemo(
    () => getAllSectionCompletions(resumeData),
    [resumeData]
  );

  const progress = useMemo(() => calculateProgress(resumeData), [resumeData]);

  // Optional fields management
  const addOptionalField = useCallback((fieldName: string) => {
    setAddedOptionalFields((prev) => new Set([...prev, fieldName]));
  }, []);

  const removeOptionalField = useCallback((fieldName: string) => {
    setAddedOptionalFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fieldName);
      return newSet;
    });
    // Clear the field data
    updateContact(fieldName, "");
  }, [updateContact]);

  // Mark field as touched
  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  }, []);

  // Context value
  const value = useMemo<ResumeContextValue>(
    () => ({
      // Resume data
      resumeData,
      formData,

      // Individual section data
      skills: resumeData.skills,
      experiences: resumeData.experiences,
      educations: resumeData.educations,
      certifications: resumeData.certifications,
      projects: resumeData.projects,
      references: resumeData.references,
      languages: resumeData.languages,
      volunteers: resumeData.volunteers,
      publications: resumeData.publications,

      // Update functions
      updateContact,
      updateSkills,
      updateExperiences,
      updateEducations,
      updateCertifications,
      updateProjects,
      updateReferences,
      updateLanguages,
      updateVolunteers,
      updatePublications,

      // Template settings
      selectedTemplate,
      setSelectedTemplate,
      templateStyles,
      setTemplateStyles,

      // Completion tracking
      isSectionComplete,
      sectionCompletions,
      progress,

      // Photo
      photoPreview,
      setPhotoPreview,

      // Optional fields
      addedOptionalFields,
      addOptionalField,
      removeOptionalField,

      // Touched fields
      touchedFields,
      setTouchedFields,
      markFieldTouched,
    }),
    [
      resumeData,
      formData,
      updateContact,
      updateSkills,
      updateExperiences,
      updateEducations,
      updateCertifications,
      updateProjects,
      updateReferences,
      updateLanguages,
      updateVolunteers,
      updatePublications,
      selectedTemplate,
      templateStyles,
      isSectionComplete,
      sectionCompletions,
      progress,
      photoPreview,
      addedOptionalFields,
      addOptionalField,
      removeOptionalField,
      touchedFields,
      markFieldTouched,
    ]
  );

  return (
    <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>
  );
}

// Hook to use resume context
export function useResumeContext() {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResumeContext must be used within a ResumeProvider");
  }
  return context;
}

// Export types for use in other components
export type { ResumeContextValue };
