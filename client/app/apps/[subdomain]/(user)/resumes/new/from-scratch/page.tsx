"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { useEffect, useState } from "react";

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

interface ResumeData {
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
}

const defaultFieldStyle: FieldStyle = {
  fontFamily: "Arial",
  fontSize: 16,
  color: "#000000",
  align: "left",
};

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
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
    content: "",
  },
  skills: [],
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
  socialLinks: [],
  socialLinksTitle: "Social Links",
  socialLinksStyle: {
    fontFamily: "Arial",
    fontSize: 12,
    color: "#0066cc",
    align: "left",
  },
  experience: [],
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
  education: [],
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
  projects: [],
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
  languages: [],
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

const getPlatformIcon = (platform: string) => {
  const iconMap: Record<string, () => React.ReactElement> = {
    linkedin: () => (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    github: () => (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    twitter: () => (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M23.953 4.57a10 10 0 002.856-3.476c-3.769 1.676-7.843 2.881-12.068 3.622a5.968 5.968 0 00-3.58-1.395c-3.329 0-6.032 2.703-6.032 6.032 0 .472.056.93.167 1.38C3.873 9.49 0 7.5 0 7.5c0 2.046 1.045 3.847 2.604 4.91-1.172.375-2.267.966-3.21 1.855v.077c0 2.909 2.126 5.381 4.943 5.943-.517.142-1.063.216-1.622.216-.388 0-.765-.038-1.134-.111.765 2.383 2.944 4.121 5.544 4.17-2.112 1.656-4.788 2.643-7.668 2.643-.498 0-.99-.03-1.47-.09 2.189 1.404 4.768 2.222 7.548 2.222 9.052 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
      </svg>
    ),
    website: () => (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5.25 19.35c.677-.675 2.675-1.675 2.675-1.675s3.333 1.667 5.25 1.667c1.916 0 4.573-1 5.25-1.667.676-.667 2.674-1.675 2.674-1.675s1.667-2.333 1.667-5.25-1.667-5.25-1.667-5.25-2-1-2.674-1.667c-.677-.675-3.334-1.675-5.25-1.675-1.916 0-4.573 1-5.25 1.667-.676.667-2.674 1.675-2.674 1.675s-1.667 2.333-1.667 5.25 1.667 5.25 1.667 5.25 2 1 2.674 1.667z" />
      </svg>
    ),
    email: () => (
      <svg
        className="w-4 h-4"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  };

  return iconMap[platform] || null;
};

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

    const element = document.getElementById("resume-preview");
    if (!element) {
      console.error("Resume preview element not found");
      alert("Resume preview not found");
      return;
    }

    setIsDownloading(true);

    try {
      console.log("Starting PDF download...");

      // Dynamically import libraries
      console.log("Importing html2canvas...");
      const html2canvas = (await import("html2canvas")).default;
      console.log("html2canvas imported successfully");

      console.log("Importing jsPDF...");
      const { jsPDF } = await import("jspdf");
      console.log("jsPDF imported successfully");

      const filename = `${resumeData.personalInfo.fullName || "resume"}.pdf`;
      console.log("Filename:", filename);

      // Clone the element to avoid modifying the original
      const clonedElement = element.cloneNode(true) as HTMLElement;

      // Recursively apply computed styles as inline styles to preserve visual appearance
      const applyInlineStyles = (el: HTMLElement) => {
        const computed = window.getComputedStyle(el);

        // List of all CSS properties to preserve
        const properties = [
          "display",
          "position",
          "width",
          "height",
          "top",
          "left",
          "right",
          "bottom",
          "margin",
          "margin-top",
          "margin-right",
          "margin-bottom",
          "margin-left",
          "padding",
          "padding-top",
          "padding-right",
          "padding-bottom",
          "padding-left",
          "font-size",
          "font-weight",
          "font-family",
          "line-height",
          "text-align",
          "text-decoration",
          "letter-spacing",
          "word-spacing",
          "color",
          "background-color",
          "border",
          "border-top",
          "border-right",
          "border-bottom",
          "border-left",
          "border-radius",
          "flex-direction",
          "justify-content",
          "align-items",
          "gap",
          "flex-wrap",
          "flex-grow",
          "flex-shrink",
          "flex-basis",
          "opacity",
          "z-index",
          "box-shadow",
          "text-transform",
          "font-style",
        ];

        let inlineStyle = "";

        properties.forEach((prop) => {
          let value = computed.getPropertyValue(prop);
          if (!value || value === "none" || value === "auto") return;

          // Skip if value contains lab()
          if (value.includes("lab(")) {
            // Use fallback color
            if (prop === "color") {
              value = "black";
            } else if (prop === "background-color") {
              value = "transparent";
            } else {
              return;
            }
          }

          inlineStyle += `${prop}:${value};`;
        });

        if (inlineStyle) {
          el.setAttribute("style", inlineStyle);
        }

        // Process children
        Array.from(el.children).forEach((child) => {
          applyInlineStyles(child as HTMLElement);
        });
      };

      applyInlineStyles(clonedElement);

      // Create wrapper
      const tempWrapper = document.createElement("div");
      tempWrapper.setAttribute(
        "style",
        "position:absolute;left:-9999px;top:0;width:210mm;background:white;padding:10mm;margin:0;box-sizing:border-box;"
      );
      tempWrapper.appendChild(clonedElement);
      document.body.appendChild(tempWrapper);

      try {
        console.log("Converting to canvas with html2canvas...");

        // Use html2canvas without trying to parse stylesheets
        const canvas = await html2canvas(tempWrapper, {
          backgroundColor: "#ffffff",
          scale: 2,
          useCORS: true,
          allowTaint: true,
          logging: false,
          ignoreElements: (element: Element) => {
            // Ignore all style/link elements to prevent lab() parsing
            return (
              element.tagName === "SCRIPT" ||
              element.tagName === "STYLE" ||
              element.tagName === "LINK"
            );
          },
        });

        console.log(
          "Canvas created, dimensions:",
          canvas.width,
          "x",
          canvas.height
        );

        // Clean up
        document.body.removeChild(tempWrapper);

        // Create PDF
        console.log("Creating PDF document...");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Calculate image dimensions to fit on A4 page
        const imgWidth = pageWidth - 10; // 5mm margins on each side
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        let yPosition = 5; // Start from 5mm top margin
        let remainingHeight = imgHeight;

        // Convert canvas to image data
        const imageData = canvas.toDataURL("image/png");
        console.log("Image data created");

        // Add first page
        pdf.addImage(imageData, "PNG", 5, yPosition, imgWidth, imgHeight);
        remainingHeight -= pageHeight - 10;

        // Add additional pages if content extends beyond one page
        while (remainingHeight > 0) {
          pdf.addPage();
          yPosition = remainingHeight - imgHeight + 5;
          pdf.addImage(imageData, "PNG", 5, yPosition, imgWidth, imgHeight);
          remainingHeight -= pageHeight - 10;
        }

        // Save the PDF
        console.log("Saving PDF as:", filename);
        pdf.save(filename);

        alert("PDF downloaded successfully!");
      } catch (error) {
        console.error("Error during PDF generation:", error);
        if (document.body.contains(tempWrapper)) {
          document.body.removeChild(tempWrapper);
        }
        if (error instanceof Error) {
          alert(`Failed to download PDF: ${error.message}`);
        } else {
          alert("Failed to download PDF. Please try again.");
        }
      } finally {
        // Remove temp wrapper if still in DOM
        if (document.body.contains(tempWrapper)) {
          document.body.removeChild(tempWrapper);
        }

        setIsDownloading(false);
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
      if (error instanceof Error) {
        alert(`Failed to download PDF: ${error.message}`);
      } else {
        alert("Failed to download PDF. Please try again.");
      }
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

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>

            {/* TAB 1: PERSONAL */}
            <TabsContent value="personal" className="space-y-6 mt-6">
              {/* Header */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-lg">Personal Information</h3>

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
                    <label className="text-sm font-medium">Full Name</label>
                    <StyleControlPopover
                      label="Style"
                      style={resumeData.personalInfo.nameStyle}
                      onChange={(s) => updatePersonalStyle("nameStyle", s)}
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
                      onChange={(s) => updatePersonalStyle("titleStyle", s)}
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
                    <label className="text-sm font-medium">Location</label>
                    <StyleControlPopover
                      label="Style"
                      style={resumeData.personalInfo.contactStyle}
                      onChange={(s) => updatePersonalStyle("contactStyle", s)}
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

              {/* About Section */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-lg">About / Summary</h3>

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
                          onChange={(s) => updateAboutStyle("headerStyle", s)}
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
                        onChange={(s) => updateAboutStyle("contentStyle", s)}
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

              {/* Social Links */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Social Links</h3>
                  <Button onClick={addSocialLink} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-xs font-medium">Global Style</span>
                  <StyleControlPopover
                    label="Style"
                    style={resumeData.socialLinksStyle}
                    onChange={(s) =>
                      setResumeData({ ...resumeData, socialLinksStyle: s })
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
                          updateSocialLink(link.id, "platform", e.target.value)
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
            </TabsContent>

            {/* TAB 2: PROFESSIONAL */}
            <TabsContent value="professional" className="space-y-6 mt-6">
              {/* Skills */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">Skills</h3>
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

              {/* Experience */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Experience</h3>
                  <Button onClick={addExperience} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                  <span className="text-xs font-medium">Global Styles</span>
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
                        onChange={(s) => updateExperienceStyle("titleStyle", s)}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        Description
                      </span>
                      <StyleControlPopover
                        style={resumeData.experienceStyle.descStyle}
                        onChange={(s) => updateExperienceStyle("descStyle", s)}
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
                        updateExperience(exp.id, "jobTitle", e.target.value)
                      }
                    />
                    <Input
                      placeholder="Company"
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, "company", e.target.value)
                      }
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "startDate", e.target.value)
                        }
                      />
                      <Input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          updateExperience(exp.id, "endDate", e.target.value)
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
                      <label className="text-xs font-medium">Description</label>
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

              {/* Projects */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Projects</h3>
                  <Button onClick={addProject} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                  <span className="text-xs font-medium">Global Styles</span>
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
                      <label className="text-xs font-medium">Description</label>
                      <TextEditor
                        value={project.description}
                        onChange={(content) =>
                          updateProject(project.id, "description", content)
                        }
                      />
                    </div>

                    <Input
                      placeholder="Preview URL"
                      type="url"
                      value={project.previewUrl}
                      onChange={(e) =>
                        updateProject(project.id, "previewUrl", e.target.value)
                      }
                    />

                    <Input
                      placeholder="GitHub URL"
                      type="url"
                      value={project.githubUrl}
                      onChange={(e) =>
                        updateProject(project.id, "githubUrl", e.target.value)
                      }
                    />

                    <Input
                      placeholder="Other URL"
                      type="url"
                      value={project.otherUrl}
                      onChange={(e) =>
                        updateProject(project.id, "otherUrl", e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* TAB 3: EDUCATION */}
            <TabsContent value="education" className="space-y-6 mt-6">
              {/* Education */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-lg">Education</h3>
                  <Button onClick={addEducation} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-4 p-2 bg-muted/50 rounded gap-2">
                  <span className="text-xs font-medium">Global Styles</span>
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
                        onChange={(s) => updateEducationStyle("titleStyle", s)}
                      />
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground block mb-1">
                        Description
                      </span>
                      <StyleControlPopover
                        style={resumeData.educationStyle.descStyle}
                        onChange={(s) => updateEducationStyle("descStyle", s)}
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

                    <Input
                      type="date"
                      placeholder="Start Date"
                      value={edu.startDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "startDate", e.target.value)
                      }
                    />

                    <Input
                      type="date"
                      placeholder="End Date"
                      value={edu.endDate}
                      onChange={(e) =>
                        updateEducation(edu.id, "endDate", e.target.value)
                      }
                      disabled={edu.currentlyStudying}
                    />

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
                      <label className="text-xs font-medium">Description</label>
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

              {/* Languages */}
              <div className="space-y-3 p-4 bg-card border border-border rounded-lg">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">Languages</h3>
                  <Button onClick={addLanguage} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-1" /> Add
                  </Button>
                </div>

                <div className="flex items-center justify-between mb-3 p-2 bg-muted/50 rounded gap-2">
                  <span className="text-xs font-medium">Global Styles</span>
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
                          setResumeData({ ...resumeData, languagesStyle: s })
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
                          updateLanguage(lang.id, "proficiency", e.target.value)
                        }
                        className="p-2 text-sm border rounded bg-background"
                      >
                        {proficiencyLevels.map((level) => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
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

        {/* Live Preview */}
        <div className="sticky top-4">
          <LivePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
}

function LivePreview({ data }: { data: ResumeData }) {
  return (
    <div
      id="resume-preview"
      className="p-8 bg-white dark:bg-slate-950 border border-border rounded-lg shadow-lg space-y-4 max-h-screen overflow-auto text-sm"
    >
      {/* Header */}
      <div className="text-center border-b pb-4">
        {data.personalInfo.profileImage && (
          <div className="relative w-16 h-16 mx-auto mb-2">
            <Image
              src={data.personalInfo.profileImage}
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
        )}
        <h1
          style={{
            fontFamily: data.personalInfo.nameStyle.fontFamily,
            fontSize: `${data.personalInfo.nameStyle.fontSize}px`,
            color: data.personalInfo.nameStyle.color,
          }}
          className="font-bold"
        >
          {data.personalInfo.fullName || "Your Name"}
        </h1>
        {data.personalInfo.jobTitle && (
          <p
            style={{
              fontFamily: data.personalInfo.titleStyle.fontFamily,
              fontSize: `${data.personalInfo.titleStyle.fontSize}px`,
              color: data.personalInfo.titleStyle.color,
            }}
          >
            {data.personalInfo.jobTitle}
          </p>
        )}
        <div
          style={{
            fontFamily: data.personalInfo.contactStyle.fontFamily,
            fontSize: `${data.personalInfo.contactStyle.fontSize}px`,
            color: data.personalInfo.contactStyle.color,
          }}
          className="flex justify-center gap-3 flex-wrap mt-2"
        >
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>•</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo.location && <span>•</span>}
          {data.personalInfo.location && (
            <span>{data.personalInfo.location}</span>
          )}
        </div>
      </div>

      {/* Social Links */}
      {data.socialLinks.length > 0 && (
        <div className="flex justify-center gap-4 flex-wrap">
          {data.socialLinks.map((link) => {
            const platformName = link.platform.toLowerCase();
            const Icon = getPlatformIcon(platformName);

            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: data.socialLinksStyle.fontFamily,
                  fontSize: `${data.socialLinksStyle.fontSize}px`,
                  color: data.socialLinksStyle.color,
                  textAlign: data.socialLinksStyle.align,
                }}
                className="hover:underline flex items-center gap-2"
              >
                {link.showIcon && Icon && Icon()}
                {link.showLabel && link.platform}
              </a>
            );
          })}
        </div>
      )}

      {/* About */}
      {data.about.content && (
        <div>
          <h2
            style={{
              fontFamily: data.about.headerStyle.fontFamily,
              fontSize: `${data.about.headerStyle.fontSize}px`,
              color: data.about.headerStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.about.title}
          </h2>
          <div
            style={{
              fontFamily: data.about.contentStyle.fontFamily,
              fontSize: `${data.about.contentStyle.fontSize}px`,
              color: data.about.contentStyle.color,
            }}
            className="prose-preview"
            dangerouslySetInnerHTML={{ __html: data.about.content }}
          />
        </div>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: data.skillsHeaderStyle.fontFamily,
              fontSize: `${data.skillsHeaderStyle.fontSize}px`,
              color: data.skillsHeaderStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.skillsTitle}
          </h2>
          <div className="space-y-1">
            {data.skills.map((skill) => (
              <div key={skill.id}>
                <div
                  style={{
                    fontFamily: data.skillsStyle.fontFamily,
                    fontSize: `${data.skillsStyle.fontSize}px`,
                    color: data.skillsStyle.color,
                  }}
                  className="font-medium"
                >
                  {skill.name}
                </div>
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(skill.level / 5) * 100}%`,
                      backgroundColor: skill.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Experience */}
      {data.experience.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: data.experienceHeaderStyle.fontFamily,
              fontSize: `${data.experienceHeaderStyle.fontSize}px`,
              color: data.experienceHeaderStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.experienceTitle}
          </h2>
          <div className="space-y-2">
            {data.experience.map((exp) => (
              <div key={exp.id}>
                <div
                  style={{
                    fontFamily: data.experienceStyle.titleStyle.fontFamily,
                    fontSize: `${data.experienceStyle.titleStyle.fontSize}px`,
                    color: data.experienceStyle.titleStyle.color,
                  }}
                  className="font-semibold"
                >
                  {exp.jobTitle}
                </div>
                <div className="text-xs text-muted-foreground">
                  {exp.company}
                </div>
                <div className="text-xs text-muted-foreground">
                  {exp.startDate} -{" "}
                  {exp.currentlyWorking ? "Present" : exp.endDate}
                </div>
                {exp.description && (
                  <div
                    style={{
                      fontFamily: data.experienceStyle.descStyle.fontFamily,
                      fontSize: `${data.experienceStyle.descStyle.fontSize}px`,
                      color: data.experienceStyle.descStyle.color,
                    }}
                    className="text-xs mt-1 prose-preview"
                    dangerouslySetInnerHTML={{ __html: exp.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {data.education.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: data.educationHeaderStyle.fontFamily,
              fontSize: `${data.educationHeaderStyle.fontSize}px`,
              color: data.educationHeaderStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.educationTitle}
          </h2>
          <div className="space-y-2">
            {data.education.map((edu) => (
              <div key={edu.id}>
                <div
                  style={{
                    fontFamily: data.educationStyle.titleStyle.fontFamily,
                    fontSize: `${data.educationStyle.titleStyle.fontSize}px`,
                    color: data.educationStyle.titleStyle.color,
                  }}
                  className="font-semibold"
                >
                  {edu.degree}
                </div>
                <div className="text-xs text-muted-foreground">
                  {edu.school}
                </div>
                {edu.field && (
                  <div className="text-xs text-muted-foreground">
                    {edu.field}
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  {edu.startDate && `${edu.startDate}`}
                  {edu.startDate && edu.endDate && " - "}
                  {edu.currentlyStudying ? "Present" : edu.endDate}
                </div>
                {edu.description && (
                  <div
                    style={{
                      fontFamily: data.educationStyle.descStyle.fontFamily,
                      fontSize: `${data.educationStyle.descStyle.fontSize}px`,
                      color: data.educationStyle.descStyle.color,
                    }}
                    className="text-xs mt-1 prose-preview"
                    dangerouslySetInnerHTML={{ __html: edu.description }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {data.projects.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: data.projectsHeaderStyle.fontFamily,
              fontSize: `${data.projectsHeaderStyle.fontSize}px`,
              color: data.projectsHeaderStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.projectsTitle}
          </h2>
          <div className="space-y-2">
            {data.projects.map((project) => (
              <div key={project.id}>
                <div
                  style={{
                    fontFamily: data.projectsStyle.fontFamily,
                    fontSize: `${data.projectsStyle.fontSize}px`,
                    color: data.projectsStyle.color,
                  }}
                  className="font-semibold"
                >
                  {project.name}
                </div>
                {project.description && (
                  <div
                    style={{
                      fontFamily: data.projectsStyle.fontFamily,
                      fontSize: `${data.projectsStyle.fontSize}px`,
                      color: data.projectsStyle.color,
                    }}
                    className="text-xs mt-1 prose-preview"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                  />
                )}
                <div className="flex gap-2 mt-1 flex-wrap">
                  {project.previewUrl && (
                    <a
                      href={project.previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Preview
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      GitHub
                    </a>
                  )}
                  {project.otherUrl && (
                    <a
                      href={project.otherUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Link
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <div>
          <h2
            style={{
              fontFamily: data.languagesHeaderStyle.fontFamily,
              fontSize: `${data.languagesHeaderStyle.fontSize}px`,
              color: data.languagesHeaderStyle.color,
            }}
            className="font-bold uppercase text-xs tracking-wide mb-2"
          >
            {data.languagesTitle}
          </h2>
          <div className="space-y-1">
            {data.languages.map((lang) => (
              <div
                key={lang.id}
                style={{
                  fontFamily: data.languagesStyle.fontFamily,
                  fontSize: `${data.languagesStyle.fontSize}px`,
                  color: data.languagesStyle.color,
                }}
                className="text-xs"
              >
                {lang.name} - {lang.proficiency}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
