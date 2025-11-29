"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { CoverLetterTemplateProps } from "./types";

export function ExecutiveCoverLetterTemplate({
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
      className="cl-template cl-executive"
      style={{
        fontFamily,
        height: "100%",
        minHeight: "842px",
        backgroundColor: "white",
        padding: "48px",
        boxSizing: "border-box",
      }}
    >
      {/* Elegant Header */}
      <div
        style={{
          marginBottom: `${sectionGap * 1.5}px`,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: `calc(${fontSize.name} * 1.2)`,
            fontWeight: 300,
            color: "#1f2937",
            letterSpacing: "4px",
            textTransform: "uppercase",
            marginBottom: "8px",
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p
            style={{
              fontSize: fontSize.title,
              color: accentColor,
              fontWeight: 500,
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Decorative Line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "60px",
              backgroundColor: accentColor,
            }}
          />
          <div
            style={{
              width: "8px",
              height: "8px",
              backgroundColor: accentColor,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              height: "1px",
              width: "60px",
              backgroundColor: accentColor,
            }}
          />
        </div>

        {/* Contact Info */}
        <div
          style={{
            fontSize: fontSize.small,
            color: "#6b7280",
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {personalInfo.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Mail style={{ width: "12px", height: "12px" }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Phone style={{ width: "12px", height: "12px" }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MapPin style={{ width: "12px", height: "12px" }} />
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Date - Right aligned */}
      {letterContent.date && (
        <p
          style={{
            fontSize: fontSize.body,
            color: "#6b7280",
            marginBottom: `${sectionGap}px`,
            textAlign: "right",
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
        {letterContent.recipientName && (
          <p style={{ fontWeight: 500 }}>{letterContent.recipientName}</p>
        )}
        {letterContent.recipientTitle && <p>{letterContent.recipientTitle}</p>}
        {letterContent.company && (
          <p style={{ color: accentColor, fontWeight: 500 }}>
            {letterContent.company}
          </p>
        )}
        {letterContent.address && <p>{letterContent.address}</p>}
      </div>

      {/* Greeting */}
      <p
        style={{
          marginBottom: `${sectionGap}px`,
          fontSize: fontSize.body,
          color: "#1f2937",
          fontWeight: 500,
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
            marginBottom: `${sectionGap * 1.5}px`,
            fontStyle: "italic",
          }}
        >
          {letterContent.closing},
        </p>
        <p
          style={{
            fontSize: fontSize.title,
            fontWeight: 500,
            color: "#1f2937",
            letterSpacing: "1px",
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </p>
      </div>
    </div>
  );
}
