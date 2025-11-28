"use client";

import { TextEditor } from "@/components/dashboard/text-editor";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { cn } from "@/lib/utils";
import { HtmlContent } from "@/components/ui/html-content";
import { Edit2, Heart, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export interface Volunteer {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  currentlyVolunteering: boolean;
  description: string;
}

interface VolunteerFormProps {
  volunteers: Volunteer[];
  onVolunteersChange: (volunteers: Volunteer[]) => void;
}

const generateId = () => {
  return `vol-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyVolunteer: Omit<Volunteer, "id"> = {
  organization: "",
  role: "",
  location: "",
  startDate: "",
  endDate: "",
  currentlyVolunteering: false,
  description: "",
};

export function VolunteerForm({
  volunteers,
  onVolunteersChange,
}: VolunteerFormProps) {
  const [formData, setFormData] =
    useState<Omit<Volunteer, "id">>(emptyVolunteer);
  const [editingVolunteer, setEditingVolunteer] = useState<Volunteer | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof Omit<Volunteer, "id">,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCurrentlyVolunteeringChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      currentlyVolunteering: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleEditCurrentlyVolunteeringChange = (checked: boolean) => {
    if (!editingVolunteer) return;
    setEditingVolunteer((prev) =>
      prev
        ? {
            ...prev,
            currentlyVolunteering: checked,
            endDate: checked ? "" : prev.endDate,
          }
        : null
    );
  };

  const handleAddVolunteer = () => {
    if (!formData.organization.trim()) return;

    const newVolunteer: Volunteer = {
      id: generateId(),
      ...formData,
    };

    onVolunteersChange([...volunteers, newVolunteer]);
    setFormData(emptyVolunteer);
  };

  const handleRemoveVolunteer = (id: string) => {
    onVolunteersChange(volunteers.filter((vol) => vol.id !== id));
  };

  const handleEditClick = (volunteer: Volunteer) => {
    setEditingVolunteer(volunteer);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (
    field: keyof Omit<Volunteer, "id">,
    value: string | boolean
  ) => {
    if (!editingVolunteer) return;
    setEditingVolunteer((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveEdit = () => {
    if (!editingVolunteer) return;

    onVolunteersChange(
      volunteers.map((vol) =>
        vol.id === editingVolunteer.id ? editingVolunteer : vol
      )
    );
    setIsModalOpen(false);
    setEditingVolunteer(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVolunteer(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyVolunteer);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString;
  };

  return (
    <div className="space-y-6">
      {/* Add Volunteer Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Organization */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Organization <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            placeholder="e.g. Red Cross"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Role and Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Role / Position
            </label>
            <Input
              type="text"
              value={formData.role}
              onChange={(e) => handleInputChange("role", e.target.value)}
              placeholder="e.g. Volunteer Coordinator"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Location
            </label>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              placeholder="e.g. New York, NY"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 3: Start Date and End Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Start Date
            </label>
            <Input
              type="text"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              placeholder="e.g. Jan 2022 or 01/2022"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              End Date
            </label>
            <Input
              type="text"
              value={formData.endDate}
              onChange={(e) => handleInputChange("endDate", e.target.value)}
              disabled={formData.currentlyVolunteering}
              placeholder="e.g. Dec 2023 or 12/2023"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
            />
          </div>
        </div>

        {/* Currently Volunteering Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="currentlyVolunteering"
            checked={formData.currentlyVolunteering}
            onCheckedChange={handleCurrentlyVolunteeringChange}
          />
          <label
            htmlFor="currentlyVolunteering"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I am currently volunteering here
          </label>
        </div>

        {/* Row 4: Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Description
          </label>
          <TextEditor
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Row 5: Add Button */}
        <Button
          type="button"
          onClick={handleAddVolunteer}
          disabled={!formData.organization.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !formData.organization.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Volunteer Experience
        </Button>
      </div>

      {/* Volunteer List */}
      <DraggableList
        items={volunteers}
        onReorder={onVolunteersChange}
        title="Added Volunteer Experiences"
        renderItem={(volunteer, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-500/20 flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {volunteer.role || "Volunteer"}
                </h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                  {volunteer.organization}
                  {volunteer.location && ` • ${volunteer.location}`}
                </p>
                <p className="text-xs text-slate-500 dark:text-muted-foreground mt-1">
                  {formatDate(volunteer.startDate)} -{" "}
                  {volunteer.currentlyVolunteering
                    ? "Present"
                    : formatDate(volunteer.endDate)}
                </p>
                {volunteer.description && (
                  <HtmlContent
                    html={volunteer.description}
                    className="text-sm text-slate-500 dark:text-muted-foreground mt-2 line-clamp-2 html-content-compact"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(volunteer)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit volunteer experience"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveVolunteer(volunteer.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove volunteer experience"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are volunteers */}
      {volunteers.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Volunteer Experience
        </button>
      )}

      {/* Empty state */}
      {volunteers.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <Heart className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No volunteer experiences added yet.</p>
          <p className="text-xs mt-1">
            Add your first volunteer experience above to get started.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Volunteer Experience</DialogTitle>
          </DialogHeader>

          {editingVolunteer && (
            <div className="space-y-4 py-4">
              {/* Organization */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Organization <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingVolunteer.organization}
                  onChange={(e) =>
                    handleEditInputChange("organization", e.target.value)
                  }
                  placeholder="e.g. Red Cross"
                  className="h-11"
                />
              </div>

              {/* Role and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Role / Position
                  </label>
                  <Input
                    type="text"
                    value={editingVolunteer.role}
                    onChange={(e) =>
                      handleEditInputChange("role", e.target.value)
                    }
                    placeholder="e.g. Volunteer Coordinator"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Location
                  </label>
                  <Input
                    type="text"
                    value={editingVolunteer.location}
                    onChange={(e) =>
                      handleEditInputChange("location", e.target.value)
                    }
                    placeholder="e.g. New York, NY"
                    className="h-11"
                  />
                </div>
              </div>

              {/* Start Date and End Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Start Date
                  </label>
                  <Input
                    type="text"
                    value={editingVolunteer.startDate}
                    onChange={(e) =>
                      handleEditInputChange("startDate", e.target.value)
                    }
                    placeholder="e.g. Jan 2022 or 01/2022"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    End Date
                  </label>
                  <Input
                    type="text"
                    value={editingVolunteer.endDate}
                    onChange={(e) =>
                      handleEditInputChange("endDate", e.target.value)
                    }
                    disabled={editingVolunteer.currentlyVolunteering}
                    placeholder="e.g. Dec 2023 or 12/2023"
                    className="h-11 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Currently Volunteering Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="editCurrentlyVolunteering"
                  checked={editingVolunteer.currentlyVolunteering}
                  onCheckedChange={(checked) =>
                    handleEditCurrentlyVolunteeringChange(checked as boolean)
                  }
                />
                <label
                  htmlFor="editCurrentlyVolunteering"
                  className="text-sm font-medium leading-none"
                >
                  I am currently volunteering here
                </label>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Description
                </label>
                <TextEditor
                  value={editingVolunteer.description}
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
              disabled={!editingVolunteer?.organization.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
