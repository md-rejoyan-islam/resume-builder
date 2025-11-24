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
    field?: string;
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

interface Template4CreativeProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-3 h-3 text-orange-600" />;
    case "linkedin":
      return <Linkedin className="w-3 h-3 text-orange-600" />;
    case "twitter":
      return <Twitter className="w-3 h-3 text-orange-600" />;
    case "website":
      return <Globe className="w-3 h-3 text-orange-600" />;
    case "email":
      return <Mail className="w-3 h-3 text-orange-600" />;
    default:
      return <MessageCircle className="w-3 h-3 text-orange-600" />;
  }
};

export const Template4Creative: React.FC<Template4CreativeProps> = ({
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
        {/* Left Sidebar */}
        <div className="w-1/3 bg-linear-to-b from-orange-50 to-orange-100 p-8 border-r-2 border-orange-200">
          {/* Profile Image */}
          {data.personalInfo.profileImage && (
            <div className="flex justify-center mb-6">
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-orange-600 w-[120px] h-[120px]"
              />
            </div>
          )}

          <h1 className="text-2xl font-bold text-orange-900 mb-1 text-center">
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="text-sm font-semibold text-orange-700 mb-6 text-center">
              {data.personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Information */}
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
            className="space-y-3 pb-6 border-b-2 border-orange-300"
          >
            <h3 className="text-xs font-bold uppercase tracking-wider text-orange-900 mb-4">
              Contact
            </h3>
            {data.personalInfo.email && (
              <div className="flex items-center gap-2 text-xs">
                <Mail className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-gray-700 break-all">
                  {data.personalInfo.email}
                </span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2 text-xs">
                <Phone className="w-4 h-4 text-orange-600 shrink-0" />
                <span className="text-gray-700">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-2 text-xs">
                <MapPin className="w-4 h-4 text-orange-600 shrink-0" />
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
                className="pb-6 border-b-2 border-orange-300"
              >
                <h3 className="text-xs font-bold uppercase tracking-wider text-orange-900 mb-3">
                  Links
                </h3>
                <div className="space-y-2">
                  {data.personalInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-orange-700 hover:text-orange-900 truncate"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="truncate">{link.platform}</span>
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
              className="pb-6 border-b-2 border-orange-300"
            >
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-900 mb-3">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="text-xs bg-white text-orange-700 px-2 py-1 rounded border border-orange-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-orange-900 mb-3">
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <div className="font-semibold text-orange-900">
                      {lang.name}
                    </div>
                    <div className="text-orange-700 capitalize">
                      {lang.proficiency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content Area */}
        <div className="w-2/3 p-8">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-6 border-b border-gray-300"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-900 mb-3">
                Summary
              </h2>
              <p className="text-sm text-gray-700 leading-relaxed">
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
              className="pb-6 border-b border-gray-300"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-900 mb-4">
                Work Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      {job.position}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-orange-700 mb-1">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-700">{job.description}</p>
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
              className="pb-6 border-b border-gray-300"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-900 mb-4">
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-gray-900">
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-gray-600">
                      {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-orange-700">
                    {edu.school}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-6 border-b border-gray-300"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-orange-900 mb-4">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-700">{project.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </A4PageWrapper>
  );
};
