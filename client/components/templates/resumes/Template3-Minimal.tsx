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

interface Template3MinimalProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-4 h-4 text-blue-600" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 text-blue-600" />;
    case "twitter":
      return <Twitter className="w-4 h-4 text-blue-600" />;
    case "website":
      return <Globe className="w-4 h-4 text-blue-600" />;
    case "email":
      return <Mail className="w-4 h-4 text-blue-600" />;
    default:
      return <MessageCircle className="w-4 h-4 text-blue-600" />;
  }
};

export const Template3Minimal: React.FC<Template3MinimalProps> = ({ data }) => {
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
        {/* Header */}
        <div
          style={{ marginBottom: `${data.theme?.spacing?.sectionGap || 24}px` }}
          className="pb-8 border-b border-gray-300"
        >
          {data.personalInfo.profileImage && (
            <div className="flex justify-center mb-4">
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={80}
                height={80}
                className="rounded-full object-cover border-2 border-gray-300 w-20 h-20"
              />
            </div>
          )}
          <h1 className="text-4xl font-light tracking-wide mb-3 text-center">
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="text-lg text-gray-700 font-semibold mb-3">
              {data.personalInfo.jobTitle}
            </p>
          )}
          <div className="flex gap-6 text-sm text-gray-600 flex-wrap">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4 text-blue-600" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4 text-blue-600" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-blue-600" />
                {data.personalInfo.location}
              </span>
            )}
          </div>
          {data.personalInfo.socialLinks &&
            data.personalInfo.socialLinks.length > 0 && (
              <div className="flex gap-4 text-sm mt-3 flex-wrap">
                {data.personalInfo.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                    <span className="underline">{link.platform}</span>
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
          >
            <p className="text-gray-700 leading-relaxed text-base">
              {data.personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
          >
            <h2 className="text-xs font-semibold tracking-widest text-gray-900 mb-6 uppercase">
              Experience
            </h2>
            {data.experience.map((job, index) => (
              <div key={job.id} className={index !== 0 ? "mt-8" : ""}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">
                    {job.position}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {job.startDate} – {job.endDate}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mt-1">{job.company}</p>
                <p className="text-gray-700 mt-3 text-sm leading-relaxed">
                  {job.description}
                </p>
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
            <h2 className="text-xs font-semibold tracking-widest text-gray-900 mb-6 uppercase">
              Education
            </h2>
            {data.education.map((edu, index) => (
              <div key={edu.id} className={index !== 0 ? "mt-6" : ""}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                  <span className="text-sm text-gray-500">
                    {edu.graduationYear}
                  </span>
                </div>
                <p className="text-gray-600 text-sm">{edu.school}</p>
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
            <h2 className="text-xs font-semibold tracking-widest text-gray-900 mb-6 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
          >
            <h2 className="text-xs font-semibold tracking-widest text-gray-900 mb-6 uppercase">
              Projects
            </h2>
            {data.projects.map((project, index) => (
              <div key={project.id} className={index !== 0 ? "mt-8" : ""}>
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-gray-700 mt-2 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-gray-900 mb-6 uppercase">
              Languages
            </h2>
            <div className="space-y-3">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-semibold text-gray-900">
                    {lang.name}
                  </span>
                  <span className="text-gray-600 capitalize">
                    {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </A4PageWrapper>
  );
};
