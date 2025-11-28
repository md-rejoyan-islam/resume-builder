"use client";

import { CoverLetterTemplateProps } from "./types";

export function ProfessionalCoverLetterTemplate({
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
      className="cl-template cl-professional"
      style={{
        fontFamily,
        minHeight: "100%",
        backgroundColor: "white",
      }}
    >
      {/* Header with accent bar */}
      <div
        style={{
          borderTop: `4px solid ${accentColor}`,
          padding: "36px 48px",
          backgroundColor: "#f8fafc",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {/* Name and Title */}
          <div>
            <h1
              style={{
                fontSize: fontSize.name,
                fontWeight: 700,
                color: accentColor,
                marginBottom: "4px",
              }}
            >
              {personalInfo.fullName || "Your Name"}
            </h1>
            {personalInfo.jobTitle && (
              <p
                style={{
                  fontSize: fontSize.title,
                  color: "#64748b",
                  fontWeight: 500,
                }}
              >
                {personalInfo.jobTitle}
              </p>
            )}
          </div>

          {/* Contact Info */}
          <div
            style={{
              fontSize: fontSize.small,
              color: "#64748b",
              textAlign: "right",
              lineHeight: 1.8,
            }}
          >
            {personalInfo.email && <p>{personalInfo.email}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.location && <p>{personalInfo.location}</p>}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "32px 48px" }}>
        {/* Date and Recipient */}
        <div style={{ marginBottom: `${sectionGap}px` }}>
          {letterContent.date && (
            <p
              style={{
                fontSize: fontSize.body,
                color: "#6b7280",
                marginBottom: `${sectionGap}px`,
              }}
            >
              {formatDate(letterContent.date)}
            </p>
          )}

          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight: 1.6,
            }}
          >
            {letterContent.recipientName && <p>{letterContent.recipientName}</p>}
            {letterContent.recipientTitle && <p>{letterContent.recipientTitle}</p>}
            {letterContent.company && (
              <p style={{ fontWeight: 600 }}>{letterContent.company}</p>
            )}
            {letterContent.address && <p>{letterContent.address}</p>}
          </div>
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
          <div
            style={{
              display: "inline-block",
              borderTop: `2px solid ${accentColor}`,
              paddingTop: "8px",
            }}
          >
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
      </div>
    </div>
  );
}
