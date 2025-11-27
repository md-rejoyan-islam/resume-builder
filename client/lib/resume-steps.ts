import {
  Award,
  BookOpen,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Heart,
  LanguagesIcon,
  LayoutTemplate,
  User,
  UserCheck,
  Wrench,
} from "lucide-react";

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "textarea"
  | "date"
  | "photo"
  | "url";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[]; // For select
  width?: "full" | "half";
  required?: boolean;
}

export interface StepConfig {
  id: string;
  label: string;
  // eslint-disable-next-line
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  tips: { title: string; text: string }[];
  didYouKnow?: string;
  fields?: FieldConfig[];
  optionalFields?: FieldConfig[]; // Optional fields shown in accordion
  component?: string; // For special components like "Finalize" or complex lists
}

export const stepsConfig: StepConfig[] = [
  {
    id: "contact",
    label: "Contact",
    icon: User,
    title: "Your Contact Information",
    description:
      "Provide your essential details so recruiters can easily get in touch with you.",
    tips: [
      {
        title: "Professional Email",
        text: "Use an email address that looks professional, preferably containing your name (e.g., firstname.lastname@gmail.com).",
      },
      {
        title: "Phone Number",
        text: "Ensure your phone number is active and includes the country code if applying internationally.",
      },
      {
        title: "Location",
        text: "You don't need your full address. City and State/Country is usually sufficient for modern resumes.",
      },
      {
        title: "Photo",
        text: "Only include a photo if it's common practice in your region or industry (e.g., acting, modeling).",
      },
    ],
    didYouKnow:
      "Recruiters spend an average of 7 seconds scanning a resume. Make sure your contact info is easy to find!",
    fields: [
      { name: "photo", label: "Profile Photo", type: "photo", width: "full" },
      {
        name: "firstName",
        label: "First Name",
        type: "text",
        width: "half",
        placeholder: "e.g. John",
        required: true,
      },
      {
        name: "lastName",
        label: "Last Name",
        type: "text",
        width: "half",
        placeholder: "e.g. Doe",
        required: true,
      },
      {
        name: "jobTitle",
        label: "Desired Job Title",
        type: "text",
        width: "full",
        placeholder: "e.g. Software Engineer",
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        width: "half",
        placeholder: "e.g. john.doe@example.com",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        type: "phone",
        width: "half",
        placeholder: "e.g. +1 234 567 890",
      },
      {
        name: "country",
        label: "Country",
        type: "select",
        width: "half",
        placeholder: "Select Country",
        options: [],
      }, // Options populated dynamically if needed
      {
        name: "city",
        label: "City",
        type: "text",
        width: "half",
        placeholder: "e.g. New York",
      },
      {
        name: "state",
        label: "State or Province",
        type: "text",
        width: "half",
        placeholder: "e.g. NY",
      },
      {
        name: "postalCode",
        label: "Postal Code",
        type: "text",
        width: "half",
        placeholder: "e.g. 10001",
      },
      {
        name: "summary",
        label: "About / Professional Summary",
        type: "textarea",
        width: "full",
        placeholder: "Write a brief professional summary about yourself...",
        required: true,
      },
    ],
    optionalFields: [
      {
        name: "linkedIn",
        label: "LinkedIn",
        type: "url",
        width: "full",
        placeholder: "e.g. https://linkedin.com/in/johndoe",
      },
      {
        name: "github",
        label: "GitHub",
        type: "url",
        width: "full",
        placeholder: "e.g. https://github.com/johndoe",
      },
      {
        name: "dateOfBirth",
        label: "Date of Birth",
        type: "date",
        width: "half",
      },
      {
        name: "drivingLicense",
        label: "Driving License",
        type: "text",
        width: "half",
        placeholder: "e.g. Class B",
      },
      {
        name: "nationality",
        label: "Nationality",
        type: "text",
        width: "half",
        placeholder: "e.g. American",
      },
      {
        name: "twitter",
        label: "Twitter",
        type: "url",
        width: "half",
        placeholder: "e.g. https://twitter.com/johndoe",
      },
      {
        name: "website",
        label: "Website",
        type: "url",
        width: "full",
        placeholder: "e.g. https://www.johndoe.com",
      },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    title: "Work Experience",
    description: "Highlight your career history and key achievements.",
    tips: [
      {
        title: "Reverse Chronological",
        text: "Start with your most recent job and work backwards.",
      },
      {
        title: "Achievements",
        text: "Focus on what you accomplished, not just your responsibilities.",
      },
      {
        title: "Keywords",
        text: "Use keywords from the job description to pass ATS scans.",
      },
    ],
    component: "experience", // Custom component for multi-experience
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    title: "Education",
    description: "List your academic qualifications.",
    tips: [
      { title: "Recent First", text: "List your highest degree first." },
      {
        title: "GPA",
        text: "Only include your GPA if it's 3.5 or higher, or if you're a recent graduate.",
      },
    ],
    component: "education", // Custom component for multi-education
  },
  {
    id: "certification",
    label: "Certification",
    icon: Award,
    title: "Certifications & Achievements",
    description: "Add relevant certifications and achievements to boost your profile.",
    tips: [
      {
        title: "Relevance",
        text: "Include certifications that are relevant to the job you're applying for.",
      },
    ],
    component: "certification", // Custom component for multi-certification
  },
  {
    id: "skills",
    label: "Skills",
    icon: Wrench,
    title: "Skills",
    description: "List your technical and soft skills.",
    tips: [
      {
        title: "Hard & Soft Skills",
        text: "Include a mix of technical skills and soft skills like leadership or communication.",
      },
    ],
    fields: [
      {
        name: "skill",
        label: "Skill",
        type: "text",
        width: "full",
        placeholder: "e.g. Project Management",
      },
      {
        name: "level",
        label: "Level",
        type: "select",
        width: "full",
        options: [
          { label: "Beginner", value: "beginner" },
          { label: "Intermediate", value: "intermediate" },
          { label: "Expert", value: "expert" },
        ],
      },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
    title: "Projects",
    description: "Showcase your personal or professional projects.",
    tips: [
      {
        title: "Highlight Impact",
        text: "Focus on projects that demonstrate your skills and have measurable outcomes.",
      },
      {
        title: "Include Links",
        text: "Add GitHub repos or live demos to let recruiters see your work in action.",
      },
    ],
    component: "projects", // Custom component for multi-projects
  },
  {
    id: "references",
    label: "References",
    icon: UserCheck,
    title: "References",
    description: "List people who can vouch for your work.",
    tips: [
      {
        title: "Permission",
        text: "Always ask for permission before listing someone as a reference.",
      },
    ],
    component: "references", // Custom component for multi-references
  },
  {
    id: "language",
    label: "Language",
    icon: LanguagesIcon,
    title: "Languages",
    description: "Languages you speak and your proficiency level.",
    tips: [
      {
        title: "Be Honest",
        text: "Accurately represent your language proficiency level.",
      },
    ],
    component: "language", // Custom component for multi-language
  },
  {
    id: "volunteer",
    label: "Volunteer",
    icon: Heart,
    title: "Volunteer Experience",
    description: "Showcase your volunteer work and community involvement.",
    tips: [
      {
        title: "Impact",
        text: "Highlight the impact you made and skills you developed through volunteering.",
      },
      {
        title: "Relevance",
        text: "Include volunteer work that demonstrates skills relevant to your career goals.",
      },
    ],
    component: "volunteer", // Custom component for multi-volunteer
  },
  {
    id: "publications",
    label: "Publications",
    icon: BookOpen,
    title: "Publications",
    description: "List your published works, research papers, and articles.",
    tips: [
      {
        title: "Citation Format",
        text: "Use a consistent citation format for all your publications.",
      },
      {
        title: "Relevance",
        text: "Prioritize publications that are most relevant to your target role.",
      },
    ],
    component: "publications", // Custom component for multi-publications
  },
  {
    id: "finalize",
    label: "Finalize",
    icon: LayoutTemplate,
    title: "Finalize Resume",
    description: "Review and download your resume.",
    tips: [],
    component: "finalize", // Special handling
  },
];
