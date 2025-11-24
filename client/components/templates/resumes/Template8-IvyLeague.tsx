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

interface Template8IvyLeagueProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-3 h-3 text-slate-700" />;
    case "linkedin":
      return <Linkedin className="w-3 h-3 text-slate-700" />;
    case "twitter":
      return <Twitter className="w-3 h-3 text-slate-700" />;
    case "website":
      return <Globe className="w-3 h-3 text-slate-700" />;
    case "email":
      return <Mail className="w-3 h-3 text-slate-700" />;
    default:
      return <MessageCircle className="w-3 h-3 text-slate-700" />;
  }
};

export const Template8IvyLeague: React.FC<Template8IvyLeagueProps> = ({
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
        {/* Left Sidebar - Navy */}
        <div className="w-1/4 bg-slate-800 text-white p-8 flex flex-col">
          {/* Profile */}
          {data.personalInfo.profileImage && (
            <div className="mb-6">
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={120}
                height={120}
                className="rounded-lg object-cover w-full h-auto mb-4 border-2 border-white"
              />
            </div>
          )}

          <h1 className="text-2xl font-bold mb-1 text-white">
            {data.personalInfo.fullName}
          </h1>
          {data.personalInfo.jobTitle && (
            <p className="text-sm font-semibold text-slate-200 mb-6">
              {data.personalInfo.jobTitle}
            </p>
          )}

          {/* Contact Info */}
          <div
            style={{
              marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
            }}
            className="space-y-3 pb-6 border-b border-slate-600"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">
              Contact
            </h3>
            {data.personalInfo.email && (
              <div className="flex items-center gap-2 text-xs text-slate-200 break-all">
                <Mail className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span className="truncate">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <Phone className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-2 text-xs text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                <span>{data.personalInfo.location}</span>
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
                className="pb-6 border-b border-slate-600"
              >
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">
                  Online
                </h3>
                <div className="space-y-2">
                  {data.personalInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-slate-300 hover:text-white truncate"
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
              className="pb-6 border-b border-slate-600"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">
                Skills
              </h3>
              <div className="space-y-2">
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="text-xs text-slate-300 bg-slate-700 px-2 py-1 rounded"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 mb-3">
                Languages
              </h3>
              <div className="space-y-2">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-xs">
                    <p className="font-semibold text-slate-100">{lang.name}</p>
                    <p className="text-slate-400 capitalize text-xs">
                      {lang.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-10">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-6 border-b-2 border-slate-300"
            >
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
              className="pb-6 border-b-2 border-slate-300"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider border-b-2 border-slate-800 pb-2">
                Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800">{job.position}</h3>
                    <span className="text-xs text-gray-600">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">
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
              className="pb-6 border-b-2 border-slate-300"
            >
              <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider border-b-2 border-slate-800 pb-2">
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-slate-800">{edu.degree}</h3>
                    <span className="text-xs text-gray-600">
                      {edu.graduationYear}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {edu.school}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider border-b-2 border-slate-800 pb-2">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-bold text-slate-800 mb-1">
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
