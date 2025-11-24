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

interface Template2ModernProps {
  data: ResumeData;
}

const getSocialIcon = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "github":
      return <Github className="w-4 h-4 text-blue-200" />;
    case "linkedin":
      return <Linkedin className="w-4 h-4 text-blue-200" />;
    case "twitter":
      return <Twitter className="w-4 h-4 text-blue-200" />;
    case "website":
      return <Globe className="w-4 h-4 text-blue-200" />;
    case "email":
      return <Mail className="w-4 h-4 text-blue-200" />;
    default:
      return <MessageCircle className="w-4 h-4 text-blue-200" />;
  }
};

export const Template2Modern: React.FC<Template2ModernProps> = ({ data }) => {
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
        {/* Header with Accent */}
        <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white p-8">
          <div className="flex items-center gap-6">
            {data.personalInfo.profileImage && (
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={100}
                height={100}
                className="rounded-full object-cover border-3 border-white w-[100px] h-[100px]"
              />
            )}
            <div>
              <h1 className="text-5xl font-bold">
                {data.personalInfo.fullName}
              </h1>
              {data.personalInfo.jobTitle && (
                <p className="text-xl text-blue-100 mt-1">
                  {data.personalInfo.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4 mt-3 flex-wrap text-sm">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1 text-blue-100">
                <Mail className="w-4 h-4 text-blue-200" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1 text-blue-100">
                <Phone className="w-4 h-4 text-blue-200" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-1 text-blue-100">
                <MapPin className="w-4 h-4 text-blue-200" />
                {data.personalInfo.location}
              </span>
            )}
          </div>
          {data.personalInfo.socialLinks &&
            data.personalInfo.socialLinks.length > 0 && (
              <div className="flex gap-4 text-sm mt-4 flex-wrap">
                {data.personalInfo.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                    <span className="underline">{link.platform}</span>
                  </a>
                ))}
              </div>
            )}
        </div>

        <div className="p-8 max-w-4xl mx-auto">
          {/* Summary */}
          {data.personalInfo.summary && (
            <div
              className="mb-8 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-600"
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <p className="text-gray-800">{data.personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <div
              style={{
                marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
              }}
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Experience
              </h2>
              {data.experience.map((job) => (
                <div
                  key={job.id}
                  className="mb-5 pb-5 border-b"
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{job.position}</h3>
                      <p className="text-blue-600 font-semibold">
                        {job.company}
                      </p>
                    </div>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                      {job.startDate} - {job.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2">{job.description}</p>
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Education
              </h2>
              {data.education.map((edu) => (
                <div
                  key={edu.id}
                  className="mb-4 pb-4 border-b"
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{edu.degree}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                    </div>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded">
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
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill) => (
                  <span
                    key={skill.id}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold"
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
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Projects
              </h2>
              {data.projects.map((project) => (
                <div
                  key={project.id}
                  className="mb-5 pb-5 border-b"
                  style={{
                    marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
                  }}
                >
                  <h3 className="font-bold text-lg">{project.name}</h3>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                Languages
              </h2>
              <div className="space-y-3">
                {data.languages.map((lang) => (
                  <div
                    key={lang.id}
                    className="flex justify-between items-center pb-3 border-b"
                    style={{
                      marginBottom: `${
                        data.theme?.spacing?.paragraphGap || 8
                      }px`,
                    }}
                  >
                    <span className="font-semibold">{lang.name}</span>
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded capitalize">
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
