"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { TemplateSelector } from "@/components/templates/TemplateSelector";
import { Template1Classic } from "@/components/templates/resumes/Template1-Classic";
import { Template10Condensed } from "@/components/templates/resumes/Template10-Condensed";
import { Template11JordanSmith } from "@/components/templates/resumes/Template11-JordanSmith";
import { Template3Minimal } from "@/components/templates/resumes/Template3-Minimal";
import { Template4Creative } from "@/components/templates/resumes/Template4-Creative";
import { Template6Contemporary } from "@/components/templates/resumes/Template6-Contemporary";
import { Template8IvyLeague } from "@/components/templates/resumes/Template8-IvyLeague";
import { Template9Single } from "@/components/templates/resumes/Template9-Single";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart } from "@/components/ui/pie-chart";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import html2CanvasPro from "html2canvas-pro";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Download,
  Plus,
  Settings,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    html2pdf: () => {
      set: (options: unknown) => {
        from: (el: HTMLElement) => { save: () => void };
      };
    };
  }
}

interface FieldStyle {
  fontFamily: string;
  fontSize: number;
  color: string;
  align: "left" | "center" | "right";
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  showIcon: boolean;
  showLabel: boolean;
}

interface Skill {
  id: string;
  name: string;
  level: number;
  color: string;
}

interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface Education {
  id: string;
  degree: string;
  school: string;
  field: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
}

interface Language {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "advanced" | "fluent";
}

interface Project {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  githubUrl: string;
  otherUrl: string;
}

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description: string;
}

interface ThemeSettings {
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
    pageMargin: number; // in mm
    sectionGap: number; // in px
    lineHeight: number; // multiplier
    paragraphGap: number; // in px
  };
  fontFamily: string; // Font family for the entire resume
}

interface ResumeData {
  theme: ThemeSettings;
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    profileImage?: string;
    nameStyle: FieldStyle;
    titleStyle: FieldStyle;
    contactStyle: FieldStyle;
  };
  about: {
    title: string;
    headerStyle: FieldStyle;
    contentStyle: FieldStyle;
    content: string;
  };
  skills: Skill[];
  skillsTitle: string;
  skillsHeaderStyle: FieldStyle;
  skillsStyle: FieldStyle;
  socialLinks: SocialLink[];
  socialLinksTitle: string;
  socialLinksStyle: FieldStyle;
  experience: Experience[];
  experienceTitle: string;
  experienceHeaderStyle: FieldStyle;
  experienceStyle: {
    titleStyle: FieldStyle;
    descStyle: FieldStyle;
  };
  projects: Project[];
  projectsTitle: string;
  projectsHeaderStyle: FieldStyle;
  projectsStyle: FieldStyle;
  education: Education[];
  educationTitle: string;
  educationHeaderStyle: FieldStyle;
  educationStyle: {
    titleStyle: FieldStyle;
    descStyle: FieldStyle;
  };
  languages: Language[];
  languagesTitle: string;
  languagesHeaderStyle: FieldStyle;
  languagesStyle: FieldStyle;
  certificates: Certificate[];
  certificatesTitle: string;
  certificatesHeaderStyle: FieldStyle;
  certificatesStyle: FieldStyle;
}

const defaultFieldStyle: FieldStyle = {
  fontFamily: "Arial",
  fontSize: 16,
  color: "#000000",
  align: "left",
};

const defaultResumeData: ResumeData = {
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: "#1e3a5f",
      accent: "#10b981",
      text: "#000000",
      textLight: "#666666",
      background: "#ffffff",
      border: "#d1d5db",
    },
    spacing: {
      pageMargin: 20, // 20mm
      sectionGap: 24, // 24px
      lineHeight: 1.6,
      paragraphGap: 8, // 8px
    },
    fontFamily: "Inter, system-ui, -apple-system, sans-serif", // Professional default font
  },
  personalInfo: {
    fullName: "Your Name",
    jobTitle: "Job Title",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, State",
    nameStyle: {
      fontFamily: "Arial",
      fontSize: 32,
      color: "#000000",
      align: "center",
    },
    titleStyle: {
      fontFamily: "Arial",
      fontSize: 14,
      color: "#666666",
      align: "center",
    },
    contactStyle: {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#666666",
      align: "center",
    },
  },
  about: {
    title: "About",
    headerStyle: {
      fontFamily: "Arial",
      fontSize: 14,
      color: "#000000",
      align: "left",
    },
    contentStyle: {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#333333",
      align: "left",
    },
    content:
      "Write a brief summary about yourself, your skills, and your professional goals.",
  },
  skills: [
    {
      id: "1",
      name: "Skill 1",
      level: 90,
      color: "#3b82f6",
    },
    {
      id: "2",
      name: "Skill 2",
      level: 85,
      color: "#3b82f6",
    },
    {
      id: "3",
      name: "Skill 3",
      level: 80,
      color: "#3b82f6",
    },
  ],
  skillsTitle: "Skills",
  skillsHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  skillsStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000000",
    align: "left",
  },
  socialLinks: [
    {
      id: "1",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      showIcon: true,
      showLabel: true,
    },
    {
      id: "2",
      platform: "GitHub",
      url: "https://github.com/yourprofile",
      showIcon: true,
      showLabel: true,
    },
  ],
  socialLinksTitle: "Social Links",
  socialLinksStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#0066cc",
    align: "left",
  },
  experience: [
    {
      id: "1",
      jobTitle: "Job Title",
      company: "Company Name",
      startDate: "Jan 2022",
      endDate: "Present",
      currentlyWorking: true,
      description:
        "Describe your responsibilities and achievements in this role.",
    },
    {
      id: "2",
      jobTitle: "Job Title2",
      company: "Company Name2",
      startDate: "Jan 2022",
      endDate: "May 2023",
      currentlyWorking: false,
      description:
        "Describe your responsibilities and achievements in this role.",
    },
  ],
  experienceTitle: "Experience",
  experienceHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  experienceStyle: {
    titleStyle: {
      fontFamily: "Arial",
      fontSize: 13,
      color: "#000000",
      align: "left",
    },
    descStyle: {
      fontFamily: "Arial",
      fontSize: 11,
      color: "#333333",
      align: "left",
    },
  },
  education: [
    {
      id: "1",
      school: "University Name",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "Sep 2018",
      endDate: "May 2022",
      currentlyStudying: false,
      description: "Relevant coursework and achievements.",
    },
    {
      id: "2",
      school: "Secondary School Name",
      degree: "High School Diploma",
      field: "Science",
      startDate: "Sep 2016",
      endDate: "May 2018",
      currentlyStudying: false,
      description: "Relevant coursework and achievements.",
    },
  ],
  educationTitle: "Education",
  educationHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  educationStyle: {
    titleStyle: {
      fontFamily: "Arial",
      fontSize: 13,
      color: "#000000",
      align: "left",
    },
    descStyle: {
      fontFamily: "Arial",
      fontSize: 11,
      color: "#333333",
      align: "left",
    },
  },
  projects: [
    {
      id: "1",
      name: "Project Name",
      description: "Brief description of the project and your role in it.",
      previewUrl: "https://example.com",
      githubUrl: "https://github.com/yourprofile/project",
      otherUrl: "https://portfolio.com/project",
    },
    {
      id: "2",
      name: "Project Name2",
      description: "Brief description of the project and your role in it.",
      previewUrl: "https://example.com",
      githubUrl: "https://github.com/yourprofile/project",
      otherUrl: "https://portfolio.com/project",
    },
  ],
  projectsTitle: "Projects",
  projectsHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  projectsStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000000",
    align: "left",
  },
  languages: [
    {
      id: "1",
      name: "English",
      proficiency: "fluent",
    },
    {
      id: "2",
      name: "Spanish",
      proficiency: "fluent",
    },
  ],
  languagesTitle: "Languages",
  languagesHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  languagesStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000000",
    align: "left",
  },
  certificates: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "Jan 2023",
      description:
        "Professional level certification for AWS cloud architecture",
    },
    {
      id: "2",
      name: "AWS Certified Solutions Architect2",
      issuer: "Amazon Web Services",
      date: "Jan 2023",
      description:
        "Professional level certification for AWS cloud architecture",
    },
  ],
  certificatesTitle: "Certificates & Achievements",
  certificatesHeaderStyle: {
    fontFamily: "Arial",
    fontSize: 14,
    color: "#000000",
    align: "left",
  },
  certificatesStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#000000",
    align: "left",
  },
};

