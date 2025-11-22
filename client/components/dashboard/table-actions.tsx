"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Edit, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TableActionsProps {
  id: number | string;
  title: string;
  onDelete: (id: number | string) => void;
  onEdit?: (id: number | string, newTitle: string) => void;
  viewLink?: string;
}

export function TableActions({
  id,
  title,
  onDelete,
  onEdit,
  viewLink,
}: TableActionsProps) {
  const router = useRouter();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editTitle, setEditTitle] = useState(title);

  const handleView = () => {
    if (viewLink) {
      router.push(viewLink);
    }
  };

  const handleDeleteConfirm = () => {
    onDelete(id);
    setShowDeleteAlert(false);
  };

  const handleEditSave = () => {
    if (onEdit && editTitle.trim()) {
      onEdit(id, editTitle);
      setShowEditDialog(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1">
        {/* View Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleView}
          className="h-8 w-8 rounded-md bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400"
          title="View"
        >
          <Eye className="w-4 h-4" />
        </Button>

        {/* Edit Button */}
        {onEdit && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEditDialog(true)}
            className="h-8 w-8 rounded-md bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-600 dark:text-amber-400"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}

        {/* Delete Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowDeleteAlert(true)}
          className="h-8 w-8 rounded-md bg-red-50 dark:bg-red-950/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400"
          title="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title}?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              resume and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      {onEdit && (
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Resume Title</DialogTitle>
              <DialogDescription>
                Update the title of your resume
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Enter resume title"
                className="border-border"
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowEditDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
