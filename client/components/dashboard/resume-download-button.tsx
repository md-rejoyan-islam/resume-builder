"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, FileText, Loader2 } from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface ResumeDownloadButtonProps {
  resumeId: string;
  resumeName?: string;
  variant?: "icon" | "button" | "dropdown";
  className?: string;
  disabled?: boolean;
  // For rendering the resume preview for PDF export
  renderResume?: () => React.ReactNode;
}

export function ResumeDownloadButton({
  resumeName = "Resume",
  variant = "icon",
  className,
  disabled = false,
  renderResume,
}: ResumeDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = useCallback(async () => {
    if (!renderResume) return;

    setIsDownloading(true);

    try {
      // Create a temporary container for the resume
      const tempContainer = document.createElement("div");
      tempContainer.style.position = "absolute";
      tempContainer.style.left = "-9999px";
      tempContainer.style.top = "0";
      document.body.appendChild(tempContainer);

      // We need to render the resume content - this will be handled by the parent
      // For now, we'll use the browser print functionality

      // Get all stylesheets from the current document
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

      // Create a new window for printing
      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        console.error("Could not open print window");
        setIsDownloading(false);
        return;
      }

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
            <div id="resume-content"></div>
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

      // Cleanup
      document.body.removeChild(tempContainer);
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
    }
  }, [renderResume, resumeName]);

  if (variant === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={className}
            disabled={disabled || isDownloading}
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleDownloadPDF} disabled={isDownloading}>
            <FileText className="w-4 h-4 mr-2" />
            Download as PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "button") {
    return (
      <Button
        variant="outline"
        size="sm"
        className={className}
        onClick={handleDownloadPDF}
        disabled={disabled || isDownloading}
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        {isDownloading ? "Downloading..." : "Download"}
      </Button>
    );
  }

  // Default: icon variant
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className={className}
        onClick={handleDownloadPDF}
        disabled={disabled || isDownloading}
        title="Download"
      >
        {isDownloading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Download className="w-4 h-4" />
        )}
      </Button>
      <div ref={resumeRef} className="hidden">
        {renderResume?.()}
      </div>
    </>
  );
}