const fontFamilies = [
  "Arial",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Courier New",
];
const socialPlatforms = ["LinkedIn", "GitHub", "Twitter", "Website", "Email"];
const proficiencyLevels = ["beginner", "intermediate", "advanced", "fluent"];

const StyleControlPopover = ({
  style,
  onChange,
  label = "Style",
}: {
  style: FieldStyle;
  onChange: (style: FieldStyle) => void;
  label?: string;
}) => {
  if (!label) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            <Settings className="w-3 h-3" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            {/* Font Family */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Font Family
              </label>
              <select
                value={style.fontFamily}
                onChange={(e) =>
                  onChange({ ...style, fontFamily: e.target.value })
                }
                className="w-full p-2 text-sm border rounded bg-background"
              >
                {fontFamilies.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>
            </div>

            {/* Font Size */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Font Size: {style.fontSize}px
              </label>
              <input
                type="range"
                min="8"
                max="32"
                value={style.fontSize}
                onChange={(e) =>
                  onChange({ ...style, fontSize: Number(e.target.value) })
                }
                className="w-full"
              />
            </div>

            {/* Color */}
            <div>
              <label className="text-sm font-medium block mb-2">Color</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={style.color}
                  onChange={(e) =>
                    onChange({ ...style, color: e.target.value })
                  }
                  className="w-12 h-10 rounded cursor-pointer border"
                />
                <span className="text-sm flex items-center flex-1 font-mono">
                  {style.color}
                </span>
              </div>
            </div>

            {/* Alignment */}
            <div>
              <label className="text-sm font-medium block mb-2">
                Alignment
              </label>
              <div className="flex gap-2">
                <Button
                  variant={style.align === "left" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange({ ...style, align: "left" })}
                  className="flex-1"
                >
                  <AlignLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant={style.align === "center" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange({ ...style, align: "center" })}
                  className="flex-1"
                >
                  <AlignCenter className="w-4 h-4" />
                </Button>
                <Button
                  variant={style.align === "right" ? "default" : "outline"}
                  size="sm"
                  onClick={() => onChange({ ...style, align: "right" })}
                  className="flex-1"
                >
                  <AlignRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
          <span>{label}</span>
          <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          {/* Font Family */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Font Family
            </label>
            <select
              value={style.fontFamily}
              onChange={(e) =>
                onChange({ ...style, fontFamily: e.target.value })
              }
              className="w-full p-2 text-sm border rounded bg-background"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font}>
                  {font}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="text-sm font-medium block mb-2">
              Font Size: {style.fontSize}px
            </label>
            <input
              type="range"
              min="8"
              max="32"
              value={style.fontSize}
              onChange={(e) =>
                onChange({ ...style, fontSize: Number(e.target.value) })
              }
              className="w-full"
            />
          </div>

          {/* Color */}
          <div>
            <label className="text-sm font-medium block mb-2">Color</label>
            <div className="flex gap-2">
              <input
                type="color"
                value={style.color}
                onChange={(e) => onChange({ ...style, color: e.target.value })}
                className="w-12 h-10 rounded cursor-pointer border"
              />
              <span className="text-sm flex items-center flex-1 font-mono">
                {style.color}
              </span>
            </div>
          </div>

          {/* Alignment */}
          <div>
            <label className="text-sm font-medium block mb-2">Alignment</label>
            <div className="flex gap-2">
              <Button
                variant={style.align === "left" ? "default" : "outline"}
                size="sm"
                onClick={() => onChange({ ...style, align: "left" })}
                className="flex-1"
              >
                <AlignLeft className="w-4 h-4" />
              </Button>
              <Button
                variant={style.align === "center" ? "default" : "outline"}
                size="sm"
                onClick={() => onChange({ ...style, align: "center" })}
                className="flex-1"
              >
                <AlignCenter className="w-4 h-4" />
              </Button>
              <Button
                variant={style.align === "right" ? "default" : "outline"}
                size="sm"
                onClick={() => onChange({ ...style, align: "right" })}
                className="flex-1"
              >
                <AlignRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default function ResumeFromScratchPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [isDownloading, setIsDownloading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("classic");
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load html2canvas library
    const script1 = document.createElement("script");
    script1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script1.async = true;
    script1.onload = () => {
      console.log("html2canvas library loaded successfully");
    };
    script1.onerror = () => {
      console.error("Failed to load html2canvas library from CDN");
    };
    document.body.appendChild(script1);

    // Load jsPDF library
    const script2 = document.createElement("script");
    script2.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script2.async = true;
    script2.onload = () => {
      console.log("jsPDF library loaded successfully");
    };
    script2.onerror = () => {
      console.error("Failed to load jsPDF library from CDN");
    };
    document.body.appendChild(script2);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updatePersonalStyle = (field: string, style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: style },
    }));
  };

  const updateAbout = (content: string) => {
    setResumeData((prev) => ({
      ...prev,
      about: { ...prev.about, content },
    }));
  };

  const updateAboutStyle = (field: string, style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      about: { ...prev.about, [field]: style },
    }));
  };

  const addSkill = () => {
    setResumeData((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: Date.now().toString(),
          name: "",
          level: 3,
          color: "#3b82f6",
        },
      ],
    }));
  };

  const updateSkill = (
    id: string,
    field: string,
    value: string | number | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const updateSkillsStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      skillsStyle: style,
    }));
  };

  const updateSkillsHeaderStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      skillsHeaderStyle: style,
    }));
  };

  const addExperience = () => {
    setResumeData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now().toString(),
          jobTitle: "",
          company: "",
          startDate: "",
          endDate: "",
          currentlyWorking: false,
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (
    id: string,
    field: string,
    value: string | boolean | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const updateExperienceStyle = (
    field: "titleStyle" | "descStyle",
    style: FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      experienceStyle: { ...prev.experienceStyle, [field]: style },
    }));
  };

  const updateExperienceHeaderStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      experienceHeaderStyle: style,
    }));
  };

  const addEducation = () => {
    setResumeData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now().toString(),
          degree: "",
          school: "",
          field: "",
          startDate: "",
          endDate: "",
          currentlyStudying: false,
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (
    id: string,
    field: string,
    value: string | boolean | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const updateEducationStyle = (
    field: "titleStyle" | "descStyle",
    style: FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      educationStyle: { ...prev.educationStyle, [field]: style },
    }));
  };

  const updateEducationHeaderStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      educationHeaderStyle: style,
    }));
  };

  const addLanguage = () => {
    setResumeData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: Date.now().toString(),
          name: "",
          proficiency: "beginner",
          style: { ...defaultFieldStyle, fontSize: 12 },
        },
      ],
    }));
  };

  const updateLanguage = (
    id: string,
    field: string,
    value: string | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const addCertificate = () => {
    setResumeData((prev) => ({
      ...prev,
      certificates: [
        ...prev.certificates,
        {
          id: Date.now().toString(),
          name: "",
          issuer: "",
          date: "",
          description: "",
        },
      ],
    }));
  };

  const updateCertificate = (
    id: string,
    field: string,
    value: string | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    }));
  };

  const removeCertificate = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certificates: prev.certificates.filter((c) => c.id !== id),
    }));
  };

  const addProject = () => {
    setResumeData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now().toString(),
          name: "",
          description: "",
          previewUrl: "",
          githubUrl: "",
          otherUrl: "",
        },
      ],
    }));
  };

  const updateProject = (
    id: string,
    field: string,
    value: string | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const updateProjectsStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      projectsStyle: style,
    }));
  };

  const updateProjectsHeaderStyle = (style: FieldStyle) => {
    setResumeData((prev) => ({
      ...prev,
      projectsHeaderStyle: style,
    }));
  };

  const updateProjectsTitle = (title: string) => {
    setResumeData((prev) => ({
      ...prev,
      projectsTitle: title,
    }));
  };

  // Completion percentage calculations
  const calculatePersonalInfoCompletion = () => {
    const fields = [
      resumeData.personalInfo.fullName,
      resumeData.personalInfo.jobTitle,
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location,
    ];
    const filled = fields.filter(
      (field) => field && field.trim() !== ""
    ).length;
    return Math.round((filled / fields.length) * 100);
  };

  const calculateExperienceCompletion = () => {
    if (resumeData.experience.length === 0) return 0;
    const totalFields = resumeData.experience.length * 5; // company, jobTitle, startDate, endDate, description
    const filledFields = resumeData.experience.reduce((count, exp) => {
      let filled = 0;
      if (exp.company?.trim()) filled++;
      if (exp.jobTitle?.trim()) filled++;
      if (exp.startDate?.trim()) filled++;
      if (exp.endDate?.trim()) filled++;
      if (exp.description?.trim()) filled++;
      return count + filled;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const calculateEducationCompletion = () => {
    if (resumeData.education.length === 0) return 0;
    const totalFields = resumeData.education.length * 5; // school, degree, field, startDate, endDate
    const filledFields = resumeData.education.reduce((count, edu) => {
      let filled = 0;
      if (edu.school?.trim()) filled++;
      if (edu.degree?.trim()) filled++;
      if (edu.field?.trim()) filled++;
      if (edu.startDate?.trim()) filled++;
      if (edu.endDate?.trim()) filled++;
      return count + filled;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const calculateSkillsCompletion = () => {
    if (resumeData.skills.length === 0) return 0;
    const filled = resumeData.skills.filter((skill) =>
      skill.name?.trim()
    ).length;
    return filled > 0 ? 100 : 0;
  };

  const calculateProjectsCompletion = () => {
    if (resumeData.projects.length === 0) return 0;
    const totalFields = resumeData.projects.length * 2; // name, description (minimum)
    const filledFields = resumeData.projects.reduce((count, project) => {
      let filled = 0;
      if (project.name?.trim()) filled++;
      if (project.description?.trim()) filled++;
      return count + filled;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const calculateLanguagesCompletion = () => {
    if (resumeData.languages.length === 0) return 0;
    const filled = resumeData.languages.filter(
      (lang) => lang.name?.trim() && lang.proficiency
    ).length;
    return filled > 0 ? 100 : 0;
  };

  const calculateCertificatesCompletion = () => {
    if (resumeData.certificates.length === 0) return 0;
    const totalFields = resumeData.certificates.length * 4; // name, issuer, date, description
    const filledFields = resumeData.certificates.reduce((count, cert) => {
      let filled = 0;
      if (cert.name?.trim()) filled++;
      if (cert.issuer?.trim()) filled++;
      if (cert.date?.trim()) filled++;
      if (cert.description?.trim()) filled++;
      return count + filled;
    }, 0);
    return Math.round((filledFields / totalFields) * 100);
  };

  const addSocialLink = () => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: [
        ...prev.socialLinks,
        {
          id: Date.now().toString(),
          platform: "LinkedIn",
          url: "",
          showIcon: true,
          showLabel: true,
          style: { ...defaultFieldStyle, fontSize: 12 },
        },
      ],
    }));
  };

  const updateSocialLink = (
    id: string,
    field: string,
    value: string | boolean | FieldStyle
  ) => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      ),
    }));
  };

  const removeSocialLink = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((l) => l.id !== id),
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonalInfo("profileImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadResumeAsPDF = async () => {
    if (isDownloading) return;

    // Get the actual A4 page element, not the flex container
    const previewContainer = previewRef.current;
    if (!previewContainer) {
      console.error("Resume preview element not found");
      alert("Resume preview not found");
      return;
    }

    // Find the first A4 page within the container
    const a4Page = previewContainer.querySelector(".a4-page") as HTMLElement;
    if (!a4Page) {
      console.error("A4 page element not found");
      alert("Resume page not found");
      return;
    }

    setIsDownloading(true);

    try {
      console.log("Starting PDF download with html2canvas-pro...");

      // Import jsPDF
      const { jsPDF } = await import("jspdf");
      console.log("jsPDF imported successfully");

      const filename = `${resumeData.personalInfo.fullName || "resume"}.pdf`;
      console.log("Filename:", filename);

      // Use html2canvas-pro to render only the A4 page element
      console.log("Converting to canvas with html2canvas-pro...");
      const canvas = await html2CanvasPro(a4Page, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        imageTimeout: 15000,
      });

      console.log(
        "Canvas created, dimensions:",
        canvas.width,
        "x",
        canvas.height
      );

      // Create PDF
      console.log("Creating PDF document...");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      // Calculate image dimensions to fit on A4 page without margins
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Convert canvas to image data
      const imageData = canvas.toDataURL("image/png");
      console.log("Image data created");

      // Add first page with no margins
      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);

      // Add additional pages only if content extends beyond one page
      // Add small tolerance (2mm) to avoid creating extra pages due to rounding
      let yPosition = 0;
      let remainingHeight = imgHeight - pageHeight - 2;

      while (remainingHeight > 0) {
        pdf.addPage();
        yPosition = -remainingHeight;
        pdf.addImage(imageData, "PNG", 0, yPosition, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

      // Save the PDF
      console.log("Saving PDF as:", filename);
      pdf.save(filename);

      alert("PDF downloaded successfully!");
    } catch (error) {
      console.error("Error during PDF generation:", error);
      alert("Failed to download PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2 flex-1">
          <h1 className="text-3xl font-bold">Advanced Resume Builder</h1>
          <p className="text-muted-foreground">
            Control every aspect of your resume
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={downloadResumeAsPDF}
            variant="outline"
            disabled={isDownloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
          <Button>Save Resume</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form - 1/3 */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="styling">Styling</TabsTrigger>
            </TabsList>

            {/* TAB 1: PERSONAL */}
            <TabsContent value="personal" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={[]}
                className="space-y-3"
              >
                {/* Personal Information Section */}
                <AccordionItem
                  value="personal"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          Personal Information
                        </h3>
                      </div>
                      <PieChart
                        percentage={calculatePersonalInfoCompletion()}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {/* Profile Image */}
                      <div className="flex items-center gap-4">
                        {resumeData.personalInfo.profileImage && (
                          <div className="relative w-16 h-16">
                            <Image
                              src={resumeData.personalInfo.profileImage}
                              alt="Profile"
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                        <label className="cursor-pointer">
                          <div className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-colors">
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Upload Photo</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Full Name */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <StyleControlPopover
                            label="Style"
                            style={resumeData.personalInfo.nameStyle}
                            onChange={(s) =>
                              updatePersonalStyle("nameStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="John Doe"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) =>
                            updatePersonalInfo("fullName", e.target.value)
                          }
                        />
                      </div>

                      {/* Professional Title */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Professional Title
                          </label>
                          <StyleControlPopover
                            label="Style"
                            style={resumeData.personalInfo.titleStyle}
                            onChange={(s) =>
                              updatePersonalStyle("titleStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="Senior Manager"
                          value={resumeData.personalInfo.jobTitle}
                          onChange={(e) =>
                            updatePersonalInfo("jobTitle", e.target.value)
                          }
                        />
                      </div>

                      {/* Contact Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={resumeData.personalInfo.email}
                            onChange={(e) =>
                              updatePersonalInfo("email", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) =>
                              updatePersonalInfo("phone", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Location
                          </label>
                          <StyleControlPopover
                            label="Style"
                            style={resumeData.personalInfo.contactStyle}
                            onChange={(s) =>
                              updatePersonalStyle("contactStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="San Francisco, CA"
                          value={resumeData.personalInfo.location}
                          onChange={(e) =>
                            updatePersonalInfo("location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* About Section */}
                <AccordionItem
                  value="about"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          About / Summary
                        </h3>
                      </div>
                      <PieChart percentage={100} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">Styles</span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                style={resumeData.about.headerStyle}
                                onChange={(s) =>
                                  updateAboutStyle("headerStyle", s)
                                }
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    About Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.about.title}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        about: {
                                          ...resumeData.about,
                                          title: e.target.value,
                                        },
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Content
                            </span>
                            <StyleControlPopover
                              style={resumeData.about.contentStyle}
                              onChange={(s) =>
                                updateAboutStyle("contentStyle", s)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium">Content</label>
                        <TextEditor
                          value={resumeData.about.content}
                          onChange={updateAbout}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Social Links */}
                <AccordionItem
                  value="social"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Social Links</h3>
                      </div>
                      <PieChart percentage={100} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Button
                          onClick={addSocialLink}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                        <span className="text-xs font-medium">
                          Global Style
                        </span>
                        <StyleControlPopover
                          label="Style"
                          style={resumeData.socialLinksStyle}
                          onChange={(s) =>
                            setResumeData({
                              ...resumeData,
                              socialLinksStyle: s,
                            })
                          }
                        />
                      </div>

                      {resumeData.socialLinks.map((link) => (
                        <div
                          key={link.id}
                          className="p-3 border border-border rounded-lg space-y-2"
                        >
                          <div className="flex justify-between items-center">
                            <select
                              value={link.platform}
                              onChange={(e) =>
                                updateSocialLink(
                                  link.id,
                                  "platform",
                                  e.target.value
                                )
                              }
                              className="flex-1 p-2 text-sm border rounded bg-background"
                            >
                              {socialPlatforms.map((p) => (
                                <option key={p} value={p}>
                                  {p}
                                </option>
                              ))}
                            </select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSocialLink(link.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <Input
                            placeholder="https://..."
                            value={link.url}
                            onChange={(e) =>
                              updateSocialLink(link.id, "url", e.target.value)
                            }
                          />
                          <div className="flex gap-3">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={link.showIcon}
                                onChange={(e) =>
                                  updateSocialLink(
                                    link.id,
                                    "showIcon",
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="text-xs">Icon</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={link.showLabel}
                                onChange={(e) =>
                                  updateSocialLink(
                                    link.id,
                                    "showLabel",
                                    e.target.checked
                                  )
                                }
                              />
                              <span className="text-xs">Label</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* TAB 2: PROFESSIONAL */}
            <TabsContent value="professional" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={[]}
                className="space-y-3"
              >
                {/* Skills */}
                <AccordionItem
                  value="skills"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Skills</h3>
                      </div>
                      <PieChart percentage={calculateSkillsCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-3">
                        <Button onClick={addSkill} size="sm" variant="outline">
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">Styles</span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                style={resumeData.skillsHeaderStyle}
                                onChange={(s) => updateSkillsHeaderStyle(s)}
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Skills Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.skillsTitle}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        skillsTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Items
                            </span>
                            <StyleControlPopover
                              style={resumeData.skillsStyle}
                              onChange={(s) => updateSkillsStyle(s)}
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.skills.map((skill) => (
                        <div
                          key={skill.id}
                          className="p-3 border border-border rounded-lg space-y-2"
                        >
                          <div className="flex gap-2">
                            <Input
                              placeholder="Skill name"
                              value={skill.name}
                              onChange={(e) =>
                                updateSkill(skill.id, "name", e.target.value)
                              }
                              className="flex-1"
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkill(skill.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs">
                                Level: {skill.level}/5
                              </label>
                              <input
                                type="range"
                                min="1"
                                max="5"
                                value={skill.level}
                                onChange={(e) =>
                                  updateSkill(
                                    skill.id,
                                    "level",
                                    Number(e.target.value)
                                  )
                                }
                                className="w-full"
                              />
                            </div>
                            <div>
                              <label className="text-xs">Color</label>
                              <input
                                type="color"
                                value={skill.color}
                                onChange={(e) =>
                                  updateSkill(skill.id, "color", e.target.value)
                                }
                                className="w-full h-8 rounded cursor-pointer border"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Experience */}
                <AccordionItem
                  value="experience"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Experience</h3>
                      </div>
                      <PieChart percentage={calculateExperienceCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <Button
                          onClick={addExperience}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">
                          Global Styles
                        </span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                style={resumeData.experienceHeaderStyle}
                                onChange={(s) => updateExperienceHeaderStyle(s)}
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Experience Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.experienceTitle}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        experienceTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Title
                            </span>
                            <StyleControlPopover
                              style={resumeData.experienceStyle.titleStyle}
                              onChange={(s) =>
                                updateExperienceStyle("titleStyle", s)
                              }
                            />
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Description
                            </span>
                            <StyleControlPopover
                              style={resumeData.experienceStyle.descStyle}
                              onChange={(s) =>
                                updateExperienceStyle("descStyle", s)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.experience.map((exp) => (
                        <div
                          key={exp.id}
                          className="p-3 border border-border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">Experience Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(exp.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <Input
                            placeholder="Job Title"
                            value={exp.jobTitle}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "jobTitle",
                                e.target.value
                              )
                            }
                          />
                          <Input
                            placeholder="Company"
                            value={exp.company}
                            onChange={(e) =>
                              updateExperience(
                                exp.id,
                                "company",
                                e.target.value
                              )
                            }
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Start Date (e.g., Jan 2022)"
                              value={exp.startDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              placeholder="End Date (e.g., Present)"
                              value={exp.endDate}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              disabled={exp.currentlyWorking}
                            />
                          </div>

                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={exp.currentlyWorking}
                              onChange={(e) =>
                                updateExperience(
                                  exp.id,
                                  "currentlyWorking",
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-sm">Currently Working</span>
                          </label>

                          <div>
                            <label className="text-xs font-medium">
                              Description
                            </label>
                            <TextEditor
                              value={exp.description}
                              onChange={(content) =>
                                updateExperience(exp.id, "description", content)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Projects */}
                <AccordionItem
                  value="projects"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Projects</h3>
                      </div>
                      <PieChart percentage={calculateProjectsCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <Button
                          onClick={addProject}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">
                          Global Styles
                        </span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                style={resumeData.projectsHeaderStyle}
                                onChange={(s) => updateProjectsHeaderStyle(s)}
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Projects Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.projectsTitle}
                                    onChange={(e) =>
                                      updateProjectsTitle(e.target.value)
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Items
                            </span>
                            <StyleControlPopover
                              style={resumeData.projectsStyle}
                              onChange={(s) => updateProjectsStyle(s)}
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.projects.map((project) => (
                        <div
                          key={project.id}
                          className="p-3 border border-border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">Project Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(project.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <Input
                            placeholder="Project Name"
                            value={project.name}
                            onChange={(e) =>
                              updateProject(project.id, "name", e.target.value)
                            }
                          />

                          <div>
                            <label className="text-xs font-medium">
                              Description
                            </label>
                            <TextEditor
                              value={project.description}
                              onChange={(content) =>
                                updateProject(
                                  project.id,
                                  "description",
                                  content
                                )
                              }
                            />
                          </div>

                          <Input
                            placeholder="Preview URL"
                            type="url"
                            value={project.previewUrl}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "previewUrl",
                                e.target.value
                              )
                            }
                          />

                          <Input
                            placeholder="GitHub URL"
                            type="url"
                            value={project.githubUrl}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "githubUrl",
                                e.target.value
                              )
                            }
                          />

                          <Input
                            placeholder="Other URL"
                            type="url"
                            value={project.otherUrl}
                            onChange={(e) =>
                              updateProject(
                                project.id,
                                "otherUrl",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* TAB 3: EDUCATION */}
            <TabsContent value="education" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={[]}
                className="space-y-3"
              >
                {/* Education */}
                <AccordionItem
                  value="education"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Education</h3>
                      </div>
                      <PieChart percentage={calculateEducationCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <Button
                          onClick={addEducation}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">
                          Global Styles
                        </span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                style={resumeData.educationHeaderStyle}
                                onChange={(s) => updateEducationHeaderStyle(s)}
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Education Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.educationTitle}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        educationTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Title
                            </span>
                            <StyleControlPopover
                              style={resumeData.educationStyle.titleStyle}
                              onChange={(s) =>
                                updateEducationStyle("titleStyle", s)
                              }
                            />
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Description
                            </span>
                            <StyleControlPopover
                              style={resumeData.educationStyle.descStyle}
                              onChange={(s) =>
                                updateEducationStyle("descStyle", s)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.education.map((edu) => (
                        <div
                          key={edu.id}
                          className="p-3 border border-border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">Education Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(edu.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <Input
                            placeholder="Degree"
                            value={edu.degree}
                            onChange={(e) =>
                              updateEducation(edu.id, "degree", e.target.value)
                            }
                          />
                          <Input
                            placeholder="School/University"
                            value={edu.school}
                            onChange={(e) =>
                              updateEducation(edu.id, "school", e.target.value)
                            }
                          />

                          <Input
                            placeholder="Field of Study"
                            value={edu.field}
                            onChange={(e) =>
                              updateEducation(edu.id, "field", e.target.value)
                            }
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Start Date (e.g., Sep 2018)"
                              value={edu.startDate}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              placeholder="End Date (e.g., May 2022)"
                              value={edu.endDate}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "endDate",
                                  e.target.value
                                )
                              }
                              disabled={edu.currentlyStudying}
                            />
                          </div>

                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={edu.currentlyStudying}
                              onChange={(e) =>
                                updateEducation(
                                  edu.id,
                                  "currentlyStudying",
                                  e.target.checked
                                )
                              }
                            />
                            <span className="text-sm">Currently Studying</span>
                          </label>

                          <div>
                            <label className="text-xs font-medium">
                              Description
                            </label>
                            <TextEditor
                              value={edu.description}
                              onChange={(content) =>
                                updateEducation(edu.id, "description", content)
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Languages */}
                <AccordionItem
                  value="languages"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Languages</h3>
                      </div>
                      <PieChart percentage={calculateLanguagesCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Button
                          onClick={addLanguage}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">
                          Global Styles
                        </span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                label="Style"
                                style={resumeData.languagesHeaderStyle}
                                onChange={(s) =>
                                  setResumeData({
                                    ...resumeData,
                                    languagesHeaderStyle: s,
                                  })
                                }
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Languages Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.languagesTitle}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        languagesTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Items
                            </span>
                            <StyleControlPopover
                              label="Style"
                              style={resumeData.languagesStyle}
                              onChange={(s) =>
                                setResumeData({
                                  ...resumeData,
                                  languagesStyle: s,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.languages.map((lang) => (
                        <div
                          key={lang.id}
                          className="p-3 border border-border rounded-lg space-y-2"
                        >
                          <div className="flex gap-2">
                            <Input
                              placeholder="Language"
                              value={lang.name}
                              onChange={(e) =>
                                updateLanguage(lang.id, "name", e.target.value)
                              }
                              className="flex-1"
                            />
                            <select
                              value={lang.proficiency}
                              onChange={(e) =>
                                updateLanguage(
                                  lang.id,
                                  "proficiency",
                                  e.target.value
                                )
                              }
                              className="p-2 text-sm border rounded bg-background"
                            >
                              {proficiencyLevels.map((level) => (
                                <option key={level} value={level}>
                                  {level.charAt(0).toUpperCase() +
                                    level.slice(1)}
                                </option>
                              ))}
                            </select>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLanguage(lang.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Certificates & Achievements */}
                <AccordionItem
                  value="certificates"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          Certificates & Achievements
                        </h3>
                      </div>
                      <PieChart
                        percentage={calculateCertificatesCompletion()}
                      />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Button
                          onClick={addCertificate}
                          size="sm"
                          variant="outline"
                        >
                          <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded gap-2">
                        <span className="text-xs font-medium">
                          Global Styles
                        </span>
                        <div className="flex gap-4">
                          <div className="flex items-end gap-2">
                            <div>
                              <span className="text-xs text-muted-foreground block mb-1">
                                Header
                              </span>
                              <StyleControlPopover
                                label="Style"
                                style={resumeData.certificatesHeaderStyle}
                                onChange={(s) =>
                                  setResumeData({
                                    ...resumeData,
                                    certificatesHeaderStyle: s,
                                  })
                                }
                              />
                            </div>
                            <Popover>
                              <PopoverTrigger asChild>
                                <div className="flex items-center justify-center gap-2 cursor-pointer text-xs text-muted-foreground hover:text-foreground transition-colors group">
                                  <span>Edit Title</span>
                                  <Settings className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                                </div>
                              </PopoverTrigger>
                              <PopoverContent className="w-80">
                                <div className="space-y-4">
                                  <h4 className="font-medium text-sm">
                                    Certificates Section Title
                                  </h4>
                                  <Input
                                    placeholder="Enter section title"
                                    value={resumeData.certificatesTitle}
                                    onChange={(e) =>
                                      setResumeData({
                                        ...resumeData,
                                        certificatesTitle: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div>
                            <span className="text-xs text-muted-foreground block mb-1">
                              Items
                            </span>
                            <StyleControlPopover
                              label="Style"
                              style={resumeData.certificatesStyle}
                              onChange={(s) =>
                                setResumeData({
                                  ...resumeData,
                                  certificatesStyle: s,
                                })
                              }
                            />
                          </div>
                        </div>
                      </div>

                      {resumeData.certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="p-3 border border-border rounded-lg space-y-3"
                        >
                          <div className="flex justify-between">
                            <h4 className="font-medium">Certificate Entry</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertificate(cert.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>

                          <Input
                            placeholder="Certificate/Achievement Name"
                            value={cert.name}
                            onChange={(e) =>
                              updateCertificate(cert.id, "name", e.target.value)
                            }
                          />

                          <div className="grid grid-cols-2 gap-2">
                            <Input
                              placeholder="Issuing Organization"
                              value={cert.issuer}
                              onChange={(e) =>
                                updateCertificate(
                                  cert.id,
                                  "issuer",
                                  e.target.value
                                )
                              }
                            />
                            <Input
                              placeholder="Date (e.g., Jan 2023)"
                              value={cert.date}
                              onChange={(e) =>
                                updateCertificate(
                                  cert.id,
                                  "date",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          <div>
                            <label className="text-xs font-medium">
                              Description
                            </label>
                            <TextEditor
                              value={cert.description}
                              onChange={(content) =>
                                updateCertificate(
                                  cert.id,
                                  "description",
                                  content
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* TAB 4: STYLING */}
            <TabsContent value="styling" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={[]}
                className="space-y-3"
              >
                {/* Colors Section */}
                <AccordionItem
                  value="colors"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Theme Colors</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Customize the color scheme for your resume template
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Primary Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.primary}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      primary: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.primary}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      primary: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Secondary Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.secondary}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      secondary: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.secondary}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      secondary: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Accent Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.accent}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      accent: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.accent}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      accent: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Text Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.text}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      text: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.text}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      text: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Text Light Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.textLight}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      textLight: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.textLight}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      textLight: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Border Color
                          </label>
                          <div className="flex items-center gap-2">
                            <input
                              type="color"
                              value={resumeData.theme.colors.border}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      border: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="w-12 h-10 rounded cursor-pointer border"
                            />
                            <Input
                              value={resumeData.theme.colors.border}
                              onChange={(e) =>
                                setResumeData({
                                  ...resumeData,
                                  theme: {
                                    ...resumeData.theme,
                                    colors: {
                                      ...resumeData.theme.colors,
                                      border: e.target.value,
                                    },
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Spacing Section */}
                <AccordionItem
                  value="spacing"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">
                          Spacing & Layout
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Control margins, gaps, and line heights for your resume
                      </p>

                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Page Margin: {resumeData.theme.spacing.pageMargin}mm
                          </label>
                          <input
                            type="range"
                            min="10"
                            max="30"
                            step="1"
                            value={resumeData.theme.spacing.pageMargin}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                theme: {
                                  ...resumeData.theme,
                                  spacing: {
                                    ...resumeData.theme.spacing,
                                    pageMargin: Number(e.target.value),
                                  },
                                },
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>10mm</span>
                            <span>30mm</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Section Gap: {resumeData.theme.spacing.sectionGap}px
                          </label>
                          <input
                            type="range"
                            min="12"
                            max="48"
                            step="4"
                            value={resumeData.theme.spacing.sectionGap}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                theme: {
                                  ...resumeData.theme,
                                  spacing: {
                                    ...resumeData.theme.spacing,
                                    sectionGap: Number(e.target.value),
                                  },
                                },
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>12px</span>
                            <span>48px</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Line Height: {resumeData.theme.spacing.lineHeight}
                          </label>
                          <input
                            type="range"
                            min="1.2"
                            max="2.0"
                            step="0.1"
                            value={resumeData.theme.spacing.lineHeight}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                theme: {
                                  ...resumeData.theme,
                                  spacing: {
                                    ...resumeData.theme.spacing,
                                    lineHeight: Number(e.target.value),
                                  },
                                },
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>1.2</span>
                            <span>2.0</span>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">
                            Paragraph Gap:{" "}
                            {resumeData.theme.spacing.paragraphGap}px
                          </label>
                          <input
                            type="range"
                            min="4"
                            max="20"
                            step="2"
                            value={resumeData.theme.spacing.paragraphGap}
                            onChange={(e) =>
                              setResumeData({
                                ...resumeData,
                                theme: {
                                  ...resumeData.theme,
                                  spacing: {
                                    ...resumeData.theme.spacing,
                                    paragraphGap: Number(e.target.value),
                                  },
                                },
                              })
                            }
                            className="w-full"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>4px</span>
                            <span>20px</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Font Family Section */}
                <AccordionItem
                  value="fonts"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <div className="flex items-center gap-3">
                        <h3 className="font-semibold text-lg">Font Family</h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">
                        Choose a professional font for your entire resume
                      </p>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Resume Font
                        </label>
                        <select
                          value={resumeData.theme.fontFamily}
                          onChange={(e) =>
                            setResumeData({
                              ...resumeData,
                              theme: {
                                ...resumeData.theme,
                                fontFamily: e.target.value,
                              },
                            })
                          }
                          className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm"
                        >
                          <option value="Inter, system-ui, -apple-system, sans-serif">
                            Inter (Modern)
                          </option>
                          <option value="Arial, sans-serif">
                            Arial (Classic)
                          </option>
                          <option value="Helvetica, sans-serif">
                            Helvetica (Professional)
                          </option>
                          <option value="Georgia, serif">
                            Georgia (Elegant)
                          </option>
                          <option value="'Times New Roman', serif">
                            Times New Roman (Traditional)
                          </option>
                          <option value="Roboto, sans-serif">
                            Roboto (Clean)
                          </option>
                          <option value="'Open Sans', sans-serif">
                            Open Sans (Friendly)
                          </option>
                          <option value="Lato, sans-serif">
                            Lato (Contemporary)
                          </option>
                          <option value="Merriweather, serif">
                            Merriweather (Sophisticated)
                          </option>
                          <option value="Calibri, sans-serif">
                            Calibri (Modern)
                          </option>
                          <option value="Verdana, sans-serif">
                            Verdana (Clear)
                          </option>
                          <option value="Garamond, serif">
                            Garamond (Classic Serif)
                          </option>
                        </select>
                        <p className="text-xs text-muted-foreground mt-2">
                          Selected font will apply to all text in your resume
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>

          {/* Save Buttons */}
          {/* <div className="flex gap-3">
            <Link href="/resumes" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div> */}
        </div>

        {/* Live Preview - 2/3 */}
        <div className="lg:col-span-2 sticky top-4">
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
          <TemplatePreview
            templateId={selectedTemplate}
            data={resumeData}
            previewRef={previewRef}
          />
        </div>
      </div>
    </div>
  );
}

function TemplatePreview({
  templateId,
  data,
  previewRef,
}: {
  templateId: string;
  data: ResumeData;
  previewRef: React.RefObject<HTMLDivElement | null>;
}) {
  // Convert template data to the format expected by templates
  const templateData = {
    theme: data.theme,
    personalInfo: {
      fullName: data.personalInfo.fullName,
      jobTitle: data.personalInfo.jobTitle,
      email: data.personalInfo.email,
      phone: data.personalInfo.phone,
      location: data.personalInfo.location,
      profileImage: data.personalInfo.profileImage,
      summary: data.about.content,
      socialLinks: data.socialLinks.map((link) => ({
        platform: link.platform,
        url: link.url,
      })),
    },
    experience: data.experience.map((exp) => ({
      id: exp.id,
      company: exp.company,
      position: exp.jobTitle,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
    })),
    education: data.education.map((edu) => ({
      id: edu.id,
      school: edu.school,
      degree: edu.degree,
      field: edu.field,
      startDate: edu.startDate,
      graduationYear: edu.currentlyStudying ? "Present" : edu.endDate,
      currentlyStudying: edu.currentlyStudying,
    })),
    skills: data.skills.map((skill) => ({
      id: skill.id,
      name: skill.name,
    })),
    projects: data.projects.map((project) => ({
      id: project.id,
      name: project.name,
      description: project.description,
      previewUrl: project.previewUrl,
      githubUrl: project.githubUrl,
      otherUrl: project.otherUrl,
    })),
    languages: data.languages.map((lang) => ({
      id: lang.id,
      name: lang.name,
      proficiency: lang.proficiency,
    })),
    certificates: data.certificates.map((cert) => ({
      id: cert.id,
      name: cert.name,
      issuer: cert.issuer,
      date: cert.date,
      description: cert.description,
    })),
  };

  // Render the selected template
  const renderTemplate = () => {
    switch (templateId) {
      case "minimal":
        return <Template3Minimal data={templateData} />;
      case "creative":
        return <Template4Creative data={templateData} />;
      case "contemporary":
        return <Template6Contemporary data={templateData} />;
      case "ivyleague":
        return <Template8IvyLeague data={templateData} />;
      case "single":
        return <Template9Single data={templateData} />;
      case "condensed":
        return <Template10Condensed data={templateData} />;
      case "jordansmith":
        return <Template11JordanSmith data={templateData} />;
      case "classic":
      default:
        return <Template1Classic data={templateData} />;
    }
  };

  return (
    <div className="flex justify-center" id="resume-preview" ref={previewRef}>
      <style jsx global>{`
        @media screen {
          .resume-page-container {
            display: flex;
            flex-direction: column;
            gap: 0;
            background: #f4f7fdff;

            border-radius: 8px;
          }

          .a4-page {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
              0 4px 8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05);
            position: relative;
            margin-bottom: 20px !important;
            margin-top: 0 !important;
            page-break-after: always;
            width: 210mm;
            height: 297mm;
            overflow: hidden;
          }

          /* Create Word-like page breaks every 297mm with visible gap */
          .a4-page > div {
            position: relative;
            width: 100%;
            height: 100%;
            overflow: visible;
          }
        }

        @media print {
          .resume-page-container {
            gap: 0;
            background: transparent !important;
            padding: 0 !important;
          }

          .a4-page {
            margin: 0 !important;
            box-shadow: none !important;
          }

          .a4-page::before {
            display: none;
          }

          .a4-page > div::after {
            display: none;
          }

          .a4-page > div {
            background-image: none !important;
            page-break-inside: auto;
          }

          /* Force page break every 297mm */
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
      <div className="resume-page-container">{renderTemplate()}</div>
    </div>
  );
}
