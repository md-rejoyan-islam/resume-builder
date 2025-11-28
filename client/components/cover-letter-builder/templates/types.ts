import { CoverLetterData } from "@/context/CoverLetterContext";

export interface CoverLetterTemplateStyles {
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

export interface CoverLetterTemplateProps {
  data: CoverLetterData;
  styles: CoverLetterTemplateStyles;
}

export const defaultCoverLetterStyles: CoverLetterTemplateStyles = {
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
