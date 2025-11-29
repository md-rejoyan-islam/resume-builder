// =============================================================================
// Field Style Interface
// =============================================================================

export interface FieldStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  align: "left" | "center" | "right";
}

// =============================================================================
// Theme Interface
// =============================================================================

export interface DisclosureLetterTheme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    pageMargin: number;
    sectionGap: number;
    lineHeight: number;
    paragraphGap: number;
  };
  fontFamily: string;
}

// =============================================================================
// Personal Info Interface
// =============================================================================

export interface PersonalInfo {
  fullName: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  location?: string;
  profileImage?: string;
  nameStyle?: FieldStyle;
  contactStyle?: FieldStyle;
}

// =============================================================================
// Disclosure Content Interface
// =============================================================================

export interface DisclosureContent {
  date: string;
  recipientName?: string;
  recipientTitle?: string;
  company?: string;
  address?: string;
  subject?: string;
  salutation?: string;
  introductionParagraph?: string;
  disclosureDetails?: string;
  relevantCircumstances?: string;
  mitigatingFactors?: string;
  supportingDocuments?: string;
  closingStatement?: string;
  closing?: string;
  headerStyle?: FieldStyle;
  bodyStyle?: FieldStyle;
  closingStyle?: FieldStyle;
}

// =============================================================================
// Disclosure Type
// =============================================================================

export type DisclosureType =
  | "criminal"
  | "financial"
  | "medical"
  | "employment"
  | "other";

// =============================================================================
// Main Disclosure Letter Data Interface
// =============================================================================

export interface DisclosureLetterFormatData {
  title: string;
  isDefault?: boolean;
  status: "draft" | "completed";
  disclosureType?: DisclosureType;
  theme?: DisclosureLetterTheme;
  personalInfo: PersonalInfo;
  disclosureContent: DisclosureContent;
}

// =============================================================================
// Default Empty Disclosure Letter Data
// =============================================================================

export const emptyDisclosureLetterData: DisclosureLetterFormatData = {
  title: "Untitled Disclosure Letter",
  status: "draft",
  disclosureType: "other",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  },
  disclosureContent: {
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
  },
};

// =============================================================================
// Default Theme
// =============================================================================

export const defaultDisclosureLetterTheme: DisclosureLetterTheme = {
  colors: {
    primary: "#2563eb",
    secondary: "#64748b",
    accent: "#3b82f6",
    text: "#1e293b",
    textLight: "#64748b",
    background: "#ffffff",
    border: "#e2e8f0",
  },
  spacing: {
    pageMargin: 40,
    sectionGap: 24,
    lineHeight: 1.6,
    paragraphGap: 16,
  },
  fontFamily: "Inter, sans-serif",
};
