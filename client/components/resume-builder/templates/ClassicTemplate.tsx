"use client";

import { ExternalLink, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { TemplateData, TemplateStyles } from "./ModernDarkTemplate";
import "./resume-templates.css";

interface ClassicTemplateProps {
  data: TemplateData;
  styles: TemplateStyles;
}

export function ClassicTemplate({
  data,
  styles,
}: ClassicTemplateProps) {
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
      <div className="rt-p-8" style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}>
        {/* Header Section */}
        <div className="rt-text-center rt-border-b rt-pb-4" style={{ borderColor: "#e5e7eb" }}>
          {/* Name */}
          <h1
            className="rt-font-bold rt-text-slate-900 rt-tracking-wide"
            style={{ fontSize: `${parseFloat(fontSize.name) * 1.1}px` }}
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

          {/* Contact Info Row */}
          <div
            className="rt-contact-row-centered rt-mt-2 rt-text-slate-600"
            style={{ fontSize: fontSize.small }}
          >
            {formData.phone && (
              <span className="rt-contact-item">
                <Phone className="rt-icon-sm" />
                {formData.phone}
              </span>
            )}
            {formData.phone && formData.email && <span>·</span>}
            {formData.email && (
              <span className="rt-contact-item">
                <Mail className="rt-icon-sm" />
                {formData.email}
              </span>
            )}
            {formData.email && formData.linkedin && <span>·</span>}
            {formData.linkedin && (
              <span className="rt-contact-item">
                <Linkedin className="rt-icon-sm" />
                {formData.linkedin}
              </span>
            )}
            {(formData.linkedin || formData.email) && (formData.city || formData.state) && <span>·</span>}
            {(formData.city || formData.state) && (
              <span className="rt-contact-item">
                <MapPin className="rt-icon-sm" />
                {[formData.city, formData.state].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
              }}
            >
              Summary
            </h2>
            <div
              className="rt-text-slate-600"
              style={{ fontSize: fontSize.body, lineHeight }}
              dangerouslySetInnerHTML={{ __html: formData.summary }}
            />
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
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
                      className="rt-font-semibold rt-text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
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
                      style={{
                        color: accentColor,
                        fontSize: fontSize.small,
                        fontWeight: 500,
                      }}
                    >
                      {exp.employer}
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
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
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
                      className="rt-font-semibold rt-text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
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
                      style={{
                        color: accentColor,
                        fontSize: fontSize.small,
                        fontWeight: 500,
                      }}
                    >
                      {edu.school}
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

        {/* Key Achievements / Projects - Two Column Layout */}
        {projects.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
              }}
            >
              Key Achievements
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "12px 24px",
              }}
            >
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p
                    className="rt-font-semibold"
                    style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                  >
                    {proj.name}
                  </p>
                  {proj.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1 rt-rich-text"
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
                          GitHub
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          className="rt-link"
                          style={{ color: accentColor, fontSize: fontSize.small }}
                        >
                          <ExternalLink className="rt-icon-sm" />
                          Live
                        </a>
                      )}
                      {proj.otherUrl && (
                        <a
                          href={proj.otherUrl}
                          className="rt-link"
                          style={{ color: accentColor, fontSize: fontSize.small }}
                        >
                          <ExternalLink className="rt-icon-sm" />
                          Link
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
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
              }}
            >
              Skills
            </h2>
            <p
              className="rt-text-slate-600"
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
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
              }}
            >
              Certifications
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {certifications.map((cert) => (
                <div key={cert.id} className="rt-item-header">
                  <div>
                    <p
                      className="rt-font-semibold rt-text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {cert.name}
                    </p>
                    <p
                      style={{
                        color: accentColor,
                        fontSize: fontSize.small,
                        fontWeight: 500,
                      }}
                    >
                      {cert.issuer}
                    </p>
                  </div>
                  {cert.issueDate && (
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {cert.issueDate}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
              }}
            >
              Languages
            </h2>
            <p
              className="rt-text-slate-600"
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
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
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
                      className="rt-font-semibold rt-text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {vol.role}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {vol.startDate} - {vol.currentlyVolunteering ? "Present" : vol.endDate}
                    </span>
                  </div>
                  <p
                    style={{
                      color: accentColor,
                      fontSize: fontSize.small,
                      fontWeight: 500,
                    }}
                  >
                    {vol.organization}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
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
                      className="rt-font-semibold rt-text-slate-900"
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
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: "8px",
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
                    className="rt-font-semibold rt-text-slate-900"
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
