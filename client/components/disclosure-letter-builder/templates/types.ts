import { DisclosureLetterData } from "@/context/DisclosureLetterContext";

export interface DisclosureLetterTemplateStyles {
  fontFamily: string;
  fontSize: {
    name: string;
    title: string;
    body: string;
    small: string;
  };
  sectionGap: number;
  paragraphGap: number;
  lineHeight: number;
  accentColor: string;
}

export interface DisclosureLetterTemplateProps {
  data: DisclosureLetterData;
  styles: DisclosureLetterTemplateStyles;
}

export const defaultDisclosureLetterStyles: DisclosureLetterTemplateStyles = {
  fontFamily: "'Roboto', sans-serif",
  fontSize: {
    name: "24px",
    title: "14px",
    body: "11px",
    small: "10px",
  },
  sectionGap: 16,
  paragraphGap: 12,
  lineHeight: 1.5,
  accentColor: "#1e40af",
};

export interface DisclosureLetterTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
}
