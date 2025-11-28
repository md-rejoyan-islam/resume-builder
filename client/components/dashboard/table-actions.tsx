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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Copy,
  Download,
  Edit,
  ExternalLink,
  Eye,
  MoreHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TableActionsProps {
  id: number | string;
  title: string;
  isDefault?: boolean;
  onDelete: (id: number | string) => void;
  onEditClick?: () => void;
  onDuplicate?: (id: number | string) => void;
  onSetDefault?: (id: number | string) => void;
  onView?: () => void;
  onDownload?: () => void;
  detailsLink?: string; // Link to details/edit page
  isDeleting?: boolean;
  isDuplicating?: boolean;
  isSettingDefault?: boolean;
  isDownloading?: boolean;
}

export function TableActions({
  id,
  title,
  isDefault = false,
  onDelete,
  onEditClick,
  onDuplicate,
  onSetDefault,
  onView,
  onDownload,
  detailsLink,
  isDeleting = false,
  isDuplicating = false,
  isSettingDefault = false,
  isDownloading = false,
}: TableActionsProps) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const handleDeleteConfirm = () => {
    onDelete(id);
    setShowDeleteAlert(false);
  };

  const handleDuplicate = () => {
    if (onDuplicate) {
      onDuplicate(id);
    }
  };

  const handleSetDefault = () => {
    if (onSetDefault && !isDefault) {
      onSetDefault(id);
    }
  };

  // Check if we have any dropdown items
  const hasDropdownItems = onDownload || onDuplicate || (onSetDefault && !isDefault);

  return (
    <>
      <div className="flex items-center gap-1">
        {/* View Button - Primary action */}
        {onView && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onView}
            className="h-8 w-8 rounded-md text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </Button>
        )}

        {/* Edit Button - Primary action */}
        {onEditClick && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onEditClick}
            className="h-8 w-8 rounded-md text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 dark:hover:text-amber-400 transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </Button>
        )}

        {/* Open Details Button - Link to builder page */}
        {detailsLink && (
          <Link href={detailsLink}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 dark:hover:text-emerald-400 transition-colors"
              title="Open"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        )}

        {/* More Actions Dropdown - Duplicate, Set Default, Delete */}
        {hasDropdownItems && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition-colors"
                title="More options"
              >
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onDownload && (
                <DropdownMenuItem
                  onClick={onDownload}
                  disabled={isDownloading}
                >
                  <Download className="w-4 h-4 mr-2" />
                  {isDownloading ? "Downloading..." : "Download"}
                </DropdownMenuItem>
              )}
              {onDuplicate && (
                <DropdownMenuItem
                  onClick={handleDuplicate}
                  disabled={isDuplicating}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {isDuplicating ? "Duplicating..." : "Duplicate"}
                </DropdownMenuItem>
              )}
              {onSetDefault && !isDefault && (
                <>
                  {(onDownload || onDuplicate) && <DropdownMenuSeparator />}
                  <DropdownMenuItem
                    onClick={handleSetDefault}
                    disabled={isSettingDefault}
                  >
                    <Star className="w-4 h-4 mr-2" />
                    {isSettingDefault ? "Setting..." : "Set as Default"}
                  </DropdownMenuItem>
                </>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowDeleteAlert(true)}
                disabled={isDeleting}
                className="text-rose-600 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-950/30"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* If no dropdown items, show delete as standalone button */}
        {!hasDropdownItems && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDeleteAlert(true)}
            disabled={isDeleting}
            className="h-8 w-8 rounded-md text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 dark:hover:text-rose-400 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
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
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
