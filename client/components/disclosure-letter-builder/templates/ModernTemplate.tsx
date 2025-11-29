"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { DisclosureLetterTemplateProps } from "./types";

export function ModernDisclosureLetterTemplate({
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
      className="dl-template dl-modern"
      style={{
        fontFamily,
        height: "100%",
        minHeight: "842px",
        backgroundColor: "white",
        display: "flex",
      }}
    >
      {/* Left Sidebar */}
      <div
        style={{
          width: "200px",
          backgroundColor: accentColor,
          padding: "48px 24px",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Name */}
        <h1
          style={{
            fontSize: "20px",
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
              fontSize: fontSize.small,
              opacity: 0.9,
              marginBottom: "24px",
            }}
          >
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Info */}
        <div
          style={{
            marginTop: "auto",
            fontSize: fontSize.small,
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {personalInfo.email && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Mail style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span style={{ wordBreak: "break-all" }}>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Phone style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin style={{ width: "14px", height: "14px", opacity: 0.8 }} />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "48px 40px" }}>
        {/* Date */}
        {disclosureContent.date && (
          <p
            style={{
              fontSize: fontSize.body,
              color: "#6b7280",
              marginBottom: `${sectionGap}px`,
              textAlign: "right",
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
          {disclosureContent.recipientName && (
            <p style={{ fontWeight: 600 }}>{disclosureContent.recipientName}</p>
          )}
          {disclosureContent.recipientTitle && <p>{disclosureContent.recipientTitle}</p>}
          {disclosureContent.company && <p>{disclosureContent.company}</p>}
          {disclosureContent.address && <p>{disclosureContent.address}</p>}
        </div>

        {/* Subject Line */}
        {disclosureContent.subject && (
          <div
            style={{
              marginBottom: `${sectionGap}px`,
              padding: "12px 16px",
              backgroundColor: `${accentColor}10`,
              borderLeft: `3px solid ${accentColor}`,
            }}
          >
            <p
              style={{
                fontSize: fontSize.body,
                fontWeight: 600,
                color: accentColor,
              }}
            >
              Re: {disclosureContent.subject}
            </p>
          </div>
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
              marginBottom: "24px",
            }}
          >
            {disclosureContent.closing || "Sincerely"},
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
