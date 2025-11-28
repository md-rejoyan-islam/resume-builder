import {
  Building2,
  FileText,
  LayoutTemplate,
  Mail,
  User,
} from "lucide-react";

export type FieldType =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "textarea"
  | "date"
  | "url"
  | "richtext";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  width?: "full" | "half";
  required?: boolean;
  rows?: number;
}

export interface CoverLetterStepConfig {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  tips: { title: string; text: string }[];
  didYouKnow?: string;
  fields?: FieldConfig[];
  component?: string;
}

export const coverLetterStepsConfig: CoverLetterStepConfig[] = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
    title: "Your Personal Information",
    description:
      "Provide your contact details so employers can easily reach you.",
    tips: [
      {
        title: "Professional Email",
        text: "Use a professional email address, preferably containing your name.",
      },
      {
        title: "Phone Number",
        text: "Include a phone number where you can be easily reached.",
      },
      {
        title: "Location",
        text: "City and state is usually sufficient - no need for a full address.",
      },
    ],
    didYouKnow:
      "A well-formatted header makes your cover letter look professional and organized.",
    fields: [
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
        width: "full",
        placeholder: "e.g. John Doe",
        required: true,
      },
      {
        name: "jobTitle",
        label: "Job Title",
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
        name: "location",
        label: "Location",
        type: "text",
        width: "full",
        placeholder: "e.g. New York, NY",
      },
    ],
  },
  {
    id: "recipient",
    label: "Recipient",
    icon: Building2,
    title: "Recipient Information",
    description: "Enter details about the company and hiring manager.",
    tips: [
      {
        title: "Research the Recipient",
        text: "Try to find the hiring manager's name - personalized letters get more attention.",
      },
      {
        title: "Company Research",
        text: "Learn about the company culture and values to tailor your letter.",
      },
      {
        title: "Use LinkedIn",
        text: "LinkedIn is a great resource for finding hiring manager names and titles.",
      },
    ],
    didYouKnow:
      "Cover letters addressed to a specific person are 15% more likely to get a response.",
    fields: [
      {
        name: "date",
        label: "Date",
        type: "date",
        width: "half",
        required: true,
      },
      {
        name: "recipientName",
        label: "Recipient Name",
        type: "text",
        width: "half",
        placeholder: "e.g. Jane Smith",
      },
      {
        name: "recipientTitle",
        label: "Recipient Title",
        type: "text",
        width: "half",
        placeholder: "e.g. HR Manager",
      },
      {
        name: "company",
        label: "Company Name",
        type: "text",
        width: "half",
        placeholder: "e.g. Tech Company Inc.",
      },
      {
        name: "address",
        label: "Company Address",
        type: "text",
        width: "full",
        placeholder: "e.g. 123 Business Street, City, State 12345",
      },
    ],
  },
  {
    id: "greeting",
    label: "Greeting",
    icon: Mail,
    title: "Greeting & Salutation",
    description: "Set up how you'll address the recipient.",
    tips: [
      {
        title: "Personalize When Possible",
        text: "Use 'Dear [Name]' when you know the recipient's name.",
      },
      {
        title: "Avoid Generic Greetings",
        text: "Avoid 'To Whom It May Concern' - try 'Dear Hiring Manager' instead.",
      },
      {
        title: "Match the Company Culture",
        text: "For startups, 'Hello' or 'Hi' might be appropriate. For traditional companies, stick with 'Dear'.",
      },
    ],
    fields: [
      {
        name: "salutation",
        label: "Salutation",
        type: "select",
        width: "half",
        options: [
          { label: "Dear", value: "Dear" },
          { label: "Hello", value: "Hello" },
          { label: "Hi", value: "Hi" },
          { label: "Greetings", value: "Greetings" },
        ],
      },
      {
        name: "greeting",
        label: "Greeting Name",
        type: "text",
        width: "half",
        placeholder: "e.g. Hiring Manager or Mr. Smith",
      },
    ],
  },
  {
    id: "content",
    label: "Letter Body",
    icon: FileText,
    title: "Letter Content",
    description: "Write the main content of your cover letter.",
    tips: [
      {
        title: "Opening Paragraph",
        text: "State the position you're applying for and how you learned about it. Hook the reader!",
      },
      {
        title: "Body Paragraphs",
        text: "Highlight 2-3 relevant achievements and explain how your skills match the job requirements.",
      },
      {
        title: "Use Specific Examples",
        text: "Don't just list skills - provide concrete examples of how you've used them.",
      },
      {
        title: "Closing Paragraph",
        text: "Express enthusiasm, thank them, and include a call to action.",
      },
    ],
    didYouKnow:
      "The ideal cover letter is 250-400 words and can be read in under a minute.",
    fields: [
      {
        name: "bodyParagraph1",
        label: "Opening Paragraph",
        type: "richtext",
        width: "full",
        placeholder:
          "I am writing to express my interest in the [Position] role at [Company]. With my background in...",
        required: true,
      },
      {
        name: "bodyParagraph2",
        label: "Body Paragraph",
        type: "richtext",
        width: "full",
        placeholder:
          "In my current role at [Company], I have successfully... For example, I...",
      },
      {
        name: "bodyParagraph3",
        label: "Additional Paragraph (Optional)",
        type: "richtext",
        width: "full",
        placeholder:
          "Additionally, my experience with... has prepared me to...",
      },
      {
        name: "closingParagraph",
        label: "Closing Paragraph",
        type: "richtext",
        width: "full",
        placeholder:
          "Thank you for considering my application. I am excited about the opportunity to contribute to [Company] and would welcome the chance to discuss...",
        required: true,
      },
      {
        name: "closing",
        label: "Closing",
        type: "select",
        width: "half",
        options: [
          { label: "Sincerely", value: "Sincerely" },
          { label: "Best regards", value: "Best regards" },
          { label: "Kind regards", value: "Kind regards" },
          { label: "Respectfully", value: "Respectfully" },
          { label: "Thank you", value: "Thank you" },
        ],
      },
    ],
  },
  {
    id: "finalize",
    label: "Finalize",
    icon: LayoutTemplate,
    title: "Review & Download",
    description: "Review your cover letter and download it.",
    tips: [
      {
        title: "Proofread Carefully",
        text: "Check for spelling and grammar errors. Read it aloud to catch awkward phrasing.",
      },
      {
        title: "Check Formatting",
        text: "Ensure consistent font sizes, margins, and spacing throughout.",
      },
      {
        title: "Save as PDF",
        text: "Always save your cover letter as a PDF to preserve formatting.",
      },
    ],
    component: "finalize",
  },
];
