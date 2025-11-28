"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  getTemplate,
  getSidebarConfig,
  ResumePageWrapper,
} from "@/components/resume-builder/templates";
import { useGetResumeQuery } from "@/lib/features/resume/resume-slice";
import { Loader2 } from "lucide-react";

interface ResumePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeId: string;
  resumeTitle: string;
}

export function ResumePreviewDialog({
  open,
  onOpenChange,
  resumeId,
  resumeTitle,
}: ResumePreviewDialogProps) {
  const { data: resumeResponse, isLoading } = useGetResumeQuery(resumeId, {
    skip: !open,
  });

  const resume = resumeResponse?.data;

  // Default template styles
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
    accentColor: resume?.templateSettings?.accentColor || "#1e40af",
  };

  // Prepare template data from resume
  const templateData = resume
    ? {
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
      }
    : null;

  const renderTemplate = () => {
    if (!resume || !templateData) return null;

    const templateId = resume.templateSettings?.templateId || "classic";
    const template = getTemplate(templateId);
    const TemplateComponent = template.component;
    const sidebarConfig = getSidebarConfig(
      templateId,
      templateStyles.accentColor
    );

    return (
      <ResumePageWrapper
        fontFamily={templateStyles.fontFamily}
        accentColor={templateStyles.accentColor}
        sidebar={sidebarConfig}
      >
        <TemplateComponent data={templateData} styles={templateStyles} />
      </ResumePageWrapper>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="p-0 overflow-hidden border-0 gap-0 flex flex-col"
        style={{
          maxWidth: "95vw",
          width: "700px",
          maxHeight: "95vh",
          height: "auto",
        }}
      >
        <DialogHeader className="px-4 py-3 border-b border-border shrink-0 bg-white dark:bg-card">
          <DialogTitle className="text-base font-semibold">
            {resumeTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-auto bg-slate-200 dark:bg-slate-800">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="p-4 sm:p-6 flex justify-center">
              {/* Resume container - 600px width matches the template CSS */}
              <div
                className="bg-white shadow-xl"
                style={{
                  width: "600px",
                  minWidth: "600px",
                }}
              >
                {renderTemplate()}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
