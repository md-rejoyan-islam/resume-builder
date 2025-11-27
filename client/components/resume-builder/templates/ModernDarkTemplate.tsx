"use client";

import { ExternalLink, Github, Mail, MapPin, Phone } from "lucide-react";
import { Certification } from "../CertificationForm";
import { Education } from "../EducationForm";
import { Experience } from "../ExperienceForm";
import { Language } from "../LanguageForm";
import { Project } from "../ProjectForm";
import { Publication } from "../PublicationForm";
import { Reference } from "../ReferenceForm";
import { Skill } from "../SkillsForm";
import { Volunteer } from "../VolunteerForm";
import "./resume-templates.css";

export interface TemplateStyles {
  fontFamily: string;
  fontSize: {
    name: string;
    sectionTitle: string;
    itemTitle: string;
    body: string;
    small: string;
  };
  sectionGap: number;
  paragraphGap: number;
  lineHeight: number;
  accentColor: string;
}

export interface TemplateData {
  formData: Record<string, string>;
  skills: Skill[];
  experiences: Experience[];
  educations: Education[];
  certifications: Certification[];
  projects: Project[];
  references: Reference[];
  languages: Language[];
  volunteers: Volunteer[];
  publications: Publication[];
}

interface ModernDarkTemplateProps {
  data: TemplateData;
  styles: TemplateStyles;
}

export function ModernDarkTemplate({ data, styles }: ModernDarkTemplateProps) {
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

  const { fontFamily, fontSize, sectionGap, paragraphGap, lineHeight, accentColor } = styles;

  return (
    <div
      className="rt-container"
      style={{ fontFamily }}
    >
      {/* Header Banner */}
      <div
        className="rt-header-banner"
        style={{
          backgroundColor: accentColor,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800')",
        }}
      >
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <h1
            className="rt-font-bold rt-text-white rt-tracking-wider rt-uppercase"
            style={{ fontSize: fontSize.name }}
          >
            {formData.firstName} {formData.lastName}
          </h1>
        </div>
        <p
          style={{
            position: "absolute",
            bottom: "16px",
            left: 0,
            right: 0,
            textAlign: "center",
            color: "rgba(255,255,255,0.8)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: fontSize.body,
          }}
        >
          {formData.jobTitle || "Professional"}
        </p>
      </div>

      {/* Content */}
      <div
        className="rt-p-6"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: `${sectionGap}px` }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}>
          {/* Professional Summary */}
          {formData.summary && (
            <div>
              <h2
                className="rt-font-bold rt-uppercase rt-tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Professional Summary
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Experience
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: `${paragraphGap}px` }}>
                {experiences.map((exp) => (
                  <div key={exp.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate} |{" "}
                      {exp.employer}
                    </p>
                    {exp.description && (
                      <div
                        className="rt-text-slate-500 rt-mt-1"
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Education
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: `${paragraphGap}px` }}>
                {educations.map((edu) => (
                  <div key={edu.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {edu.currentlyStudying ? "Expected " : ""}
                      {edu.endDate || edu.startDate} | {edu.school}
                    </p>
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Skills
              </h2>
              <div className="rt-skill-tags-container" style={{ gap: "4px" }}>
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="rt-skill-tag"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      fontSize: fontSize.small,
                      padding: "2px 6px",
                    }}
                  >
                    {skill.name}
                  </span>
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Languages
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${paragraphGap / 2}px`,
                }}
              >
                {languages.map((lang) => (
                  <div key={lang.id} className="rt-flex rt-items-center rt-gap-1">
                    <span
                      className="rt-rounded-full"
                      style={{ width: "4px", height: "4px", backgroundColor: accentColor }}
                    ></span>
                    <span style={{ fontSize: fontSize.itemTitle }}>{lang.language}</span>
                    <span className="rt-text-slate-400" style={{ fontSize: fontSize.small }}>
                      ({lang.proficiency})
                    </span>
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                References
              </h2>
              <div
                style={{ display: "flex", flexDirection: "column", gap: `${paragraphGap}px` }}
              >
                {references.map((ref) => (
                  <div key={ref.id}>
                    <p className="rt-font-medium" style={{ fontSize: fontSize.itemTitle }}>
                      {ref.name} <span className="rt-text-slate-400">—</span> {ref.company}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {ref.position}
                    </p>
                    {ref.email && (
                      <p
                        className="rt-contact-item rt-mt-1"
                        style={{ fontSize: fontSize.small }}
                      >
                        <Mail className="rt-icon-sm" style={{ color: accentColor, width: "10px", height: "10px" }} />
                        {ref.email}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}>
          {/* Contact */}
          <div>
            <h2
              className="rt-font-bold rt-uppercase rt-tracking-wider"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Contact
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap / 2}px`,
              }}
            >
              {formData.phone && (
                <p className="rt-contact-item" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="rt-rounded-full rt-shrink-0"
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Phone style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </span>
                  {formData.phone}
                </p>
              )}
              {formData.email && (
                <p className="rt-contact-item" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="rt-rounded-full rt-shrink-0"
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Mail style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </span>
                  {formData.email}
                </p>
              )}
              {(formData.city || formData.country || formData.postalCode) && (
                <p className="rt-contact-item" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="rt-rounded-full rt-shrink-0"
                    style={{
                      width: "16px",
                      height: "16px",
                      backgroundColor: accentColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <MapPin style={{ width: "8px", height: "8px", color: "#ffffff" }} />
                  </span>
                  {[formData.city, formData.state, formData.postalCode]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              )}
            </div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2
                className="rt-font-bold rt-uppercase rt-tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Certifications
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${paragraphGap / 2}px`,
                }}
              >
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {cert.name}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {cert.issuer} • {cert.issueDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2
                className="rt-font-bold rt-uppercase rt-tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Projects
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${paragraphGap / 2}px`,
                }}
              >
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {proj.name}
                    </p>
                    {proj.description && (
                      <div
                        className="rt-text-slate-500"
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

          {/* Volunteer */}
          {volunteers.length > 0 && (
            <div>
              <h2
                className="rt-font-bold rt-uppercase rt-tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Volunteer
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${paragraphGap / 2}px`,
                }}
              >
                {volunteers.map((vol) => (
                  <div key={vol.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {vol.role}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {vol.organization} • {vol.startDate} -{" "}
                      {vol.currentlyVolunteering ? "Present" : vol.endDate}
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
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Publications
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: `${paragraphGap / 2}px`,
                }}
              >
                {publications.map((pub) => (
                  <div key={pub.id}>
                    <p
                      className="rt-font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {pub.title}
                    </p>
                    <p className="rt-text-slate-500" style={{ fontSize: fontSize.small }}>
                      {pub.publisher} • {pub.publicationDate}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
