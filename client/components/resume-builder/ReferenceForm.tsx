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
import { cn } from "@/lib/utils";
import type { Reference } from "@/lib/resume-format";
import { Edit2, Plus, Trash2, UserCheck } from "lucide-react";
import { useRef, useState } from "react";

interface ReferenceFormProps {
  references: Reference[];
  onReferencesChange: (references: Reference[]) => void;
}

const generateId = () => {
  return `ref-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyReference: Omit<Reference, "id"> = {
  name: "",
  company: "",
  position: "",
  email: "",
  phone: "",
  relationship: "",
};

export function ReferenceForm({
  references,
  onReferencesChange,
}: ReferenceFormProps) {
  const [formData, setFormData] = useState<Omit<Reference, "id">>(emptyReference);
  const [editingReference, setEditingReference] = useState<Reference | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Omit<Reference, "id">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddReference = () => {
    if (!formData.name.trim()) return;

    const newReference: Reference = {
      id: generateId(),
      ...formData,
    };

    onReferencesChange([...references, newReference]);
    setFormData(emptyReference);
  };

  const handleRemoveReference = (id: string) => {
    onReferencesChange(references.filter((ref) => ref.id !== id));
  };

  const handleEditClick = (reference: Reference) => {
    setEditingReference(reference);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (field: keyof Omit<Reference, "id">, value: string) => {
    if (!editingReference) return;
    setEditingReference((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveEdit = () => {
    if (!editingReference) return;

    onReferencesChange(
      references.map((ref) => (ref.id === editingReference.id ? editingReference : ref))
    );
    setIsModalOpen(false);
    setEditingReference(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReference(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyReference);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Add Reference Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Reference Name <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g. Jane Doe"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Company and Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Company
            </label>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="e.g. Tech Corp"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Position
            </label>
            <Input
              type="text"
              value={formData.position}
              onChange={(e) => handleInputChange("position", e.target.value)}
              placeholder="e.g. Senior Manager"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 3: Email and Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="e.g. jane@example.com"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Phone
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="e.g. +1 234 567 890"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 4: Relationship */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Relationship
          </label>
          <Input
            type="text"
            value={formData.relationship}
            onChange={(e) => handleInputChange("relationship", e.target.value)}
            placeholder="e.g. Former Manager, Colleague, etc."
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 5: Add Button */}
        <Button
          type="button"
          onClick={handleAddReference}
          disabled={!formData.name.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !formData.name.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Reference
        </Button>
      </div>

      {/* Reference List */}
      <DraggableList
        items={references}
        onReorder={onReferencesChange}
        title="Added References"
        renderItem={(reference, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <UserCheck className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {reference.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                  {reference.position && reference.company
                    ? `${reference.position} at ${reference.company}`
                    : reference.position || reference.company}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {reference.email && (
                    <span className="text-xs text-slate-500 dark:text-muted-foreground">
                      {reference.email}
                    </span>
                  )}
                  {reference.phone && (
                    <span className="text-xs text-slate-500 dark:text-muted-foreground">
                      • {reference.phone}
                    </span>
                  )}
                </div>
                {reference.relationship && (
                  <span className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    {reference.relationship}
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(reference)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit reference"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveReference(reference.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove reference"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are references */}
      {references.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Reference
        </button>
      )}

      {/* Empty state */}
      {references.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <UserCheck className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No references added yet.</p>
          <p className="text-xs mt-1">Add your first reference above to get started.</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Reference</DialogTitle>
          </DialogHeader>

          {editingReference && (
            <div className="space-y-4 py-4">
              {/* Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Reference Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingReference.name}
                  onChange={(e) => handleEditInputChange("name", e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="h-11"
                />
              </div>

              {/* Company and Position */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Company
                  </label>
                  <Input
                    type="text"
                    value={editingReference.company}
                    onChange={(e) => handleEditInputChange("company", e.target.value)}
                    placeholder="e.g. Tech Corp"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Position
                  </label>
                  <Input
                    type="text"
                    value={editingReference.position}
                    onChange={(e) => handleEditInputChange("position", e.target.value)}
                    placeholder="e.g. Senior Manager"
                    className="h-11"
                  />
                </div>
              </div>

              {/* Email and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={editingReference.email}
                    onChange={(e) => handleEditInputChange("email", e.target.value)}
                    placeholder="e.g. jane@example.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    value={editingReference.phone}
                    onChange={(e) => handleEditInputChange("phone", e.target.value)}
                    placeholder="e.g. +1 234 567 890"
                    className="h-11"
                  />
                </div>
              </div>

              {/* Relationship */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Relationship
                </label>
                <Input
                  type="text"
                  value={editingReference.relationship}
                  onChange={(e) => handleEditInputChange("relationship", e.target.value)}
                  placeholder="e.g. Former Manager, Colleague, etc."
                  className="h-11"
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
              disabled={!editingReference?.name.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
