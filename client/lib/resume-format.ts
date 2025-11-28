// =============================================================================
// Resume Format Data - Single Source of Truth for Resume Types
// =============================================================================

export interface ResumeFormatData {
  sectionTitles: Array<{
    id: string;
    title?: string; // Custom title (e.g., "About Me")
    defaultTitle: string; // Default title (e.g., "Summary")
  }>;

  contact: {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    state: string;
    postalCode: string;
    summary: string; // HTML content from rich text editor
    photoUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    websiteUrl?: string;
    twitterUrl?: string;
    nationality?: string;
    dateOfBirth?: string; // "YYYY-MM-DD"
    drivingLicense?: string;
  };

  skills: Array<{
    id: string; // e.g., "skill-1701234567890-abc123def"
    name: string;
    level: number; // 1-5 (Beginner to Expert)
    index?: number;
  }>;

  experiences: Array<{
    id: string;
    jobTitle: string;
    employer: string;
    city?: string;
    country?: string;
    jobType?: string; // "full-time" | "part-time" | "contract" | "freelance" | "internship" | "remote"
    startDate: string; // "YYYY-MM-DD"
    endDate?: string;
    currentlyWorking?: boolean;
    description: string; // HTML content
    index?: number;
  }>;

  educations: Array<{
    id: string;
    school: string;
    degree: string;
    fieldOfStudy?: string;
    location: string;
    startDate: string;
    endDate?: string;
    currentlyStudying?: boolean;
    index?: number;
  }>;

  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: string;
    expirationDate?: string;
    noExpiration?: boolean;
    credentialId?: string;
    credentialUrl?: string;
    description?: string; // HTML content
    index?: number;
  }>;

  projects: Array<{
    id: string;
    name: string;
    description: string; // HTML content
    githubUrl?: string;
    liveUrl?: string;
    otherUrl?: string;
    index?: number;
  }>;

  references: Array<{
    id: string;
    name: string;
    company?: string;
    position: string;
    email: string;
    phone: string;
    relationship?: string;
    index?: number;
  }>;

  languages: Array<{
    id: string;
    language: string;
    proficiency: string; // "native" | "fluent" | "advanced" | "intermediate" | "basic"
    index?: number;
  }>;

  volunteers: Array<{
    id: string;
    organization: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    currentlyVolunteering?: boolean;
    description: string; // HTML content
    index?: number;
  }>;

  publications: Array<{
    id: string;
    title: string;
    publisher: string;
    authors: string;
    publicationDate: string;
    url?: string;
    description: string; // HTML content
    index?: number;
  }>;
}

// =============================================================================
// Extracted Types for Individual Sections
// =============================================================================

export type Contact = ResumeFormatData["contact"];
export type Skill = ResumeFormatData["skills"][number];
export type Experience = ResumeFormatData["experiences"][number];
export type Education = ResumeFormatData["educations"][number];
export type Certification = ResumeFormatData["certifications"][number];
export type Project = ResumeFormatData["projects"][number];
export type Reference = ResumeFormatData["references"][number];
export type Language = ResumeFormatData["languages"][number];
export type Volunteer = ResumeFormatData["volunteers"][number];
export type Publication = ResumeFormatData["publications"][number];
export type SectionTitle = ResumeFormatData["sectionTitles"][number];

// =============================================================================
// Section IDs for Tracking Completion
// =============================================================================

export type SectionId =
  | "contact"
  | "skills"
  | "experience"
  | "education"
  | "certifications"
  | "projects"
  | "references"
  | "languages"
  | "volunteer"
  | "publications"
  | "finalize";

// =============================================================================
// Default Section Titles
// =============================================================================

export const defaultSectionTitles: SectionTitle[] = [
  { id: "summary", defaultTitle: "Summary" },
  { id: "experience", defaultTitle: "Experience" },
  { id: "education", defaultTitle: "Education" },
  { id: "skills", defaultTitle: "Skills" },
  { id: "projects", defaultTitle: "Projects" },
  { id: "certifications", defaultTitle: "Certifications" },
  { id: "languages", defaultTitle: "Languages" },
  { id: "publications", defaultTitle: "Publications" },
  { id: "volunteer", defaultTitle: "Volunteer" },
  { id: "references", defaultTitle: "References" },
];

// =============================================================================
// Empty Resume Data (for clean starts)
// =============================================================================

export const emptyResumeData: ResumeFormatData = {
  sectionTitles: defaultSectionTitles,
  contact: {
    firstName: "",
    lastName: "",
    jobTitle: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    state: "",
    postalCode: "",
    summary: "",
  },
  skills: [],
  experiences: [],
  educations: [],
  certifications: [],
  projects: [],
  references: [],
  languages: [],
  volunteers: [],
  publications: [],
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get section title by ID (uses custom title if set, otherwise default)
 */
export function getSectionTitle(
  sectionTitles: SectionTitle[],
  sectionId: string
): string {
  const section = sectionTitles.find((s) => s.id === sectionId);
  return section?.title || section?.defaultTitle || sectionId;
}

/**
 * Check if a section is completed based on resume data
 */
export function isSectionCompleted(
  sectionId: SectionId,
  data: ResumeFormatData
): boolean {
  switch (sectionId) {
    case "contact":
      return !!(
        data.contact.firstName &&
        data.contact.lastName &&
        data.contact.email
      );
    case "skills":
      return data.skills.length > 0;
    case "experience":
      return data.experiences.length > 0;
    case "education":
      return data.educations.length > 0;
    case "certifications":
      return data.certifications.length > 0;
    case "projects":
      return data.projects.length > 0;
    case "references":
      return data.references.length > 0;
    case "languages":
      return data.languages.length > 0;
    case "volunteer":
      return data.volunteers.length > 0;
    case "publications":
      return data.publications.length > 0;
    case "finalize":
      return false; // Finalize is never "completed" as a section
    default:
      return false;
  }
}

/**
 * Get all section completion statuses
 */
export function getAllSectionCompletions(
  data: ResumeFormatData
): Record<SectionId, boolean> {
  const sections: SectionId[] = [
    "contact",
    "skills",
    "experience",
    "education",
    "certifications",
    "projects",
    "references",
    "languages",
    "volunteer",
    "publications",
    "finalize",
  ];

  return sections.reduce(
    (acc, sectionId) => {
      acc[sectionId] = isSectionCompleted(sectionId, data);
      return acc;
    },
    {} as Record<SectionId, boolean>
  );
}

/**
 * Calculate overall progress percentage
 */
export function calculateProgress(data: ResumeFormatData): number {
  const trackableSections: SectionId[] = [
    "contact",
    "skills",
    "experience",
    "education",
    "certifications",
    "projects",
    "references",
    "languages",
    "volunteer",
    "publications",
  ];

  const completedCount = trackableSections.filter((sectionId) =>
    isSectionCompleted(sectionId, data)
  ).length;

  return Math.round((completedCount / trackableSections.length) * 100);
}
