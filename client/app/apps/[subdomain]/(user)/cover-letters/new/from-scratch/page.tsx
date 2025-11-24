"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
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
  Settings,
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

interface CoverLetterData {
  theme: {
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
      pageMargin: number;
      sectionGap: number;
      lineHeight: number;
      paragraphGap: number;
    };
    fontFamily: string;
  };
  personalInfo: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    location: string;
    profileImage?: string;
    nameStyle: FieldStyle;
    contactStyle: FieldStyle;
  };
  letterContent: {
    date: string;
    recipientName: string;
    recipientTitle: string;
    company: string;
    address: string;
    salutation: string;
    greeting: string;
    bodyParagraph1: string;
    bodyParagraph2: string;
    bodyParagraph3: string;
    closingParagraph: string;
    closing: string;
    headerStyle: FieldStyle;
    bodyStyle: FieldStyle;
    closingStyle: FieldStyle;
  };
}

const defaultFieldStyle: FieldStyle = {
  fontFamily: "Arial",
  fontSize: 12,
  color: "#000000",
  align: "left",
};

const defaultCoverLetterData: CoverLetterData = {
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
      pageMargin: 20,
      sectionGap: 12,
      lineHeight: 1.6,
      paragraphGap: 12,
    },
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  },
  personalInfo: {
    fullName: "Your Name",
    jobTitle: "Job Title",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    location: "City, State",
    nameStyle: {
      fontFamily: "Arial",
      fontSize: 14,
      color: "#000000",
      align: "left",
    },
    contactStyle: {
      fontFamily: "Arial",
      fontSize: 11,
      color: "#666666",
      align: "left",
    },
  },
  letterContent: {
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    recipientName: "Hiring Manager",
    recipientTitle: "Title",
    company: "Company Name",
    address: "Company Address, City, State ZIP",
    salutation: "Dear",
    greeting:
      "I am writing to express my strong interest in the [Position Title] position at [Company Name].",
    bodyParagraph1:
      "With my background in [relevant field/skills], I am confident that I can contribute significantly to your team.",
    bodyParagraph2:
      "My experience includes [key accomplishments and skills]. I am particularly drawn to your organization because of [specific reason].",
    bodyParagraph3:
      "I would welcome the opportunity to discuss how my skills and experience align with your needs.",
    closingParagraph: "Thank you for considering my application.",
    closing: "Sincerely,",
    headerStyle: {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#000000",
      align: "left",
    },
    bodyStyle: {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#333333",
      align: "left",
    },
    closingStyle: {
      fontFamily: "Arial",
      fontSize: 12,
      color: "#000000",
      align: "left",
    },
  },
};

const fontFamilies = [
  "Arial",
  "Times New Roman",
  "Georgia",
  "Verdana",
  "Courier New",
];

