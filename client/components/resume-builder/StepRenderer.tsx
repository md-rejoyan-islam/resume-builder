"use client";

import { Certification, CertificationForm } from "@/components/resume-builder/CertificationForm";
import { DynamicForm } from "@/components/resume-builder/DynamicForm";
import { Education, EducationForm } from "@/components/resume-builder/EducationForm";
import { Experience, ExperienceForm } from "@/components/resume-builder/ExperienceForm";
import { FinalizeStep } from "@/components/resume-builder/FinalizeStep";
import { Language, LanguageForm } from "@/components/resume-builder/LanguageForm";
import { Project, ProjectForm } from "@/components/resume-builder/ProjectForm";
import { Publication, PublicationForm } from "@/components/resume-builder/PublicationForm";
import { Reference, ReferenceForm } from "@/components/resume-builder/ReferenceForm";
import { Skill, SkillsForm } from "@/components/resume-builder/SkillsForm";
import { Volunteer, VolunteerForm } from "@/components/resume-builder/VolunteerForm";
import { stepsConfig } from "@/lib/resume-steps";
import { RefObject } from "react";

interface StepRendererProps {
  stepId: string;
  formData: Record<string, string>;
  handleInputChange: (field: string, value: string) => void;
  photoPreview?: string | null;
  handlePhotoUpload?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef?: RefObject<HTMLInputElement | null>;
  countries: { name: string; code: string }[];
  touchedFields?: Set<string>;
  // Optional fields management
  addedOptionalFields?: Set<string>;
  onAddOptionalField?: (fieldName: string) => void;
  onRemoveOptionalField?: (fieldName: string) => void;
  // Skills management
  skills?: Skill[];
  onSkillsChange?: (skills: Skill[]) => void;
  // Experience management
  experiences?: Experience[];
  onExperiencesChange?: (experiences: Experience[]) => void;
  // Education management
  educations?: Education[];
  onEducationsChange?: (educations: Education[]) => void;
  // Certification management
  certifications?: Certification[];
  onCertificationsChange?: (certifications: Certification[]) => void;
  // Project management
  projects?: Project[];
  onProjectsChange?: (projects: Project[]) => void;
  // Reference management
  references?: Reference[];
  onReferencesChange?: (references: Reference[]) => void;
  // Language management
  languages?: Language[];
  onLanguagesChange?: (languages: Language[]) => void;
  // Volunteer management
  volunteers?: Volunteer[];
  onVolunteersChange?: (volunteers: Volunteer[]) => void;
  // Publication management
  publications?: Publication[];
  onPublicationsChange?: (publications: Publication[]) => void;
}

export function StepRenderer({
  stepId,
  formData,
  handleInputChange,
  photoPreview,
  handlePhotoUpload,
  fileInputRef,
  countries,
  touchedFields = new Set(),
  addedOptionalFields = new Set(),
  onAddOptionalField,
  onRemoveOptionalField,
  skills = [],
  onSkillsChange,
  experiences = [],
  onExperiencesChange,
  educations = [],
  onEducationsChange,
  certifications = [],
  onCertificationsChange,
  projects = [],
  onProjectsChange,
  references = [],
  onReferencesChange,
  languages = [],
  onLanguagesChange,
  volunteers = [],
  onVolunteersChange,
  publications = [],
  onPublicationsChange,
}: StepRendererProps) {
  const stepConfig = stepsConfig.find((s) => s.id === stepId);

  if (!stepConfig) {
    return <div>Step not found</div>;
  }

  if (stepConfig.component === "finalize") {
    return (
      <FinalizeStep
        formData={formData}
        skills={skills}
        experiences={experiences}
        educations={educations}
        certifications={certifications}
        projects={projects}
        references={references}
        languages={languages}
        volunteers={volunteers}
        publications={publications}
      />
    );
  }

  // Handle experience step with custom ExperienceForm
  if (stepConfig.component === "experience" && onExperiencesChange) {
    return (
      <ExperienceForm
        experiences={experiences}
        onExperiencesChange={onExperiencesChange}
        countries={countries}
      />
    );
  }

  // Handle education step with custom EducationForm
  if (stepConfig.component === "education" && onEducationsChange) {
    return (
      <EducationForm
        educations={educations}
        onEducationsChange={onEducationsChange}
      />
    );
  }

  // Handle certification step with custom CertificationForm
  if (stepConfig.component === "certification" && onCertificationsChange) {
    return (
      <CertificationForm
        certifications={certifications}
        onCertificationsChange={onCertificationsChange}
      />
    );
  }

  // Handle projects step with custom ProjectForm
  if (stepConfig.component === "projects" && onProjectsChange) {
    return (
      <ProjectForm
        projects={projects}
        onProjectsChange={onProjectsChange}
      />
    );
  }

  // Handle references step with custom ReferenceForm
  if (stepConfig.component === "references" && onReferencesChange) {
    return (
      <ReferenceForm
        references={references}
        onReferencesChange={onReferencesChange}
      />
    );
  }

  // Handle language step with custom LanguageForm
  if (stepConfig.component === "language" && onLanguagesChange) {
    return (
      <LanguageForm
        languages={languages}
        onLanguagesChange={onLanguagesChange}
      />
    );
  }

  // Handle volunteer step with custom VolunteerForm
  if (stepConfig.component === "volunteer" && onVolunteersChange) {
    return (
      <VolunteerForm
        volunteers={volunteers}
        onVolunteersChange={onVolunteersChange}
      />
    );
  }

  // Handle publications step with custom PublicationForm
  if (stepConfig.component === "publications" && onPublicationsChange) {
    return (
      <PublicationForm
        publications={publications}
        onPublicationsChange={onPublicationsChange}
      />
    );
  }

  // Handle skills step with custom SkillsForm
  if (stepId === "skills" && onSkillsChange) {
    return <SkillsForm skills={skills} onSkillsChange={onSkillsChange} />;
  }

  if (stepConfig.fields) {
    // Prepare dynamic options
    const dynamicOptions: Record<string, { label: string; value: string }[]> =
      {};

    // Inject countries if needed
    if (stepConfig.fields.some((f) => f.name === "country")) {
      dynamicOptions["country"] = countries.map((c) => ({
        label: c.name,
        value: c.name,
      }));
    }

    return (
      <DynamicForm
        fields={stepConfig.fields}
        formData={formData}
        handleInputChange={handleInputChange}
        photoPreview={photoPreview}
        handlePhotoUpload={handlePhotoUpload}
        fileInputRef={fileInputRef}
        dynamicOptions={dynamicOptions}
        touchedFields={touchedFields}
        optionalFields={stepConfig.optionalFields}
        addedOptionalFields={addedOptionalFields}
        onAddOptionalField={onAddOptionalField}
        onRemoveOptionalField={onRemoveOptionalField}
      />
    );
  }

  return <div>Content for {stepConfig.label}</div>;
}
