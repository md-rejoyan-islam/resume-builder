"use client";

import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { cn } from "@/lib/utils";
import type {
  Skill,
  Experience,
  Education,
  Certification,
  Project,
  Reference,
  Language,
  Volunteer,
  Publication,
} from "@/lib/resume-format";
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
import {
  CenteredTemplate,
  ClassicTemplate,
  ExecutiveTemplate,
  ModernDarkTemplate,
  ProfessionalTemplate,
  ResumePageWrapper,
} from "./templates";

// Template options for finalize step - maps to template registry
const templateOptions = [
  { id: "modern-dark", name: "Modern Dark" },
  { id: "professional", name: "Professional" },
  { id: "classic", name: "Classic" },
  { id: "executive", name: "Executive" },
  { id: "centered", name: "Centered" },
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
  // Progress tracking
  completedSteps?: Set<string>;
  totalSteps?: number;
  // Template management (synced with sidebar)
  selectedTemplate?: string;
  onTemplateChange?: (templateId: string) => void;
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
  completedSteps = new Set(),
  totalSteps = 11,
  selectedTemplate: externalTemplate = "classic",
  onTemplateChange,
}: FinalizeStepProps) {
  // Generate resume name from contact info
  const resumeName = `${formData.firstName || ""}${
    formData.lastName ? "_" + formData.lastName : ""
  }_Resume`.replace(/^_/, "Resume");
  const [activeTab, setActiveTab] = useState<"templates" | "formatting">(
    "templates"
  );
  // Use local state only if no external control is provided
  const [localTemplate, setLocalTemplate] = useState(externalTemplate);
  const selectedTemplate = onTemplateChange ? externalTemplate : localTemplate;
  const setSelectedTemplate = (templateId: string) => {
    if (onTemplateChange) {
      onTemplateChange(templateId);
    } else {
      setLocalTemplate(templateId);
    }
  };
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

  // Handle PDF download using browser print
  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);

    try {
      // Get all page elements
      const pages = resumeRef.current.querySelectorAll(".rt-page");

      if (pages.length === 0) {
        console.error("No pages found to export");
        setIsDownloading(false);
        return;
      }

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        console.error("Could not open print window");
        setIsDownloading(false);
        return;
      }

      // Get all stylesheets from the current document
      const styleSheets = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            if (sheet.cssRules) {
              return Array.from(sheet.cssRules)
                .map((rule) => rule.cssText)
                .join("\n");
            }
          } catch (e) {
            // Handle cross-origin stylesheets
            if (sheet.href) {
              return `@import url("${sheet.href}");`;
            }
          }
          return "";
        })
        .join("\n");

      // Clone the pages content
      const pagesHtml = Array.from(pages)
        .map((page, index) => {
          const clone = page.cloneNode(true) as HTMLElement;
          // Reset all inline styles - let CSS handle sizing
          clone.removeAttribute("style");
          clone.classList.add("print-rt-page");

          // Wrap in container for page break
          const isLast = index === pages.length - 1;
          return `<div class="print-page" ${
            isLast ? "" : 'style="page-break-after: always;"'
          }>${clone.outerHTML}</div>`;
        })
        .join("");

      // Write the print document
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${resumeName}</title>
            <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;500;700&family=Montserrat:wght@400;500;700&family=Open+Sans:wght@400;500;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
            <style>
              ${styleSheets}

              * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
              }

              html, body {
                margin: 0;
                padding: 0;
                background: white;
              }

              .print-page {
                width: 210mm;
                height: 297mm;
                overflow: hidden;
                position: relative;
                background: white;
              }

              .print-rt-page,
              .rt-page {
                width: 210mm !important;
                height: 297mm !important;
                max-width: 210mm !important;
                max-height: 297mm !important;
                min-width: 210mm !important;
                min-height: 297mm !important;
                box-shadow: none !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
                background: white !important;
              }

              .rt-container,
              .rt-container-flex {
                width: 100% !important;
                max-width: 100% !important;
                min-height: 297mm !important;
                height: 297mm !important;
              }

              .rt-content-viewport {
                height: 297mm !important;
                top: 0 !important;
                position: absolute !important;
                left: 0 !important;
                right: 0 !important;
              }

              .rt-scrolling-container {
                min-height: 297mm !important;
                height: 297mm !important;
              }

              /* Hide page numbers in print */
              .rt-page-number {
                display: none !important;
              }

              /* Hide measure container in print */
              .rt-measure-container {
                display: none !important;
              }

              /* Sidebar background should fill full height */
              .rt-sidebar-bg {
                height: 297mm !important;
              }

              @media print {
                @page {
                  size: A4;
                  margin: 0;
                }

                html, body {
                  -webkit-print-color-adjust: exact !important;
                  print-color-adjust: exact !important;
                }

                .print-page {
                  page-break-inside: avoid;
                }
              }
            </style>
          </head>
          <body>
            ${pagesHtml}
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for fonts and images to load
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsDownloading(false);
        }, 500);
      };

      // Fallback if onload doesn't fire
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.print();
          printWindow.close();
        }
        setIsDownloading(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  };

  // Calculate progress percentage
  const progressPercent = Math.round((completedSteps.size / totalSteps) * 100);

  return (
    <div className="h-full flex flex-col pt-4 lg:pt-6 ">
      {/* Progress, ATS & Action Bar */}
      <div className="z-10 px-4 lg:px-0">
        <div className="bg-white dark:bg-card border border-border rounded-xl px-5 py-3 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left: Progress Bar */}
            <div className="flex-1 min-w-[150px] max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-600 dark:text-muted-foreground">
                  Progress
                </span>
                <span className="text-xs font-semibold text-primary">
                  {progressPercent}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Center: ATS Score */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-accent/30 px-3 py-1.5 rounded-full">
                <CircularProgress value={55} size={28} strokeWidth={3} />
                <div className="hidden sm:block">
                  <span className="text-[10px] text-muted-foreground block leading-tight">
                    ATS Score
                  </span>
                  <span className="text-xs font-semibold text-primary leading-tight">
                    Good
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="outline" size="sm" className="gap-2">
                <Mail className="w-4 h-4" />
                <span className="hidden sm:inline">Email</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">
                  {isDownloading ? "Downloading..." : "Download"}
                </span>
              </Button>

              <Button
                size="sm"
                className="gap-2 bg-orange-500 hover:bg-orange-600 text-white"
              >
                Save & Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
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
                  ) : selectedTemplate === "classic" ? (
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

          {/* Right Sidebar - Templates & Formatting (Sticky on desktop) */}
          <div className="w-full lg:w-80 lg:sticky lg:top-4 bg-card rounded-xl border border-border p-4 h-[620px] flex flex-col lg:shrink-0">
            {/* Tabs */}
            <div className="flex border-b border-border mb-4">
              <button
                onClick={() => setActiveTab("templates")}
                className={cn(
                  "flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors",
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
                  "flex-1 flex items-center cursor-pointer justify-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors",
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
                  {templateOptions.map((template) => {
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
                            ) : template.id === "classic" ? (
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
