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

interface Template1ClassicProps {
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

export const Template1Classic: React.FC<Template1ClassicProps> = ({ data }) => {
  return (
    <A4PageWrapper>
      <div
        className="bg-white p-8 text-gray-900"
        style={{
          height: "297mm",
          boxSizing: "border-box",
          overflow: "visible",
          lineHeight: data.theme?.spacing?.lineHeight || 1.6,
        }}
      >
        {/* Header */}
        <div
          className="text-center pb-6 border-b-2 border-gray-300"
          style={{
            marginBottom: `${data.theme?.spacing?.sectionGap || 24}px`,
          }}
        >
          {data.personalInfo.profileImage && (
            <div className="flex justify-center mb-4">
              <Image
                src={data.personalInfo.profileImage}
                alt={data.personalInfo.fullName}
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-gray-300"
              />
            </div>
          )}
          <h1 className="text-4xl font-bold">{data.personalInfo.fullName}</h1>
          {data.personalInfo.jobTitle && (
            <p className="text-lg text-gray-600 mt-1">
              {data.personalInfo.jobTitle}
            </p>
          )}
          <div className="flex justify-center gap-6 text-sm mt-4 flex-wrap">
            {data.personalInfo.email && (
              <span className="flex items-center gap-1 text-gray-700">
                <Mail className="w-4 h-4 text-blue-600" />
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center gap-1 text-gray-700">
                <Phone className="w-4 h-4 text-blue-600" />
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center gap-1 text-gray-700">
                <MapPin className="w-4 h-4 text-blue-600" />
                {data.personalInfo.location}
              </span>
            )}
          </div>
          {data.personalInfo.socialLinks &&
            data.personalInfo.socialLinks.length > 0 && (
              <div className="flex justify-center gap-4 mt-4 flex-wrap">
                {data.personalInfo.socialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {getSocialIcon(link.platform)}
                    <span className="text-sm underline">{link.platform}</span>
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
            <p
              className="text-sm"
              style={{ lineHeight: data.theme?.spacing?.lineHeight || 1.6 }}
            >
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
            <h2
              className="text-xl font-bold pb-2 border-b-2 border-gray-300"
              style={{
                marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
              }}
            >
              Experience
            </h2>
            {data.experience.map((job) => (
              <div key={job.id} className="mb-4">
                <div className="flex justify-between">
                  <h3 className="font-bold">{job.position}</h3>
                  <span className="text-sm text-gray-600">
                    {job.startDate} - {job.endDate}
                  </span>
                </div>
                <p className="text-sm text-gray-700 italic">{job.company}</p>
                <p className="text-sm mt-1">{job.description}</p>
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
            <h2
              className="text-xl font-bold pb-2 border-b-2 border-gray-300"
              style={{
                marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
              }}
            >
              Education
            </h2>
            {data.education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <h3 className="font-bold">{edu.degree}</h3>
                  <span className="text-sm text-gray-600">
                    {edu.graduationYear}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{edu.school}</p>
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
            <h2
              className="text-xl font-bold pb-2 border-b-2 border-gray-300"
              style={{
                marginBottom: `${data.theme?.spacing?.paragraphGap || 8}px`,
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="bg-gray-200 px-3 py-1 rounded text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-300">
              Projects
            </h2>
            {data.projects.map((project) => (
              <div key={project.id} className="mb-4">
                <h3 className="font-bold">{project.name}</h3>
                <p className="text-sm mt-1">{project.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-3 pb-2 border-b-2 border-gray-300">
              Languages
            </h2>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium">{lang.name}</span>
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
