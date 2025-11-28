"use client";

import { useCoverLetterContext } from "@/context/CoverLetterContext";
import { ClassicCoverLetterTemplate } from "./templates";

export function CoverLetterPreview() {
  const { coverLetterData } = useCoverLetterContext();

  const previewStyles = {
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

  return (
    <div
      className="bg-white shadow-lg"
      style={{
        width: "600px",
        minHeight: "848px",
      }}
    >
      <ClassicCoverLetterTemplate data={coverLetterData} styles={previewStyles} />
    </div>
  );
}
