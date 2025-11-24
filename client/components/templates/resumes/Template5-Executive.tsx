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
    otherUrl?: string;
  }>;
  languages?: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
}

interface Template5ExecutiveProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-4 h-4 text-amber-300" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 text-amber-300" />;
    case "twitter":
      return <Twitter className="w-4 h-4 text-amber-300" />;
    case "website":
      return <Globe className="w-4 h-4 text-amber-300" />;
    case "email":
      return <Mail className="w-4 h-4 text-amber-300" />;
    default:
      return <MessageCircle className="w-4 h-4 text-amber-300" />;
  }
};

export const Template5Executive: React.FC<Template5ExecutiveProps> = ({
  data,
}) => {
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
        {/* Header - Formal Top Section */}
        <div className="bg-linear-to-r from-slate-700 to-slate-900 text-white px-12 py-16">
          <div className="flex items-center gap-6 mb-8">
            {data.personalInfo.profileImage && (
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={110}
                height={110}
                className="rounded-lg object-cover border-3 border-amber-500 w-[110px] h-[110px]"
              />
            )}
            <div>
              <h1 className="text-6xl font-bold tracking-tight mb-2">
                {data.personalInfo.fullName}
              </h1>
              {data.personalInfo.jobTitle && (
                <p className="text-2xl text-amber-400 font-semibold">
                  {data.personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="h-1 w-24 bg-amber-500 mb-6"></div>
          <div className="grid grid-cols-3 gap-6 text-sm">
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold uppercase text-xs tracking-wider">
                <Mail className="w-4 h-4 text-amber-300" />
                Email
              </div>
              <p className="text-white mt-1">{data.personalInfo.email}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold uppercase text-xs tracking-wider">
                <Phone className="w-4 h-4 text-amber-300" />
                Phone
              </div>
              <p className="text-white mt-1">{data.personalInfo.phone}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-500 font-semibold uppercase text-xs tracking-wider">
                <MapPin className="w-4 h-4 text-amber-300" />
                Location
              </div>
              <p className="text-white mt-1">{data.personalInfo.location}</p>
            </div>
          </div>
          {data.personalInfo.socialLinks &&
            data.personalInfo.socialLinks.length > 0 && (
              <div className="flex gap-4 text-sm mt-6 flex-wrap">
                {data.personalInfo.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-amber-300 hover:text-amber-100 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                    <span className="underline">{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
        </div>

        <div className="px-12 py-12">
          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
              className="pb-8 border-b-2 border-amber-500"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">
                Professional Summary
              </h2>
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
              className="pb-8 border-b-2 border-amber-500"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
                Professional Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-baseline">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {job.position}
                      </h3>
                      <p className="text-amber-700 font-semibold">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-xs text-gray-600 font-semibold">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2 leading-relaxed">
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
              className="pb-8 border-b-2 border-amber-500"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
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
                    <div>
                      <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-600 font-semibold">
                      {edu.graduationYear}
                    </span>
                  </div>
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
              className="pb-8 border-b-2 border-amber-500"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
                Core Competencies
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">
                      {skill.name}
                    </span>
                  </div>
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
              className="pb-8 border-b-2 border-amber-500"
            >
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
                Key Projects
              </h2>
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <h3 className="font-bold text-slate-900">{project.name}</h3>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-6">
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center pb-3 border-b border-gray-200"
                  >
                    <span className="font-semibold text-slate-900">
                      {lang.name}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded capitalize font-semibold">
                      {lang.proficiency}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </A4PageWrapper>
  );
};
