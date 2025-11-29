"use client";

import { Mail, Phone } from "lucide-react";
import { DisclosureLetterTemplateProps } from "./types";

export function CorporateDisclosureLetterTemplate({
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

  // Get subject line based on disclosure type
  const getSubjectTitle = () => {
    if (disclosureContent.subject) return disclosureContent.subject;
    return "Permission To Disclose Information Letter";
  };

  return (
    <div
      className="dl-template dl-corporate"
      style={{
        fontFamily,
        height: "100%",
        minHeight: "842px",
        backgroundColor: "white",
      }}
    >
      {/* Header with diagonal background */}
      <div
        style={{
          position: "relative",
          padding: "32px 48px",
          paddingBottom: "48px",
          marginBottom: "0",
        }}
      >
        {/* Diagonal background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "120px",
            background: `linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)`,
            clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
          }}
        />

        {/* Logo/Icon area */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: "8px",
          }}
        >
          {/* Company icon placeholder */}
          <div
            style={{
              width: "40px",
              height: "40px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ opacity: 0.9 }}
            >
              <path
                d="M20 4L4 12V28L20 36L36 28V12L20 4Z"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M20 4V20M20 20L4 12M20 20L36 12"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          {/* Company Name */}
          <h1
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "white",
              letterSpacing: "2px",
              marginBottom: "4px",
            }}
          >
            {disclosureContent.company || "Explora Dynamics"}
          </h1>

          {/* Contact info */}
          <p
            style={{
              fontSize: fontSize.small,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            {personalInfo.email || "contact@company.com"}
            {personalInfo.phone && ` | ${personalInfo.phone}`}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "24px 48px 48px" }}>
        {/* Title */}
        <h2
          style={{
            fontSize: "22px",
            fontWeight: 700,
            color: "#1f2937",
            textAlign: "center",
            marginBottom: `${sectionGap + 8}px`,
          }}
        >
          {getSubjectTitle()}
        </h2>

        {/* Recipient Info */}
        <div
          style={{
            marginBottom: `${sectionGap}px`,
            fontSize: fontSize.body,
            color: "#374151",
            lineHeight: 1.6,
          }}
        >
          <p style={{ fontWeight: 600 }}>
            {disclosureContent.recipientName || "Recipient Name"}
          </p>
          {disclosureContent.recipientTitle && (
            <p>{disclosureContent.recipientTitle}</p>
          )}
          <p>{disclosureContent.company || "Company Name"}</p>
          {disclosureContent.address && <p>{disclosureContent.address}</p>}
        </div>

        {/* Greeting */}
        <p
          style={{
            marginBottom: `${sectionGap}px`,
            fontSize: fontSize.body,
            color: "#1f2937",
          }}
        >
          {disclosureContent.salutation || "Dear"}{" "}
          {disclosureContent.recipientName
            ? `${disclosureContent.recipientName.split(" ")[0].charAt(0) === "M" ? "Mr." : "Ms."} ${disclosureContent.recipientName.split(" ").pop()}`
            : "Hiring Manager"}
          ,
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
          {personalInfo.jobTitle && (
            <p
              style={{
                fontSize: fontSize.small,
                color: "#6b7280",
              }}
            >
              {personalInfo.jobTitle}
            </p>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "48px",
            textAlign: "center",
            fontSize: fontSize.small,
            color: accentColor,
          }}
        >
          Letter Templates @ Template.net
        </div>
      </div>
    </div>
  );
}
