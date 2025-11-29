"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { DisclosureLetterTemplateProps } from "./types";

export function ClassicDisclosureLetterTemplate({
  data,
  styles,
}: DisclosureLetterTemplateProps) {
  const { personalInfo, disclosureContent } = data;
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
      className="dl-template dl-classic"
      style={{
        fontFamily,
        padding: "48px",
        height: "100%",
        minHeight: "842px",
        backgroundColor: "white",
        boxSizing: "border-box",
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
          {personalInfo.email && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Mail style={{ width: "12px", height: "12px" }} />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Phone style={{ width: "12px", height: "12px" }} />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <MapPin style={{ width: "12px", height: "12px" }} />
              {personalInfo.location}
            </span>
          )}
        </div>
      </div>

      {/* Date */}
      {disclosureContent.date && (
        <p
          style={{
            fontSize: fontSize.body,
            color: "#4b5563",
            marginBottom: `${sectionGap}px`,
          }}
        >
          {formatDate(disclosureContent.date)}
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
        {disclosureContent.recipientName && <p>{disclosureContent.recipientName}</p>}
        {disclosureContent.recipientTitle && <p>{disclosureContent.recipientTitle}</p>}
        {disclosureContent.company && (
          <p style={{ fontWeight: 500 }}>{disclosureContent.company}</p>
        )}
        {disclosureContent.address && <p>{disclosureContent.address}</p>}
      </div>

      {/* Subject Line */}
      {disclosureContent.subject && (
        <p
          style={{
            fontSize: fontSize.body,
            fontWeight: 600,
            color: "#1f2937",
            marginBottom: `${sectionGap}px`,
          }}
        >
          Re: {disclosureContent.subject}
        </p>
      )}

      {/* Greeting */}
      <p
        style={{
          marginBottom: `${sectionGap}px`,
          fontSize: fontSize.body,
          color: "#1f2937",
        }}
      >
        {disclosureContent.salutation || "Dear"}{" "}
        {disclosureContent.recipientName || "Hiring Manager"},
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
        {disclosureContent.introductionParagraph && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: disclosureContent.introductionParagraph }}
          />
        )}
        {disclosureContent.disclosureDetails && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: disclosureContent.disclosureDetails }}
          />
        )}
        {disclosureContent.relevantCircumstances && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: disclosureContent.relevantCircumstances }}
          />
        )}
        {disclosureContent.mitigatingFactors && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: disclosureContent.mitigatingFactors }}
          />
        )}
        {disclosureContent.supportingDocuments && (
          <p style={{ fontSize: fontSize.small, color: "#6b7280" }}>
            <strong>Attached Documents:</strong> {disclosureContent.supportingDocuments}
          </p>
        )}
        {disclosureContent.closingStatement && (
          <div
            style={{
              fontSize: fontSize.body,
              color: "#374151",
              lineHeight,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: disclosureContent.closingStatement }}
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
          {disclosureContent.closing || "Sincerely"},
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
