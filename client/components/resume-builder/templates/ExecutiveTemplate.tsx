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
      className="mx-auto max-w-[600px] relative flex"
      style={{ fontFamily }}
    >
      {/* Left Column - Sidebar (35%) - background handled by ResumePageWrapper */}
      <div
        className="flex-[35] p-5"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Job Title Section */}
        <div>
          <p
            className="font-medium uppercase tracking-wider"
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
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
                    className="font-semibold text-slate-800 flex items-start gap-1.5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>
                      {index % 3 === 0 ? "✓" : index % 3 === 1 ? "◎" : "☆"}
                    </span>
                    {proj.name}
                  </p>
                  {proj.description && (
                    <div
                      className="text-slate-600 mt-0.5 ml-4"
                      style={{ fontSize: fontSize.small, lineHeight }}
                      dangerouslySetInnerHTML={{ __html: proj.description }}
                    />
                  )}
                  {(proj.githubUrl || proj.liveUrl || proj.otherUrl) && (
                    <div className="flex items-center gap-2 mt-1 ml-4">
                      {proj.githubUrl && (
                        <a
                          href={proj.githubUrl}
                          className="flex items-center gap-1 hover:underline"
                          style={{
                            color: accentColor,
                            fontSize: fontSize.small,
                          }}
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          className="flex items-center gap-1 hover:underline"
                          style={{
                            color: accentColor,
                            fontSize: fontSize.small,
                          }}
                        >
                          <ExternalLink className="w-3 h-3" />
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
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
                    className="font-semibold text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {cert.name}
                  </p>
                  {cert.description && (
                    <p
                      className="text-slate-600 mt-0.5"
                      style={{ fontSize: fontSize.small, lineHeight }}
                    >
                      {cert.description}
                    </p>
                  )}
                  <p
                    className="text-slate-500 mt-0.5"
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
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
                    className="font-semibold text-slate-800 flex items-start gap-1.5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>
                      {index % 2 === 0 ? "⌘" : "☆"}
                    </span>
                    {vol.role}
                  </p>
                  {vol.description && (
                    <div
                      className="text-slate-600 mt-0.5 ml-4"
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
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
                  className="flex items-center justify-between"
                >
                  <span
                    className="text-slate-700"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {lang.language}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-slate-500"
                      style={{ fontSize: fontSize.small }}
                    >
                      {lang.proficiency}
                    </span>
                    <div className="flex gap-0.5">
                      {getProficiencyDots(lang.proficiency).map(
                        (filled, idx) => (
                          <span
                            key={idx}
                            className="w-2 h-2 rounded-full"
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
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
                    className="font-semibold text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {ref.name}
                  </p>
                  <p
                    className="text-slate-500"
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
        className="flex-[65] p-5 pl-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Header with Name and Contact */}
        <div
          className="border-b pb-3"
          style={{ borderColor: `${accentColor}30` }}
        >
          {/* Name */}
          <h1
            className="font-bold tracking-wide"
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
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-slate-600"
            style={{ fontSize: fontSize.small }}
          >
            {formData.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" style={{ color: accentColor }} />
                {formData.phone}
              </span>
            )}
            {formData.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" style={{ color: accentColor }} />
                {formData.email}
              </span>
            )}
            {formData.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" style={{ color: accentColor }} />
                {formData.linkedin}
              </span>
            )}
            {(formData.city || formData.state) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" style={{ color: accentColor }} />
                {[formData.city, formData.state].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider text-slate-800 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Summary
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
              className="font-bold uppercase tracking-wider text-slate-800 border-b pb-1"
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
                  <div className="flex justify-between items-start">
                    <p
                      className="font-semibold text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
                    </p>
                    <span
                      className="text-slate-500 shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.startDate} -{" "}
                      {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
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
                        className="text-slate-500 shrink-0"
                        style={{ fontSize: fontSize.small }}
                      >
                        {exp.city}
                        {exp.country ? `, ${exp.country}` : ""}
                      </span>
                    )}
                  </div>
                  {exp.description && (
                    <div
                      className="text-slate-600 mt-1 [&_ul]:list-disc [&_ul]:ml-4 [&_li]:mb-0.5"
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
              className="font-bold uppercase tracking-wider text-slate-800 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}30`,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Skills
            </h2>
            <p
              className="text-slate-600"
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
              className="font-bold uppercase tracking-wider text-slate-800 border-b pb-1"
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
                  <div className="flex justify-between items-start">
                    <p
                      className="font-semibold text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <span
                      className="text-slate-500 shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.startDate} -{" "}
                      {edu.currentlyStudying ? "Present" : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-start">
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
                        className="text-slate-500 shrink-0"
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
              className="font-bold uppercase tracking-wider text-slate-800 border-b pb-1"
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
                    className="font-semibold text-slate-800"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {pub.title}
                  </p>
                  <p
                    className="text-slate-500"
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
