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
import { Edit2, FolderGit2, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  liveUrl: string;
  otherUrl: string;
}

interface ProjectFormProps {
  projects: Project[];
  onProjectsChange: (projects: Project[]) => void;
}

const generateId = () => {
  return `proj-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

const emptyProject: Omit<Project, "id"> = {
  name: "",
  description: "",
  githubUrl: "",
  liveUrl: "",
  otherUrl: "",
};

export function ProjectForm({ projects, onProjectsChange }: ProjectFormProps) {
  const [formData, setFormData] = useState<Omit<Project, "id">>(emptyProject);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    field: keyof Omit<Project, "id">,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddProject = () => {
    if (!formData.name.trim()) return;

    const newProject: Project = {
      id: generateId(),
      ...formData,
    };

    onProjectsChange([...projects, newProject]);
    setFormData(emptyProject);
  };

  const handleRemoveProject = (id: string) => {
    onProjectsChange(projects.filter((proj) => proj.id !== id));
  };

  const handleEditClick = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleEditInputChange = (
    field: keyof Omit<Project, "id">,
    value: string
  ) => {
    if (!editingProject) return;
    setEditingProject((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  const handleSaveEdit = () => {
    if (!editingProject) return;

    onProjectsChange(
      projects.map((proj) =>
        proj.id === editingProject.id ? editingProject : proj
      )
    );
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleAddAnother = () => {
    setFormData(emptyProject);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      firstInputRef.current?.focus();
    }, 500);
  };

  return (
    <div className="space-y-6">
      {/* Add Project Form */}
      <div className="bg-white dark:bg-card rounded-xl border border-border p-6 space-y-5">
        {/* Row 1: Project Name */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Project Name <span className="text-red-500">*</span>
          </label>
          <Input
            ref={firstInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="e.g. E-commerce Platform"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 2: Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            Description
          </label>
          <TextEditor
            value={formData.description}
            onChange={(value) => handleInputChange("description", value)}
          />
        </div>

        {/* Row 3: GitHub URL */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
            GitHub URL
          </label>
          <Input
            type="url"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange("githubUrl", e.target.value)}
            placeholder="e.g. https://github.com/username/project"
            className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Row 4: Live URL and Other URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Live URL
            </label>
            <Input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => handleInputChange("liveUrl", e.target.value)}
              placeholder="e.g. https://myproject.com"
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
              Other URL
            </label>
            <Input
              type="url"
              value={formData.otherUrl}
              onChange={(e) => handleInputChange("otherUrl", e.target.value)}
              placeholder="e.g. Documentation, Demo video, etc."
              className="h-12 bg-white dark:bg-card border-slate-200 dark:border-border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Row 5: Add Button */}
        <Button
          type="button"
          onClick={handleAddProject}
          disabled={!formData.name.trim()}
          className={cn(
            "w-full h-11 gap-2 bg-primary hover:bg-primary/90 text-white font-medium",
            !formData.name.trim() && "opacity-50 cursor-not-allowed"
          )}
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Project List */}
      <DraggableList
        items={projects}
        onReorder={onProjectsChange}
        title="Added Projects"
        renderItem={(project, index) => (
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <DragHandleWithIndex index={index} />
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <FolderGit2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-slate-900 dark:text-foreground truncate">
                  {project.name}
                </h4>
                {project.description && (
                  <HtmlContent
                    html={project.description}
                    className="text-sm text-slate-500 dark:text-muted-foreground mt-1 line-clamp-2"
                  />
                )}
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/30"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.otherUrl && (
                    <a
                      href={project.otherUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-500/30"
                    >
                      Other
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleEditClick(project)}
                className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded transition-colors"
                title="Edit project"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemoveProject(project.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded transition-colors"
                title="Remove project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      />

      {/* Add More Button when there are projects */}
      {projects.length > 0 && (
        <button
          type="button"
          onClick={handleAddAnother}
          className="w-full py-3 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg text-slate-500 dark:text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Another Project
        </button>
      )}

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center py-8 text-slate-500 dark:text-muted-foreground">
          <FolderGit2 className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-600" />
          <p className="text-sm">No projects added yet.</p>
          <p className="text-xs mt-1">
            Add your first project above to get started.
          </p>
        </div>
      )}

      {/* Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
          </DialogHeader>

          {editingProject && (
            <div className="space-y-4 py-4">
              {/* Project Name */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Project Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  value={editingProject.name}
                  onChange={(e) =>
                    handleEditInputChange("name", e.target.value)
                  }
                  placeholder="e.g. E-commerce Platform"
                  className="h-11"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  Description
                </label>
                <TextEditor
                  value={editingProject.description}
                  onChange={(value) =>
                    handleEditInputChange("description", value)
                  }
                />
              </div>

              {/* GitHub URL */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                  GitHub URL
                </label>
                <Input
                  type="url"
                  value={editingProject.githubUrl}
                  onChange={(e) =>
                    handleEditInputChange("githubUrl", e.target.value)
                  }
                  placeholder="e.g. https://github.com/username/project"
                  className="h-11"
                />
              </div>

              {/* Live URL and Other URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Live URL
                  </label>
                  <Input
                    type="url"
                    value={editingProject.liveUrl}
                    onChange={(e) =>
                      handleEditInputChange("liveUrl", e.target.value)
                    }
                    placeholder="e.g. https://myproject.com"
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 dark:text-muted-foreground">
                    Other URL
                  </label>
                  <Input
                    type="url"
                    value={editingProject.otherUrl}
                    onChange={(e) =>
                      handleEditInputChange("otherUrl", e.target.value)
                    }
                    placeholder="e.g. Documentation, Demo video, etc."
                    className="h-11"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveEdit}
              disabled={!editingProject?.name.trim()}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
