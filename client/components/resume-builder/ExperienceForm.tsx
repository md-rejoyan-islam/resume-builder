"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DraggableList,
  DragHandleWithIndex,
} from "@/components/ui/draggable-list";
import { HtmlContent } from "@/components/ui/html-content";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Briefcase, Edit2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export interface Experience {
  id: string;
  jobTitle: string;
  employer: string;
  city: string;
  country: string;
  jobType: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  description: string;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onExperiencesChange: (experiences: Experience[]) => void;
  countries: { name: string; code: string }[];
}

const jobTypes = [
  { label: "Full-time", value: "full-time" },
  { label: "Part-time", value: "part-time" },
  { label: "Contract", value: "contract" },
  { label: "Freelance", value: "freelance" },
  { label: "Internship", value: "internship" },
  { label: "Remote", value: "remote" },
];

const generateId = () => {
  return `exp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyExperience: Omit<Experience, "id"> = {
  jobTitle: "",
  employer: "",
  city: "",
  country: "",
  jobType: "",
  startDate: "",
  endDate: "",
  currentlyWorking: false,
  description: "",
};

export function ExperienceForm({
  experiences,
  onExperiencesChange,
  countries,
}: ExperienceFormProps) {
  const [formData, setFormData] =
    useState<Omit<Experience, "id">>(emptyExperience);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof Omit<Experience, "id">,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentlyWorkingChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      currentlyWorking: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleAddExperience = () => {
    if (!formData.jobTitle.trim() || !formData.employer.trim()) return;

    const newExperience: Experience = {
      id: generateId(),
      ...formData,
    };

    onExperiencesChange([...experiences, newExperience]);
    setFormData(emptyExperience);
  };

  const handleRemoveExperience = (id: string) => {
    onExperiencesChange(experiences.filter((exp) => exp.id !== id));
  };

  const handleEditClick = (experience: Experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (
    field: keyof Omit<Experience, "id">,
    value: string | boolean
  ) => {
    if (!editingExperience) return;
    setEditingExperience((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEditCurrentlyWorkingChange = (checked: boolean) => {
    if (!editingExperience) return;
    setEditingExperience((prev) =>
      prev
        ? {
            ...prev,
            currentlyWorking: checked,
            endDate: checked ? "" : prev.endDate,
          }
        : null
    );
  };

  const handleSaveEdit = () => {
    if (!editingExperience) return;

    onExperiencesChange(
      experiences.map((exp) =>
        exp.id === editingExperience.id ? editingExperience : exp
      )
    );
    setIsModalOpen(false);
    setEditingExperience(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExperience(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyExperience);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Add Experience Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Job Title */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Job Title <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.jobTitle}
            onChange={(e) => handleInputChange("jobTitle", e.target.value)}
            placeholder="e.g. Software Engineer"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Employer */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Employer <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.employer}
            onChange={(e) => handleInputChange("employer", e.target.value)}
            placeholder="e.g. Google"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 3: City and Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              City
            </label>
            <Input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange("city", e.target.value)}
              placeholder="e.g. Mountain View"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Country
            </label>
            <Select
              value={formData.country}
              onValueChange={(value) => handleInputChange("country", value)}
            >
              <SelectTrigger className="h-12 w-full bg-white dark:bg-card border-slate-200 dark:border-border">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.name}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 4: Job Type */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Job Type
          </label>
          <Select
            value={formData.jobType}
            onValueChange={(value) => handleInputChange("jobType", value)}
          >
            <SelectTrigger className="h-12 w-full bg-white dark:bg-card border-slate-200 dark:border-border">
              <SelectValue placeholder="Select Job Type" />
            </SelectTrigger>
            <SelectContent>
              {jobTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Row 5: Start Date and End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Start Date
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              End Date
            </label>
            <Input
              type="date"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              disabled={formData.currentlyWorking}
              className={cn(
                "h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                formData.currentlyWorking &&
                  "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
              )}
            />
          </div>
        </div>

        {/* Row 6: Currently Working Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="currentlyWorking"
            checked={formData.currentlyWorking}
            onChange={(e) => handleCurrentlyWorkingChange(e.target.checked)}
            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="currentlyWorking"
            className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
          >
            I currently work here
          </label>
        </div>

        {/* Row 7: Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Description
          </label>
          <TextEditor
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Row 8: Add Button */}
        <Button
          type="button"
          onClick={handleAddExperience}
          disabled={!formData.jobTitle.trim() || !formData.employer.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            (!formData.jobTitle.trim() || !formData.employer.trim()) &&
              "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </Button>
      </div>

      {/* Experience List */}
      <DraggableList
        items={experiences}
        onReorder={onExperiencesChange}
        title="Added Experiences"
        renderItem={(experience, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {experience.jobTitle}
                </h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                  {experience.employer}
                  {experience.city && `, ${experience.city}`}
                  {experience.country && `, ${experience.country}`}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {experience.jobType && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {jobTypes.find((t) => t.value === experience.jobType)
                        ?.label || experience.jobType}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 dark:text-muted-foreground">
                    {experience.startDate &&
                      new Date(experience.startDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    {" - "}
                    {experience.currentlyWorking
                      ? "Present"
                      : experience.endDate &&
                        new Date(experience.endDate).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            year: "numeric",
                          }
                        )}
                  </span>
                </div>
                {experience.description && (
                  <HtmlContent
                    html={experience.description}
                    className="text-sm text-slate-500 dark:text-muted-foreground mt-2 line-clamp-2"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(experience)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit experience"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveExperience(experience.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are experiences */}
      {experiences.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Experience
        </button>
      )}

      {/* Empty state */}
      {experiences.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No work experience added yet.</p>
          <p className="text-xs mt-1">
            Add your first job experience above to get started.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Experience</DialogTitle>
          </DialogHeader>

          {editingExperience && (
            <div className="space-y-4 py-4">
              {/* Job Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingExperience.jobTitle}
                  onChange={(e) =>
                    handleEditInputChange("jobTitle", e.target.value)
                  }
                  placeholder="e.g. Software Engineer"
                  className="h-11"
                />
              </div>

              {/* Employer */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Employer <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingExperience.employer}
                  onChange={(e) =>
                    handleEditInputChange("employer", e.target.value)
                  }
                  placeholder="e.g. Google"
                  className="h-11"
                />
              </div>

              {/* City and Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    City
                  </label>
                  <Input
                    type="text"
                    value={editingExperience.city}
                    onChange={(e) =>
                      handleEditInputChange("city", e.target.value)
                    }
                    placeholder="e.g. Mountain View"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Country
                  </label>
                  <Select
                    value={editingExperience.country}
                    onValueChange={(value) =>
                      handleEditInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.code} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Job Type */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Job Type
                </label>
                <Select
                  value={editingExperience.jobType}
                  onValueChange={(value) =>
                    handleEditInputChange("jobType", value)
                  }
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={editingExperience.startDate}
                    onChange={(e) =>
                      handleEditInputChange("startDate", e.target.value)
                    }
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={editingExperience.endDate}
                    onChange={(e) =>
                      handleEditInputChange("endDate", e.target.value)
                    }
                    disabled={editingExperience.currentlyWorking}
                    className={cn(
                      "h-11",
                      editingExperience.currentlyWorking &&
                        "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
                    )}
                  />
                </div>
              </div>

              {/* Currently Working Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="editCurrentlyWorking"
                  checked={editingExperience.currentlyWorking}
                  onChange={(e) =>
                    handleEditCurrentlyWorkingChange(e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="editCurrentlyWorking"
                  className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
                >
                  I currently work here
                </label>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Description
                </label>
                <TextEditor
                  value={editingExperience.description}
                  onChange={(value) =>
                    handleEditInputChange("description", value)
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={
                !editingExperience?.jobTitle.trim() ||
                !editingExperience?.employer.trim()
              }
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
