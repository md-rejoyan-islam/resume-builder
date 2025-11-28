"use client";

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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { Language } from "@/lib/resume-format";
import { Edit2, Languages, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

interface LanguageFormProps {
  languages: Language[];
  onLanguagesChange: (languages: Language[]) => void;
}

const proficiencyLevels = [
  { label: "Native", value: "native" },
  { label: "Fluent", value: "fluent" },
  { label: "Advanced", value: "advanced" },
  { label: "Intermediate", value: "intermediate" },
  { label: "Basic", value: "basic" },
];

const generateId = () => {
  return `lang-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyLanguage: Omit<Language, "id"> = {
  language: "",
  proficiency: "",
};

export function LanguageForm({
  languages,
  onLanguagesChange,
}: LanguageFormProps) {
  const [formData, setFormData] = useState<Omit<Language, "id">>(emptyLanguage);
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Omit<Language, "id">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddLanguage = () => {
    if (!formData.language.trim()) return;

    const newLanguage: Language = {
      id: generateId(),
      ...formData,
    };

    onLanguagesChange([...languages, newLanguage]);
    setFormData(emptyLanguage);
  };

  const handleRemoveLanguage = (id: string) => {
    onLanguagesChange(languages.filter((lang) => lang.id !== id));
  };

  const handleEditClick = (language: Language) => {
    setEditingLanguage(language);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (field: keyof Omit<Language, "id">, value: string) => {
    if (!editingLanguage) return;
    setEditingLanguage((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveEdit = () => {
    if (!editingLanguage) return;

    onLanguagesChange(
      languages.map((lang) => (lang.id === editingLanguage.id ? editingLanguage : lang))
    );
    setIsModalOpen(false);
    setEditingLanguage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLanguage(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyLanguage);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  const getProficiencyLabel = (value: string) => {
    return proficiencyLevels.find((p) => p.value === value)?.label || value;
  };

  const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
      case "native":
        return "bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400";
      case "fluent":
        return "bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400";
      case "advanced":
        return "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400";
      case "intermediate":
        return "bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400";
      case "basic":
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
      default:
        return "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Language Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Language and Proficiency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Language <span className="text-red-500">*</span>
            </label>
            <Input
              ref={firstInputRef}
              type="text"
              value={formData.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
              placeholder="e.g. Spanish"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Proficiency Level
            </label>
            <Select
              value={formData.proficiency}
              onValueChange={(value) => handleInputChange("proficiency", value)}
            >
              <SelectTrigger className="h-12 w-full bg-white dark:bg-card border-slate-200 dark:border-border">
                <SelectValue placeholder="Select Proficiency" />
              </SelectTrigger>
              <SelectContent>
                {proficiencyLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2: Add Button */}
        <Button
          type="button"
          onClick={handleAddLanguage}
          disabled={!formData.language.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !formData.language.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Language
        </Button>
      </div>

      {/* Language List */}
      <DraggableList
        items={languages}
        onReorder={onLanguagesChange}
        title="Added Languages"
        gridCols={2}
        renderItem={(language, index) => (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Languages className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {language.language}
                </h4>
                {language.proficiency && (
                  <span
                    className={cn(
                      "inline-flex items-center px-2 py-0.5 mt-1 rounded text-xs font-medium",
                      getProficiencyColor(language.proficiency)
                    )}
                  >
                    {getProficiencyLabel(language.proficiency)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(language)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit language"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveLanguage(language.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove language"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are languages */}
      {languages.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Language
        </button>
      )}

      {/* Empty state */}
      {languages.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <Languages className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No languages added yet.</p>
          <p className="text-xs mt-1">Add your first language above to get started.</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Language</DialogTitle>
          </DialogHeader>

          {editingLanguage && (
            <div className="space-y-4 py-4">
              {/* Language */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Language <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingLanguage.language}
                  onChange={(e) => handleEditInputChange("language", e.target.value)}
                  placeholder="e.g. Spanish"
                  className="h-11"
                />
              </div>

              {/* Proficiency */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Proficiency Level
                </label>
                <Select
                  value={editingLanguage.proficiency}
                  onValueChange={(value) => handleEditInputChange("proficiency", value)}
                >
                  <SelectTrigger className="h-11 w-full">
                    <SelectValue placeholder="Select Proficiency" />
                  </SelectTrigger>
                  <SelectContent>
                    {proficiencyLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={!editingLanguage?.language.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
