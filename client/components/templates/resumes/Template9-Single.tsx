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

interface Template9SingleProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-3 h-3 text-teal-700" />;
    case "linkedin":
      return <Linkedin className="w-3 h-3 text-teal-700" />;
    case "twitter":
      return <Twitter className="w-3 h-3 text-teal-700" />;
    case "website":
      return <Globe className="w-3 h-3 text-teal-700" />;
    case "email":
      return <Mail className="w-3 h-3 text-teal-700" />;
    default:
      return <MessageCircle className="w-3 h-3 text-teal-700" />;
  }
};

export const Template9Single: React.FC<Template9SingleProps> = ({ data }) => {
  return (
    <A4PageWrapper>
      <div
        className="bg-white"
        style={{
          height: "297mm",
          width: "210mm",
          boxSizing: "border-box",
          overflow: "visible",
          lineHeight: data.theme?.spacing?.lineHeight || 1.6,
        }}
      >
        <div className="p-8">
          {/* Header */}
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
            className="text-center pb-6 border-b border-gray-300"
          >
            {data.personalInfo.profileImage && (
              <div className="flex justify-center mb-4">
                <Image
                  src={data.personalInfo.profileImage}
                  alt={data.personalInfo.fullName}
                  width={90}
                  height={90}
                  className="rounded-full object-cover border-3 border-teal-700 w-[90px] h-[90px]"
                />
              </div>
            )}

            <h1 className="text-4xl font-bold text-gray-900 mb-1">
              {data.personalInfo.fullName}
            </h1>
            {data.personalInfo.jobTitle && (
              <p className="text-lg text-teal-700 font-semibold mb-3">
                {data.personalInfo.jobTitle}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex justify-center flex-wrap gap-4 text-xs text-gray-700 mb-3">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-teal-700" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-teal-700" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-teal-700" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {data.personalInfo.socialLinks &&
              data.personalInfo.socialLinks.length > 0 && (
                <div className="flex justify-center gap-3 text-xs">
                  {data.personalInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-teal-700 hover:text-teal-900"
                    >
                      {getSocialIcon(link.platform)}
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="text-sm text-gray-700 leading-relaxed"
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
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-400">
                Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {job.position}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700 font-semibold mb-1">
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
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-400">
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-xs text-teal-700 font-semibold">
                    {edu.school}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b border-gray-400">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs bg-teal-50 text-teal-700 px-2 py-1 border border-teal-300 rounded"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3 pb-2 border-b border-gray-400">
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="font-semibold text-gray-900">{lang.name}</p>
                    <p className="text-gray-600 capitalize">
                      {lang.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 pb-2 border-b border-gray-400">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5">
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
