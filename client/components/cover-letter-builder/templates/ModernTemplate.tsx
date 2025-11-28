"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { CoverLetterTemplateProps } from "./types";

export function ModernCoverLetterTemplate({
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
      className="cl-template cl-modern"
      style={{
        fontFamily,
        minHeight: "100%",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "35%",
          backgroundColor: accentColor,
          padding: "40px 24px",
          color: "white",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: fontSize.name,
            fontWeight: 700,
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          {personalInfo.fullName || "Your Name"}
        </h1>
        {personalInfo.jobTitle && (
          <p
            style={{
              fontSize: fontSize.title,
              opacity: 0.9,
              marginBottom: "32px",
              fontWeight: 400,
            }}
          >
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: fontSize.small,
          }}
        >
          {personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span style={{ opacity: 0.9 }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Phone style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span style={{ opacity: 0.9 }}>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span style={{ opacity: 0.9 }}>{personalInfo.location}</span>
            </div>
          )}
        </div>

        {/* Recipient Section in Sidebar */}
        {(letterContent.recipientName || letterContent.company) && (
          <div style={{ marginTop: "40px" }}>
            <h3
              style={{
                fontSize: fontSize.small,
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "1px",
                marginBottom: "12px",
                opacity: 0.8,
              }}
            >
              Recipient
            </h3>
            <div style={{ fontSize: fontSize.small, opacity: 0.9, lineHeight: 1.6 }}>
              {letterContent.recipientName && <p>{letterContent.recipientName}</p>}
              {letterContent.recipientTitle && <p>{letterContent.recipientTitle}</p>}
              {letterContent.company && (
                <p style={{ fontWeight: 500 }}>{letterContent.company}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          padding: "40px 36px",
        }}
      >
        {/* Date */}
        {letterContent.date && (
          <p
            style={{
              fontSize: fontSize.small,
              color: "#6b7280",
              marginBottom: `${sectionGap}px`,
            }}
          >
            {formatDate(letterContent.date)}
          </p>
        )}

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
          <p
            style={{
              fontSize: fontSize.body,
              fontWeight: 600,
              color: accentColor,
            }}
          >
            {personalInfo.fullName || "Your Name"}
          </p>
        </div>
      </div>
    </div>
  );
}
