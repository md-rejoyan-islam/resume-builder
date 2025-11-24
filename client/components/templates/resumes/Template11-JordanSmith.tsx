import {
  Award,
  Calendar,
  Diamond,
  Lightbulb,
  Linkedin,
  Mail,
  MapPin,
  Megaphone,
  Phone,
  Users,
} from "lucide-react";
import React from "react";
import { A4PageWrapper } from "../A4PageWrapper";

interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    textLight: string;
    background: string;
    border: string;
  };
  spacing: {
    pageMargin: number;
    sectionGap: number;
    lineHeight: number;
    paragraphGap: number;
  };
  fontFamily: string;
}

interface ResumeData {
  theme?: ThemeSettings;
  personalInfo: {
    fullName: string;
    jobTitle?: string;
    email: string;
    phone: string;
    location: string;
    profileImage?: string;
    summary?: string;
    socialLinks?: Array<{
      platform: string;
      url: string;
    }>;
  };
  experience?: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    location?: string;
    description: string;
    achievements?: string[];
  }>;
  education?: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate?: string;
    graduationYear: string;
    location?: string;
    currentlyStudying?: boolean;
  }>;
  skills?: Array<{
    id: string;
    name: string;
    category?: string;
  }>;
  strengths?: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  achievements?: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  certificates?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

interface Template11JordanSmithProps {
  data: ResumeData;
}

