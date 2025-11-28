"use client";

import {
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { TemplateData, TemplateStyles } from "./ModernDarkTemplate";
import "./resume-templates.css";

interface ExecutiveTemplateProps {
  data: TemplateData;
  styles: TemplateStyles;
}

export function ExecutiveTemplate({ data, styles }: ExecutiveTemplateProps) {
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

  // Generate proficiency dots for languages
  const getProficiencyDots = (proficiency: string) => {
    const levels: Record<string, number> = {
      Native: 5,
      Fluent: 5,
      Advanced: 4,
      Intermediate: 3,
      Basic: 2,
      Beginner: 1,
    };
    const level = levels[proficiency] || 3;
    return Array.from({ length: 5 }, (_, i) => i < level);
  };

  return (
    <div
      className="rt-container-flex"
      style={{ fontFamily }}
    >
      {/* Left Column - Sidebar (35%) - background handled by ResumePageWrapper */}
      <div
        className="rt-col-35 rt-p-5"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Job Title Section */}
        <div>
          <p
            className="rt-font-medium rt-uppercase rt-tracking-wider"
            style={{
              color: accentColor,
              fontSize: `${parseFloat(fontSize.name) * 0.5}px`,
            }}
          >
            {formData.jobTitle || "Professional"}
          </p>
        </div>

        {/* Key Achievements / Projects */}
        {projects.length > 0 && (
          <div>
            <h2
              className="rt-section-title"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Key Achievements
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap * 1.5}px`,
              }}
            >
              {projects.map((proj, index) => (
                <div key={proj.id}>
                  <p
                    className="rt-font-semibold rt-text-slate-800 rt-flex rt-items-start rt-gap-1-5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>
                      {index % 3 === 0 ? "✓" : index % 3 === 1 ? "◎" : "☆"}
                    </span>
                    {proj.name}
                  </p>
                  {proj.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1 rt-ml-4 rt-rich-text"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                  )}
                  {(proj.githubUrl || proj.liveUrl || proj.otherUrl) && (
                    <div className="rt-flex rt-gap-2 rt-mt-1 rt-ml-4">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          className="rt-link"
                          style={{
                            color: accentColor,
                            fontSize: fontSize.small,
                          }}
                        >
                          <Github className="rt-icon-sm" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          className="rt-link"
                          style={{
                            color: accentColor,
                            fontSize: fontSize.small,
                          }}
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2
              className="rt-section-title"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Certification
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap * 1.5}px`,
              }}
            >
              {certifications.map((cert) => (
                <div key={cert.id}>
                  <p
                    className="rt-font-semibold rt-text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {cert.name}
                  </p>
                  {cert.description && (
                    <p
                      className="rt-text-slate-600 rt-mt-1"
                      style={{ fontSize: fontSize.small, lineHeight }}
                    >
                      {cert.description}
                    </p>
                  )}
                  <p
                    className="rt-text-slate-500 rt-mt-1"
                    style={{ fontSize: fontSize.small }}
                  >
                    {cert.issuer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Volunteer / Passions */}
        {volunteers.length > 0 && (
          <div>
            <h2
              className="rt-section-title"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Passions
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap * 1.5}px`,
              }}
            >
              {volunteers.map((vol, index) => (
                <div key={vol.id}>
                  <p
                    className="rt-font-semibold rt-text-slate-800 rt-flex rt-items-start rt-gap-1-5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>
                      {index % 2 === 0 ? "⌘" : "☆"}
                    </span>
                    {vol.role}
                  </p>
                  {vol.description && (
                    <div
                      className="rt-text-slate-600 rt-mt-1 rt-ml-4 rt-rich-text"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: vol.description }}
                    />
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
              className="rt-section-title"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Languages
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {languages.map((lang) => (
                <div
                  key={lang.id}
                  className="rt-flex-between"
                >
                  <span
                    className="rt-text-slate-700"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {lang.language}
                  </span>
                  <div className="rt-flex rt-items-center rt-gap-2">
                    <span
                      className="rt-text-slate-500"
                      style={{ fontSize: fontSize.small }}
                    >
                      {lang.proficiency}
                    </span>
                    <div className="rt-proficiency-dots">
                      {getProficiencyDots(lang.proficiency).map(
                        (filled, idx) => (
                          <span
                            key={idx}
                            className="rt-proficiency-dot"
                            style={{
                              backgroundColor: filled ? accentColor : "#e2e8f0",
                            }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* References */}
        {references.length > 0 && (
          <div>
            <h2
              className="rt-section-title"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
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
                    className="rt-font-semibold rt-text-slate-800"
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

      {/* Right Column - Main Content (65%) */}
      <div
        className="rt-col-65 rt-p-5 rt-pl-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Header with Name and Contact */}
        <div
          className="rt-border-b rt-pb-3"
          style={{ borderColor: `${accentColor}30` }}
        >
          {/* Name */}
          <h1
            className="rt-font-bold rt-tracking-wide"
            style={{
              fontSize: `${parseFloat(fontSize.name) * 0.7}px`,
              color: accentColor,
            }}
          >
            {formData.firstName?.toUpperCase()}{" "}
            {formData.lastName?.toUpperCase()}
          </h1>
          {/* Contact Info */}
          <div
            className="rt-contact-row rt-mt-2 rt-text-slate-600"
            style={{ fontSize: fontSize.small }}
          >
            {formData.phone && (
              <span className="rt-contact-item">
                <Phone className="rt-icon-sm" style={{ color: accentColor }} />
                {formData.phone}
              </span>
            )}
            {formData.email && (
              <span className="rt-contact-item">
                <Mail className="rt-icon-sm" style={{ color: accentColor }} />
                {formData.email}
              </span>
            )}
            {formData.linkedin && (
              <span className="rt-contact-item">
                <Linkedin className="rt-icon-sm" style={{ color: accentColor }} />
                {formData.linkedin}
              </span>
            )}
            {(formData.city || formData.state) && (
              <span className="rt-contact-item">
                <MapPin className="rt-icon-sm" style={{ color: accentColor }} />
                {[formData.city, formData.state].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider rt-text-slate-800 rt-border-b rt-pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
                marginBottom: `${paragraphGap}px`,
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
              className="rt-font-bold rt-uppercase rt-tracking-wider rt-text-slate-800 rt-border-b rt-pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
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
                      className="rt-font-semibold rt-text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.startDate} -{" "}
                      {exp.currentlyWorking ? "Present" : exp.endDate}
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
                    {exp.city && (
                      <span
                        className="rt-text-slate-500 rt-shrink-0"
                        style={{ fontSize: fontSize.small }}
                      >
                        {exp.city}
                        {exp.country ? `, ${exp.country}` : ""}
                      </span>
                    )}
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

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider rt-text-slate-800 rt-border-b rt-pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
                marginBottom: `${paragraphGap}px`,
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

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider rt-text-slate-800 rt-border-b rt-pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
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
                      className="rt-font-semibold rt-text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <span
                      className="rt-text-slate-500 rt-shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.startDate} -{" "}
                      {edu.currentlyStudying ? "Present" : edu.endDate}
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
                    {edu.location && (
                      <span
                        className="rt-text-slate-500 rt-shrink-0"
                        style={{ fontSize: fontSize.small }}
                      >
                        {edu.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {publications.length > 0 && (
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider rt-text-slate-800 rt-border-b rt-pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
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
                <div key={pub.id}>
                  <p
                    className="rt-font-semibold rt-text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {pub.title}
                  </p>
                  <p
                    className="rt-text-slate-500"
                    style={{ fontSize: fontSize.small }}
                  >
                    {pub.publisher} · {pub.publicationDate}
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
