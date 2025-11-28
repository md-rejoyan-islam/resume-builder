# Resume Builder Refactoring Plan

## Overview
This plan outlines the refactoring of the resume builder's from-scratch page to improve maintainability, reusability, and add `is_completed` tracking for each section.

---

## 1. Create Types and Default Data File

**File: `client/lib/resume-data.ts`**

Move all default values and type exports from page.tsx to a dedicated file:

- Export all interfaces (Skill, Experience, Education, etc.)
- Export `defaultResumeData` object
- Export `emptyResumeData` object (for clean starts)
- Export type `ResumeSection` for tracking sections

```typescript
// Types
export interface ResumeSection<T> {
  data: T;
  is_completed: boolean;
}

// All section types re-exported from form components
export type { Skill } from "@/components/resume-builder/SkillsForm";
export type { Experience } from "@/components/resume-builder/ExperienceForm";
// ... etc

// Default data with sample content
export const defaultResumeData = { ... }

// Empty data for clean starts
export const emptyResumeData = { ... }
```

---

## 2. Create Resume Context Provider

**File: `client/context/ResumeContext.tsx`**

Create a React Context to eliminate prop drilling (currently 30+ props):

```typescript
interface ResumeContextValue {
  // All resume data with is_completed tracking
  contact: ResumeSection<ContactData>;
  skills: ResumeSection<Skill[]>;
  experiences: ResumeSection<Experience[]>;
  educations: ResumeSection<Education[]>;
  certifications: ResumeSection<Certification[]>;
  projects: ResumeSection<Project[]>;
  references: ResumeSection<Reference[]>;
  languages: ResumeSection<Language[]>;
  volunteers: ResumeSection<Volunteer[]>;
  publications: ResumeSection<Publication[]>;

  // Update functions
  updateContact: (data: Partial<ContactData>) => void;
  updateSkills: (skills: Skill[]) => void;
  updateExperiences: (experiences: Experience[]) => void;
  // ... etc

  // Computed values
  getSectionCompletion: (sectionId: string) => boolean;
  getOverallProgress: () => number;
}
```

**Benefits:**
- Eliminates 30+ props from StepRenderer
- Centralized state management
- Easy to compute `is_completed` for any section
- Components can access only what they need

---

## 3. Update Templates Index File

**File: `client/components/resume-builder/templates/index.ts`**

Enhance the existing index file to:

```typescript
import { ClassicTemplate } from "./ClassicTemplate";
import { ProfessionalTemplate } from "./ProfessionalTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { CenteredTemplate } from "./CenteredTemplate";
import { ModernDarkTemplate } from "./ModernDarkTemplate";

// Template registry with metadata
export const templates = {
  classic: {
    id: "classic",
    name: "Classic",
    component: ClassicTemplate,
    sidebar: undefined,
  },
  professional: {
    id: "professional",
    name: "Professional",
    component: ProfessionalTemplate,
    sidebar: { position: "right", width: "35%", backgroundOpacity: 0.08 },
  },
  executive: {
    id: "executive",
    name: "Executive",
    component: ExecutiveTemplate,
    sidebar: { position: "left", width: "35%", backgroundOpacity: 0.08 },
  },
  centered: {
    id: "centered",
    name: "Centered",
    component: CenteredTemplate,
    sidebar: undefined,
  },
  "modern-dark": {
    id: "modern-dark",
    name: "Modern Dark",
    component: ModernDarkTemplate,
    sidebar: undefined,
  },
} as const;

export type TemplateId = keyof typeof templates;

// Helper functions
export const getTemplate = (id: TemplateId) => templates[id];
export const getTemplateList = () => Object.values(templates);
export const getSidebarConfig = (id: TemplateId, accentColor: string) => { ... };

// Re-exports
export { ResumePageWrapper } from "./ResumePageWrapper";
export type { TemplateData, TemplateStyles } from "./ModernDarkTemplate";
```

---

## 4. Create Reusable CircularProgress Component

**File: `client/components/ui/circular-progress.tsx`**

Extract the CircularProgress component (used in 2 places):

```typescript
interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
  labelClassName?: string;
}

export function CircularProgress({ ... }: CircularProgressProps) {
  // Move existing implementation here
}
```

---

## 5. Add is_completed Logic

**Implementation in ResumeContext:**

```typescript
// Helper to check if a section is completed
const checkSectionCompletion = (sectionId: string): boolean => {
  switch (sectionId) {
    case "contact":
      // Required fields: firstName, lastName, email
      return !!(contact.firstName && contact.lastName && contact.email);
    case "skills":
      return skills.length > 0;
    case "experience":
      return experiences.length > 0;
    case "education":
      return educations.length > 0;
    case "certifications":
      return certifications.length > 0;
    case "projects":
      return projects.length > 0;
    case "references":
      return references.length > 0;
    case "languages":
      return languages.length > 0;
    case "volunteer":
      return volunteers.length > 0;
    case "publications":
      return publications.length > 0;
    default:
      return false;
  }
};
```

**Styling based on is_completed:**
- Sidebar step items show green checkmark when completed
- Step cards show completion badge
- Progress calculations use actual completion status

---

## 6. Implementation Steps

### Step 1: Create `client/lib/resume-data.ts`
- Move all default data from page.tsx
- Add type definitions
- Add empty data objects

### Step 2: Create `client/context/ResumeContext.tsx`
- Implement context provider
- Add all state management
- Add is_completed computations

### Step 3: Update `client/components/resume-builder/templates/index.ts`
- Add template registry with metadata
- Add sidebar config per template
- Add helper functions

### Step 4: Create `client/components/ui/circular-progress.tsx`
- Extract from page.tsx
- Make reusable with props

### Step 5: Update `page.tsx`
- Wrap with ResumeProvider
- Remove all local state (use context)
- Remove defaultResumeData (use from lib)
- Simplify StepRenderer props

### Step 6: Update `StepRenderer.tsx`
- Use context instead of props
- Simplify interface significantly

### Step 7: Update sidebar components
- Apply styling based on is_completed
- Use context for completion status

---

## 7. File Changes Summary

| Action | File |
|--------|------|
| CREATE | `client/lib/resume-data.ts` |
| CREATE | `client/context/ResumeContext.tsx` |
| CREATE | `client/components/ui/circular-progress.tsx` |
| UPDATE | `client/components/resume-builder/templates/index.ts` |
| UPDATE | `client/app/apps/[subdomain]/(user)/resumes/from-scratch/[id]/page.tsx` |
| UPDATE | `client/components/resume-builder/StepRenderer.tsx` |
| UPDATE | `client/components/resume-builder/ResumeSidebar.tsx` |

---

## 8. Benefits

1. **Maintainability**: Default data in one place, easy to modify
2. **Reusability**: CircularProgress, templates registry usable across app
3. **is_completed tracking**: Clear visual feedback on section completion
4. **Reduced prop drilling**: Context eliminates 30+ props from StepRenderer
5. **Type safety**: Centralized types ensure consistency
6. **Extensibility**: Easy to add new templates or sections
