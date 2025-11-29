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

export interface DisclosureContent {
  date: string;
  recipientName: string;
  recipientTitle: string;
  company: string;
  address: string;
  subject: string;
  salutation: string;
  introductionParagraph: string;
  disclosureDetails: string;
  relevantCircumstances: string;
  mitigatingFactors: string;
  supportingDocuments: string;
  closingStatement: string;
  closing: string;
}

export type DisclosureType =
  | "criminal"
  | "financial"
  | "medical"
  | "employment"
  | "other";

export interface DisclosureLetterData {
  title: string;
  status: "draft" | "completed";
  disclosureType: DisclosureType;
  personalInfo: PersonalInfo;
  disclosureContent: DisclosureContent;
}

export type DisclosureLetterSectionId =
  | "personal"
  | "recipient"
  | "type"
  | "greeting"
  | "content"
  | "closing"
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

export const emptyDisclosureContent: DisclosureContent = {
  date: new Date().toISOString().split("T")[0],
  recipientName: "",
  recipientTitle: "",
  company: "",
  address: "",
  subject: "",
  salutation: "Dear",
  introductionParagraph: "",
  disclosureDetails: "",
  relevantCircumstances: "",
  mitigatingFactors: "",
  supportingDocuments: "",
  closingStatement: "",
  closing: "Sincerely",
};

export const emptyDisclosureLetterData: DisclosureLetterData = {
  title: "Untitled Disclosure Letter",
  status: "draft",
  disclosureType: "other",
  personalInfo: emptyPersonalInfo,
  disclosureContent: emptyDisclosureContent,
};

// =============================================================================
// Section Completion Logic
// =============================================================================

export function isSectionCompleted(
  sectionId: DisclosureLetterSectionId,
  data: DisclosureLetterData
): boolean {
  switch (sectionId) {
    case "personal":
      return !!(data.personalInfo.fullName && data.personalInfo.email);
    case "recipient":
      return !!data.disclosureContent.date;
    case "type":
      return !!data.disclosureType;
    case "greeting":
      return !!data.disclosureContent.salutation;
    case "content":
      return !!(
        data.disclosureContent.introductionParagraph &&
        data.disclosureContent.disclosureDetails
      );
    case "closing":
      return !!(
        data.disclosureContent.closingStatement && data.disclosureContent.closing
      );
    case "finalize":
      return false; // Never auto-complete
    default:
      return false;
  }
}

export function calculateProgress(data: DisclosureLetterData): number {
  const sections: DisclosureLetterSectionId[] = [
    "personal",
    "recipient",
    "type",
    "greeting",
    "content",
    "closing",
  ];
  const completed = sections.filter((s) => isSectionCompleted(s, data)).length;
  return Math.round((completed / sections.length) * 100);
}

// =============================================================================
// Context
// =============================================================================

interface DisclosureLetterContextValue {
  // Data
  disclosureLetterData: DisclosureLetterData;
  setDisclosureLetterData: (data: DisclosureLetterData) => void;

  // Original data from backend (for change detection)
  originalData: DisclosureLetterData | null;
  setOriginalData: (data: DisclosureLetterData) => void;

  // Form data as flat Record for easy access
  formData: Record<string, string>;

  // Update functions
  updatePersonalInfo: (field: keyof PersonalInfo, value: string) => void;
  updateDisclosureContent: (field: keyof DisclosureContent, value: string) => void;
  updateDisclosureType: (type: DisclosureType) => void;
  updateTitle: (title: string) => void;

  // Completion tracking
  isSectionComplete: (sectionId: DisclosureLetterSectionId) => boolean;
  progress: number;

  // Change detection
  hasUnsavedChanges: boolean;

  // Touched fields for validation
  touchedFields: Set<string>;
  setTouchedFields: (fields: Set<string>) => void;
  markFieldTouched: (fieldName: string) => void;
}

const DisclosureLetterContext = createContext<
  DisclosureLetterContextValue | undefined
>(undefined);

// =============================================================================
// Provider
// =============================================================================

interface DisclosureLetterProviderProps {
  children: ReactNode;
  initialData?: Partial<DisclosureLetterData>;
}

