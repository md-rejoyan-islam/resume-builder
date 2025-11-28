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
import { HtmlContent } from "@/components/ui/html-content";
import { Input } from "@/components/ui/input";
import { TextEditor } from "@/components/dashboard/text-editor";
import { cn } from "@/lib/utils";
import { BookOpen, Edit2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export interface Publication {
  id: string;
  title: string;
  publisher: string;
  authors: string;
  publicationDate: string;
  url: string;
  description: string;
}

interface PublicationFormProps {
  publications: Publication[];
  onPublicationsChange: (publications: Publication[]) => void;
}

const generateId = () => {
  return `pub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyPublication: Omit<Publication, "id"> = {
  title: "",
  publisher: "",
  authors: "",
  publicationDate: "",
  url: "",
  description: "",
};

export function PublicationForm({
  publications,
  onPublicationsChange,
}: PublicationFormProps) {
  const [formData, setFormData] = useState<Omit<Publication, "id">>(emptyPublication);
  const [editingPublication, setEditingPublication] = useState<Publication | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof Omit<Publication, "id">, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddPublication = () => {
    if (!formData.title.trim()) return;

    const newPublication: Publication = {
      id: generateId(),
      ...formData,
    };

    onPublicationsChange([...publications, newPublication]);
    setFormData(emptyPublication);
  };

  const handleRemovePublication = (id: string) => {
    onPublicationsChange(publications.filter((pub) => pub.id !== id));
  };

  const handleEditClick = (publication: Publication) => {
    setEditingPublication(publication);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (field: keyof Omit<Publication, "id">, value: string) => {
    if (!editingPublication) return;
    setEditingPublication((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveEdit = () => {
    if (!editingPublication) return;

    onPublicationsChange(
      publications.map((pub) => (pub.id === editingPublication.id ? editingPublication : pub))
    );
    setIsModalOpen(false);
    setEditingPublication(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPublication(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyPublication);
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
      {/* Add Publication Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Title */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Title <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g. Machine Learning in Healthcare: A Comprehensive Review"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Publisher and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Publisher / Journal
            </label>
            <Input
              type="text"
              value={formData.publisher}
              onChange={(e) => handleInputChange("publisher", e.target.value)}
              placeholder="e.g. IEEE, Nature, Medium"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Publication Date
            </label>
            <Input
              type="text"
              value={formData.publicationDate}
              onChange={(e) => handleInputChange("publicationDate", e.target.value)}
              placeholder="e.g. Jun 2023 or 06/2023"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 3: Authors */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Authors
          </label>
          <Input
            type="text"
            value={formData.authors}
            onChange={(e) => handleInputChange("authors", e.target.value)}
            placeholder="e.g. John Doe, Jane Smith, et al."
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 4: URL */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            URL / DOI
          </label>
          <Input
            type="url"
            value={formData.url}
            onChange={(e) => handleInputChange("url", e.target.value)}
            placeholder="e.g. https://doi.org/10.1000/xyz123"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 5: Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Description / Abstract
          </label>
          <TextEditor
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Row 6: Add Button */}
        <Button
          type="button"
          onClick={handleAddPublication}
          disabled={!formData.title.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !formData.title.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Publication
        </Button>
      </div>

      {/* Publication List */}
      <DraggableList
        items={publications}
        onReorder={onPublicationsChange}
        title="Added Publications"
        renderItem={(publication, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {publication.title}
                </h4>
                <p className="text-sm text-slate-600 dark:text-muted-foreground truncate">
                  {publication.publisher && `${publication.publisher}`}
                  {publication.publicationDate && ` • ${formatDate(publication.publicationDate)}`}
                </p>
                {publication.authors && (
                  <p className="text-xs text-slate-500 dark:text-muted-foreground mt-1 truncate">
                    By: {publication.authors}
                  </p>
                )}
                {publication.description && (
                  <HtmlContent
                    html={publication.description}
                    className="text-sm text-slate-500 dark:text-muted-foreground mt-2 line-clamp-2"
                  />
                )}
                {publication.url && (
                  <a
                    href={publication.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 py-0.5 mt-2 rounded text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30"
                  >
                    View Publication
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(publication)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit publication"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemovePublication(publication.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove publication"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are publications */}
      {publications.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Publication
        </button>
      )}

      {/* Empty state */}
      {publications.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <BookOpen className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No publications added yet.</p>
          <p className="text-xs mt-1">Add your first publication above to get started.</p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Publication</DialogTitle>
          </DialogHeader>

          {editingPublication && (
            <div className="space-y-4 py-4">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Title <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingPublication.title}
                  onChange={(e) => handleEditInputChange("title", e.target.value)}
                  placeholder="e.g. Machine Learning in Healthcare"
                  className="h-11"
                />
              </div>

              {/* Publisher and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Publisher / Journal
                  </label>
                  <Input
                    type="text"
                    value={editingPublication.publisher}
                    onChange={(e) => handleEditInputChange("publisher", e.target.value)}
                    placeholder="e.g. IEEE, Nature, Medium"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Publication Date
                  </label>
                  <Input
                    type="text"
                    value={editingPublication.publicationDate}
                    onChange={(e) => handleEditInputChange("publicationDate", e.target.value)}
                    placeholder="e.g. Jun 2023 or 06/2023"
                    className="h-11"
                  />
                </div>
              </div>

              {/* Authors */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Authors
                </label>
                <Input
                  type="text"
                  value={editingPublication.authors}
                  onChange={(e) => handleEditInputChange("authors", e.target.value)}
                  placeholder="e.g. John Doe, Jane Smith, et al."
                  className="h-11"
                />
              </div>

              {/* URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  URL / DOI
                </label>
                <Input
                  type="url"
                  value={editingPublication.url}
                  onChange={(e) => handleEditInputChange("url", e.target.value)}
                  placeholder="e.g. https://doi.org/10.1000/xyz123"
                  className="h-11"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Description / Abstract
                </label>
                <TextEditor
                  value={editingPublication.description}
                  onChange={(value) => handleEditInputChange("description", value)}
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
              disabled={!editingPublication?.title.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
