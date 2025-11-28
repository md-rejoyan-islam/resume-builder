"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

// =============================================================================
// Types
// =============================================================================

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
}

export interface LetterContent {
  date: string;
  recipientName: string;
  recipientTitle: string;
  company: string;
  address: string;
  salutation: string;
  greeting: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  bodyParagraph3: string;
  closingParagraph: string;
  closing: string;
}

export interface CoverLetterData {
  title: string;
  status: "draft" | "completed";
  personalInfo: PersonalInfo;
  letterContent: LetterContent;
}

export type CoverLetterSectionId =
  | "personal"
  | "recipient"
  | "greeting"
  | "content"
  | "finalize";

// =============================================================================
// Default Data
// =============================================================================

export const emptyPersonalInfo: PersonalInfo = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
};

export const emptyLetterContent: LetterContent = {
  date: new Date().toISOString().split("T")[0],
  recipientName: "",
  recipientTitle: "",
  company: "",
  address: "",
  salutation: "Dear",
  greeting: "Hiring Manager",
  bodyParagraph1: "",
  bodyParagraph2: "",
  bodyParagraph3: "",
  closingParagraph: "",
  closing: "Sincerely",
};

export const emptyCoverLetterData: CoverLetterData = {
  title: "Untitled Cover Letter",
  status: "draft",
  personalInfo: emptyPersonalInfo,
  letterContent: emptyLetterContent,
};

// =============================================================================
// Section Completion Logic
// =============================================================================

export function isSectionCompleted(
  sectionId: CoverLetterSectionId,
  data: CoverLetterData
): boolean {
  switch (sectionId) {
    case "personal":
      return !!(data.personalInfo.fullName && data.personalInfo.email);
    case "recipient":
      return !!data.letterContent.date;
    case "greeting":
      return !!(data.letterContent.salutation && data.letterContent.greeting);
    case "content":
      return !!(
        data.letterContent.bodyParagraph1 && data.letterContent.closingParagraph
      );
    case "finalize":
      return false; // Never auto-complete
    default:
      return false;
  }
}

export function calculateProgress(data: CoverLetterData): number {
  const sections: CoverLetterSectionId[] = [
    "personal",
    "recipient",
    "greeting",
    "content",
  ];
  const completed = sections.filter((s) => isSectionCompleted(s, data)).length;
  return Math.round((completed / sections.length) * 100);
}

// =============================================================================
// Context
// =============================================================================

interface CoverLetterContextValue {
  // Data
  coverLetterData: CoverLetterData;
  setCoverLetterData: (data: CoverLetterData) => void;

  // Form data as flat Record for easy access
  formData: Record<string, string>;

  // Update functions
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  updateLetterContent: (field: keyof LetterContent, value: string) => void;
  updateTitle: (title: string) => void;

  // Completion tracking
  isSectionComplete: (sectionId: CoverLetterSectionId) => boolean;
  progress: number;

  // Touched fields for validation
  touchedFields: Set<string>;
  setTouchedFields: (fields: Set<string>) => void;
  markFieldTouched: (fieldName: string) => void;
}

const CoverLetterContext = createContext<CoverLetterContextValue | undefined>(
  undefined
);

// =============================================================================
// Provider
// =============================================================================

interface CoverLetterProviderProps {
  children: ReactNode;
  initialData?: Partial<CoverLetterData>;
}

export function CoverLetterProvider({
  children,
  initialData,
}: CoverLetterProviderProps) {
  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>(
    () => ({
      ...emptyCoverLetterData,
      ...initialData,
      personalInfo: {
        ...emptyPersonalInfo,
        ...initialData?.personalInfo,
      },
      letterContent: {
        ...emptyLetterContent,
        ...initialData?.letterContent,
      },
    })
  );

  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Flat form data for easy field access
  const formData = useMemo(() => {
    return {
      ...coverLetterData.personalInfo,
      ...coverLetterData.letterContent,
      title: coverLetterData.title,
    } as Record<string, string>;
  }, [coverLetterData]);

  // Update personal info
  const updatePersonalInfo = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      setCoverLetterData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      }));
    },
    []
  );

  // Update letter content
  const updateLetterContent = useCallback(
    (field: keyof LetterContent, value: string) => {
      setCoverLetterData((prev) => ({
        ...prev,
        letterContent: {
          ...prev.letterContent,
          [field]: value,
        },
      }));
    },
    []
  );

  // Update title
  const updateTitle = useCallback((title: string) => {
    setCoverLetterData((prev) => ({
      ...prev,
      title,
    }));
  }, []);

  // Section completion
  const isSectionComplete = useCallback(
    (sectionId: CoverLetterSectionId) =>
      isSectionCompleted(sectionId, coverLetterData),
    [coverLetterData]
  );

  const progress = useMemo(
    () => calculateProgress(coverLetterData),
    [coverLetterData]
  );

  // Mark field as touched
  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  }, []);

  const value = useMemo<CoverLetterContextValue>(
    () => ({
      coverLetterData,
      setCoverLetterData,
      formData,
      updatePersonalInfo,
      updateLetterContent,
      updateTitle,
      isSectionComplete,
      progress,
      touchedFields,
      setTouchedFields,
      markFieldTouched,
    }),
    [
      coverLetterData,
      formData,
      updatePersonalInfo,
      updateLetterContent,
      updateTitle,
      isSectionComplete,
      progress,
      touchedFields,
      markFieldTouched,
    ]
  );

  return (
    <CoverLetterContext.Provider value={value}>
      {children}
    </CoverLetterContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useCoverLetterContext() {
  const context = useContext(CoverLetterContext);
  if (context === undefined) {
    throw new Error(
      "useCoverLetterContext must be used within a CoverLetterProvider"
    );
  }
  return context;
}
