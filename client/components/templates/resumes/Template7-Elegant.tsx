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
    startDate?: string;
    graduationYear: string;
    currentlyStudying?: boolean;
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
  certificates?: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    description: string;
  }>;
}

interface Template7ElegantProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-3 h-3 text-amber-900" />;
    case "linkedin":
      return <Linkedin className="w-3 h-3 text-amber-900" />;
    case "twitter":
      return <Twitter className="w-3 h-3 text-amber-900" />;
    case "website":
      return <Globe className="w-3 h-3 text-amber-900" />;
    case "email":
      return <Mail className="w-3 h-3 text-amber-900" />;
    default:
      return <MessageCircle className="w-3 h-3 text-amber-900" />;
  }
};

export const Template7Elegant: React.FC<Template7ElegantProps> = ({ data }) => {
  return (
    <A4PageWrapper>
      <div
        className="bg-white font-serif"
        style={{
          height: "297mm",
          width: "210mm",
          boxSizing: "border-box",
          overflow: "visible",
          lineHeight: data.theme?.spacing?.lineHeight || 1.6,
        }}
      >
        {/* Top Accent Line */}
        <div className="h-1 bg-linear-to-r from-amber-900 via-amber-700 to-white"></div>

        <div className="p-12">
          {/* Header */}
          <div className="text-center mb-12">
            {data.personalInfo.profileImage && (
              <div className="flex justify-center mb-6">
                <Image
                  src={data.personalInfo.profileImage}
                  alt={data.personalInfo.fullName}
                  width={100}
                  height={100}
                  className="rounded-full object-cover border-4 border-amber-900 w-[100px] h-[100px]"
                />
              </div>
            )}

            <h1 className="text-5xl font-bold text-amber-900 mb-2">
              {data.personalInfo.fullName}
            </h1>
            {data.personalInfo.jobTitle && (
              <p className="text-2xl text-amber-700 font-light italic mb-4">
                {data.personalInfo.jobTitle}
              </p>
            )}

            {/* Contact Info */}
            <div className="flex justify-center gap-6 text-sm text-gray-700 mb-4 flex-wrap">
              {data.personalInfo.email && (
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-amber-900" />
                  <span>{data.personalInfo.email}</span>
                </div>
              )}
              {data.personalInfo.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-900" />
                  <span>{data.personalInfo.phone}</span>
                </div>
              )}
              {data.personalInfo.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-900" />
                  <span>{data.personalInfo.location}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            {data.personalInfo.socialLinks &&
              data.personalInfo.socialLinks.length > 0 && (
                <div className="flex justify-center gap-4 mb-2">
                  {data.personalInfo.socialLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-amber-900 hover:text-amber-700"
                    >
                      {getSocialIcon(link.platform)}
                      <span>{link.platform}</span>
                    </a>
                  ))}
                </div>
              )}
          </div>

          {/* Divider */}
          <div className="h-0.5 bg-linear-to-r from-amber-900 to-amber-200 mb-8"></div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <p className="text-gray-700 leading-relaxed italic text-center">
                &ldquo;{data.personalInfo.summary}&rdquo;
              </p>
            </div>
          )}

          {/* Experience Section */}
          {data.experience && data.experience.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Professional Experience
              </h2>
              {data.experience.map((job, idx) => (
                <div
                  key={job.id}
                  style={{
                    marginTop:
                      idx > 0
                        ? `${data.theme?.spacing?.paragraphGap || 8}px`
                        : undefined,
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-amber-900">
                      {job.position}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-base text-amber-700 italic mb-2">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Education Section */}
          {data.education && data.education.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Education
              </h2>
              {data.education.map((edu, idx) => (
                <div
                  key={edu.id}
                  style={{
                    marginTop:
                      idx > 0
                        ? `${data.theme?.spacing?.paragraphGap || 8}px`
                        : undefined,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-amber-900">
                        {edu.degree}
                      </h3>
                      <p className="text-amber-700 italic">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-600">
                      {edu.graduationYear}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Skills
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="text-sm">
                    <span className="text-amber-700">✦</span>{" "}
                    <span className="text-gray-800">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages Section */}
          {data.languages && data.languages.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Languages
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {data.languages.map((lang) => (
                  <div key={lang.id}>
                    <p className="text-amber-900 font-semibold">{lang.name}</p>
                    <p className="text-gray-600 text-sm capitalize">
                      {lang.proficiency}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects Section */}
          {data.projects && data.projects.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Projects
              </h2>
              {data.projects.map((project, idx) => (
                <div
                  key={project.id}
                  style={{
                    marginTop:
                      idx > 0
                        ? `${data.theme?.spacing?.paragraphGap || 8}px`
                        : undefined,
                  }}
                >
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Certificates & Achievements */}
          {data.certificates && data.certificates.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6 pb-2 border-b-2 border-amber-200">
                Certificates & Achievements
              </h2>
              {data.certificates.map((cert, idx) => (
                <div
                  key={cert.id}
                  style={{
                    marginTop:
                      idx > 0
                        ? `${data.theme?.spacing?.paragraphGap || 8}px`
                        : undefined,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-amber-900">
                      {cert.name}
                    </h3>
                    <span className="text-sm text-gray-600">{cert.date}</span>
                  </div>
                  <p className="text-amber-700 italic mt-1">{cert.issuer}</p>
                  {cert.description && (
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      {cert.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Accent Line */}
        <div className="h-1 bg-linear-to-r from-white via-amber-700 to-amber-900 mt-12"></div>
      </div>
    </A4PageWrapper>
  );
};
