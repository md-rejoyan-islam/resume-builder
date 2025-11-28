// Resume data types and default values
// This file centralizes all resume-related types and default data

import { Certification } from "@/components/resume-builder/CertificationForm";
import { Education } from "@/components/resume-builder/EducationForm";
import { Experience } from "@/components/resume-builder/ExperienceForm";
import { Language } from "@/components/resume-builder/LanguageForm";
import { Project } from "@/components/resume-builder/ProjectForm";
import { Publication } from "@/components/resume-builder/PublicationForm";
import { Reference } from "@/components/resume-builder/ReferenceForm";
import { Skill } from "@/components/resume-builder/SkillsForm";
import { Volunteer } from "@/components/resume-builder/VolunteerForm";

// Re-export all types for convenience
export type {
  Certification,
  Education,
  Experience,
  Language,
  Project,
  Publication,
  Reference,
  Skill,
  Volunteer,
};

// Contact data type
export interface ContactData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  state: string;
  postalCode: string;
  summary: string;
}

// Complete resume data structure
export interface ResumeData {
  contact: ContactData;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  projects: Project[];
  references: Reference[];
  languages: Language[];
  volunteers: Volunteer[];
  publications: Publication[];
}

// Section IDs for tracking completion
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

// Default resume data with sample content
export const defaultResumeData: ResumeData = {
  // Contact information
  contact: {
    firstName: "Md Rejoyan",
    lastName: "Islam",
    jobTitle: "Software Engineer",
    email: "rejoyan@gmail.com",
    phone: "01568-816822",
    country: "",
    city: "Dhaka",
    state: "",
    postalCode: "3114",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed ligula nec lorem tincidunt posuere. Nulla facilisi. Suspendisse potenti. Donec at elementum ex, vitae convallis lorem.",
  },

  // Skills (5 entries)
  skills: [
    { id: "skill-1", name: "JavaScript", level: 5 },
    { id: "skill-2", name: "React.js", level: 5 },
    { id: "skill-3", name: "Node.js", level: 3 },
    { id: "skill-4", name: "Typescript", level: 3 },
    { id: "skill-5", name: "Nextjs", level: 3 },
  ],

  // Experiences (2 entries)
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Senior Software Engineer",
      employer: "Tech Solutions Inc.",
      city: "San Francisco",
      country: "United States",
      jobType: "full-time",
      startDate: "2021-06",
      endDate: "",
      currentlyWorking: true,
      description:
        "Led development of scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
    },
    {
      id: "exp-2",
      jobTitle: "Software Developer",
      employer: "Digital Agency",
      city: "New York",
      country: "United States",
      jobType: "full-time",
      startDate: "2019-01",
      endDate: "2021-05",
      currentlyWorking: false,
      description:
        "Developed and maintained client websites and web applications. Collaborated with design team to implement responsive UI components.",
    },
  ],

  // Educations (2 entries)
  educations: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      location: "Stanford, CA",
      startDate: "2017-09",
      endDate: "2019-06",
      currentlyStudying: false,
    },
    {
      id: "edu-2",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      currentlyStudying: false,
    },
  ],

  // Certifications (2 entries)
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-03",
      expirationDate: "2026-03",
      noExpiration: false,
      credentialId: "AWS-SAA-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      description:
        "Professional level certification for designing distributed systems on AWS.",
    },
    {
      id: "cert-2",
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      issueDate: "2022-08",
      expirationDate: "",
      noExpiration: true,
      credentialId: "GCP-PCD-789012",
      credentialUrl: "https://cloud.google.com/certification",
      description:
        "Certification for building scalable applications on Google Cloud Platform.",
    },
  ],

  // Projects (3 entries)
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment integration, and inventory management.",
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://myecommerce.com",
      otherUrl: "",
    },
    {
      id: "proj-2",
      name: "Task Management App",
      description:
        "Collaborative task management application built with Next.js and Firebase. Supports real-time updates, team collaboration, and deadline tracking.",
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager.app",
      otherUrl: "https://docs.taskmanager.app",
    },
    {
      id: "proj-3",
      name: "Weather Dashboard",
      description:
        "Real-time weather dashboard using OpenWeather API. Features interactive maps, 7-day forecasts, and location-based alerts.",
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "",
      otherUrl: "",
    },
  ],

  // References (1 entry)
  references: [
    {
      id: "ref-1",
      name: "John Smith",
      company: "Tech Solutions Inc.",
      position: "Engineering Manager",
      email: "john.smith@techsolutions.com",
      phone: "+1 555-123-4567",
      relationship: "Former Manager",
    },
  ],

  // Languages (2 entries)
  languages: [
    { id: "lang-1", language: "English", proficiency: "native" },
    { id: "lang-2", language: "Spanish", proficiency: "intermediate" },
  ],

  // Volunteers (2 entries)
  volunteers: [
    {
      id: "vol-1",
      organization: "Code for America",
      role: "Technical Mentor",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "",
      currentlyVolunteering: true,
      description:
        "Mentoring junior developers in web development technologies. Leading weekly coding workshops and code review sessions.",
    },
    {
      id: "vol-2",
      organization: "Local Food Bank",
      role: "IT Support Volunteer",
      location: "New York, NY",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      currentlyVolunteering: false,
      description:
        "Provided IT support and helped digitize inventory management system. Trained staff on using new software tools.",
    },
  ],

  // Publications (2 entries)
  publications: [
    {
      id: "pub-1",
      title: "Modern Web Development Practices: A Comprehensive Guide",
      publisher: "Tech Weekly Journal",
      authors: "Md Isla, John Doe",
      publicationDate: "Jun 2023",
      url: "https://techweekly.com/modern-web-dev",
      description:
        "An in-depth analysis of current web development trends, including React, Next.js, and serverless architectures.",
    },
    {
      id: "pub-2",
      title: "Optimizing React Applications for Performance",
      publisher: "Medium - JavaScript in Plain English",
      authors: "Md Isla",
      publicationDate: "Nov 2022",
      url: "https://medium.com/@mdisla/optimizing-react",
      description:
        "Best practices for improving React application performance through memoization, code splitting, and lazy loading.",
    },
  ],
};

// Empty resume data for clean starts
export const emptyResumeData: ResumeData = {
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

// Helper to check if a section is completed
export function isSectionCompleted(
  sectionId: SectionId,
  data: ResumeData
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

// Get all section completion statuses
export function getAllSectionCompletions(
  data: ResumeData
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

// Calculate overall progress percentage
export function calculateProgress(data: ResumeData): number {
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
