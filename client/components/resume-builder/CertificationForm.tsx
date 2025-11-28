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
import { TextEditor } from "@/components/dashboard/text-editor";
import { cn } from "@/lib/utils";
import { HtmlContent } from "@/components/ui/html-content";
import { Award, Edit2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expirationDate: string;
  noExpiration: boolean;
  credentialId: string;
  credentialUrl: string;
  description: string;
}

interface CertificationFormProps {
  certifications: Certification[];
  onCertificationsChange: (certifications: Certification[]) => void;
}

const generateId = () => {
  return `cert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyCertification: Omit<Certification, "id"> = {
  name: "",
  issuer: "",
  issueDate: "",
  expirationDate: "",
  noExpiration: false,
  credentialId: "",
  credentialUrl: "",
  description: "",
};

export function CertificationForm({
  certifications,
  onCertificationsChange,
}: CertificationFormProps) {
  const [formData, setFormData] =
    useState<Omit<Certification, "id">>(emptyCertification);
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof Omit<Certification, "id">,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNoExpirationChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      noExpiration: checked,
      expirationDate: checked ? "" : prev.expirationDate,
    }));
  };

  const handleAddCertification = () => {
    if (!formData.name.trim() || !formData.issuer.trim()) return;

    const newCertification: Certification = {
      id: generateId(),
      ...formData,
    };

    onCertificationsChange([...certifications, newCertification]);
    setFormData(emptyCertification);
  };

  const handleRemoveCertification = (id: string) => {
    onCertificationsChange(certifications.filter((cert) => cert.id !== id));
  };

  const handleEditClick = (certification: Certification) => {
    setEditingCertification(certification);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (
    field: keyof Omit<Certification, "id">,
    value: string | boolean
  ) => {
    if (!editingCertification) return;
    setEditingCertification((prev) =>
      prev ? { ...prev, [field]: value } : null
    );
  };

  const handleEditNoExpirationChange = (checked: boolean) => {
    if (!editingCertification) return;
    setEditingCertification((prev) =>
      prev
        ? {
            ...prev,
            noExpiration: checked,
            expirationDate: checked ? "" : prev.expirationDate,
          }
        : null
    );
  };

  const handleSaveEdit = () => {
    if (!editingCertification) return;

    onCertificationsChange(
      certifications.map((cert) =>
        cert.id === editingCertification.id ? editingCertification : cert
      )
    );
    setIsModalOpen(false);
    setEditingCertification(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCertification(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyCertification);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Add Certification Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Certification Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Certification / Achievement Name{" "}
            <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g. AWS Certified Solutions Architect"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Issuing Organization */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Issuing Organization <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            value={formData.issuer}
            onChange={(e) => handleInputChange("issuer", e.target.value)}
            placeholder="e.g. Amazon Web Services"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 3: Issue Date and Expiration Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Issue Date
            </label>
            <Input
              type="date"
              value={formData.issueDate}
              onChange={(e) => handleInputChange("issueDate", e.target.value)}
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Expiration Date
            </label>
            <Input
              type="date"
              value={formData.expirationDate}
              onChange={(e) =>
                handleInputChange("expirationDate", e.target.value)
              }
              disabled={formData.noExpiration}
              className={cn(
                "h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all",
                formData.noExpiration &&
                  "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
              )}
            />
          </div>
        </div>

        {/* Row 4: No Expiration Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="noExpiration"
            checked={formData.noExpiration}
            onChange={(e) => handleNoExpirationChange(e.target.checked)}
            className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
          />
          <label
            htmlFor="noExpiration"
            className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
          >
            This credential does not expire
          </label>
        </div>

        {/* Row 5: Credential ID and URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Credential ID
            </label>
            <Input
              type="text"
              value={formData.credentialId}
              onChange={(e) =>
                handleInputChange("credentialId", e.target.value)
              }
              placeholder="e.g. ABC123XYZ"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Credential URL
            </label>
            <Input
              type="url"
              value={formData.credentialUrl}
              onChange={(e) =>
                handleInputChange("credentialUrl", e.target.value)
              }
              placeholder="e.g. https://www.credential.net/..."
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 6: Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Description
          </label>
          <TextEditor
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Row 7: Add Button */}
        <Button
          type="button"
          onClick={handleAddCertification}
          disabled={!formData.name.trim() || !formData.issuer.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            (!formData.name.trim() || !formData.issuer.trim()) &&
              "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </Button>
      </div>

      {/* Certification List */}
      <DraggableList
        items={certifications}
        onReorder={onCertificationsChange}
        title="Added Certifications"
        renderItem={(certification, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {certification.name}
                </h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                  {certification.issuer}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  {certification.issueDate && (
                    <span className="text-xs text-slate-500 dark:text-muted-foreground">
                      Issued:{" "}
                      {new Date(certification.issueDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </span>
                  )}
                  {certification.noExpiration ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400">
                      No Expiration
                    </span>
                  ) : (
                    certification.expirationDate && (
                      <span className="text-xs text-slate-500 dark:text-muted-foreground">
                        Expires:{" "}
                        {new Date(
                          certification.expirationDate
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )
                  )}
                </div>
                {certification.description && (
                  <HtmlContent
                    html={certification.description}
                    className="text-sm text-slate-500 dark:text-muted-foreground mt-2 line-clamp-2 html-content-compact"
                  />
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(certification)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit certification"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveCertification(certification.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove certification"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are certifications */}
      {certifications.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Certification
        </button>
      )}

      {/* Empty state */}
      {certifications.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <Award className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No certifications added yet.</p>
          <p className="text-xs mt-1">
            Add your first certification above to get started.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Certification</DialogTitle>
          </DialogHeader>

          {editingCertification && (
            <div className="space-y-4 py-4">
              {/* Certification Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Certification / Achievement Name{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingCertification.name}
                  onChange={(e) =>
                    handleEditInputChange("name", e.target.value)
                  }
                  placeholder="e.g. AWS Certified Solutions Architect"
                  className="h-11"
                />
              </div>

              {/* Issuing Organization */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Issuing Organization <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingCertification.issuer}
                  onChange={(e) =>
                    handleEditInputChange("issuer", e.target.value)
                  }
                  placeholder="e.g. Amazon Web Services"
                  className="h-11"
                />
              </div>

              {/* Issue Date and Expiration Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Issue Date
                  </label>
                  <Input
                    type="date"
                    value={editingCertification.issueDate}
                    onChange={(e) =>
                      handleEditInputChange("issueDate", e.target.value)
                    }
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Expiration Date
                  </label>
                  <Input
                    type="date"
                    value={editingCertification.expirationDate}
                    onChange={(e) =>
                      handleEditInputChange("expirationDate", e.target.value)
                    }
                    disabled={editingCertification.noExpiration}
                    className={cn(
                      "h-11",
                      editingCertification.noExpiration &&
                        "opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-800"
                    )}
                  />
                </div>
              </div>

              {/* No Expiration Checkbox */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="editNoExpiration"
                  checked={editingCertification.noExpiration}
                  onChange={(e) =>
                    handleEditNoExpirationChange(e.target.checked)
                  }
                  className="w-4 h-4 text-primary border-slate-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="editNoExpiration"
                  className="text-sm text-slate-700 dark:text-muted-foreground cursor-pointer"
                >
                  This credential does not expire
                </label>
              </div>

              {/* Credential ID and URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Credential ID
                  </label>
                  <Input
                    type="text"
                    value={editingCertification.credentialId}
                    onChange={(e) =>
                      handleEditInputChange("credentialId", e.target.value)
                    }
                    placeholder="e.g. ABC123XYZ"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Credential URL
                  </label>
                  <Input
                    type="url"
                    value={editingCertification.credentialUrl}
                    onChange={(e) =>
                      handleEditInputChange("credentialUrl", e.target.value)
                    }
                    placeholder="e.g. https://www.credential.net/..."
                    className="h-11"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Description
                </label>
                <TextEditor
                  value={editingCertification.description}
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
                !editingCertification?.name.trim() ||
                !editingCertification?.issuer.trim()
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
