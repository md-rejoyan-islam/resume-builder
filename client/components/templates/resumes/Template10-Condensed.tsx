import {
  Github,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { A4PageWrapper } from "../A4PageWrapper";

interface ResumeData {
  theme?: {
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
  };
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
    description: string;
  }>;
  education?: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    graduationYear: string;
  }>;
  skills?: Array<{
    id: string;
    name: string;
  }>;
  projects?: Array<{
    id: string;
    name: string;
    description: string;
    previewUrl?: string;
    githubUrl?: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
}

interface Template10CondensedProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-2.5 h-2.5 text-indigo-600" />;
    case "linkedin":
      return <Linkedin className="w-2.5 h-2.5 text-indigo-600" />;
    case "twitter":
      return <Twitter className="w-2.5 h-2.5 text-indigo-600" />;
    case "website":
      return <Globe className="w-2.5 h-2.5 text-indigo-600" />;
    case "email":
      return <Mail className="w-2.5 h-2.5 text-indigo-600" />;
    default:
      return <MessageCircle className="w-2.5 h-2.5 text-indigo-600" />;
  }
};

export const Template10Condensed: React.FC<Template10CondensedProps> = ({
  data,
}) => {
  return (
    <A4PageWrapper>
      <div
        className="bg-white flex"
        style={{
          height: "297mm",
          width: "210mm",
          boxSizing: "border-box",
          overflow: "visible",
          lineHeight: data.theme?.spacing?.lineHeight || 1.6,
        }}
      >
        {/* Left Sidebar - Compact */}
        <div className="w-1/3 bg-indigo-50 p-5 border-r border-indigo-200">
          {/* Profile */}
          {data.personalInfo.profileImage && (
            <div className="mb-3">
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={80}
                height={80}
                className="rounded object-cover w-full h-auto border border-indigo-300"
              />
            </div>
          )}

          <h1 className="text-lg font-bold text-indigo-900 mb-0.5">
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="text-xs font-semibold text-indigo-700 mb-3">
              {data.personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Info */}
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
            className="space-y-1.5 pb-3 border-b border-indigo-200 text-xs"
          >
            {data.personalInfo.email && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="text-gray-700 break-all">
                  {data.personalInfo.email}
                </span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="text-gray-700">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-indigo-600 shrink-0" />
                <span className="text-gray-700">
                  {data.personalInfo.location}
                </span>
              </div>
            )}
          </div>

          {/* Social Links */}
          {data.personalInfo.socialLinks &&
            data.personalInfo.socialLinks.length > 0 && (
              <div
                style={{
                  marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
                }}
                className="pb-3 border-b border-indigo-200"
              >
                <h3 className="text-xs font-bold text-indigo-900 mb-1.5">
                  LINKS
                </h3>
                <div className="space-y-1">
                  {data.personalInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-indigo-600 hover:text-indigo-900"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="truncate text-xs">{link.platform}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-3 border-b border-indigo-200"
            >
              <h3 className="text-xs font-bold text-indigo-900 mb-1.5">
                SKILLS
              </h3>
              <div className="space-y-1 text-xs">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-gray-700">
                    • {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-indigo-900 mb-1.5">
                LANGUAGES
              </h3>
              <div className="space-y-1 text-xs">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-semibold text-gray-900">
                      {lang.name}
                    </span>{" "}
                    <span className="text-gray-600 capitalize">
                      ({lang.proficiency})
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content - Dense */}
        <div className="w-2/3 p-5">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-3 border-b border-gray-200 text-xs text-gray-700"
            >
              <p>{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-3 border-b border-gray-200"
            >
              <h2 className="text-xs font-bold text-indigo-900 uppercase mb-2">
                Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-gray-900">
                      {job.position}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 font-semibold">
                    {job.company}
                  </p>
                  <p className="text-xs text-gray-700">{job.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-3 border-b border-gray-200"
            >
              <h2 className="text-xs font-bold text-indigo-900 uppercase mb-2">
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-xs font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-xs text-indigo-700 font-semibold">
                    {edu.school}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-xs font-bold text-indigo-900 uppercase mb-2">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <h3 className="text-xs font-bold text-gray-900">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </A4PageWrapper>
  );
};
