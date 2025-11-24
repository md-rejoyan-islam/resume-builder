import React from "react";
import { Template1Classic } from "./resumes/Template1-Classic";
import { Template10Condensed } from "./resumes/Template10-Condensed";
import { Template11JordanSmith } from "./resumes/Template11-JordanSmith";
import { Template4Creative } from "./resumes/Template4-Creative";
import { Template6Contemporary } from "./resumes/Template6-Contemporary";
import { Template8IvyLeague } from "./resumes/Template8-IvyLeague";
import { Template9Single } from "./resumes/Template9-Single";

interface TemplateSelectorProps {
  selectedTemplate: string;
  onTemplateChange: (templateName: string) => void;
}

const templates = [
  { id: "classic", name: "Classic", component: Template1Classic },
  { id: "creative", name: "Creative", component: Template4Creative },
  {
    id: "contemporary",
    name: "Contemporary",
    component: Template6Contemporary,
  },
  { id: "ivyleague", name: "Ivy League", component: Template8IvyLeague },
  { id: "single", name: "Single", component: Template9Single },
  { id: "condensed", name: "Condensed", component: Template10Condensed },
  { id: "jordansmith", name: "Jordan Smith", component: Template11JordanSmith },
];

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onTemplateChange,
}) => {
  return (
    <div className="space-y-3 mb-6">
      <label className="text-sm font-semibold text-gray-700">
        Choose Resume Template
      </label>
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-2 min-w-max">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateChange(template.id)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border-2 transition-all whitespace-nowrap min-h-10 flex items-center justify-center shrink-0 ${
                selectedTemplate === template.id
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
              title={template.name}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const getTemplateComponent = (templateId: string) => {
  const template = templates.find((t) => t.id === templateId);
  return template?.component || Template1Classic;
};
