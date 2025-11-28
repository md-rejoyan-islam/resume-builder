"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { getTemplateList } from "@/components/resume-builder/templates";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export interface EditResumeData {
  title: string;
  templateId: string;
  isDefault: boolean;
}

interface EditResumeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  resumeId: string;
  initialData: EditResumeData;
  onSave: (id: string, data: EditResumeData) => Promise<void>;
  isSaving?: boolean;
}

export function EditResumeDialog({
  open,
  onOpenChange,
  resumeId,
  initialData,
  onSave,
  isSaving = false,
}: EditResumeDialogProps) {
  const [formData, setFormData] = useState<EditResumeData>(initialData);
  const templates = getTemplateList();

  // Reset form when dialog opens with new data
  useEffect(() => {
    if (open) {
      setFormData(initialData);
    }
  }, [open, initialData]);

  const handleSave = async () => {
    if (!formData.title.trim()) return;
    await onSave(resumeId, formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Resume</DialogTitle>
          <DialogDescription>
            Update your resume settings. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Resume Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="Enter resume title"
              className="border-border"
            />
          </div>

          {/* Template */}
          <div className="space-y-2">
            <Label htmlFor="template">Template</Label>
            <Select
              value={formData.templateId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, templateId: value }))
              }
            >
              <SelectTrigger id="template" className="w-full">
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Set as Default */}
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div className="space-y-0.5">
              <Label htmlFor="default" className="text-sm font-medium">
                Set as Default
              </Label>
              <p className="text-xs text-muted-foreground">
                Make this your primary resume
              </p>
            </div>
            <Switch
              id="default"
              checked={formData.isDefault}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, isDefault: checked }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !formData.title.trim()}>
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
