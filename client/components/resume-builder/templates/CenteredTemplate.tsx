"use client";

import { ExternalLink, Github } from "lucide-react";
import { TemplateData, TemplateStyles } from "./ModernDarkTemplate";
import "./resume-templates.css";

interface CenteredTemplateProps {
  data: TemplateData;
  styles: TemplateStyles;
}

export function CenteredTemplate({ data, styles }: CenteredTemplateProps) {
  const {
    formData,
    skills,
    experiences,
    educations,
    certifications,
    projects,
    references,
    languages,
    volunteers,
    publications,
  } = data;

  const {
    fontFamily,
    fontSize,
    sectionGap,
    paragraphGap,
    lineHeight,
    accentColor,
  } = styles;

  return (
    <div
      className="rt-container"
      style={{ fontFamily }}
    >
      {/* Main Content */}
      <div
        className="rt-p-8"
        style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}
      >
        {/* Header Section - Centered */}
        <div className="rt-text-center">
          {/* Name */}
          <h1
            className="rt-font-bold rt-tracking-wide rt-uppercase"
            style={{
              fontSize: `${parseFloat(fontSize.name) * 1.1}px`,
              color: "#1a1a1a",
            }}
          >
            {formData.firstName} {formData.lastName}
          </h1>

          {/* Job Title */}
          <p
            className="rt-mt-1 rt-text-slate-600"
            style={{ fontSize: fontSize.body }}
          >
            {formData.jobTitle || "Professional"}
          </p>

          {/* Contact Info Row - Centered with dots */}
          <div
            className="rt-contact-row-centered rt-mt-2 rt-text-slate-600"
            style={{ fontSize: fontSize.small }}
          >
            {formData.email && <span>{formData.email}</span>}
            {formData.email && formData.linkedin && <span>•</span>}
            {formData.linkedin && <span>{formData.linkedin}</span>}
            {(formData.linkedin || formData.email) &&
              (formData.city || formData.state) && <span>•</span>}
            {(formData.city || formData.state) && (
              <span>{[formData.city, formData.state].filter(Boolean).join(", ")}</span>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Summary
            </h2>
            <div
              className="rt-text-slate-600 rt-text-center"
              style={{ fontSize: fontSize.body, lineHeight }}
              dangerouslySetInnerHTML={{ __html: formData.summary }}
            />
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Experience
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap * 1.5}px`,
              }}
            >
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="rt-item-header">
                    <p
                      className="rt-text-slate-700"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {exp.employer}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.city && `${exp.city}${exp.country ? `, ${exp.country}` : ""}`}
                    </span>
                  </div>
                  <div className="rt-item-header">
                    <p
                      className="rt-font-medium rt-text-slate-800"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.jobTitle}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1 rt-rich-text"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: exp.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Education
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="rt-item-header">
                    <p
                      className="rt-text-slate-700"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {edu.school}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.location}
                    </span>
                  </div>
                  <div className="rt-item-header">
                    <p
                      className="rt-font-medium rt-text-slate-800"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.startDate} - {edu.currentlyStudying ? "Present" : edu.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Achievements / Projects - Three Column Layout */}
        {projects.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Key Achievements
            </h2>
            <div className="rt-grid-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p
                    className="rt-font-medium rt-text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {proj.name}
                  </p>
                  {proj.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                  )}
                  {(proj.githubUrl || proj.liveUrl || proj.otherUrl) && (
                    <div className="rt-flex rt-gap-2 rt-mt-1">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          className="rt-link"
                          style={{ color: accentColor, fontSize: fontSize.small }}
                        >
                          <Github className="rt-icon-sm" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          className="rt-link"
                          style={{ color: accentColor, fontSize: fontSize.small }}
                        >
                          <ExternalLink className="rt-icon-sm" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Skills
            </h2>
            <p
              className="rt-text-slate-600 rt-text-center"
              style={{ fontSize: fontSize.small, lineHeight }}
            >
              {skills.map((s) => s.name).join(" · ")}
            </p>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Certification
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {certifications.map((cert) => (
                <p
                  key={cert.id}
                  className="rt-text-slate-600"
                  style={{ fontSize: fontSize.small }}
                >
                  <span className="rt-font-medium rt-text-slate-800">{cert.name}</span>
                  {cert.description && ` — ${cert.description}`}
                  {cert.issuer && `, provided by ${cert.issuer}`}
                  {cert.issueDate && ` (${cert.issueDate})`}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Languages
            </h2>
            <p
              className="rt-text-slate-600 rt-text-center"
              style={{ fontSize: fontSize.small, lineHeight }}
            >
              {languages.map((lang) => `${lang.language} (${lang.proficiency})`).join(" · ")}
            </p>
          </div>
        )}

        {/* Volunteer */}
        {volunteers.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Volunteer Experience
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {volunteers.map((vol) => (
                <div key={vol.id}>
                  <div className="rt-item-header">
                    <p
                      className="rt-text-slate-700"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {vol.organization}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {vol.startDate} - {vol.currentlyVolunteering ? "Present" : vol.endDate}
                    </span>
                  </div>
                  <p
                    className="rt-font-medium rt-text-slate-800"
                    style={{ fontSize: fontSize.small }}
                  >
                    {vol.role}
                  </p>
                  {vol.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: vol.description }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Publications
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {publications.map((pub) => (
                <div key={pub.id} className="rt-item-header">
                  <div>
                    <p
                      className="rt-font-medium rt-text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {pub.title}
                    </p>
                    <p
                      className="rt-text-slate-500"
                      style={{ fontSize: fontSize.small }}
                    >
                      {pub.publisher}
                    </p>
                  </div>
                  {pub.publicationDate && (
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {pub.publicationDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h2
              className="rt-section-title-centered"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              References
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {references.map((ref) => (
                <div key={ref.id}>
                  <p
                    className="rt-font-medium rt-text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {ref.name}
                  </p>
                  <p
                    className="rt-text-slate-500"
                    style={{ fontSize: fontSize.small }}
                  >
                    {ref.position} at {ref.company}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
