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
      className="bg-white mx-auto max-w-[600px] relative"
      style={{ fontFamily }}
    >
      {/* Header Banner */}
      <div
        className="h-32 bg-cover bg-center relative"
        style={{
          backgroundColor: accentColor,
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800')",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="font-bold text-white tracking-wider uppercase"
            style={{ fontSize: fontSize.name }}
          >
            {formData.firstName} {formData.lastName}
          </h1>
        </div>
        <p
          className="absolute bottom-4 left-0 right-0 text-center text-white/80 tracking-[0.3em] uppercase"
          style={{ fontSize: fontSize.body }}
        >
          {formData.jobTitle || "Professional"}
        </p>
      </div>

      {/* Content */}
      <div
        className="p-6 grid grid-cols-2"
        style={{ gap: `${sectionGap}px` }}
      >
        {/* Left Column */}
        <div style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}>
          {/* Professional Summary */}
          {formData.summary && (
            <div>
              <h2
                className="font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Professional Summary
              </h2>
              <div
                className="text-slate-600"
                style={{ fontSize: fontSize.body, lineHeight }}
                dangerouslySetInnerHTML={{ __html: formData.summary }}
              />
            </div>
          )}

          {/* Experience */}
          {experiences.length > 0 && (
            <div>
              <h2
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate} |{" "}
                      {exp.employer}
                    </p>
                    {exp.description && (
                      <div
                        className="text-slate-500 mt-1"
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
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
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
                className="font-bold uppercase tracking-wider"
                style={{
                  color: accentColor,
                  fontSize: fontSize.sectionTitle,
                  marginBottom: `${paragraphGap}px`,
                }}
              >
                Skills
              </h2>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="px-1.5 py-0.5 rounded"
                    style={{
                      backgroundColor: `${accentColor}20`,
                      color: accentColor,
                      fontSize: fontSize.small,
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
                className="font-bold uppercase tracking-wider"
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
                  <div key={lang.id} className="flex items-center gap-1">
                    <span
                      className="w-1 h-1 rounded-full"
                      style={{ backgroundColor: accentColor }}
                    ></span>
                    <span style={{ fontSize: fontSize.itemTitle }}>{lang.language}</span>
                    <span className="text-slate-400" style={{ fontSize: fontSize.small }}>
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
                className="font-bold uppercase tracking-wider"
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
                    <p className="font-medium" style={{ fontSize: fontSize.itemTitle }}>
                      {ref.name} <span className="text-slate-400">—</span> {ref.company}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
                      {ref.position}
                    </p>
                    {ref.email && (
                      <p
                        className="flex items-center gap-1 mt-0.5"
                        style={{ fontSize: fontSize.small }}
                      >
                        <Mail className="w-2.5 h-2.5" style={{ color: accentColor }} />
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
              className="font-bold uppercase tracking-wider"
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
                <p className="flex items-center gap-2" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Phone className="w-2 h-2 text-white" />
                  </span>
                  {formData.phone}
                </p>
              )}
              {formData.email && (
                <p className="flex items-center gap-2" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    <Mail className="w-2 h-2 text-white" />
                  </span>
                  {formData.email}
                </p>
              )}
              {(formData.city || formData.country || formData.postalCode) && (
                <p className="flex items-center gap-2" style={{ fontSize: fontSize.itemTitle }}>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: accentColor }}
                  >
                    <MapPin className="w-2 h-2 text-white" />
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
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {cert.name}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
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
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {proj.name}
                    </p>
                    {proj.description && (
                      <div
                        className="text-slate-500"
                        style={{ fontSize: fontSize.small, lineHeight }}
                        dangerouslySetInnerHTML={{ __html: proj.description }}
                      />
                    )}
                    {(proj.githubUrl || proj.liveUrl || proj.otherUrl) && (
                      <div className="flex items-center gap-2 mt-1">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: accentColor, fontSize: fontSize.small }}
                          >
                            <Github className="w-3 h-3" />
                            GitHub
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: accentColor, fontSize: fontSize.small }}
                          >
                            <ExternalLink className="w-3 h-3" />
                            Live
                          </a>
                        )}
                        {proj.otherUrl && (
                          <a
                            href={proj.otherUrl}
                            className="flex items-center gap-1 hover:underline"
                            style={{ color: accentColor, fontSize: fontSize.small }}
                          >
                            <ExternalLink className="w-3 h-3" />
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
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {vol.role}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
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
                className="font-bold uppercase tracking-wider"
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
                      className="font-medium"
                      style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                    >
                      {pub.title}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: fontSize.small }}>
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
