import {
    Award,
    Briefcase,
    GraduationCap,
    LanguagesIcon,
    LayoutTemplate,
    User,
    UserCheck,
} from "lucide-react";

export type FieldType = "text" | "email" | "phone" | "select" | "textarea" | "date" | "photo";

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
  icon: any;
  title: string;
  description: string;
  tips: { title: string; text: string }[];
  didYouKnow?: string;
  fields?: FieldConfig[];
  component?: string; // For special components like "Finalize" or complex lists
}

export const stepsConfig: StepConfig[] = [
  {
    id: "contact",
    label: "Contact",
    icon: User,
    title: "Your Contact Information",
    description: "Provide your essential details so recruiters can easily get in touch with you.",
    tips: [
      { title: "Professional Email", text: "Use an email address that looks professional, preferably containing your name (e.g., firstname.lastname@gmail.com)." },
      { title: "Phone Number", text: "Ensure your phone number is active and includes the country code if applying internationally." },
      { title: "Location", text: "You don't need your full address. City and State/Country is usually sufficient for modern resumes." },
      { title: "Photo", text: "Only include a photo if it's common practice in your region or industry (e.g., acting, modeling)." },
    ],
    didYouKnow: "Recruiters spend an average of 7 seconds scanning a resume. Make sure your contact info is easy to find!",
    fields: [
      { name: "photo", label: "Profile Photo", type: "photo", width: "full" },
      { name: "firstName", label: "First Name", type: "text", width: "half", placeholder: "e.g. John", required: true },
      { name: "lastName", label: "Last Name", type: "text", width: "half", placeholder: "e.g. Doe", required: true },
      { name: "jobTitle", label: "Desired Job Title", type: "text", width: "full", placeholder: "e.g. Software Engineer" },
      { name: "email", label: "Email", type: "email", width: "half", placeholder: "e.g. john.doe@example.com", required: true },
      { name: "phone", label: "Phone", type: "phone", width: "half", placeholder: "e.g. +1 234 567 890" },
      { name: "country", label: "Country", type: "select", width: "half", placeholder: "Select Country", options: [] }, // Options populated dynamically if needed
      { name: "city", label: "City", type: "text", width: "half", placeholder: "e.g. New York" },
      { name: "state", label: "State or Province", type: "text", width: "half", placeholder: "e.g. NY" },
      { name: "postalCode", label: "Postal Code", type: "text", width: "half", placeholder: "e.g. 10001" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    title: "Work Experience",
    description: "Highlight your career history and key achievements.",
    tips: [
      { title: "Reverse Chronological", text: "Start with your most recent job and work backwards." },
      { title: "Achievements", text: "Focus on what you accomplished, not just your responsibilities." },
      { title: "Keywords", text: "Use keywords from the job description to pass ATS scans." },
    ],
    fields: [
      { name: "jobTitle", label: "Job Title", type: "text", width: "full", placeholder: "e.g. Product Manager" },
      { name: "employer", label: "Employer", type: "text", width: "full", placeholder: "e.g. Google" },
      { name: "city", label: "City", type: "text", width: "half", placeholder: "e.g. Mountain View" },
      { name: "state", label: "State", type: "text", width: "half", placeholder: "e.g. CA" },
      { name: "startDate", label: "Start Date", type: "date", width: "half" },
      { name: "endDate", label: "End Date", type: "date", width: "half" },
      { name: "description", label: "Description", type: "textarea", width: "full", placeholder: "Describe your responsibilities and achievements..." },
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    title: "Education",
    description: "List your academic qualifications.",
    tips: [
      { title: "Recent First", text: "List your highest degree first." },
      { title: "GPA", text: "Only include your GPA if it's 3.5 or higher, or if you're a recent graduate." },
    ],
    fields: [
      { name: "school", label: "School / University", type: "text", width: "full", placeholder: "e.g. Stanford University" },
      { name: "degree", label: "Degree", type: "text", width: "half", placeholder: "e.g. Bachelor of Science" },
      { name: "fieldOfStudy", label: "Field of Study", type: "text", width: "half", placeholder: "e.g. Computer Science" },
      { name: "city", label: "City", type: "text", width: "half", placeholder: "e.g. Stanford" },
      { name: "state", label: "State", type: "text", width: "half", placeholder: "e.g. CA" },
      { name: "graduationDate", label: "Graduation Date", type: "date", width: "half" },
    ],
  },
  {
    id: "certification",
    label: "Certification",
    icon: Award,
    title: "Certifications",
    description: "Add relevant certifications to boost your profile.",
    tips: [
      { title: "Relevance", text: "Include certifications that are relevant to the job you're applying for." },
    ],
    fields: [
      { name: "name", label: "Certification Name", type: "text", width: "full", placeholder: "e.g. AWS Certified Solutions Architect" },
      { name: "issuer", label: "Issuing Organization", type: "text", width: "full", placeholder: "e.g. Amazon Web Services" },
      { name: "date", label: "Date", type: "date", width: "half" },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    icon: LayoutTemplate,
    title: "Skills",
    description: "List your technical and soft skills.",
    tips: [
      { title: "Hard & Soft Skills", text: "Include a mix of technical skills and soft skills like leadership or communication." },
    ],
    fields: [
      { name: "skill", label: "Skill", type: "text", width: "full", placeholder: "e.g. Project Management" },
      { name: "level", label: "Level", type: "select", width: "full", options: [
        { label: "Beginner", value: "beginner" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Expert", value: "expert" },
      ]},
    ],
  },
  {
    id: "summary",
    label: "Professional Summary",
    icon: LayoutTemplate,
    title: "Professional Summary",
    description: "A brief overview of your career and value proposition.",
    tips: [
      { title: "Elevator Pitch", text: "Think of this as your elevator pitch. Keep it concise and impactful." },
    ],
    fields: [
      { name: "summary", label: "Summary", type: "textarea", width: "full", placeholder: "Experienced software engineer with..." },
    ],
  },
  {
    id: "references",
    label: "References",
    icon: UserCheck,
    title: "References",
    description: "List people who can vouch for your work.",
    tips: [
      { title: "Permission", text: "Always ask for permission before listing someone as a reference." },
    ],
    fields: [
      { name: "name", label: "Reference Name", type: "text", width: "half", placeholder: "e.g. Jane Doe" },
      { name: "company", label: "Company", type: "text", width: "half", placeholder: "e.g. Tech Corp" },
      { name: "email", label: "Email", type: "email", width: "half", placeholder: "e.g. jane@example.com" },
      { name: "phone", label: "Phone", type: "phone", width: "half", placeholder: "e.g. +1 234 567 890" },
    ],
  },
  {
    id: "language",
    label: "Language",
    icon: LanguagesIcon,
    title: "Languages",
    description: "Languages you speak and your proficiency level.",
    tips: [],
    fields: [
      { name: "language", label: "Language", type: "text", width: "half", placeholder: "e.g. Spanish" },
      { name: "proficiency", label: "Proficiency", type: "select", width: "half", options: [
        { label: "Native", value: "native" },
        { label: "Fluent", value: "fluent" },
        { label: "Intermediate", value: "intermediate" },
        { label: "Basic", value: "basic" },
      ]},
    ],
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
