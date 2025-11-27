"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Edit2, GraduationCap, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
}

interface EducationFormProps {
  educations: Education[];
  onEducationsChange: (educations: Education[]) => void;
}

const generateId = () => {
  return `edu-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyEducation: Omit<Education, "id"> = {
  school: "",
  degree: "",
  fieldOfStudy: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyStudying: false,
};

export function EducationForm({
  educations,
  onEducationsChange,
}: EducationFormProps) {
  const [formData, setFormData] = useState<Omit<Education, "id">>(emptyEducation);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Omit<Education, "id">, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentlyStudyingChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      currentlyStudying: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleAddEducation = () => {
    if (!formData.school.trim() || !formData.degree.trim()) return;

    const newEducation: Education = {
      id: generateId(),
      ...formData,
    };

    onEducationsChange([...educations, newEducation]);
    setFormData(emptyEducation);
  };

  const handleRemoveEducation = (id: string) => {
    onEducationsChange(educations.filter((edu) => edu.id !== id));
  };

  const handleEditClick = (education: Education) => {
    setEditingEducation(education);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (field: keyof Omit<Education, "id">, value: string | boolean) => {
    if (!editingEducation) return;
    setEditingEducation((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleEditCurrentlyStudyingChange = (checked: boolean) => {
    if (!editingEducation) return;
    setEditingEducation((prev) =>
      prev
        ? {
            ...prev,
            currentlyStudying: checked,
            endDate: checked ? "" : prev.endDate,
          }
        : null
    );
  };

  const handleSaveEdit = () => {
    if (!editingEducation) return;

    onEducationsChange(
      educations.map((edu) => (edu.id === editingEducation.id ? editingEducation : edu))
    );
    setIsModalOpen(false);
    setEditingEducation(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEducation(null);
  };

  useEffect(() => {
    if (formData.currentlyStudying) {
      setFormData((prev) => ({ ...prev, endDate: "" }));
    }
  }, [formData.currentlyStudying]);

  return (
    <div className="space-y-6">
      {/* Add Education Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: School / University */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            School / University <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.school}
            onChange={(e) => handleInputChange("school", e.target.value)}
            placeholder="e.g. Stanford University"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Degree and Field of Study */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Degree <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              value={formData.degree}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              placeholder="e.g. Bachelor of Science"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Field of Study
            </label>
            <Input
              type="text"
              value={formData.fieldOfStudy}
              onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
              placeholder="e.g. Computer Science"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 3: Location */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Location
          </label>
          <Input
            type="text"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="e.g. Stanford, CA, USA"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 4: Start Date and End Date */}
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
              disabled={formData.currentlyStudying}
              className={cn(
                "h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                formData.currentlyStudying && "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
              )}
            />
          </div>
        </div>

        {/* Row 5: Currently Studying Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="currentlyStudying"
            checked={formData.currentlyStudying}
            onChange={(e) => handleCurrentlyStudyingChange(e.target.checked)}
            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="currentlyStudying"
            className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
          >
            I am currently studying here
          </label>
        </div>

        {/* Row 6: Add Button */}
        <Button
          type="button"
          onClick={handleAddEducation}
          disabled={!formData.school.trim() || !formData.degree.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            (!formData.school.trim() || !formData.degree.trim()) &&
              "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Education
        </Button>
      </div>

      {/* Education List */}
      {educations.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Added Education ({educations.length})
          </h3>
          <div className="space-y-3">
            {educations.map((education) => (
              <div
                key={education.id}
                className="bg-white dark:bg-card rounded-lg border border-border p-4 group hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                        {education.degree}
                        {education.fieldOfStudy && ` in ${education.fieldOfStudy}`}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                        {education.school}
                        {education.location && ` • ${education.location}`}
                      </p>
                      <span className="text-xs text-slate-500 dark:text-muted-foreground">
                        {education.startDate &&
                          new Date(education.startDate).toLocaleDateString("en-US", {
                            month: "short",
                            year: "numeric",
                          })}
                        {" - "}
                        {education.currentlyStudying
                          ? "Present"
                          : education.endDate &&
                            new Date(education.endDate).toLocaleDateString("en-US", {
                              month: "short",
                              year: "numeric",
                            })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleEditClick(education)}
                      className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                      title="Edit education"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducation(education.id)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                      title="Remove education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add More Button when there are educations */}
      {educations.length > 0 && (
        <button
          type="button"
          onClick={() => {
            setFormData(emptyEducation);
            window.scrollTo({ top: 0, behavior: "smooth" });
            setTimeout(() => {
              firstInputRef.current?.focus();
            }, 500);
          }}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Education
        </button>
      )}

      {/* Empty state */}
      {educations.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No education added yet.</p>
          <p className="text-xs mt-1">Add your first education above to get started.</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Education</DialogTitle>
          </DialogHeader>

          {editingEducation && (
            <div className="space-y-4 py-4">
              {/* School / University */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  School / University <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingEducation.school}
                  onChange={(e) => handleEditInputChange("school", e.target.value)}
                  placeholder="e.g. Stanford University"
                  className="h-11"
                />
              </div>

              {/* Degree and Field of Study */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Degree <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={editingEducation.degree}
                    onChange={(e) => handleEditInputChange("degree", e.target.value)}
                    placeholder="e.g. Bachelor of Science"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Field of Study
                  </label>
                  <Input
                    type="text"
                    value={editingEducation.fieldOfStudy}
                    onChange={(e) => handleEditInputChange("fieldOfStudy", e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="h-11"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Location
                </label>
                <Input
                  type="text"
                  value={editingEducation.location}
                  onChange={(e) => handleEditInputChange("location", e.target.value)}
                  placeholder="e.g. Stanford, CA, USA"
                  className="h-11"
                />
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={editingEducation.startDate}
                    onChange={(e) => handleEditInputChange("startDate", e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={editingEducation.endDate}
                    onChange={(e) => handleEditInputChange("endDate", e.target.value)}
                    disabled={editingEducation.currentlyStudying}
                    className={cn(
                      "h-11",
                      editingEducation.currentlyStudying &&
                        "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
                    )}
                  />
                </div>
              </div>

              {/* Currently Studying Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="editCurrentlyStudying"
                  checked={editingEducation.currentlyStudying}
                  onChange={(e) => handleEditCurrentlyStudyingChange(e.target.checked)}
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="editCurrentlyStudying"
                  className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
                >
                  I am currently studying here
                </label>
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
                !editingEducation?.school.trim() || !editingEducation?.degree.trim()
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
