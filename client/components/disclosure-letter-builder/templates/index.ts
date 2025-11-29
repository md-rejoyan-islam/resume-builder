export * from "./ClassicTemplate";
export * from "./ProfessionalTemplate";
export * from "./ModernTemplate";
export * from "./CorporateTemplate";
export * from "./types";

import { ClassicDisclosureLetterTemplate } from "./ClassicTemplate";
import { ProfessionalDisclosureLetterTemplate } from "./ProfessionalTemplate";
import { ModernDisclosureLetterTemplate } from "./ModernTemplate";
import { CorporateDisclosureLetterTemplate } from "./CorporateTemplate";
import { DisclosureLetterTemplate, DisclosureLetterTemplateProps } from "./types";

// Template list for selection UI
export const disclosureLetterTemplates: DisclosureLetterTemplate[] = [
  {
    id: "classic",
    name: "Classic",
    description: "Clean and traditional layout with centered header",
    thumbnail: "/templates/disclosure-letter/classic.png",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Modern header with accent bar and split layout",
    thumbnail: "/templates/disclosure-letter/professional.png",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold sidebar design with contemporary styling",
    thumbnail: "/templates/disclosure-letter/modern.png",
  },
  {
    id: "corporate",
    name: "Corporate",
    description: "Executive style with diagonal header design",
    thumbnail: "/templates/disclosure-letter/corporate.png",
  },
];

// Get template component by ID
export function getDisclosureLetterTemplateComponent(
  templateId: string
): React.ComponentType<DisclosureLetterTemplateProps> {
  switch (templateId) {
    case "professional":
      return ProfessionalDisclosureLetterTemplate;
    case "modern":
      return ModernDisclosureLetterTemplate;
    case "corporate":
      return CorporateDisclosureLetterTemplate;
    case "classic":
    default:
      return ClassicDisclosureLetterTemplate;
  }
}

// Get template list
export function getDisclosureLetterTemplateList(): DisclosureLetterTemplate[] {
  return disclosureLetterTemplates;
}
