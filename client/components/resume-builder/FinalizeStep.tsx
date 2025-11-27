"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Download,
  FileText,
  Loader2,
  Mail,
  Palette,
  RotateCcw,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Certification } from "./CertificationForm";
import { Education } from "./EducationForm";
import { Experience } from "./ExperienceForm";
import { Language } from "./LanguageForm";
import { Project } from "./ProjectForm";
import { Publication } from "./PublicationForm";
import { Reference } from "./ReferenceForm";
import { Skill } from "./SkillsForm";
import { Volunteer } from "./VolunteerForm";
import {
  CenteredTemplate,
  ClassicTemplate,
  ExecutiveTemplate,
  ModernDarkTemplate,
  ProfessionalTemplate,
  ResumePageWrapper,
} from "./templates";

// Template thumbnails data - only templates with implemented components
const templates = [
  { id: "modern-dark", name: "Modern Dark", color: "bg-slate-800" },
  { id: "professional", name: "Professional", color: "bg-slate-100" },
  { id: "classic-white", name: "Classic White", color: "bg-white" },
  { id: "executive", name: "Executive", color: "bg-slate-50" },
  { id: "centered", name: "Centered", color: "bg-white" },
];

// Color palette options
const colorOptions = [
  { id: "black", color: "#1f2937" },
  { id: "blue-dark", color: "#1e40af" },
  { id: "cyan", color: "#0891b2" },
  { id: "teal", color: "#0d9488" },
  { id: "amber", color: "#d97706" },
  { id: "purple", color: "#7c3aed" },
  { id: "gray", color: "#4b5563" },
  { id: "indigo", color: "#4f46e5" },
  { id: "blue", color: "#2563eb" },
  { id: "emerald", color: "#059669" },
  { id: "yellow", color: "#eab308" },
  { id: "violet", color: "#8b5cf6" },
  { id: "slate", color: "#94a3b8" },
  { id: "sky", color: "#0ea5e9" },
  { id: "navy", color: "#1e3a5f" },
  { id: "pink", color: "#ec4899" },
  { id: "orange", color: "#f97316" },
  { id: "lavender", color: "#c4b5fd" },
];

// Font size options
const fontSizes = [
  { id: "small", label: "Small", icon: "A" },
  { id: "default", label: "Default", icon: "A" },
  { id: "large", label: "Large", icon: "A" },
];

// Font family options with CSS font-family values
const fontFamilies = [
  { id: "roboto", name: "Roboto", css: "'Roboto', sans-serif" },
  { id: "opensans", name: "Open Sans", css: "'Open Sans', sans-serif" },
  { id: "lato", name: "Lato", css: "'Lato', sans-serif" },
  { id: "montserrat", name: "Montserrat", css: "'Montserrat', sans-serif" },
  { id: "poppins", name: "Poppins", css: "'Poppins', sans-serif" },
];

// Font size multipliers
const fontSizeMultipliers = {
  small: 0.85,
  default: 1,
  large: 1.15,
};

interface FinalizeStepProps {
  // Contact form data
  formData: Record<string, string>;
  // Skills
  skills: Skill[];
  // Experiences
  experiences: Experience[];
  // Educations
  educations: Education[];
  // Certifications
  certifications: Certification[];
  // Projects
  projects: Project[];
  // References
  references: Reference[];
  // Languages
  languages: Language[];
  // Volunteers
  volunteers: Volunteer[];
  // Publications
  publications: Publication[];
}

