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
  Plus,
  Settings,
  Trash2,
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

interface SignatureLine {
  id: string;
  title: string;
  date: string;
}

interface DisclosureData {
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
    title: string;
    email: string;
    phone: string;
    location: string;
    profileImage?: string;
    nameStyle: FieldStyle;
    contactStyle: FieldStyle;
  };
  disclosureContent: {
    title: string;
    date: string;
    titleStyle: FieldStyle;
    headerStyle: FieldStyle;
    bodyStyle: FieldStyle;
    sections: Array<{
      id: string;
      title: string;
      content: string;
    }>;
  };
  signatureLines: SignatureLine[];
}

const defaultFieldStyle: FieldStyle = {
  fontFamily: "Arial",
  fontSize: 12,
  color: "#000000",
  align: "left",
};

const defaultDisclosureData: DisclosureData = {
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
    title: "Position",
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
  disclosureContent: {
    title: "Disclosure Document",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    titleStyle: {
      fontFamily: "Arial",
      fontSize: 16,
      color: "#000000",
      align: "center",
    },
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
    sections: [
      {
        id: "1",
        title: "Background Check Authorization",
        content:
          "I hereby authorize the company to conduct a background check as part of the employment process.",
      },
      {
        id: "2",
        title: "Conflict of Interest",
        content:
          "I hereby disclose any conflicts of interest that may exist regarding my employment.",
      },
    ],
  },
  signatureLines: [
    {
      id: "1",
      title: "Employee Signature",
      date: "",
    },
    {
      id: "2",
      title: "Witness/Notary Signature",
      date: "",
    },
  ],
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

export default function DisclosureFromScratchPage() {
  const [disclosureData, setDisclosureData] = useState<DisclosureData>(
    defaultDisclosureData
  );
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src =
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script2.async = true;
    document.body.appendChild(script2);
  }, []);

  const updatePersonalInfo = (field: string, value: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }));
  };

  const updatePersonalStyle = (field: string, style: FieldStyle) => {
    setDisclosureData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: style },
    }));
  };

  const updateDisclosureTitle = (title: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: { ...prev.disclosureContent, title },
    }));
  };

  const updateDisclosureDate = (date: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: { ...prev.disclosureContent, date },
    }));
  };

  const updateDisclosureStyle = (field: string, style: FieldStyle) => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: { ...prev.disclosureContent, [field]: style },
    }));
  };

  const updateSection = (id: string, field: string, value: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: {
        ...prev.disclosureContent,
        sections: prev.disclosureContent.sections.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        ),
      },
    }));
  };

  const addSection = () => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: {
        ...prev.disclosureContent,
        sections: [
          ...prev.disclosureContent.sections,
          {
            id: Date.now().toString(),
            title: "",
            content: "",
          },
        ],
      },
    }));
  };

  const removeSection = (id: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      disclosureContent: {
        ...prev.disclosureContent,
        sections: prev.disclosureContent.sections.filter((s) => s.id !== id),
      },
    }));
  };

  const addSignatureLine = () => {
    setDisclosureData((prev) => ({
      ...prev,
      signatureLines: [
        ...prev.signatureLines,
        {
          id: Date.now().toString(),
          title: "",
          date: "",
        },
      ],
    }));
  };

  const updateSignatureLine = (id: string, field: string, value: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      signatureLines: prev.signatureLines.map((line) =>
        line.id === id ? { ...line, [field]: value } : line
      ),
    }));
  };

  const removeSignatureLine = (id: string) => {
    setDisclosureData((prev) => ({
      ...prev,
      signatureLines: prev.signatureLines.filter((l) => l.id !== id),
    }));
  };

  const calculateCompletion = () => {
    const personalFields = [
      disclosureData.personalInfo.fullName,
      disclosureData.personalInfo.email,
    ];
    const contentFields = [
      disclosureData.disclosureContent.title,
      ...disclosureData.disclosureContent.sections.map((s) => s.title),
    ];
    const allFields = [...personalFields, ...contentFields];
    const filled = allFields.filter((f) => f && f.trim() !== "").length;
    return Math.round((filled / allFields.length) * 100);
  };

  const downloadDisclosureAsPDF = async () => {
    if (isDownloading) return;

    const previewContainer = previewRef.current;
    if (!previewContainer) {
      alert("Disclosure preview not found");
      return;
    }

    const a4Page = previewContainer.querySelector(".a4-page") as HTMLElement;
    if (!a4Page) {
      alert("Disclosure page not found");
      return;
    }

    setIsDownloading(true);

    try {
      const { jsPDF } = await import("jspdf");
      const filename = `${
        disclosureData.disclosureContent.title || "disclosure"
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
          <h1 className="text-3xl font-bold">Disclosure Document Builder</h1>
          <p className="text-muted-foreground">
            Create a professional disclosure document
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            onClick={downloadDisclosureAsPDF}
            variant="outline"
            disabled={isDownloading}
          >
            <Download className="w-4 h-4 mr-2" />
            {isDownloading ? "Downloading..." : "Download PDF"}
          </Button>
          <Button>Save Document</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form - 1/3 */}
        <div className="lg:col-span-1 space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
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
                      {disclosureData.personalInfo.profileImage && (
                        <div className="relative w-16 h-16">
                          <Image
                            src={disclosureData.personalInfo.profileImage}
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
                            style={disclosureData.personalInfo.nameStyle}
                            onChange={(s) =>
                              updatePersonalStyle("nameStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="John Doe"
                          value={disclosureData.personalInfo.fullName}
                          onChange={(e) =>
                            updatePersonalInfo("fullName", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Position/Title
                        </label>
                        <Input
                          placeholder="Your Title"
                          value={disclosureData.personalInfo.title}
                          onChange={(e) =>
                            updatePersonalInfo("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            type="email"
                            placeholder="john@example.com"
                            value={disclosureData.personalInfo.email}
                            onChange={(e) =>
                              updatePersonalInfo("email", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Phone</label>
                          <Input
                            placeholder="+1 (555) 123-4567"
                            value={disclosureData.personalInfo.phone}
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
                            style={disclosureData.personalInfo.contactStyle}
                            onChange={(s) =>
                              updatePersonalStyle("contactStyle", s)
                            }
                          />
                        </div>
                        <Input
                          placeholder="San Francisco, CA"
                          value={disclosureData.personalInfo.location}
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

            {/* TAB 2: CONTENT */}
            <TabsContent value="content" className="space-y-6 mt-6">
              <Accordion
                type="multiple"
                defaultValue={["header"]}
                className="space-y-3"
              >
                {/* Header */}
                <AccordionItem
                  value="header"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <h3 className="font-semibold text-lg">Header</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="p-2 bg-muted/50 rounded mb-3">
                        <StyleControlPopover
                          label="Title Style"
                          style={disclosureData.disclosureContent.titleStyle}
                          onChange={(s) =>
                            updateDisclosureStyle("titleStyle", s)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Title</label>
                        <Input
                          placeholder="Disclosure Document"
                          value={disclosureData.disclosureContent.title}
                          onChange={(e) =>
                            updateDisclosureTitle(e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Date</label>
                        <Input
                          type="date"
                          value={disclosureData.disclosureContent.date}
                          onChange={(e) => updateDisclosureDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Sections */}
                <AccordionItem
                  value="sections"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <h3 className="font-semibold text-lg">
                        Disclosure Sections
                      </h3>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <div className="p-2 bg-muted/50 rounded mb-3">
                        <StyleControlPopover
                          label="Body Style"
                          style={disclosureData.disclosureContent.bodyStyle}
                          onChange={(s) =>
                            updateDisclosureStyle("bodyStyle", s)
                          }
                        />
                      </div>

                      <Button
                        onClick={addSection}
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Section
                      </Button>

                      <div className="space-y-3">
                        {disclosureData.disclosureContent.sections.map(
                          (section) => (
                            <div
                              key={section.id}
                              className="p-3 border border-border rounded-lg space-y-2"
                            >
                              <div className="flex justify-between items-center">
                                <h4 className="font-medium text-sm">Section</h4>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSection(section.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>

                              <Input
                                placeholder="Section Title"
                                value={section.title}
                                onChange={(e) =>
                                  updateSection(
                                    section.id,
                                    "title",
                                    e.target.value
                                  )
                                }
                              />

                              <TextEditor
                                value={section.content}
                                onChange={(v) =>
                                  updateSection(section.id, "content", v)
                                }
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Signature Lines */}
                <AccordionItem
                  value="signatures"
                  className="border border-border rounded-lg bg-card"
                >
                  <AccordionTrigger className="px-4 py-3 hover:no-underline">
                    <h3 className="font-semibold text-lg">Signature Lines</h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-3">
                      <Button
                        onClick={addSignatureLine}
                        size="sm"
                        variant="outline"
                        className="w-full"
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Signature
                      </Button>

                      <div className="space-y-3">
                        {disclosureData.signatureLines.map((line) => (
                          <div
                            key={line.id}
                            className="p-3 border border-border rounded-lg space-y-2"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-sm">
                                Signature Line
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSignatureLine(line.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>

                            <Input
                              placeholder="Signature Title (e.g., Employee Signature)"
                              value={line.title}
                              onChange={(e) =>
                                updateSignatureLine(
                                  line.id,
                                  "title",
                                  e.target.value
                                )
                              }
                            />

                            <Input
                              type="date"
                              placeholder="Date"
                              value={line.date}
                              onChange={(e) =>
                                updateSignatureLine(
                                  line.id,
                                  "date",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        ))}
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
                padding: `${disclosureData.theme.spacing.pageMargin}mm`,
                fontFamily: disclosureData.theme.fontFamily,
              }}
            >
              {/* Header */}
              <div className="mb-8">
                <div
                  style={{
                    fontSize: `${disclosureData.disclosureContent.titleStyle.fontSize}pt`,
                    fontFamily:
                      disclosureData.disclosureContent.titleStyle.fontFamily,
                    color: disclosureData.disclosureContent.titleStyle.color,
                    textAlign:
                      disclosureData.disclosureContent.titleStyle.align,
                    marginBottom: "8px",
                    fontWeight: "bold",
                  }}
                >
                  {disclosureData.disclosureContent.title}
                </div>

                <div
                  style={{
                    fontSize: `${disclosureData.disclosureContent.headerStyle.fontSize}pt`,
                    color: disclosureData.disclosureContent.headerStyle.color,
                    textAlign:
                      disclosureData.disclosureContent.headerStyle.align,
                    marginBottom: "24px",
                  }}
                >
                  {disclosureData.disclosureContent.date}
                </div>

                <div
                  style={{
                    fontSize: `${disclosureData.personalInfo.nameStyle.fontSize}pt`,
                    fontFamily:
                      disclosureData.personalInfo.nameStyle.fontFamily,
                    color: disclosureData.personalInfo.nameStyle.color,
                    marginBottom: "4px",
                    fontWeight: "bold",
                  }}
                >
                  {disclosureData.personalInfo.fullName}
                </div>

                <div
                  style={{
                    fontSize: `${disclosureData.personalInfo.contactStyle.fontSize}pt`,
                    fontFamily:
                      disclosureData.personalInfo.contactStyle.fontFamily,
                    color: disclosureData.personalInfo.contactStyle.color,
                    lineHeight: disclosureData.theme.spacing.lineHeight,
                    marginBottom: "24px",
                  }}
                >
                  {disclosureData.personalInfo.title && (
                    <div>{disclosureData.personalInfo.title}</div>
                  )}
                  {disclosureData.personalInfo.email && (
                    <div>{disclosureData.personalInfo.email}</div>
                  )}
                  {disclosureData.personalInfo.phone && (
                    <div>{disclosureData.personalInfo.phone}</div>
                  )}
                  {disclosureData.personalInfo.location && (
                    <div>{disclosureData.personalInfo.location}</div>
                  )}
                </div>
              </div>

              {/* Sections */}
              {disclosureData.disclosureContent.sections.map((section) => (
                <div key={section.id} style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontSize: `${disclosureData.disclosureContent.headerStyle.fontSize}pt`,
                      fontFamily:
                        disclosureData.disclosureContent.headerStyle.fontFamily,
                      color: disclosureData.disclosureContent.headerStyle.color,
                      marginBottom: "8px",
                      fontWeight: "bold",
                    }}
                  >
                    {section.title}
                  </div>

                  <div
                    style={{
                      fontSize: `${disclosureData.disclosureContent.bodyStyle.fontSize}pt`,
                      fontFamily:
                        disclosureData.disclosureContent.bodyStyle.fontFamily,
                      color: disclosureData.disclosureContent.bodyStyle.color,
                      textAlign:
                        disclosureData.disclosureContent.bodyStyle.align,
                      lineHeight: disclosureData.theme.spacing.lineHeight,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {section.content}
                  </div>
                </div>
              ))}

              {/* Signature Section */}
              {disclosureData.signatureLines.length > 0 && (
                <div style={{ marginTop: "40px" }}>
                  {disclosureData.signatureLines.map((line) => (
                    <div
                      key={line.id}
                      style={{
                        marginBottom: "40px",
                        fontSize: `${disclosureData.disclosureContent.bodyStyle.fontSize}pt`,
                      }}
                    >
                      <div
                        style={{
                          borderTop: "1px solid #000",
                          marginBottom: "4px",
                          height: "40px",
                        }}
                      />
                      <div
                        style={{
                          fontSize: `${disclosureData.disclosureContent.bodyStyle.fontSize}pt`,
                          color:
                            disclosureData.disclosureContent.bodyStyle.color,
                        }}
                      >
                        {line.title}
                      </div>
                      {line.date && (
                        <div
                          style={{
                            fontSize: `${disclosureData.disclosureContent.bodyStyle.fontSize}pt`,
                            color:
                              disclosureData.disclosureContent.bodyStyle.color,
                            marginTop: "8px",
                          }}
                        >
                          Date: {line.date}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