export const Template11JordanSmith: React.FC<Template11JordanSmithProps> = ({
  data,
}) => {
  // Default theme if not provided - Rose/Burgundy Executive
  const theme = data.theme || {
    colors: {
      primary: "#be123c", // rose-700 - executive burgundy
      secondary: "#881337", // rose-900
      accent: "#e11d48", // rose-600
      text: "#000000",
      textLight: "#666666",
      background: "#ffffff",
      border: "#d0d0d0",
    },
    spacing: {
      pageMargin: 20,
      sectionGap: 24,
      lineHeight: 1.5,
      paragraphGap: 8,
    },
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
  };

  // Group skills by category
  const groupedSkills = data.skills?.reduce((acc, skill) => {
    const category = skill.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  // Default strengths if not provided
  const defaultStrengths = [
    {
      id: "1",
      name: "Strategic Planning",
      description: "Led teams in developing and executing strategic plans with proven results.",
    },
    {
      id: "2",
      name: "Collaboration",
      description: "Worked closely with cross-functional teams to drive project success.",
    },
    {
      id: "3",
      name: "Communication",
      description: "Established strong relationships with stakeholders and clients.",
    },
  ];

  // Default achievements if not provided
  const defaultAchievements = [
    {
      id: "1",
      title: "Team Leadership",
      description: "Successfully led diverse teams in high-pressure environments.",
    },
    {
      id: "2",
      title: "Key Achievement",
      description: "Delivered significant impact through dedicated effort and expertise.",
    },
  ];

  const displayStrengths = data.strengths || defaultStrengths;
  const displayAchievements = data.achievements || defaultAchievements;

  return (
    <A4PageWrapper>
      <div
        className="h-full"
        style={{
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          fontFamily: theme.fontFamily,
        }}
      >
        {/* Header - Dark Blue Section */}
        <div
          style={{
            backgroundColor: theme.colors.secondary,
            color: theme.colors.background,
            padding: `${theme.spacing.pageMargin}mm`,
          }}
        >
          <h1
            className="font-bold tracking-wide mb-1"
            style={{
              fontSize: "32px",
              letterSpacing: "0.05em",
            }}
          >
            {data.personalInfo.fullName.toUpperCase()}
          </h1>
          <p
            className="mb-3"
            style={{
              fontSize: "14px",
              color: `${theme.colors.background}e6`,
            }}
          >
            {data.personalInfo.jobTitle}
          </p>

          {/* Contact Info Row */}
          <div className="flex items-center gap-6 text-xs flex-wrap">
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.socialLinks &&
              data.personalInfo.socialLinks.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>
                    {data.personalInfo.socialLinks.find(
                      (link) => link.platform.toLowerCase() === "linkedin"
                    )?.url || "linkedin.com"}
                  </span>
                </div>
              )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>{data.personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex">
          {/* Left Column - Main Content */}
          <div className="flex-1" style={{ width: "60%", padding: `${theme.spacing.pageMargin}mm` }}>
            {/* Summary Section */}
            {data.personalInfo.summary && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-3 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  SUMMARY
                </h2>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: "11px",
                    lineHeight: "1.6",
                    color: theme.colors.textLight,
                  }}
                >
                  {data.personalInfo.summary}
                </p>
              </div>
            )}

            {/* Experience Section */}
            {data.experience && data.experience.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  EXPERIENCE
                </h2>
                {data.experience.map((job, index) => (
                  <div key={job.id} className="mb-5">
                    <h3
                      className="font-semibold mb-0.5"
                      style={{
                        fontSize: "13px",
                        color: theme.colors.primary,
                      }}
                    >
                      {job.position}
                    </h3>
                    <div
                      className="font-bold mb-1"
                      style={{
                        fontSize: "12px",
                        color: theme.colors.text,
                      }}
                    >
                      {job.company}
                    </div>
                    <div
                      className="flex items-center gap-4 mb-2"
                      style={{
                        fontSize: "10px",
                        color: theme.colors.textLight,
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {job.startDate} - {job.endDate}
                        </span>
                      </div>
                      {job.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{job.location}</span>
                        </div>
                      )}
                    </div>
                    <p
                      className="mb-2 leading-relaxed"
                      style={{
                        fontSize: "11px",
                        lineHeight: "1.5",
                        color: theme.colors.textLight,
                      }}
                    >
                      {job.description}
                    </p>
                    {job.achievements && job.achievements.length > 0 && (
                      <ul className="space-y-1.5 ml-4">
                        {job.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="relative leading-relaxed"
                            style={{
                              fontSize: "11px",
                              lineHeight: "1.5",
                              color: theme.colors.textLight,
                              paddingLeft: "12px",
                            }}
                          >
                            <span
                              className="absolute left-0"
                              style={{ color: theme.colors.primary }}
                            >
                              •
                            </span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Education Section */}
            {data.education && data.education.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  EDUCATION
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3
                      className="font-semibold mb-0.5"
                      style={{
                        fontSize: "13px",
                        color: theme.colors.primary,
                      }}
                    >
                      {edu.degree}
                    </h3>
                    <div
                      className="font-bold mb-1"
                      style={{
                        fontSize: "12px",
                        color: theme.colors.text,
                      }}
                    >
                      {edu.school}
                    </div>
                    <div
                      className="flex items-center gap-4"
                      style={{
                        fontSize: "10px",
                        color: theme.colors.textLight,
                      }}
                    >
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {edu.startDate} - {edu.graduationYear}
                        </span>
                      </div>
                      {edu.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>{edu.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div
            style={{
              width: "40%",
              backgroundColor: `${theme.colors.border}40`,
              padding: `${theme.spacing.pageMargin}mm`,
            }}
          >
            {/* Strengths Section */}
            {displayStrengths && displayStrengths.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  STRENGTHS
                </h2>
                <div className="space-y-4">
                  {displayStrengths.map((strength, index) => (
                    <div key={strength.id}>
                      <div className="flex items-start gap-2 mb-1.5">
                        {index === 0 && (
                          <Lightbulb
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        {index === 1 && (
                          <Users
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        {index === 2 && (
                          <Megaphone
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        {index > 2 && (
                          <Award
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        <h3
                          className="font-bold"
                          style={{
                            fontSize: "12px",
                            color: theme.colors.primary,
                          }}
                        >
                          {strength.name}
                        </h3>
                      </div>
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "10px",
                          lineHeight: "1.5",
                          color: theme.colors.textLight,
                        }}
                      >
                        {strength.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills Section */}
            {data.skills && data.skills.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  SKILLS
                </h2>
                <div className="space-y-3">
                  {groupedSkills &&
                    Object.entries(groupedSkills).map(
                      ([category, skills], idx) => (
                        <div key={idx}>
                          {category !== "General" && (
                            <h4
                              className="font-bold mb-2"
                              style={{
                                fontSize: "11px",
                                color: theme.colors.text,
                              }}
                            >
                              {category}
                            </h4>
                          )}
                          <div className="flex flex-wrap gap-2">
                            {skills?.map((skill) => (
                              <span
                                key={skill.id}
                                className="px-2.5 py-1 font-medium"
                                style={{
                                  fontSize: "10px",
                                  backgroundColor: theme.colors.background,
                                  color: theme.colors.textLight,
                                  border: `1px solid ${theme.colors.border}`,
                                  borderRadius: "2px",
                                }}
                              >
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            )}

            {/* Key Achievements Section */}
            {displayAchievements && displayAchievements.length > 0 && (
              <div className="mb-6">
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  KEY ACHIEVEMENTS
                </h2>
                <div className="space-y-4">
                  {displayAchievements.map((achievement, index) => (
                    <div key={achievement.id}>
                      <div className="flex items-start gap-2 mb-1.5">
                        {index === 0 && (
                          <Award
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        {index === 1 && (
                          <Diamond
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        {index > 1 && (
                          <Award
                            className="mt-0.5 flex-shrink-0"
                            style={{
                              width: "16px",
                              height: "16px",
                              color: theme.colors.primary,
                            }}
                          />
                        )}
                        <h3
                          className="font-bold"
                          style={{
                            fontSize: "12px",
                            color: theme.colors.primary,
                          }}
                        >
                          {achievement.title}
                        </h3>
                      </div>
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "10px",
                          lineHeight: "1.5",
                          color: theme.colors.textLight,
                        }}
                      >
                        {achievement.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certificates Section */}
            {data.certificates && data.certificates.length > 0 && (
              <div>
                <h2
                  className="font-bold mb-4 pb-1.5 uppercase tracking-wide"
                  style={{
                    fontSize: "16px",
                    color: theme.colors.primary,
                    borderBottom: `3px solid ${theme.colors.primary}`,
                    letterSpacing: "0.05em",
                  }}
                >
                  CERTIFICATES
                </h2>
                <div className="space-y-4">
                  {data.certificates.map((cert, index) => (
                    <div key={cert.id}>
                      <div className="flex items-start gap-2 mb-1.5">
                        <Award
                          className="mt-0.5 flex-shrink-0"
                          style={{
                            width: "16px",
                            height: "16px",
                            color: theme.colors.primary,
                          }}
                        />
                        <div className="flex-1">
                          <h3
                            className="font-bold"
                            style={{
                              fontSize: "12px",
                              color: theme.colors.primary,
                            }}
                          >
                            {cert.name}
                          </h3>
                          <div
                            className="font-semibold mt-0.5"
                            style={{
                              fontSize: "10px",
                              color: theme.colors.text,
                            }}
                          >
                            {cert.issuer}
                          </div>
                          <div
                            style={{
                              fontSize: "10px",
                              color: theme.colors.textLight,
                            }}
                          >
                            {cert.date}
                          </div>
                          {cert.description && (
                            <p
                              className="leading-relaxed mt-1"
                              style={{
                                fontSize: "10px",
                                lineHeight: "1.5",
                                color: theme.colors.textLight,
                              }}
                            >
                              {cert.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </A4PageWrapper>
  );
};