export function FinalizeStep({
  formData,
  skills,
  experiences,
  educations,
  certifications,
  projects,
  references,
  languages,
  volunteers,
  publications,
}: FinalizeStepProps) {
  // Generate resume name from contact info
  const resumeName = `${formData.firstName || ""}${
    formData.lastName ? "_" + formData.lastName : ""
  }_Resume`.replace(/^_/, "Resume");
  const [activeTab, setActiveTab] = useState<"templates" | "formatting">(
    "templates"
  );
  const [selectedTemplate, setSelectedTemplate] = useState("modern-dark");
  const [selectedColor, setSelectedColor] = useState("#1e40af");
  const [selectedFontSize, setSelectedFontSize] = useState("default");
  const [selectedFont, setSelectedFont] = useState("roboto");
  const [showMoreFontSettings, setShowMoreFontSettings] = useState(false);
  const [sectionSpacing, setSectionSpacing] = useState(75);
  const [paragraphSpacing, setParagraphSpacing] = useState(50);
  const [lineSpacing, setLineSpacing] = useState(25);
  const [isDownloading, setIsDownloading] = useState(false);

  // Ref for the resume content to download
  const resumeRef = useRef<HTMLDivElement>(null);

  // Load Google Fonts dynamically
  useEffect(() => {
    const fontLink = document.getElementById("google-fonts-link");
    if (!fontLink) {
      const link = document.createElement("link");
      link.id = "google-fonts-link";
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Calculate dynamic styles based on settings
  const fontMultiplier =
    fontSizeMultipliers[selectedFontSize as keyof typeof fontSizeMultipliers] ||
    1;
  const currentFontFamily =
    fontFamilies.find((f) => f.id === selectedFont)?.css ||
    "'Roboto', sans-serif";

  // Calculate spacing values (convert 0-100 slider to actual px values)
  const sectionGap = 8 + (sectionSpacing / 100) * 16; // 8px to 24px
  const paragraphGap = 4 + (paragraphSpacing / 100) * 8; // 4px to 12px
  const lineHeight = 1.2 + (lineSpacing / 100) * 0.6; // 1.2 to 1.8

  // Dynamic font sizes
  const fontSize = {
    name: `${30 * fontMultiplier}px`,
    sectionTitle: `${12 * fontMultiplier}px`,
    itemTitle: `${10 * fontMultiplier}px`,
    body: `${9 * fontMultiplier}px`,
    small: `${8 * fontMultiplier}px`,
  };

  const handleResetColor = () => {
    setSelectedColor("#1e40af");
  };

  const handleResetFontSettings = () => {
    setSelectedFontSize("default");
    setSelectedFont("roboto");
    setSectionSpacing(75);
    setParagraphSpacing(50);
    setLineSpacing(25);
  };

  // Handle PDF download using html2canvas-pro (preserves all styling)
  const handleDownloadPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      // Dynamically import html2canvas-pro and jspdf to avoid SSR issues
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      // Get all page elements
      const pages = resumeRef.current.querySelectorAll(".bg-white.shadow-lg");

      if (pages.length === 0) {
        // Fallback: capture the entire content
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "letter",
        });

        const pageWidth = 8.5;
        const imgWidth = pageWidth;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save(`${resumeName}.pdf`);
      } else {
        // Multiple pages: capture each page separately
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "in",
          format: "letter",
        });

        const pageWidth = 8.5;
        const pageHeight = 11;

        for (let i = 0; i < pages.length; i++) {
          const page = pages[i] as HTMLElement;

          const canvas = await html2canvas(page, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: "#ffffff",
          });

          const imgData = canvas.toDataURL("image/png", 1.0);

          if (i > 0) {
            pdf.addPage();
          }

          pdf.addImage(imgData, "PNG", 0, 0, pageWidth, pageHeight);
        }

        pdf.save(`${resumeName}.pdf`);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="h-full flex flex-col pt-4 lg:pt-6 ">
      {/* Sticky Action Bar */}
      <div className="sticky top-0 z-10 ">
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Mail className="w-4 h-4" />
              Email
            </Button>

            <Button
              variant="outline"
              className="gap-2 h-9"
              onClick={handleDownloadPDF}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              {isDownloading ? "Downloading..." : "Download"}
            </Button>
            <Button
              size="sm"
              className="gap-2 bg-orange-500 hover:bg-orange-600 text-white h-9"
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Resume Preview Card */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto p-4">
              {/* Resume Preview Content with Multi-Page Support */}
              <div ref={resumeRef}>
                <ResumePageWrapper
                  fontFamily={currentFontFamily}
                  accentColor={selectedColor}
                  sidebar={
                    selectedTemplate === "professional"
                      ? {
                          position: "right",
                          width: "35%",
                          backgroundColor: `${selectedColor}08`,
                        }
                      : selectedTemplate === "executive"
                      ? {
                          position: "left",
                          width: "35%",
                          backgroundColor: `${selectedColor}08`,
                        }
                      : undefined
                  }
                >
                  {selectedTemplate === "professional" ? (
                    <ProfessionalTemplate
                      data={{
                        formData,
                        skills,
                        experiences,
                        educations,
                        certifications,
                        projects,
                        references,
                        languages,
                        volunteers,
                        publications,
                      }}
                      styles={{
                        fontFamily: currentFontFamily,
                        fontSize,
                        sectionGap,
                        paragraphGap,
                        lineHeight,
                        accentColor: selectedColor,
                      }}
                    />
                  ) : selectedTemplate === "classic-white" ? (
                    <ClassicTemplate
                      data={{
                        formData,
                        skills,
                        experiences,
                        educations,
                        certifications,
                        projects,
                        references,
                        languages,
                        volunteers,
                        publications,
                      }}
                      styles={{
                        fontFamily: currentFontFamily,
                        fontSize,
                        sectionGap,
                        paragraphGap,
                        lineHeight,
                        accentColor: selectedColor,
                      }}
                    />
                  ) : selectedTemplate === "executive" ? (
                    <ExecutiveTemplate
                      data={{
                        formData,
                        skills,
                        experiences,
                        educations,
                        certifications,
                        projects,
                        references,
                        languages,
                        volunteers,
                        publications,
                      }}
                      styles={{
                        fontFamily: currentFontFamily,
                        fontSize,
                        sectionGap,
                        paragraphGap,
                        lineHeight,
                        accentColor: selectedColor,
                      }}
                    />
                  ) : selectedTemplate === "centered" ? (
                    <CenteredTemplate
                      data={{
                        formData,
                        skills,
                        experiences,
                        educations,
                        certifications,
                        projects,
                        references,
                        languages,
                        volunteers,
                        publications,
                      }}
                      styles={{
                        fontFamily: currentFontFamily,
                        fontSize,
                        sectionGap,
                        paragraphGap,
                        lineHeight,
                        accentColor: selectedColor,
                      }}
                    />
                  ) : (
                    <ModernDarkTemplate
                      data={{
                        formData,
                        skills,
                        experiences,
                        educations,
                        certifications,
                        projects,
                        references,
                        languages,
                        volunteers,
                        publications,
                      }}
                      styles={{
                        fontFamily: currentFontFamily,
                        fontSize,
                        sectionGap,
                        paragraphGap,
                        lineHeight,
                        accentColor: selectedColor,
                      }}
                    />
                  )}
                </ResumePageWrapper>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Templates & Formatting */}
          <div className="w-full lg:w-80 bg-card rounded-xl border border-border p-4 h-[650px] flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-border mb-4">
              <button
                onClick={() => setActiveTab("templates")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "templates"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                )}
              >
                <FileText className="w-4 h-4" />
                Templates
              </button>
              <button
                onClick={() => setActiveTab("formatting")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors",
                  activeTab === "formatting"
                    ? "border-primary text-primary"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                )}
              >
                <Palette className="w-4 h-4" />
                Formatting
              </button>
            </div>

            {/* Tab Content */}
            <div className="overflow-y-auto ">
              {activeTab === "templates" && (
                <div className="grid grid-cols-2 gap-3">
                  {templates.map((template) => {
                    // Preview styles for thumbnails
                    const previewStyles = {
                      fontFamily: "'Roboto', sans-serif",
                      fontSize: {
                        name: "24px",
                        sectionTitle: "11px",
                        itemTitle: "10px",
                        body: "9px",
                        small: "8px",
                      },
                      sectionGap: 12,
                      paragraphGap: 6,
                      lineHeight: 1.4,
                      accentColor: selectedColor,
                    };
                    const previewData = {
                      formData,
                      skills,
                      experiences,
                      educations,
                      certifications,
                      projects,
                      references,
                      languages,
                      volunteers,
                      publications,
                    };

                    return (
                      <div key={template.id} className="flex flex-col gap-1">
                        <button
                          onClick={() => setSelectedTemplate(template.id)}
                          className={cn(
                            "relative aspect-[8.5/11] rounded-lg border-2 overflow-hidden transition-all hover:shadow-md",
                            selectedTemplate === template.id
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-border hover:border-slate-300"
                          )}
                        >
                          {/* Template Preview - Scaled Down */}
                          <div className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none">
                            {template.id === "professional" ? (
                              <ProfessionalTemplate
                                data={previewData}
                                styles={previewStyles}
                              />
                            ) : template.id === "classic-white" ? (
                              <ClassicTemplate
                                data={previewData}
                                styles={previewStyles}
                              />
                            ) : template.id === "executive" ? (
                              <ExecutiveTemplate
                                data={previewData}
                                styles={previewStyles}
                              />
                            ) : template.id === "centered" ? (
                              <CenteredTemplate
                                data={previewData}
                                styles={previewStyles}
                              />
                            ) : (
                              <ModernDarkTemplate
                                data={previewData}
                                styles={previewStyles}
                              />
                            )}
                          </div>
                          {/* Selection indicator */}
                          {selectedTemplate === template.id && (
                            <div className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center z-10">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                        {/* Template Name */}
                        <p
                          className={cn(
                            "text-xs text-center font-medium",
                            selectedTemplate === template.id
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        >
                          {template.name}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}

              {activeTab === "formatting" && (
                <div className="space-y-6">
                  {/* Colors Section */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-foreground mb-3">
                      Colors
                    </h3>
                    <div className="grid grid-cols-6 gap-2">
                      {colorOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedColor(option.color)}
                          className={cn(
                            "w-10 h-10 rounded-full transition-all hover:scale-110",
                            selectedColor === option.color &&
                              "ring-2 ring-offset-2 ring-primary"
                          )}
                          style={{ backgroundColor: option.color }}
                        />
                      ))}
                    </div>

                    {/* Pantone of the year */}
                    <button className="w-full mt-3 py-2 px-3 rounded-lg border border-border flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-accent transition-colors">
                      <span className="w-8 h-8 rounded-full bg-[#a47764]"></span>
                      <span className="text-sm">
                        <span className="font-semibold">PANTONE</span> of the
                        year
                      </span>
                    </button>

                    {/* Reset color */}
                    <button
                      onClick={handleResetColor}
                      className="w-full mt-2 py-2 px-3 rounded-lg border border-border flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-accent transition-colors text-sm text-slate-600"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset color
                    </button>
                  </div>

                  {/* Font Settings */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-foreground mb-3">
                      Font settings
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {fontSizes.map((size, index) => (
                        <button
                          key={size.id}
                          onClick={() => setSelectedFontSize(size.id)}
                          className={cn(
                            "py-4 rounded-lg border-2 transition-all flex flex-col items-center justify-center",
                            selectedFontSize === size.id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-slate-300"
                          )}
                        >
                          <span
                            className={cn(
                              "font-bold",
                              index === 0
                                ? "text-lg"
                                : index === 1
                                ? "text-xl"
                                : "text-2xl"
                            )}
                          >
                            {size.icon}
                          </span>
                          <span className="text-xs text-slate-500 mt-1">
                            {size.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* More Font Settings */}
                  <div className="border border-border rounded-lg">
                    <button
                      onClick={() =>
                        setShowMoreFontSettings(!showMoreFontSettings)
                      }
                      className="w-full py-3 px-4 flex items-center justify-between text-sm font-medium"
                    >
                      More font settings
                      {showMoreFontSettings ? (
                        <X className="w-4 h-4" />
                      ) : (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      )}
                    </button>

                    {showMoreFontSettings && (
                      <div className="px-4 pb-4 space-y-4">
                        {/* Section Spacing */}
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Section Spacing
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sectionSpacing}
                            onChange={(e) =>
                              setSectionSpacing(Number(e.target.value))
                            }
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>

                        {/* Paragraph Spacing */}
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Paragraph Spacing
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={paragraphSpacing}
                            onChange={(e) =>
                              setParagraphSpacing(Number(e.target.value))
                            }
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>

                        {/* Line Spacing */}
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Line Spacing
                          </label>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={lineSpacing}
                            onChange={(e) =>
                              setLineSpacing(Number(e.target.value))
                            }
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                          />
                        </div>

                        {/* Font Family */}
                        <div>
                          <label className="text-xs text-slate-600 mb-2 block">
                            Font
                          </label>
                          <select
                            value={selectedFont}
                            onChange={(e) => setSelectedFont(e.target.value)}
                            className="w-full py-2 px-3 border border-border rounded-lg text-sm bg-white dark:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            {fontFamilies.map((font) => (
                              <option key={font.id} value={font.id}>
                                {font.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Reset font settings */}
                        <button
                          onClick={handleResetFontSettings}
                          className="w-full py-2 flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-primary transition-colors"
                        >
                          <RotateCcw className="w-4 h-4" />
                          Reset font settings
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
