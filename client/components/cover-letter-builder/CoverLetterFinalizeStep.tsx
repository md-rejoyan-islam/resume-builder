"use client";

import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { useCoverLetterContext } from "@/context/CoverLetterContext";
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
import {
  ClassicCoverLetterTemplate,
  ExecutiveCoverLetterTemplate,
  ModernCoverLetterTemplate,
  ProfessionalCoverLetterTemplate,
} from "./templates";

// Template options
const templateOptions = [
  { id: "classic", name: "Classic" },
  { id: "modern", name: "Modern" },
  { id: "professional", name: "Professional" },
  { id: "executive", name: "Executive" },
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

// Font family options
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

interface CoverLetterFinalizeStepProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

export function CoverLetterFinalizeStep({
  selectedTemplate,
  onTemplateChange,
}: CoverLetterFinalizeStepProps) {
  const { coverLetterData, progress } = useCoverLetterContext();

  const [activeTab, setActiveTab] = useState<"templates" | "formatting">(
    "templates"
  );
  const [selectedColor, setSelectedColor] = useState("#1e40af");
  const [selectedFontSize, setSelectedFontSize] = useState("default");
  const [selectedFont, setSelectedFont] = useState("roboto");
  const [showMoreFontSettings, setShowMoreFontSettings] = useState(false);
  const [sectionSpacing, setSectionSpacing] = useState(75);
  const [paragraphSpacing, setParagraphSpacing] = useState(50);
  const [lineSpacing, setLineSpacing] = useState(25);
  const [isDownloading, setIsDownloading] = useState(false);

  const coverLetterRef = useRef<HTMLDivElement>(null);

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

  // Calculate dynamic styles
  const fontMultiplier =
    fontSizeMultipliers[selectedFontSize as keyof typeof fontSizeMultipliers] ||
    1;
  const currentFontFamily =
    fontFamilies.find((f) => f.id === selectedFont)?.css ||
    "'Roboto', sans-serif";

  // Calculate spacing values
  const sectionGap = 8 + (sectionSpacing / 100) * 16;
  const paragraphGap = 4 + (paragraphSpacing / 100) * 8;
  const lineHeight = 1.2 + (lineSpacing / 100) * 0.6;

  // Dynamic font sizes
  const fontSize = {
    name: `${24 * fontMultiplier}px`,
    title: `${14 * fontMultiplier}px`,
    body: `${11 * fontMultiplier}px`,
    small: `${10 * fontMultiplier}px`,
  };

  const templateStyles = {
    fontFamily: currentFontFamily,
    fontSize,
    sectionGap,
    paragraphGap,
    lineHeight,
    accentColor: selectedColor,
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

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (!coverLetterRef.current) return;

    setIsDownloading(true);

    try {
      const content = coverLetterRef.current;
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        setIsDownloading(false);
        return;
      }

      const coverLetterName = `${
        coverLetterData.personalInfo.fullName || "Cover"
      }_Letter`.replace(/\s+/g, "_");

      const styleSheets = Array.from(document.styleSheets)
        .map((sheet) => {
          try {
            if (sheet.cssRules) {
              return Array.from(sheet.cssRules)
                .map((rule) => rule.cssText)
                .join("\n");
            }
          } catch {
            if (sheet.href) {
              return `@import url("${sheet.href}");`;
            }
          }
          return "";
        })
        .join("\n");

      const clone = content.cloneNode(true) as HTMLElement;

      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${coverLetterName}</title>
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
                min-height: 297mm;
                background: white;
              }

              /* Cover letter template styles for print */
              .cl-template {
                width: 100% !important;
                height: 297mm !important;
                min-height: 297mm !important;
              }

              /* Modern template sidebar - full height */
              .cl-modern {
                display: flex !important;
              }

              .cl-modern > div:first-child {
                min-height: 297mm !important;
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
              }
            </style>
          </head>
          <body>
            <div class="print-page">${clone.innerHTML}</div>
          </body>
        </html>
      `);

      printWindow.document.close();

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          setIsDownloading(false);
        }, 500);
      };

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

  const renderTemplate = () => {
    const props = {
      data: coverLetterData,
      styles: templateStyles,
    };

    switch (selectedTemplate) {
      case "modern":
        return <ModernCoverLetterTemplate {...props} />;
      case "professional":
        return <ProfessionalCoverLetterTemplate {...props} />;
      case "executive":
        return <ExecutiveCoverLetterTemplate {...props} />;
      default:
        return <ClassicCoverLetterTemplate {...props} />;
    }
  };

  const renderTemplatePreview = (templateId: string) => {
    const previewStyles = {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        name: "16px",
        title: "10px",
        body: "8px",
        small: "7px",
      },
      sectionGap: 8,
      paragraphGap: 4,
      lineHeight: 1.4,
      accentColor: selectedColor,
    };

    const props = {
      data: coverLetterData,
      styles: previewStyles,
    };

    switch (templateId) {
      case "modern":
        return <ModernCoverLetterTemplate {...props} />;
      case "professional":
        return <ProfessionalCoverLetterTemplate {...props} />;
      case "executive":
        return <ExecutiveCoverLetterTemplate {...props} />;
      default:
        return <ClassicCoverLetterTemplate {...props} />;
    }
  };

  return (
    <div className="h-full flex flex-col pt-4 lg:pt-6">
      {/* Progress & Action Bar */}
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
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Center: Completion Score */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-accent/30 px-3 py-1.5 rounded-full">
                <CircularProgress value={progress} size={28} strokeWidth={3} />
                <div className="hidden sm:block">
                  <span className="text-[10px] text-muted-foreground block leading-tight">
                    Completion
                  </span>
                  <span className="text-xs font-semibold text-primary leading-tight">
                    {progress >= 80
                      ? "Excellent"
                      : progress >= 60
                      ? "Good"
                      : progress >= 40
                      ? "Fair"
                      : "Getting Started"}
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
                onClick={handleDownloadPDF}
                disabled={isDownloading}
              >
                Save & Download
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:items-start px-4 lg:px-0">
          {/* Cover Letter Preview */}
          <div className="flex-1 overflow-hidden">
            <div className="h-full overflow-auto p-4">
              <div
                ref={coverLetterRef}
                className="bg-white shadow-lg mx-auto"
                style={{
                  width: "595px",
                  minHeight: "842px",
                }}
              >
                {renderTemplate()}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Templates & Formatting */}
          <div className="w-full lg:w-80 lg:sticky lg:top-4 lg:self-start bg-card rounded-xl border border-border p-4 h-[620px] flex flex-col lg:shrink-0">
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
            <div className="overflow-y-auto flex-1">
              {activeTab === "templates" && (
                <div className="grid grid-cols-2 gap-3">
                  {templateOptions.map((template) => (
                    <div key={template.id} className="flex flex-col gap-1">
                      <button
                        onClick={() => onTemplateChange(template.id)}
                        className={cn(
                          "relative aspect-[8.5/11] rounded-lg border-2 overflow-hidden transition-all hover:shadow-md",
                          selectedTemplate === template.id
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-border hover:border-slate-300"
                        )}
                      >
                        {/* Template Preview - Scaled Down */}
                        <div className="w-[400%] h-[400%] origin-top-left scale-[0.25] pointer-events-none">
                          {renderTemplatePreview(template.id)}
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
                  ))}
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

                    {/* Reset color */}
                    <button
                      onClick={handleResetColor}
                      className="w-full mt-3 py-2 px-3 rounded-lg border border-border flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-accent transition-colors text-sm text-slate-600"
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
