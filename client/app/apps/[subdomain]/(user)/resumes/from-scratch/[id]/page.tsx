"use client";

import { Certification } from "@/components/resume-builder/CertificationForm";
import { Education } from "@/components/resume-builder/EducationForm";
import { Experience } from "@/components/resume-builder/ExperienceForm";
import { Language } from "@/components/resume-builder/LanguageForm";
import { Project } from "@/components/resume-builder/ProjectForm";
import { Publication } from "@/components/resume-builder/PublicationForm";
import { Reference } from "@/components/resume-builder/ReferenceForm";
import { ResumeNavigation } from "@/components/resume-builder/ResumeNavigation";
import { ResumeSidebar } from "@/components/resume-builder/ResumeSidebar";
import { ResumeStepHeader } from "@/components/resume-builder/ResumeStepHeader";
import { ResumeTipsPanel } from "@/components/resume-builder/ResumeTipsPanel";
import { Skill } from "@/components/resume-builder/SkillsForm";
import { StepRenderer } from "@/components/resume-builder/StepRenderer";
import { Volunteer } from "@/components/resume-builder/VolunteerForm";
import { Button } from "@/components/ui/button";
import { stepsConfig } from "@/lib/resume-steps";
import { cn } from "@/lib/utils";
import { Lock, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// Centralized default resume data - all default values controlled from here
const defaultResumeData = {
  // Contact information
  contact: {
    firstName: "Md Rejoyan",
    lastName: "Islam",
    jobTitle: "Software Engineer",
    email: "rejoyan@gmail.com",
    phone: "01568-816822",
    country: "",
    city: "Dhaka",
    state: "",
    postalCode: "3114",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed ligula nec lorem tincidunt posuere. Nulla facilisi. Suspendisse potenti. Donec at elementum ex, vitae convallis lorem.",
  },

  // Skills (3 entries)
  skills: [
    { id: "skill-1", name: "JavaScript", level: 5 },
    { id: "skill-2", name: "React.js", level: 5 },
    { id: "skill-3", name: "Node.js", level: 3 },
    { id: "skill-4", name: "Typescript", level: 3 },
    { id: "skill-5", name: "Nextjs", level: 3 },
  ] as Skill[],

  // Experiences (2 entries)
  experiences: [
    {
      id: "exp-1",
      jobTitle: "Senior Software Engineer",
      employer: "Tech Solutions Inc.",
      city: "San Francisco",
      country: "United States",
      jobType: "full-time",
      startDate: "2021-06",
      endDate: "",
      currentlyWorking: true,
      description:
        "Led development of scalable web applications using React and Node.js. Mentored junior developers and implemented CI/CD pipelines.",
    },
    {
      id: "exp-2",
      jobTitle: "Software Developer",
      employer: "Digital Agency",
      city: "New York",
      country: "United States",
      jobType: "full-time",
      startDate: "2019-01",
      endDate: "2021-05",
      currentlyWorking: false,
      description:
        "Developed and maintained client websites and web applications. Collaborated with design team to implement responsive UI components.",
    },
  ] as Experience[],

  // Educations (2 entries)
  educations: [
    {
      id: "edu-1",
      school: "Stanford University",
      degree: "Master of Science",
      fieldOfStudy: "Computer Science",
      location: "Stanford, CA",
      startDate: "2017-09",
      endDate: "2019-06",
      currentlyStudying: false,
    },
    {
      id: "edu-2",
      school: "University of California, Berkeley",
      degree: "Bachelor of Science",
      fieldOfStudy: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      currentlyStudying: false,
    },
  ] as Education[],

  // Certifications (2 entries)
  certifications: [
    {
      id: "cert-1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2023-03",
      expirationDate: "2026-03",
      noExpiration: false,
      credentialId: "AWS-SAA-123456",
      credentialUrl: "https://aws.amazon.com/verification",
      description:
        "Professional level certification for designing distributed systems on AWS.",
    },
    {
      id: "cert-2",
      name: "Google Professional Cloud Developer",
      issuer: "Google Cloud",
      issueDate: "2022-08",
      expirationDate: "",
      noExpiration: true,
      credentialId: "GCP-PCD-789012",
      credentialUrl: "https://cloud.google.com/certification",
      description:
        "Certification for building scalable applications on Google Cloud Platform.",
    },
  ] as Certification[],

  // Projects (3 entries)
  projects: [
    {
      id: "proj-1",
      name: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment integration, and inventory management.",
      githubUrl: "https://github.com/username/ecommerce-platform",
      liveUrl: "https://myecommerce.com",
      otherUrl: "",
    },
    {
      id: "proj-2",
      name: "Task Management App",
      description:
        "Collaborative task management application built with Next.js and Firebase. Supports real-time updates, team collaboration, and deadline tracking.",
      githubUrl: "https://github.com/username/task-manager",
      liveUrl: "https://taskmanager.app",
      otherUrl: "https://docs.taskmanager.app",
    },
    {
      id: "proj-3",
      name: "Weather Dashboard",
      description:
        "Real-time weather dashboard using OpenWeather API. Features interactive maps, 7-day forecasts, and location-based alerts.",
      githubUrl: "https://github.com/username/weather-dashboard",
      liveUrl: "",
      otherUrl: "",
    },
  ] as Project[],

  // References (1 entry)
  references: [
    {
      id: "ref-1",
      name: "John Smith",
      company: "Tech Solutions Inc.",
      position: "Engineering Manager",
      email: "john.smith@techsolutions.com",
      phone: "+1 555-123-4567",
      relationship: "Former Manager",
    },
  ] as Reference[],

  // Languages (2 entries)
  languages: [
    { id: "lang-1", language: "English", proficiency: "native" },
    { id: "lang-2", language: "Spanish", proficiency: "intermediate" },
  ] as Language[],

  // Volunteers (2 entries)
  volunteers: [
    {
      id: "vol-1",
      organization: "Code for America",
      role: "Technical Mentor",
      location: "San Francisco, CA",
      startDate: "Jan 2022",
      endDate: "",
      currentlyVolunteering: true,
      description:
        "Mentoring junior developers in web development technologies. Leading weekly coding workshops and code review sessions.",
    },
    {
      id: "vol-2",
      organization: "Local Food Bank",
      role: "IT Support Volunteer",
      location: "New York, NY",
      startDate: "Jun 2020",
      endDate: "Dec 2021",
      currentlyVolunteering: false,
      description:
        "Provided IT support and helped digitize inventory management system. Trained staff on using new software tools.",
    },
  ] as Volunteer[],

  // Publications (2 entries)
  publications: [
    {
      id: "pub-1",
      title: "Modern Web Development Practices: A Comprehensive Guide",
      publisher: "Tech Weekly Journal",
      authors: "Md Isla, John Doe",
      publicationDate: "Jun 2023",
      url: "https://techweekly.com/modern-web-dev",
      description:
        "An in-depth analysis of current web development trends, including React, Next.js, and serverless architectures.",
    },
    {
      id: "pub-2",
      title: "Optimizing React Applications for Performance",
      publisher: "Medium - JavaScript in Plain English",
      authors: "Md Isla",
      publicationDate: "Nov 2022",
      url: "https://medium.com/@mdisla/optimizing-react",
      description:
        "Best practices for improving React application performance through memoization, code splitting, and lazy loading.",
    },
  ] as Publication[],
};

// Circular Progress Component (Mobile Header)
const CircularProgress = ({
  value,
  size = 40,
  strokeWidth = 4,
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <svg className="transform -rotate-90 w-full h-full">
        <circle
          className="text-slate-200 dark:text-slate-700"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-orange-500 transition-all duration-300 ease-in-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className="absolute text-[10px] font-bold text-primary">
        {value}%
      </span>
    </div>
  );
};

export default function ResumeBuilderPage() {
  const [currentStep, setCurrentStep] = useState("contact");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [countries, setCountries] = useState<{ name: string; code: string }[]>(
    []
  );
  const [isSaving, setIsSaving] = useState(false);

  // Track which steps have been completed
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  // Track touched/error fields for validation display
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  // Track which optional fields have been added to the form
  const [addedOptionalFields, setAddedOptionalFields] = useState<Set<string>>(
    new Set()
  );

  // All form data initialized from centralized defaultResumeData object
  const [formData, setFormData] = useState<Record<string, string>>(
    defaultResumeData.contact
  );

  // Track skills for the skills step
  const [skills, setSkills] = useState<Skill[]>(defaultResumeData.skills);

  // Track experiences for the experience step
  const [experiences, setExperiences] = useState<Experience[]>(
    defaultResumeData.experiences
  );

  // Track educations for the education step
  const [educations, setEducations] = useState<Education[]>(
    defaultResumeData.educations
  );

  // Track certifications for the certification step
  const [certifications, setCertifications] = useState<Certification[]>(
    defaultResumeData.certifications
  );

  // Track projects for the projects step
  const [projects, setProjects] = useState<Project[]>(
    defaultResumeData.projects
  );

  // Track references for the references step
  const [references, setReferences] = useState<Reference[]>(
    defaultResumeData.references
  );

  // Track languages for the language step
  const [languages, setLanguages] = useState<Language[]>(
    defaultResumeData.languages
  );

  // Track volunteers for the volunteer step
  const [volunteers, setVolunteers] = useState<Volunteer[]>(
    defaultResumeData.volunteers
  );

  // Track publications for the publications step
  const [publications, setPublications] = useState<Publication[]>(
    defaultResumeData.publications
  );

  // Get current step index
  const currentStepIndex = useMemo(
    () => stepsConfig.findIndex((s) => s.id === currentStep),
    [currentStep]
  );

  // Check if a step is accessible (either completed or is the next step after last completed)
  const isStepAccessible = useCallback(
    (stepId: string) => {
      const stepIndex = stepsConfig.findIndex((s) => s.id === stepId);

      // First step is always accessible
      if (stepIndex === 0) return true;

      // If this step is completed, it's accessible
      if (completedSteps.has(stepId)) return true;

      // Check if the previous step is completed
      const previousStep = stepsConfig[stepIndex - 1];
      return completedSteps.has(previousStep.id);
    },
    [completedSteps]
  );

  // Check if current step has required fields filled
  const isCurrentStepValid = useCallback(() => {
    const stepConfig = stepsConfig.find((s) => s.id === currentStep);
    if (!stepConfig?.fields) return true; // Steps without fields are valid

    const requiredFields = stepConfig.fields.filter((f) => f.required);
    return requiredFields.every((field) => {
      const value = formData[field.name];
      return value && value.toString().trim() !== "";
    });
  }, [currentStep, formData]);

  // Handle step change with validation
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

  // Handle Save & Continue
  const handleSaveAndContinue = useCallback(() => {
    const invalidFields = getInvalidFields();

    if (invalidFields.length > 0) {
      // Mark all required fields as touched to show errors
      setTouchedFields((prev) => new Set([...prev, ...invalidFields]));
      return;
    }

    setIsSaving(true);

    // Simulate save (replace with actual API call)
    setTimeout(() => {
      // Mark current step as completed
      setCompletedSteps((prev) => new Set([...prev, currentStep]));

      // Clear touched fields for next step
      setTouchedFields(new Set());

      // Move to next step if not on last step
      if (currentStepIndex < stepsConfig.length - 1) {
        setCurrentStep(stepsConfig[currentStepIndex + 1].id);
      }

      setIsSaving(false);
    }, 300);
  }, [currentStep, currentStepIndex, getInvalidFields]);

  // Handle Back button
  const handleBack = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStep(stepsConfig[currentStepIndex - 1].id);
    }
  }, [currentStepIndex]);

  useEffect(() => {
    interface CountryApiResponse {
      name: { common: string };
      cca2: string;
    }

    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2"
        );
        const data: CountryApiResponse[] = await response.json();
        const formattedCountries = data
          .map((c) => ({ name: c.name.common, code: c.cca2 }))
          .sort((a, b) => a.name.localeCompare(b.name));
        setCountries(formattedCountries);
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      }
    };
    fetchCountries();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Add an optional field to the form
  const handleAddOptionalField = useCallback((fieldName: string) => {
    setAddedOptionalFields((prev) => new Set([...prev, fieldName]));
  }, []);

  // Remove an optional field from the form and clear its data
  const handleRemoveOptionalField = useCallback((fieldName: string) => {
    setAddedOptionalFields((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fieldName);
      return newSet;
    });
    // Clear the field data
    setFormData((prev) => {
      const newData = { ...prev };
      delete newData[fieldName];
      return newData;
    });
  }, []);

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

  return (
    <div className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[#f8f9fa] dark:bg-background font-sans">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white dark:bg-card border-b border-border p-4 flex items-center justify-between z-20 shrink-0  ">
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
          <CircularProgress value={55} size={32} strokeWidth={3} />
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
                  const isCompleted = completedSteps.has(step.id);
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
              onSkillsChange={setSkills}
              experiences={experiences}
              onExperiencesChange={setExperiences}
              educations={educations}
              onEducationsChange={setEducations}
              certifications={certifications}
              onCertificationsChange={setCertifications}
              projects={projects}
              onProjectsChange={setProjects}
              references={references}
              onReferencesChange={setReferences}
              languages={languages}
              onLanguagesChange={setLanguages}
              volunteers={volunteers}
              onVolunteersChange={setVolunteers}
              publications={publications}
              onPublicationsChange={setPublications}
            />
          </div>
        ) : (
          /* Regular Steps Layout */
          <div className="flex-1 overflow-y-auto p-4 lg:p-12 pb-32 scroll-smooth">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  onSkillsChange={setSkills}
                  experiences={experiences}
                  onExperiencesChange={setExperiences}
                  educations={educations}
                  onEducationsChange={setEducations}
                  certifications={certifications}
                  onCertificationsChange={setCertifications}
                  projects={projects}
                  onProjectsChange={setProjects}
                  references={references}
                  onReferencesChange={setReferences}
                  languages={languages}
                  onLanguagesChange={setLanguages}
                  volunteers={volunteers}
                  onVolunteersChange={setVolunteers}
                  publications={publications}
                  onPublicationsChange={setPublications}
                />

                <ResumeNavigation
                  onBack={handleBack}
                  onSave={handleSaveAndContinue}
                  isSaving={isSaving}
                  isFirstStep={currentStepIndex === 0}
                  isLastStep={currentStepIndex === stepsConfig.length - 1}
                  isStepValid={isCurrentStepValid()}
                />
              </div>

              {/* Right Sidebar - Tips */}
              <ResumeTipsPanel
                title={`${currentStepConfig.label} Tips`}
                tips={currentStepConfig.tips}
                didYouKnow={currentStepConfig.didYouKnow}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