export function DisclosureLetterProvider({
  children,
  initialData,
}: DisclosureLetterProviderProps) {
  const [disclosureLetterData, setDisclosureLetterData] =
    useState<DisclosureLetterData>(() => ({
      ...emptyDisclosureLetterData,
      ...initialData,
      personalInfo: {
        ...emptyPersonalInfo,
        ...initialData?.personalInfo,
      },
      disclosureContent: {
        ...emptyDisclosureContent,
        ...initialData?.disclosureContent,
      },
    }));

  // Original data from backend for change detection
  const [originalData, setOriginalData] =
    useState<DisclosureLetterData | null>(null);

  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Check if there are unsaved changes by comparing current data with original
  const hasUnsavedChanges = useMemo(() => {
    if (!originalData) return false;

    // Compare personalInfo
    const personalInfoChanged = Object.keys(
      disclosureLetterData.personalInfo
    ).some(
      (key) =>
        disclosureLetterData.personalInfo[key as keyof PersonalInfo] !==
        originalData.personalInfo[key as keyof PersonalInfo]
    );

    // Compare disclosureContent
    const disclosureContentChanged = Object.keys(
      disclosureLetterData.disclosureContent
    ).some(
      (key) =>
        disclosureLetterData.disclosureContent[key as keyof DisclosureContent] !==
        originalData.disclosureContent[key as keyof DisclosureContent]
    );

    // Compare disclosureType
    const disclosureTypeChanged =
      disclosureLetterData.disclosureType !== originalData.disclosureType;

    return personalInfoChanged || disclosureContentChanged || disclosureTypeChanged;
  }, [disclosureLetterData, originalData]);

  // Flat form data for easy field access
  const formData = useMemo(() => {
    return {
      ...disclosureLetterData.personalInfo,
      ...disclosureLetterData.disclosureContent,
      title: disclosureLetterData.title,
      disclosureType: disclosureLetterData.disclosureType,
    } as Record<string, string>;
  }, [disclosureLetterData]);

  // Update personal info
  const updatePersonalInfo = useCallback(
    (field: keyof PersonalInfo, value: string) => {
      setDisclosureLetterData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value,
        },
      }));
    },
    []
  );

  // Update disclosure content
  const updateDisclosureContent = useCallback(
    (field: keyof DisclosureContent, value: string) => {
      setDisclosureLetterData((prev) => ({
        ...prev,
        disclosureContent: {
          ...prev.disclosureContent,
          [field]: value,
        },
      }));
    },
    []
  );

  // Update disclosure type
  const updateDisclosureType = useCallback((type: DisclosureType) => {
    setDisclosureLetterData((prev) => ({
      ...prev,
      disclosureType: type,
    }));
  }, []);

  // Update title
  const updateTitle = useCallback((title: string) => {
    setDisclosureLetterData((prev) => ({
      ...prev,
      title,
    }));
  }, []);

  // Section completion
  const isSectionComplete = useCallback(
    (sectionId: DisclosureLetterSectionId) =>
      isSectionCompleted(sectionId, disclosureLetterData),
    [disclosureLetterData]
  );

  const progress = useMemo(
    () => calculateProgress(disclosureLetterData),
    [disclosureLetterData]
  );

  // Mark field as touched
  const markFieldTouched = useCallback((fieldName: string) => {
    setTouchedFields((prev) => new Set([...prev, fieldName]));
  }, []);

  const value = useMemo<DisclosureLetterContextValue>(
    () => ({
      disclosureLetterData,
      setDisclosureLetterData,
      originalData,
      setOriginalData,
      formData,
      updatePersonalInfo,
      updateDisclosureContent,
      updateDisclosureType,
      updateTitle,
      isSectionComplete,
      progress,
      hasUnsavedChanges,
      touchedFields,
      setTouchedFields,
      markFieldTouched,
    }),
    [
      disclosureLetterData,
      originalData,
      formData,
      updatePersonalInfo,
      updateDisclosureContent,
      updateDisclosureType,
      updateTitle,
      isSectionComplete,
      progress,
      hasUnsavedChanges,
      touchedFields,
      markFieldTouched,
    ]
  );

  return (
    <DisclosureLetterContext.Provider value={value}>
      {children}
    </DisclosureLetterContext.Provider>
  );
}

// =============================================================================
// Hook
// =============================================================================

export function useDisclosureLetterContext() {
  const context = useContext(DisclosureLetterContext);
  if (context === undefined) {
    throw new Error(
      "useDisclosureLetterContext must be used within a DisclosureLetterProvider"
    );
  }
  return context;
}