const StyleControlPopover = ({
  style,
  onChange,
  label = "Style",
}: {
  style: FieldStyle;
  onChange: (style: FieldStyle) => void;
  label?: string;
}) => {
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
              max="16"
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

export default function CoverLetterFromScratchPage() {
  const [letterData, setLetterData] = useState<CoverLetterData>(
    defaultCoverLetterData
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load html2canvas library
    const script1 = document.createElement("script");
    script1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    // Load jsPDF library
    const script2 = document.createElement("script");
    script2.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script2.async = true;
    document.body.appendChild(script2);

    return () => {
      // Cleanup if needed
    };
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    setLetterData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updatePersonalStyle = (field: string, style: FieldStyle) => {
    setLetterData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: style },
    }));
  };

  const updateLetterContent = (field: string, value: string) => {
    setLetterData((prev) => ({
      ...prev,
      letterContent: { ...prev.letterContent, [field]: value },
    }));
  };

  const updateLetterStyle = (field: string, style: FieldStyle) => {
    setLetterData((prev) => ({
      ...prev,
      letterContent: { ...prev.letterContent, [field]: style },
    }));
  };

  const calculateCompletion = () => {
    const personalFields = [
      letterData.personalInfo.fullName,
      letterData.personalInfo.email,
      letterData.personalInfo.phone,
    ];
    const letterFields = [
      letterData.letterContent.recipientName,
      letterData.letterContent.company,
      letterData.letterContent.greeting,
      letterData.letterContent.bodyParagraph1,
    ];
    const allFields = [...personalFields, ...letterFields];
    const filled = allFields.filter((f) => f && f.trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  };

  const downloadLetterAsPDF = async () => {
    if (isDownloading) return;

    const previewContainer = previewRef.current;
    if (!previewContainer) {
      alert("Cover letter preview not found");
      return;
    }

    const a4Page = previewContainer.querySelector(".a4-page") as HTMLElement;
    if (!a4Page) {
      alert("Cover letter page not found");
      return;
    }

    setIsDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const filename = `${
        letterData.personalInfo.fullName || "cover-letter"
      }.pdf`;

      const canvas = await html2CanvasPro(a4Page, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: "#ffffff",
        scale: 2,
        logging: false,
        imageTimeout: 15000,
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const imageData = canvas.toDataURL("image/png");

      pdf.addImage(imageData, "PNG", 0, 0, imgWidth, imgHeight);

      let yPosition = 0;
      let remainingHeight = imgHeight - pageHeight - 2;

      while (remainingHeight > 0) {
        pdf.addPage();
        yPosition = -remainingHeight;
        pdf.addImage(imageData, "PNG", 0, yPosition, imgWidth, imgHeight);
        remainingHeight -= pageHeight;
      }

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
          <h1 className="text-3xl font-bold">Cover Letter Builder</h1>
          <p className="text-muted-foreground">
            Create a professional cover letter
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={downloadLetterAsPDF}
            variant="outline"
            disabled={isDownloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
          <Button>Save Letter</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form - 1/3 */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="letter">Letter</TabsTrigger>
            </TabsList>

            {/* TAB 1: PERSONAL */}
            <TabsContent value="personal" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={["personal"]}
                className="space-y-3"
              >
                <AccordionItem
                  value="personal"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <h3 className="font-semibold text-lg">
                        Personal Information
                      </h3>
                      <PieChart percentage={calculateCompletion()} />
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      {letterData.personalInfo.profileImage && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={letterData.personalInfo.profileImage}
                            alt="Profile"
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium">
                            Full Name
                          </label>
                          <StyleControlPopover
                            label="Style"
                            style={letterData.personalInfo.nameStyle}
                            onChange={(s) =>
                              updatePersonalStyle("nameStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="John Doe"
                          value={letterData.personalInfo.fullName}
                          onChange={(e) =>
                            updatePersonalInfo("fullName", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Professional Title
                        </label>
                        <Input
                          placeholder="Your Title"
                          value={letterData.personalInfo.jobTitle}
                          onChange={(e) =>
                            updatePersonalInfo("jobTitle", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={letterData.personalInfo.email}
                            onChange={(e) =>
                              updatePersonalInfo("email", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            value={letterData.personalInfo.phone}
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
                            style={letterData.personalInfo.contactStyle}
                            onChange={(s) =>
                              updatePersonalStyle("contactStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="San Francisco, CA"
                          value={letterData.personalInfo.location}
                          onChange={(e) =>
                            updatePersonalInfo("location", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            {/* TAB 2: LETTER CONTENT */}
            <TabsContent value="letter" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={["header"]}
                className="space-y-3"
              >
                {/* Header Section */}
                <AccordionItem
                  value="header"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <h3 className="font-semibold text-lg">Letter Header</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          type="date"
                          value={letterData.letterContent.date}
                          onChange={(e) =>
                            updateLetterContent("date", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Recipient Name
                        </label>
                        <Input
                          placeholder="Hiring Manager"
                          value={letterData.letterContent.recipientName}
                          onChange={(e) =>
                            updateLetterContent("recipientName", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Recipient Title
                        </label>
                        <Input
                          placeholder="Position Title"
                          value={letterData.letterContent.recipientTitle}
                          onChange={(e) =>
                            updateLetterContent(
                              "recipientTitle",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <Input
                          placeholder="Company Name"
                          value={letterData.letterContent.company}
                          onChange={(e) =>
                            updateLetterContent("company", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Company Address
                        </label>
                        <Input
                          placeholder="Street, City, State ZIP"
                          value={letterData.letterContent.address}
                          onChange={(e) =>
                            updateLetterContent("address", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Salutation
                        </label>
                        <Input
                          placeholder="Dear"
                          value={letterData.letterContent.salutation}
                          onChange={(e) =>
                            updateLetterContent("salutation", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Body Content */}
                <AccordionItem
                  value="body"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <h3 className="font-semibold text-lg">Body Content</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="p-2 bg-muted/50 rounded mb-3">
                        <StyleControlPopover
                          label="Body Style"
                          style={letterData.letterContent.bodyStyle}
                          onChange={(s) => updateLetterStyle("bodyStyle", s)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Opening Greeting
                        </label>
                        <TextEditor
                          value={letterData.letterContent.greeting}
                          onChange={(v) => updateLetterContent("greeting", v)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          First Paragraph
                        </label>
                        <TextEditor
                          value={letterData.letterContent.bodyParagraph1}
                          onChange={(v) =>
                            updateLetterContent("bodyParagraph1", v)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Second Paragraph
                        </label>
                        <TextEditor
                          value={letterData.letterContent.bodyParagraph2}
                          onChange={(v) =>
                            updateLetterContent("bodyParagraph2", v)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Third Paragraph
                        </label>
                        <TextEditor
                          value={letterData.letterContent.bodyParagraph3}
                          onChange={(v) =>
                            updateLetterContent("bodyParagraph3", v)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Closing Section */}
                <AccordionItem
                  value="closing"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <h3 className="font-semibold text-lg">Closing</h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="p-2 bg-muted/50 rounded mb-3">
                        <StyleControlPopover
                          label="Closing Style"
                          style={letterData.letterContent.closingStyle}
                          onChange={(s) => updateLetterStyle("closingStyle", s)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Closing Paragraph
                        </label>
                        <TextEditor
                          value={letterData.letterContent.closingParagraph}
                          onChange={(v) =>
                            updateLetterContent("closingParagraph", v)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Closing</label>
                        <Input
                          placeholder="Sincerely,"
                          value={letterData.letterContent.closing}
                          onChange={(e) =>
                            updateLetterContent("closing", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </div>

        {/* Preview - 2/3 */}
        <div className="lg:col-span-2">
          <div ref={previewRef} className="flex justify-center">
            <div
              className="a4-page bg-white shadow-lg"
              style={{
                width: "210mm",
                minHeight: "297mm",
                padding: `${letterData.theme.spacing.pageMargin}mm`,
                fontFamily: letterData.theme.fontFamily,
              }}
            >
              {/* Header Section */}
              <div className="mb-8">
                {/* Sender Info */}
                <div
                  style={{
                    fontSize: `${letterData.personalInfo.nameStyle.fontSize}pt`,
                    fontFamily: letterData.personalInfo.nameStyle.fontFamily,
                    color: letterData.personalInfo.nameStyle.color,
                    textAlign: letterData.personalInfo.nameStyle.align,
                    marginBottom: "4px",
                  }}
                >
                  <strong>{letterData.personalInfo.fullName}</strong>
                </div>

                <div
                  style={{
                    fontSize: `${letterData.personalInfo.contactStyle.fontSize}pt`,
                    fontFamily: letterData.personalInfo.contactStyle.fontFamily,
                    color: letterData.personalInfo.contactStyle.color,
                    textAlign: letterData.personalInfo.contactStyle.align,
                    lineHeight: letterData.theme.spacing.lineHeight,
                  }}
                >
                  {letterData.personalInfo.jobTitle && (
                    <div>{letterData.personalInfo.jobTitle}</div>
                  )}
                  {letterData.personalInfo.email && (
                    <div>{letterData.personalInfo.email}</div>
                  )}
                  {letterData.personalInfo.phone && (
                    <div>{letterData.personalInfo.phone}</div>
                  )}
                  {letterData.personalInfo.location && (
                    <div>{letterData.personalInfo.location}</div>
                  )}
                </div>
              </div>

              {/* Date */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.headerStyle.fontSize}pt`,
                  color: letterData.letterContent.headerStyle.color,
                  marginBottom: "24px",
                }}
              >
                {letterData.letterContent.date}
              </div>

              {/* Recipient Info */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.headerStyle.fontSize}pt`,
                  color: letterData.letterContent.headerStyle.color,
                  marginBottom: "16px",
                }}
              >
                {letterData.letterContent.recipientName && (
                  <div>{letterData.letterContent.recipientName}</div>
                )}
                {letterData.letterContent.recipientTitle && (
                  <div>{letterData.letterContent.recipientTitle}</div>
                )}
                {letterData.letterContent.company && (
                  <div>{letterData.letterContent.company}</div>
                )}
                {letterData.letterContent.address && (
                  <div>{letterData.letterContent.address}</div>
                )}
              </div>

              {/* Salutation */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.bodyStyle.fontSize}pt`,
                  color: letterData.letterContent.bodyStyle.color,
                  marginBottom: "12px",
                }}
              >
                {letterData.letterContent.salutation}{" "}
                {letterData.letterContent.recipientName}:
              </div>

              {/* Body Content */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.bodyStyle.fontSize}pt`,
                  fontFamily: letterData.letterContent.bodyStyle.fontFamily,
                  color: letterData.letterContent.bodyStyle.color,
                  textAlign: letterData.letterContent.bodyStyle.align,
                  lineHeight: letterData.theme.spacing.lineHeight,
                }}
              >
                {letterData.letterContent.greeting && (
                  <p style={{ marginBottom: "12px" }}>
                    {letterData.letterContent.greeting}
                  </p>
                )}

                {letterData.letterContent.bodyParagraph1 && (
                  <p
                    style={{
                      marginBottom: "12px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {letterData.letterContent.bodyParagraph1}
                  </p>
                )}

                {letterData.letterContent.bodyParagraph2 && (
                  <p
                    style={{
                      marginBottom: "12px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {letterData.letterContent.bodyParagraph2}
                  </p>
                )}

                {letterData.letterContent.bodyParagraph3 && (
                  <p
                    style={{
                      marginBottom: "12px",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {letterData.letterContent.bodyParagraph3}
                  </p>
                )}

                {letterData.letterContent.closingParagraph && (
                  <p style={{ marginBottom: "24px" }}>
                    {letterData.letterContent.closingParagraph}
                  </p>
                )}
              </div>

              {/* Closing */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.closingStyle.fontSize}pt`,
                  fontFamily: letterData.letterContent.closingStyle.fontFamily,
                  color: letterData.letterContent.closingStyle.color,
                  marginBottom: "80px",
                }}
              >
                {letterData.letterContent.closing}
              </div>

              {/* Signature Area */}
              <div
                style={{
                  fontSize: `${letterData.letterContent.closingStyle.fontSize}pt`,
                  fontFamily: letterData.letterContent.closingStyle.fontFamily,
                  color: letterData.letterContent.closingStyle.color,
                }}
              >
                {letterData.personalInfo.fullName}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
