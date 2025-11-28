"use client";

import { ResumeNavigation } from "@/components/resume-builder/ResumeNavigation";
import { ResumeSidebar } from "@/components/resume-builder/ResumeSidebar";
import { ResumeStepHeader } from "@/components/resume-builder/ResumeStepHeader";
import { ResumeTipsPanel } from "@/components/resume-builder/ResumeTipsPanel";
import { StepRenderer } from "@/components/resume-builder/StepRenderer";
import {
  getSidebarConfig,
  getTemplate,
  ResumePageWrapper,
} from "@/components/resume-builder/templates";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { ResumeProvider, useResumeContext } from "@/context/ResumeContext";
import { useCountries } from "@/lib/features/countries/use-countries";
import {
  useGetResumeQuery,
  useUpdateResumeMutation,
} from "@/lib/features/resume/resume-slice";
import { useResumeChangeTracker } from "@/lib/hooks/use-resume-change-tracker";
import { SectionId } from "@/lib/resume-data";
import { stepsConfig } from "@/lib/resume-steps";
import { cn } from "@/lib/utils";
import { Lock, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

interface ResumeBuilderClientProps {
  resumeId: string;
}

// Inner component that uses context
function ResumeBuilderContent({ resumeId }: { resumeId: string }) {
  const {
    // Resume data
    resumeData,
    setResumeData,
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

    // Update functions
    updateContact,
    updateSkills,
    updateExperiences,
    updateEducations,
    updateCertifications,
    updateProjects,
    updateReferences,
    updateLanguages,
    updateVolunteers,
    updatePublications,

    // Template
    selectedTemplate,
    setSelectedTemplate,
    templateStyles,

    // Completion
    isSectionComplete,
    progress,

    // Photo
    photoPreview,
    setPhotoPreview,

    // Optional fields
    addedOptionalFields,
    addOptionalField,
    removeOptionalField,

    // Touched fields
    touchedFields,
    setTouchedFields,
  } = useResumeContext();

  const searchParams = useSearchParams();
  const router = useRouter();

  // Get initial step from URL query parameter or default to "contact"
  const initialStepFromUrl = searchParams.get("step");
  const validInitialStep =
    initialStepFromUrl && stepsConfig.some((s) => s.id === initialStepFromUrl)
      ? initialStepFromUrl
      : "contact";

  const [currentStep, setCurrentStep] = useState(validInitialStep);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { countries } = useCountries();
  const [isSaving, setIsSaving] = useState(false);

  // Update URL when step changes (only when currentStep changes, not searchParams)
  useEffect(() => {
    const stepInUrl = searchParams.get("step");
    // Only update URL if the step in URL differs from current step
    if (stepInUrl !== currentStep) {
      const currentParams = new URLSearchParams(searchParams.toString());
      currentParams.set("step", currentStep);
      router.replace(`?${currentParams.toString()}`, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Fetch resume data from backend
  const {
    data: resumeResponse,
    isLoading: isLoadingResume,
    isError: isResumeError,
  } = useGetResumeQuery(resumeId);

  // Update resume mutation
  const [updateResume] = useUpdateResumeMutation();

  // Change tracker hook - tracks if fields changed to show Save or Next button
  const {
    shouldShowSave,
    hasCurrentStepChanges,
    markAllAsSaved,
    initializeSavedState,
    getDataToSave,
  } = useResumeChangeTracker({
    resumeData,
    selectedTemplate,
    templateStyles,
    currentStep,
  });

  // Optional field names to check
  const optionalFieldNames = [
    "linkedinUrl",
    "githubUrl",
    "dateOfBirth",
    "drivingLicense",
    "nationality",
    "twitterUrl",
    "websiteUrl",
  ];

  // Load resume data into context when fetched
  useEffect(() => {
    if (resumeResponse?.data) {
      const backendData = resumeResponse.data;
      setResumeData({
        sectionTitles: backendData.sectionTitles || resumeData.sectionTitles,
        contact: backendData.contact,
        skills: backendData.skills || [],
        experiences: backendData.experiences || [],
        educations: backendData.educations || [],
        certifications: backendData.certifications || [],
        projects: backendData.projects || [],
        references: backendData.references || [],
        languages: backendData.languages || [],
        volunteers: backendData.volunteers || [],
        publications: backendData.publications || [],
      });

      // Set template if available
      if (backendData.templateSettings?.templateId) {
        setSelectedTemplate(backendData.templateSettings.templateId);
      }

      // Add optional fields that have values to addedOptionalFields
      if (backendData.contact) {
        optionalFieldNames.forEach((fieldName) => {
          const value =
            backendData.contact[fieldName as keyof typeof backendData.contact];
          if (value && String(value).trim() !== "") {
            addOptionalField(fieldName);
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resumeResponse]);

  // Initialize saved state after resume data is loaded
  useEffect(() => {
    if (resumeResponse?.data) {
      // Small delay to ensure resumeData is updated first
      const timer = setTimeout(() => {
        initializeSavedState();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [resumeResponse, initializeSavedState]);

  // Compute completed steps from section completions
  const completedSteps = useMemo(() => {
    const steps = new Set<string>();
    stepsConfig.forEach((step) => {
      if (isSectionComplete(step.id as SectionId)) {
        steps.add(step.id);
      }
    });
    return steps;
  }, [isSectionComplete]);

  // Get current step index
  const currentStepIndex = useMemo(
    () => stepsConfig.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  // All steps are accessible - users can navigate freely
  const isStepAccessible = useCallback((_stepId: string) => {
    return true;
  }, []);

  // Check if current step has required fields filled
  const isCurrentStepValid = useCallback(() => {
    const stepConfig = stepsConfig.find((s) => s.id === currentStep);
    if (!stepConfig?.fields) return true;

    const requiredFields = stepConfig.fields.filter((f) => f.required);
    return requiredFields.every((field) => {
      const value = formData[field.name];
      return value && value.toString().trim() !== "";
    });
  }, [currentStep, formData]);

  // Handle step change
  const handleStepChange = useCallback(
    (stepId: string) => {
      if (!isStepAccessible(stepId)) return;
      setCurrentStep(stepId);
    },
    [isStepAccessible]
  );

  // Get list of invalid required fields for current step
  const getInvalidFields = useCallback(() => {
    const stepConfig = stepsConfig.find((s) => s.id === currentStep);
    if (!stepConfig?.fields) return [];

    const requiredFields = stepConfig.fields.filter((f) => f.required);
    return requiredFields
      .filter((field) => {
        const value = formData[field.name];
        return !value || value.toString().trim() === "";
      })
      .map((f) => f.name);
  }, [currentStep, formData]);

  // Handle Save & Continue (or just Continue if no changes)
  const handleSaveAndContinue = useCallback(async () => {
    const invalidFields = getInvalidFields();

    if (invalidFields.length > 0) {
      setTouchedFields(new Set([...touchedFields, ...invalidFields]));
      // Show toast for validation errors
      const stepConfig = stepsConfig.find((s) => s.id === currentStep);
      const fieldLabels = invalidFields.map((fieldName) => {
        const field = stepConfig?.fields?.find((f) => f.name === fieldName);
        return field?.label || fieldName;
      });
      toast.error("Please fill in required fields", {
        description: `Missing: ${fieldLabels.join(", ")}`,
      });
      return;
    }

    // Check if there are any changes to save
    const dataToSave = getDataToSave();

    // If no changes, just move to next step without API call
    if (!dataToSave) {
      setTouchedFields(new Set());
      if (currentStepIndex < stepsConfig.length - 1) {
        setCurrentStep(stepsConfig[currentStepIndex + 1].id);
      }
      return;
    }

    setIsSaving(true);

    try {
      // Save only when there are changes
      await updateResume({
        id: resumeId,
        data: {
          ...dataToSave.resumeData,
          templateSettings: dataToSave.templateSettings,
        },
      }).unwrap();

      // Mark all data as saved
      markAllAsSaved();
      setTouchedFields(new Set());

      // Move to next step
      if (currentStepIndex < stepsConfig.length - 1) {
        setCurrentStep(stepsConfig[currentStepIndex + 1].id);
      }
    } catch (error) {
      console.error("Failed to save resume:", error);
      // Show toast for API errors
      const errorMessage =
        error instanceof Error
          ? error.message
          : typeof error === "object" && error !== null && "data" in error
          ? (error as { data?: { message?: string } }).data?.message ||
            "Failed to save resume"
          : "Failed to save resume";
      toast.error("Error saving resume", {
        description: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  }, [
    currentStep,
    currentStepIndex,
    getInvalidFields,
    setTouchedFields,
    touchedFields,
    updateResume,
    resumeId,
    getDataToSave,
    markAllAsSaved,
  ]);

  // Handle Back button
  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(stepsConfig[currentStepIndex - 1].id);
    }
  }, [currentStepIndex]);

  const handleInputChange = (field: string, value: string) => {
    updateContact(field, value);
  };

  const handleAddOptionalField = useCallback(
    (fieldName: string) => {
      addOptionalField(fieldName);
    },
    [addOptionalField]
  );

  const handleRemoveOptionalField = useCallback(
    (fieldName: string) => {
      removeOptionalField(fieldName);
    },
    [removeOptionalField]
  );

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const currentStepConfig =
    stepsConfig.find((s) => s.id === currentStep) || stepsConfig[0];

  // Template data for all templates
  const templateData = useMemo(
    () => ({
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
    }),
    [
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
    ]
  );

  // Render template preview based on template ID
  const renderTemplatePreview = useCallback(
    (templateId: string) => {
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
    },
    [templateData, templateStyles]
  );

  // Show loading state while fetching resume
  if (isLoadingResume) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="w-[30vw]  text-primary" size={80} />
      </div>
    );
  }

  // Show error state if resume fetch failed
  if (isResumeError) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f8f9fa] dark:bg-background">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive font-medium">Failed to load resume</p>
          <p className="text-muted-foreground text-sm">
            The resume may not exist or you don&apos;t have permission to view
            it.
          </p>
          <Link href="/resumes">
            <Button variant="outline">Back to Resumes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#f8f9fa] dark:bg-background font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-card border-b border-border p-4 flex items-center justify-between z-20 shrink-0">
        <Link
          href="/resumes"
          className="flex items-center gap-2 font-bold text-xl text-primary"
        >
          <Image
            src="/logo.png"
            alt="CVHERO"
            width={30}
            height={30}
            className="object-contain"
          />
        </Link>
        <div className="flex items-center gap-4">
          <CircularProgress value={progress} size={32} strokeWidth={3} />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-3/4 max-w-xs bg-white dark:bg-card border-r border-border shadow-xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-1">
                {stepsConfig.map((step) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = isSectionComplete(step.id as SectionId);
                  const isAccessible = isStepAccessible(step.id);
                  const isDisabled = !isAccessible;

                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => {
                          if (isAccessible) {
                            handleStepChange(step.id);
                            setIsMobileMenuOpen(false);
                          }
                        }}
                        disabled={isDisabled}
                        className={cn(
                          "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                          isActive
                            ? "bg-blue-50 text-primary dark:bg-primary/10"
                            : isDisabled
                            ? "text-slate-400 dark:text-muted-foreground/50 cursor-not-allowed opacity-60"
                            : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-accent/10"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                            isActive
                              ? "bg-primary text-white border-primary"
                              : isCompleted
                              ? "bg-green-500 text-white border-green-500"
                              : isDisabled
                              ? "bg-slate-100 border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                              : "bg-white border-slate-200 text-slate-400 dark:bg-card dark:border-border"
                          )}
                        >
                          {isDisabled ? (
                            <Lock className="w-3 h-3" />
                          ) : (
                            <Icon className="w-4 h-4" />
                          )}
                        </div>
                        {step.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Left Sidebar - Desktop Navigation */}
      <ResumeSidebar
        steps={stepsConfig}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        completedSteps={completedSteps}
        isStepAccessible={isStepAccessible}
        totalSteps={stepsConfig.length}
        selectedTemplate={selectedTemplate}
        onTemplateChange={setSelectedTemplate}
        renderTemplatePreview={renderTemplatePreview}
        previewContent={renderTemplatePreview(selectedTemplate)}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative bg-[#f8f9fa] dark:bg-background">
        {currentStep === "finalize" ? (
          /* Finalize Step - Full Width Layout */
          <div className="flex-1 overflow-y-auto px-4 lg:px-6">
            <StepRenderer
              stepId={currentStep}
              formData={formData}
              handleInputChange={handleInputChange}
              photoPreview={photoPreview}
              handlePhotoUpload={handlePhotoUpload}
              fileInputRef={fileInputRef}
              countries={countries}
              touchedFields={touchedFields}
              addedOptionalFields={addedOptionalFields}
              onAddOptionalField={handleAddOptionalField}
              onRemoveOptionalField={handleRemoveOptionalField}
              skills={skills}
              onSkillsChange={updateSkills}
              experiences={experiences}
              onExperiencesChange={updateExperiences}
              educations={educations}
              onEducationsChange={updateEducations}
              certifications={certifications}
              onCertificationsChange={updateCertifications}
              projects={projects}
              onProjectsChange={updateProjects}
              references={references}
              onReferencesChange={updateReferences}
              languages={languages}
              onLanguagesChange={updateLanguages}
              volunteers={volunteers}
              onVolunteersChange={updateVolunteers}
              publications={publications}
              onPublicationsChange={updatePublications}
              completedSteps={completedSteps}
              totalSteps={stepsConfig.length}
              selectedTemplate={selectedTemplate}
              onTemplateChange={setSelectedTemplate}
            />
          </div>
        ) : (
          /* Regular Steps Layout */
          <div className="flex-1 overflow-y-auto p-4 lg:p-12 pb-32 scroll-smooth">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-start">
              {/* Form Section */}
              <div className="lg:col-span-2 space-y-8">
                <ResumeStepHeader
                  title={currentStepConfig.title}
                  description={currentStepConfig.description}
                />

                <StepRenderer
                  stepId={currentStep}
                  formData={formData}
                  handleInputChange={handleInputChange}
                  photoPreview={photoPreview}
                  handlePhotoUpload={handlePhotoUpload}
                  fileInputRef={fileInputRef}
                  countries={countries}
                  touchedFields={touchedFields}
                  addedOptionalFields={addedOptionalFields}
                  onAddOptionalField={handleAddOptionalField}
                  onRemoveOptionalField={handleRemoveOptionalField}
                  skills={skills}
                  onSkillsChange={updateSkills}
                  experiences={experiences}
                  onExperiencesChange={updateExperiences}
                  educations={educations}
                  onEducationsChange={updateEducations}
                  certifications={certifications}
                  onCertificationsChange={updateCertifications}
                  projects={projects}
                  onProjectsChange={updateProjects}
                  references={references}
                  onReferencesChange={updateReferences}
                  languages={languages}
                  onLanguagesChange={updateLanguages}
                  volunteers={volunteers}
                  onVolunteersChange={updateVolunteers}
                  publications={publications}
                  onPublicationsChange={updatePublications}
                />

                <ResumeNavigation
                  onBack={handleBack}
                  onSave={handleSaveAndContinue}
                  isSaving={isSaving}
                  isFirstStep={currentStepIndex === 0}
                  isLastStep={currentStepIndex === stepsConfig.length - 1}
                  isStepValid={isCurrentStepValid()}
                  hasChanges={shouldShowSave}
                />
              </div>

              {/* Right Sidebar - Tips with Progress */}
              <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
                {/* Progress & ATS Score Card */}
                <div className="bg-white dark:bg-card border border-border rounded-xl px-5 py-3">
                  <div className="flex items-center justify-between gap-6">
                    {/* Progress Bar */}
                    <div className="flex-1">
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

                    {/* ATS Score */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-accent/30 px-3 py-1.5 rounded-full">
                        <CircularProgress
                          value={progress}
                          size={28}
                          strokeWidth={3}
                        />
                        <div className="hidden sm:block">
                          <span className="text-[10px] text-muted-foreground block leading-tight">
                            ATS Score
                          </span>
                          <span className="text-xs font-semibold text-primary leading-tight">
                            {progress >= 80
                              ? "Excellent"
                              : progress >= 60
                              ? "Good"
                              : progress >= 40
                              ? "Fair"
                              : "Needs Work"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tips Panel */}
                <ResumeTipsPanel
                  title={`${currentStepConfig.label} Tips`}
                  tips={currentStepConfig.tips}
                  didYouKnow={currentStepConfig.didYouKnow}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Main client component with provider wrapper
export default function ResumeBuilderClient({
  resumeId,
}: ResumeBuilderClientProps) {
  return (
    <ResumeProvider>
      <ResumeBuilderContent resumeId={resumeId} />
    </ResumeProvider>
  );
}
