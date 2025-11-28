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

export interface CoverLetterTheme {
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
// Letter Content Interface
// =============================================================================

export interface LetterContent {
  date: string;
  recipientName?: string;
  recipientTitle?: string;
  company?: string;
  address?: string;
  salutation?: string;
  greeting?: string;
  bodyParagraph1?: string;
  bodyParagraph2?: string;
  bodyParagraph3?: string;
  closingParagraph?: string;
  closing?: string;
  headerStyle?: FieldStyle;
  bodyStyle?: FieldStyle;
  closingStyle?: FieldStyle;
}

// =============================================================================
// Main Cover Letter Data Interface
// =============================================================================

export interface CoverLetterFormatData {
  title: string;
  isDefault?: boolean;
  status: "draft" | "completed";
  theme?: CoverLetterTheme;
  personalInfo: PersonalInfo;
  letterContent: LetterContent;
}

// =============================================================================
// Default Empty Cover Letter Data
// =============================================================================

export const emptyCoverLetterData: CoverLetterFormatData = {
  title: "Untitled Cover Letter",
  status: "draft",
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    profileImage: "",
  },
  letterContent: {
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
  },
};

// =============================================================================
// Default Theme
// =============================================================================

export const defaultCoverLetterTheme: CoverLetterTheme = {
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
