"use client";

import {
  getTemplate,
  getSidebarConfig,
  ResumePageWrapper,
} from "@/components/resume-builder/templates";
import { Resume } from "@/lib/features/resume/resume-slice";
import { createRoot } from "react-dom/client";

interface DownloadOptions {
  resume: Resume;
  onStart?: () => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

export async function downloadResumePDF({
  resume,
  onStart,
  onComplete,
  onError,
}: DownloadOptions) {
  onStart?.();

  try {
    // Create template styles
    const templateStyles = {
      fontFamily: "'Roboto', sans-serif",
      fontSize: {
        name: "30px",
        sectionTitle: "12px",
        itemTitle: "10px",
        body: "9px",
        small: "8px",
      },
      sectionGap: 16,
      paragraphGap: 8,
      lineHeight: 1.4,
      accentColor: resume.templateSettings?.accentColor || "#1e40af",
    };

    // Prepare template data
    const templateData = {
      formData: resume.contact || {},
      skills: resume.skills || [],
      experiences: resume.experiences || [],
      educations: resume.educations || [],
      certifications: resume.certifications || [],
      projects: resume.projects || [],
      references: resume.references || [],
      languages: resume.languages || [],
      volunteers: resume.volunteers || [],
      publications: resume.publications || [],
    };

    const templateId = resume.templateSettings?.templateId || "classic";
    const template = getTemplate(templateId);
    const TemplateComponent = template.component;
    const sidebarConfig = getSidebarConfig(templateId, templateStyles.accentColor);

    // Create a hidden container to render the resume
    const container = document.createElement("div");
    container.style.position = "absolute";
    container.style.left = "-9999px";
    container.style.top = "0";
    container.style.width = "600px";
    document.body.appendChild(container);

    // Render the resume
    const root = createRoot(container);
    root.render(
      <ResumePageWrapper
        fontFamily={templateStyles.fontFamily}
        accentColor={templateStyles.accentColor}
        sidebar={sidebarConfig}
      >
        <TemplateComponent data={templateData} styles={templateStyles} />
      </ResumePageWrapper>
    );

    // Wait for render
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get pages
    const pages = container.querySelectorAll(".rt-page");

    if (pages.length === 0) {
      throw new Error("No pages found to export");
    }

    // Get stylesheets
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

    // Generate pages HTML
    const pagesHtml = Array.from(pages)
      .map((page, index) => {
        const clone = page.cloneNode(true) as HTMLElement;
        clone.removeAttribute("style");
        clone.classList.add("print-rt-page");
        const isLast = index === pages.length - 1;
        return `<div class="print-page" ${
          isLast ? "" : 'style="page-break-after: always;"'
        }>${clone.outerHTML}</div>`;
      })
      .join("");

    // Open print window
    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      throw new Error("Could not open print window. Please allow popups.");
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${resume.title}</title>
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

            .rt-page-number {
              display: none !important;
            }

            .rt-measure-container {
              display: none !important;
            }

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

    // Wait for load and print
    await new Promise<void>((resolve) => {
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          resolve();
        }, 500);
      };

      // Fallback
      setTimeout(() => {
        if (printWindow && !printWindow.closed) {
          printWindow.print();
          printWindow.close();
        }
        resolve();
      }, 2000);
    });

    // Cleanup
    root.unmount();
    document.body.removeChild(container);

    onComplete?.();
  } catch (error) {
    onError?.(error as Error);
  }
}
