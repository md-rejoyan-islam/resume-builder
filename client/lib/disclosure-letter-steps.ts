import {
  AlertTriangle,
  Building2,
  FileText,
  LayoutTemplate,
  Mail,
  Scale,
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

export interface DisclosureLetterStepConfig {
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

export const disclosureLetterStepsConfig: DisclosureLetterStepConfig[] = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
    title: "Your Personal Information",
    description:
      "Provide your contact details so the recipient can identify you and respond.",
    tips: [
      {
        title: "Full Legal Name",
        text: "Use your full legal name as it appears on official documents.",
      },
      {
        title: "Professional Email",
        text: "Use a professional email address that you check regularly.",
      },
      {
        title: "Contact Information",
        text: "Include reliable contact information where you can be reached.",
      },
    ],
    didYouKnow:
      "Complete and accurate personal information adds credibility to your disclosure.",
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
        label: "Job Title / Position",
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
        label: "Address / Location",
        type: "text",
        width: "full",
        placeholder: "e.g. 123 Main Street, New York, NY 10001",
      },
    ],
  },
  {
    id: "recipient",
    label: "Recipient",
    icon: Building2,
    title: "Recipient Information",
    description: "Enter details about who will receive this disclosure letter.",
    tips: [
      {
        title: "Identify the Right Person",
        text: "Address your disclosure to the appropriate person or department (HR, legal, hiring manager).",
      },
      {
        title: "Company Details",
        text: "Include the full company name and address for formal documentation.",
      },
      {
        title: "Subject Line",
        text: "A clear subject line helps ensure your disclosure is handled appropriately.",
      },
    ],
    didYouKnow:
      "Properly addressed disclosures are more likely to be processed correctly and in a timely manner.",
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
        placeholder: "e.g. Human Resources Department",
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
        label: "Company / Organization Name",
        type: "text",
        width: "half",
        placeholder: "e.g. ABC Corporation",
      },
      {
        name: "address",
        label: "Recipient Address",
        type: "text",
        width: "full",
        placeholder: "e.g. 123 Business Street, City, State 12345",
      },
      {
        name: "subject",
        label: "Subject Line",
        type: "text",
        width: "full",
        placeholder: "e.g. Disclosure of [Matter Type]",
      },
    ],
  },
  {
    id: "type",
    label: "Disclosure Type",
    icon: Scale,
    title: "Type of Disclosure",
    description: "Select the category that best describes your disclosure.",
    tips: [
      {
        title: "Be Accurate",
        text: "Select the category that most accurately represents the nature of your disclosure.",
      },
      {
        title: "Multiple Categories",
        text: "If your disclosure spans multiple categories, choose the primary one and explain in the details.",
      },
      {
        title: "When in Doubt",
        text: "If unsure about the category, select 'Other' and provide a clear description.",
      },
    ],
    fields: [
      {
        name: "disclosureType",
        label: "Disclosure Type",
        type: "select",
        width: "full",
        required: true,
        options: [
          { label: "Criminal History", value: "criminal" },
          { label: "Financial Matter", value: "financial" },
          { label: "Medical / Health Condition", value: "medical" },
          { label: "Previous Employment Issue", value: "employment" },
          { label: "Other", value: "other" },
        ],
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
        title: "Formal Tone",
        text: "Disclosure letters typically require a formal tone - use 'Dear' or 'To Whom It May Concern'.",
      },
      {
        title: "Personalize When Known",
        text: "If you know the recipient's name, address them directly for a more personal touch.",
      },
      {
        title: "Professional Approach",
        text: "Maintain professionalism throughout - this is a formal legal document.",
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
          { label: "To Whom It May Concern", value: "To Whom It May Concern" },
          { label: "Attention", value: "Attention" },
          { label: "Re:", value: "Re:" },
        ],
      },
    ],
  },
  {
    id: "content",
    label: "Disclosure",
    icon: AlertTriangle,
    title: "Disclosure Content",
    description: "Write the main content of your disclosure letter.",
    tips: [
      {
        title: "Be Honest and Complete",
        text: "Provide all relevant facts accurately. Incomplete disclosures can cause problems later.",
      },
      {
        title: "Introduction",
        text: "Clearly state the purpose of your letter and what you are disclosing.",
      },
      {
        title: "Details",
        text: "Provide specific details including dates, locations, and circumstances as applicable.",
      },
      {
        title: "Context",
        text: "Explain the circumstances and any relevant background information.",
      },
      {
        title: "Mitigation",
        text: "If applicable, explain what you've done to address the situation or what you've learned.",
      },
    ],
    didYouKnow:
      "Proactive disclosure is often viewed more favorably than information discovered later in a background check.",
    fields: [
      {
        name: "introductionParagraph",
        label: "Introduction",
        type: "richtext",
        width: "full",
        placeholder:
          "I am writing to disclose the following information in connection with my application/employment at [Company]...",
        required: true,
      },
      {
        name: "disclosureDetails",
        label: "Disclosure Details",
        type: "richtext",
        width: "full",
        placeholder:
          "On [date], [describe the matter being disclosed]. The circumstances were as follows...",
        required: true,
      },
      {
        name: "relevantCircumstances",
        label: "Relevant Circumstances",
        type: "richtext",
        width: "full",
        placeholder:
          "The relevant circumstances surrounding this matter include...",
      },
      {
        name: "mitigatingFactors",
        label: "Mitigating Factors / Lessons Learned",
        type: "richtext",
        width: "full",
        placeholder:
          "Since this occurred, I have taken the following steps... I have learned...",
      },
      {
        name: "supportingDocuments",
        label: "Supporting Documents (if any)",
        type: "textarea",
        width: "full",
        placeholder:
          "List any documents you are including with this disclosure (e.g., court records, certificates, references)...",
        rows: 2,
      },
    ],
  },
  {
    id: "closing",
    label: "Closing",
    icon: FileText,
    title: "Closing Statement",
    description: "Write your closing statement and sign-off.",
    tips: [
      {
        title: "Express Availability",
        text: "Offer to provide additional information or answer questions if needed.",
      },
      {
        title: "Professional Closing",
        text: "Use a professional closing like 'Sincerely' or 'Respectfully'.",
      },
      {
        title: "Contact Information",
        text: "Reiterate your willingness to discuss the matter further.",
      },
    ],
    fields: [
      {
        name: "closingStatement",
        label: "Closing Statement",
        type: "richtext",
        width: "full",
        placeholder:
          "I am committed to transparency and wanted to bring this matter to your attention proactively. I am available to discuss this further and can provide any additional documentation you may require...",
        required: true,
      },
      {
        name: "closing",
        label: "Closing",
        type: "select",
        width: "half",
        options: [
          { label: "Sincerely", value: "Sincerely" },
          { label: "Respectfully", value: "Respectfully" },
          { label: "Best regards", value: "Best regards" },
          { label: "Kind regards", value: "Kind regards" },
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
    description: "Review your disclosure letter and download it.",
    tips: [
      {
        title: "Review Carefully",
        text: "Read through your entire disclosure to ensure all information is accurate and complete.",
      },
      {
        title: "Check for Errors",
        text: "Verify dates, names, and all factual information for accuracy.",
      },
      {
        title: "Keep a Copy",
        text: "Always keep a copy of your disclosure letter for your records.",
      },
      {
        title: "Save as PDF",
        text: "Save your disclosure letter as a PDF to preserve formatting.",
      },
    ],
    component: "finalize",
  },
];
