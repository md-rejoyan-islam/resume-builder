"use client";

import { ExternalLink, Github, Linkedin, Mail, MapPin, Phone, User } from "lucide-react";
import Image from "next/image";
import { TemplateData, TemplateStyles } from "./ModernDarkTemplate";

interface ProfessionalTemplateProps {
  data: TemplateData;
  styles: TemplateStyles;
}

export function ProfessionalTemplate({
  data,
  styles,
}: ProfessionalTemplateProps) {
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

  // Default profile image placeholder
  const profileImage = formData.photo || null;

  return (
    <div
      className="mx-auto max-w-[600px] relative flex"
      style={{ fontFamily }}
    >
      {/* Left Column - Main Content (65%) */}
      <div
        className="flex-[65] p-6 pr-3"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Header - Name and Contact */}
        <div>
          {/* Name */}
          <h1
            className="font-bold text-slate-800 tracking-wide"
            style={{ fontSize: `${parseFloat(fontSize.name) * 0.9}px` }}
          >
            {formData.firstName?.toUpperCase()}{" "}
            {formData.lastName?.toUpperCase()}
          </h1>

          {/* Job Title */}
          <p
            className="mt-1"
            style={{
              color: accentColor,
              fontSize: fontSize.sectionTitle,
              fontWeight: 500,
            }}
          >
            {formData.jobTitle || "Professional"}
          </p>

          {/* Contact Info Row */}
          <div
            className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-slate-600"
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
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
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
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
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
                        className="text-slate-500"
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

        {/* Education */}
        {educations.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
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
                        className="text-slate-500"
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

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Languages
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center gap-2">
                  <span
                    className="text-slate-700"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    {lang.language}
                  </span>
                  <span
                    className="text-slate-400"
                    style={{ fontSize: fontSize.small }}
                  >
                    {lang.proficiency}
                  </span>
                  <div className="flex gap-0.5">
                    {getProficiencyDots(lang.proficiency).map((filled, idx) => (
                      <span
                        key={idx}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: filled ? accentColor : "#e2e8f0",
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
                marginBottom: `${paragraphGap}px`,
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${accentColor}15`,
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2
              className="font-bold uppercase tracking-wider text-slate-700 border-b pb-1"
              style={{
                fontSize: fontSize.sectionTitle,
                borderColor: `${accentColor}40`,
                marginBottom: `${paragraphGap}px`,
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
                <div key={cert.id}>
                  <div className="flex justify-between items-start">
                    <p
                      className="font-semibold text-slate-800"
                      style={{ fontSize: fontSize.itemTitle }}
                    >
                      {cert.name}
                    </p>
                    {cert.issueDate && (
                      <span
                        className="text-slate-500 shrink-0"
                        style={{ fontSize: fontSize.small }}
                      >
                        {cert.issueDate}
                      </span>
                    )}
                  </div>
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Sidebar (35%) - background handled by ResumePageWrapper */}
      <div
        className="flex-[35] p-4"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: `${sectionGap}px`,
        }}
      >
        {/* Profile Image - Centered */}
        <div className="flex justify-center">
          <div
            className="rounded-full my-3 overflow-hidden border-2"
            style={{
              width: `${parseFloat(fontSize.name) * 2.37}px`,
              height: `${parseFloat(fontSize.name) * 2.37}px`,
              borderColor: accentColor,
            }}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={90}
                height={90}
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: `${accentColor}15` }}
              >
                <User className="w-10 h-10" style={{ color: accentColor }} />
              </div>
            )}
          </div>
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
              Key Projects
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: `${paragraphGap}px`,
              }}
            >
              {projects.map((proj) => (
                <div key={proj.id}>
                  <p
                    className="font-semibold text-slate-800 flex items-start gap-1.5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>★</span>
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
              Volunteer
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
                  <p
                    className="font-semibold text-slate-800 flex items-start gap-1.5"
                    style={{ fontSize: fontSize.itemTitle }}
                  >
                    <span style={{ color: accentColor }}>♥</span>
                    {vol.role}
                  </p>
                  <p
                    className="text-slate-500"
                    style={{ fontSize: fontSize.small }}
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
              className="font-bold uppercase tracking-wider pb-1 border-b"
              style={{
                color: accentColor,
                fontSize: fontSize.sectionTitle,
                borderColor: accentColor,
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
                    {pub.publisher} • {pub.publicationDate}
                  </p>
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
    </div>
  );
}
