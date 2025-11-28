import { Types } from 'mongoose';

// =============================================================================
// Section Title Interface
// =============================================================================

export interface ISectionTitle {
  id: string;
  title?: string; // Custom title (e.g., "About Me")
  defaultTitle: string; // Default title (e.g., "Summary")
}

// =============================================================================
// Contact Interface
// =============================================================================

export interface IContact {
  firstName: string;
  lastName: string;
  jobTitle?: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  summary?: string; // HTML content from rich text editor
  photoUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  nationality?: string;
  dateOfBirth?: string; // "YYYY-MM-DD"
  drivingLicense?: string;
}

// =============================================================================
// Skill Interface
// =============================================================================

export interface ISkill {
  id: string;
  name: string;
  level?: number; // 1-5 (Beginner to Expert)
  index?: number;
}

// =============================================================================
// Experience Interface
// =============================================================================

export interface IExperience {
  id: string;
  jobTitle: string;
  employer: string;
  city?: string;
  country?: string;
  jobType?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'remote';
  startDate: string;
  endDate?: string;
  currentlyWorking?: boolean;
  description?: string; // HTML content
  index?: number;
}

// =============================================================================
// Education Interface
// =============================================================================

export interface IEducation {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy?: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyStudying?: boolean;
  index?: number;
}

// =============================================================================
// Certification Interface
// =============================================================================

export interface ICertification {
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
}

// =============================================================================
// Project Interface
// =============================================================================

export interface IProject {
  id: string;
  name: string;
  description?: string; // HTML content
  githubUrl?: string;
  liveUrl?: string;
  otherUrl?: string;
  index?: number;
}

// =============================================================================
// Reference Interface
// =============================================================================

export interface IReference {
  id: string;
  name: string;
  company?: string;
  position?: string;
  email?: string;
  phone?: string;
  relationship?: string;
  index?: number;
}

// =============================================================================
// Language Interface
// =============================================================================

export interface ILanguage {
  id: string;
  language: string;
  proficiency?: 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic';
  index?: number;
}

// =============================================================================
// Volunteer Interface
// =============================================================================

export interface IVolunteer {
  id: string;
  organization: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  currentlyVolunteering?: boolean;
  description?: string; // HTML content
  index?: number;
}

// =============================================================================
// Publication Interface
// =============================================================================

export interface IPublication {
  id: string;
  title: string;
  publisher?: string;
  authors?: string;
  publicationDate?: string;
  url?: string;
  description?: string; // HTML content
  index?: number;
}

// =============================================================================
// Template Settings Interface
// =============================================================================

export interface ITemplateSettings {
  templateId: string; // e.g., "classic", "professional", "executive"
  fontFamily?: string;
  fontSize?: {
    name?: string;
    sectionTitle?: string;
    itemTitle?: string;
    body?: string;
    small?: string;
  };
  sectionGap?: number;
  paragraphGap?: number;
  lineHeight?: number;
  accentColor?: string;
}

// =============================================================================
// Main Resume Interface
// =============================================================================

export interface IResume {
  userId: Types.ObjectId;
  title: string; // Resume title for identification (e.g., "Software Engineer Resume")
  isDefault?: boolean; // Whether this is the user's default/primary resume

  // Template settings
  templateSettings?: ITemplateSettings;

  // Section titles (customizable)
  sectionTitles?: ISectionTitle[];

  // Resume content
  contact: IContact;
  skills?: ISkill[];
  experiences?: IExperience[];
  educations?: IEducation[];
  certifications?: ICertification[];
  projects?: IProject[];
  references?: IReference[];
  languages?: ILanguage[];
  volunteers?: IVolunteer[];
  publications?: IPublication[];
}

// =============================================================================
// Resume Document Type (with MongoDB fields)
// =============================================================================

export interface IResumeDocument extends IResume {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
