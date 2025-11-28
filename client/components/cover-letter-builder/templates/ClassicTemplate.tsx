"use client";

import { CoverLetterTemplateProps } from "./types";

export function ClassicCoverLetterTemplate({
  data,
  styles,
}: CoverLetterTemplateProps) {
  const { personalInfo, letterContent } = data;
  const { fontFamily, fontSize, lineHeight, accentColor, paragraphGap, sectionGap } = styles;

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div
      className="cl-template cl-classic"
      style={{
        fontFamily,
        padding: "48px",
        minHeight: "100%",
        backgroundColor: "white",
      }}
    >
      {/* Header - Centered Personal Info */}
      <div
        style={{
          textAlign: "center",
          marginBottom: `${sectionGap}px`,
          paddingBottom: `${sectionGap}px`,
          borderBottom: `2px solid ${accentColor}`,
        }}
      >
        <h1
          style={{
            fontSize: fontSize.name,
            fontWeight: 700,
            color: "#1f2937",
            marginBottom: "4px",
            letterSpacing: "0.5px",
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p
            style={{
              fontSize: fontSize.title,
              color: accentColor,
              marginBottom: "12px",
              fontWeight: 500,
            }}
          >
            {personalInfo.jobTitle}
          </p>
        )}
        <div
          style={{
            fontSize: fontSize.small,
            color: "#6b7280",
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
      </div>

      {/* Date */}
      {letterContent.date && (
        <p
          style={{
            fontSize: fontSize.body,
            color: "#4b5563",
            marginBottom: `${sectionGap}px`,
          }}
        >
          {formatDate(letterContent.date)}
        </p>
      )}

      {/* Recipient Info */}
      <div
        style={{
          marginBottom: `${sectionGap}px`,
          fontSize: fontSize.body,
          color: "#374151",
          lineHeight: 1.6,
        }}
      >
        {letterContent.recipientName && <p>{letterContent.recipientName}</p>}
        {letterContent.recipientTitle && <p>{letterContent.recipientTitle}</p>}
        {letterContent.company && (
          <p style={{ fontWeight: 500 }}>{letterContent.company}</p>
        )}
        {letterContent.address && <p>{letterContent.address}</p>}
      </div>

      {/* Greeting */}
      <p
        style={{
          marginBottom: `${sectionGap}px`,
          fontSize: fontSize.body,
          color: "#1f2937",
        }}
      >
        {letterContent.salutation}{" "}
        {letterContent.recipientName || letterContent.greeting}
        {(letterContent.recipientName || letterContent.greeting) && ","}
      </p>

      {/* Body Paragraphs */}
      <div
        style={{
          marginBottom: `${sectionGap}px`,
          display: "flex",
          flexDirection: "column",
          gap: `${paragraphGap}px`,
        }}
      >
        {letterContent.bodyParagraph1 && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: letterContent.bodyParagraph1 }}
          />
        )}
        {letterContent.bodyParagraph2 && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: letterContent.bodyParagraph2 }}
          />
        )}
        {letterContent.bodyParagraph3 && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: letterContent.bodyParagraph3 }}
          />
        )}
        {letterContent.closingParagraph && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: letterContent.closingParagraph }}
          />
        )}
      </div>

      {/* Closing */}
      <div style={{ marginTop: `${sectionGap}px` }}>
        <p
          style={{
            fontSize: fontSize.body,
            color: "#1f2937",
            marginBottom: `${sectionGap}px`,
          }}
        >
          {letterContent.closing},
        </p>
        <p
          style={{
            fontSize: fontSize.body,
            fontWeight: 600,
            color: "#1f2937",
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </p>
      </div>
    </div>
  );
}
