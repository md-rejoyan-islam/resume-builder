"use client";

import { ExternalLink, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { TemplateData, TemplateStyles } from "./ModernDarkTemplate";

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
      className="bg-white mx-auto max-w-[600px] relative"
      style={{ fontFamily }}
    >
      {/* Main Content */}
      <div className="p-8" style={{ display: "flex", flexDirection: "column", gap: `${sectionGap}px` }}>
        {/* Header Section */}
        <div className="text-center border-b pb-4" style={{ borderColor: "#e5e7eb" }}>
          {/* Name */}
          <h1
            className="font-bold text-slate-900 tracking-wide"
            style={{ fontSize: `${parseFloat(fontSize.name) * 1.1}px` }}
          >
            {formData.firstName} {formData.lastName}
          </h1>

          {/* Job Title */}
          <p
            className="mt-1 text-slate-600"
            style={{ fontSize: fontSize.body }}
          >
            {formData.jobTitle || "Professional"}
          </p>

          {/* Contact Info Row */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-slate-600"
            style={{ fontSize: fontSize.small }}
          >
            {formData.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {formData.phone}
              </span>
            )}
            {formData.phone && formData.email && <span>·</span>}
            {formData.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {formData.email}
              </span>
            )}
            {formData.email && formData.linkedin && <span>·</span>}
            {formData.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3" />
                {formData.linkedin}
              </span>
            )}
            {(formData.linkedin || formData.email) && (formData.city || formData.state) && <span>·</span>}
            {(formData.city || formData.state) && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {[formData.city, formData.state].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {formData.summary && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                      className="font-semibold text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {exp.jobTitle}
                    </p>
                    <span
                      className="text-slate-500 shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.city && `${exp.city}${exp.country ? `, ${exp.country}` : ""}`}
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
                    <span
                      className="text-slate-500 shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {exp.startDate} - {exp.currentlyWorking ? "Present" : exp.endDate}
                    </span>
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

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                      className="font-semibold text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {edu.degree} in {edu.fieldOfStudy}
                    </p>
                    <span
                      className="text-slate-500 shrink-0"
                      style={{ fontSize: fontSize.small }}
                    >
                      {edu.location}
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
                    <span
                      className="text-slate-500 shrink-0"
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
              }}
            >
              Key Achievements
            </h2>
            <div
              className="grid grid-cols-2 gap-x-6 gap-y-3"
            >
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p
                    className="font-semibold"
                    style={{ color: accentColor, fontSize: fontSize.itemTitle }}
                  >
                    {proj.name}
                  </p>
                  {proj.description && (
                    <div
                      className="text-slate-600 mt-0.5"
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

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                <div key={cert.id} className="flex justify-between items-start">
                  <div>
                    <p
                      className="font-semibold text-slate-900"
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
                      className="text-slate-500 shrink-0"
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
              }}
            >
              Languages
            </h2>
            <p
              className="text-slate-600"
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                  <div className="flex justify-between items-start">
                    <p
                      className="font-semibold text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {vol.role}
                    </p>
                    <span
                      className="text-slate-500 shrink-0"
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                <div key={pub.id} className="flex justify-between items-start">
                  <div>
                    <p
                      className="font-semibold text-slate-900"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {pub.title}
                    </p>
                    <p
                      className="text-slate-500"
                      style={{ fontSize: fontSize.small }}
                    >
                      {pub.publisher}
                    </p>
                  </div>
                  {pub.publicationDate && (
                    <span
                      className="text-slate-500 shrink-0"
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
              className="font-bold uppercase tracking-wider mb-2"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
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
                    className="font-semibold text-slate-900"
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
    </div>
  );
}
