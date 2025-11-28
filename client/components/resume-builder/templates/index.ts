import { ComponentType } from "react";
import { CenteredTemplate } from "./CenteredTemplate";
import { ClassicTemplate } from "./ClassicTemplate";
import { ExecutiveTemplate } from "./ExecutiveTemplate";
import { ModernDarkTemplate } from "./ModernDarkTemplate";
import { ProfessionalTemplate } from "./ProfessionalTemplate";

// Re-export components
export { CenteredTemplate } from "./CenteredTemplate";
export { ClassicTemplate } from "./ClassicTemplate";
export { ExecutiveTemplate } from "./ExecutiveTemplate";
export { ModernDarkTemplate } from "./ModernDarkTemplate";
export { ProfessionalTemplate } from "./ProfessionalTemplate";
export { ResumePageWrapper } from "./ResumePageWrapper";
export type { TemplateData, TemplateStyles } from "./ModernDarkTemplate";

// Sidebar configuration type
export interface SidebarConfig {
  position: "left" | "right";
  width: string;
  backgroundOpacity: number;
}

// Template metadata type
export interface TemplateMetadata {
  id: string;
  name: string;
  description: string;
  component: ComponentType<{ data: unknown; styles: unknown }>;
  sidebar?: SidebarConfig;
  thumbnail?: string;
}

// Template registry with all template metadata
export const templates: Record<string, TemplateMetadata> = {
  classic: {
    id: "classic",
    name: "Classic",
    description: "Traditional resume layout with clear sections",
    component: ClassicTemplate as ComponentType<{ data: unknown; styles: unknown }>,
    sidebar: undefined,
  },
  professional: {
    id: "professional",
    name: "Professional",
    description: "Modern professional look with right sidebar",
    component: ProfessionalTemplate as ComponentType<{ data: unknown; styles: unknown }>,
    sidebar: {
      position: "right",
      width: "35%",
      backgroundOpacity: 0.08,
    },
  },
  executive: {
    id: "executive",
    name: "Executive",
    description: "Executive style with left sidebar accent",
    component: ExecutiveTemplate as ComponentType<{ data: unknown; styles: unknown }>,
    sidebar: {
      position: "left",
      width: "35%",
      backgroundOpacity: 0.08,
    },
  },
  centered: {
    id: "centered",
    name: "Centered",
    description: "Centered header with balanced layout",
    component: CenteredTemplate as ComponentType<{ data: unknown; styles: unknown }>,
    sidebar: undefined,
  },
  "modern-dark": {
    id: "modern-dark",
    name: "Modern Dark",
    description: "Bold modern design with dark header",
    component: ModernDarkTemplate as ComponentType<{ data: unknown; styles: unknown }>,
    sidebar: undefined,
  },
};

// Template ID type
export type TemplateId = keyof typeof templates;

// Get a single template by ID
export function getTemplate(id: string): TemplateMetadata {
  return templates[id] || templates.classic;
}

// Get all templates as array
export function getTemplateList(): TemplateMetadata[] {
  return Object.values(templates);
}

// Get template IDs
export function getTemplateIds(): string[] {
  return Object.keys(templates);
}

// Get sidebar config for a template with accent color
export function getSidebarConfig(
  templateId: string,
  accentColor: string
): { position: "left" | "right"; width: string; backgroundColor: string } | undefined {
  const template = templates[templateId];
  if (!template?.sidebar) return undefined;

  const { position, width, backgroundOpacity } = template.sidebar;
  // Convert opacity to hex (0.08 = ~14 in hex = 0e rounded)
  const opacityHex = Math.round(backgroundOpacity * 255)
    .toString(16)
    .padStart(2, "0");

  return {
    position,
    width,
    backgroundColor: `${accentColor}${opacityHex}`,
  };
}

// Check if template has sidebar
export function hasSidebar(templateId: string): boolean {
  return !!templates[templateId]?.sidebar;
}
