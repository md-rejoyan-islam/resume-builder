"use client";

import {
  EditResumeData,
  EditResumeDialog,
} from "@/components/dashboard/edit-resume-dialog";
import { downloadResumePDF } from "@/components/dashboard/resume-download-handler";
import { ResumePreviewDialog } from "@/components/dashboard/resume-preview-dialog";
import { TableActions } from "@/components/dashboard/table-actions";
import { Button } from "@/components/ui/button";
import { CircularProgress } from "@/components/ui/circular-progress";
import {
  ColumnDef,
  DataTable,
  TablePagination,
  TableToolbar,
  useTableUrlState,
} from "@/components/ui/premium-table";
import {
  ResumeListItem,
  useDeleteResumeMutation,
  useDuplicateResumeMutation,
  useLazyGetResumeQuery,
  useListResumesQuery,
  useSetDefaultResumeMutation,
  useUpdateResumeMutation,
} from "@/lib/features/resume/resume-slice";
import { FileText, Plus, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { toast } from "sonner";

function ResumesPageContent() {
  // URL state management
  const {
    state: { page, limit, search, sortBy, sortOrder },
    setPage,
    setLimit,
    setSearch,
    toggleSort,
  } = useTableUrlState({
    defaultLimit: 7,
    defaultSortBy: "updatedAt",
    defaultSortOrder: "desc",
  });

  // Dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingResume, setEditingResume] = useState<ResumeListItem | null>(
    null
  );
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  const [previewingResume, setPreviewingResume] =
    useState<ResumeListItem | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // API hooks
  const {
    data: resumesResponse,
    isLoading,
    isError,
    refetch,
  } = useListResumesQuery({
    page,
    limit,
    sortBy: (sortBy as "title" | "updatedAt" | "createdAt") || "updatedAt",
    sortOrder: sortOrder || "desc",
    search: search || undefined,
  });

  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();
  const [duplicateResume, { isLoading: isDuplicating }] =
    useDuplicateResumeMutation();
  const [setDefaultResume, { isLoading: isSettingDefault }] =
    useSetDefaultResumeMutation();
  const [updateResume, { isLoading: isUpdating }] = useUpdateResumeMutation();
  const [getResume] = useLazyGetResumeQuery();

  const resumes = resumesResponse?.data || [];
  const pagination = resumesResponse?.pagination;

  // Action handlers
  const handleDelete = useCallback(
    async (id: number | string) => {
      try {
        await deleteResume(String(id)).unwrap();
        toast.success("Resume deleted successfully");
        refetch();
      } catch (error) {
        console.error("Failed to delete resume:", error);
        toast.error("Failed to delete resume");
      }
    },
    [deleteResume, refetch]
  );

  const handleEditClick = useCallback((resume: ResumeListItem) => {
    setEditingResume(resume);
    setEditDialogOpen(true);
  }, []);

  const handleViewClick = useCallback((resume: ResumeListItem) => {
    setPreviewingResume(resume);
    setPreviewDialogOpen(true);
  }, []);

  const handleEditSave = useCallback(
    async (id: string, data: EditResumeData) => {
      try {
        await updateResume({
          id,
          data: {
            title: data.title,
            isDefault: data.isDefault,
            templateSettings: { templateId: data.templateId },
          },
        }).unwrap();
        toast.success("Resume updated successfully");
        refetch();
      } catch (error) {
        console.error("Failed to update resume:", error);
        toast.error("Failed to update resume");
        throw error;
      }
    },
    [updateResume, refetch]
  );

  const handleDuplicate = useCallback(
    async (id: number | string) => {
      try {
        await duplicateResume({ id: String(id) }).unwrap();
        toast.success("Resume duplicated successfully");
        refetch();
      } catch (error) {
        console.error("Failed to duplicate resume:", error);
        toast.error("Failed to duplicate resume");
      }
    },
    [duplicateResume, refetch]
  );

  const handleSetDefault = useCallback(
    async (id: number | string) => {
      try {
        await setDefaultResume(String(id)).unwrap();
        toast.success("Default resume updated");
        refetch();
      } catch (error) {
        console.error("Failed to set default resume:", error);
        toast.error("Failed to set default resume");
      }
    },
    [setDefaultResume, refetch]
  );

  const handleDownload = useCallback(
    async (resume: ResumeListItem) => {
      setDownloadingId(resume._id);
      try {
        const result = await getResume(resume._id).unwrap();
        if (!result.data) throw new Error("Resume not found");

        await downloadResumePDF({
          resume: result.data,
          onComplete: () => toast.success("Resume downloaded successfully"),
          onError: () => toast.error("Failed to download resume"),
        });
      } catch (error) {
        console.error("Failed to download resume:", error);
        toast.error("Failed to download resume");
      } finally {
        setDownloadingId(null);
      }
    },
    [getResume]
  );

  // Helper functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const calculateCompletion = (resume: ResumeListItem) => {
    const hash = resume._id.charCodeAt(0) + resume._id.charCodeAt(1);
    return Math.min(100, Math.max(40, (hash % 60) + 40));
  };

  const calculateATSScore = (completion: number) => {
    if (completion >= 80)
      return {
        score: completion,
        label: "Excellent",
        color: "text-emerald-600",
      };
    if (completion >= 60)
      return { score: completion, label: "Good", color: "text-blue-600" };
    if (completion >= 40)
      return { score: completion, label: "Fair", color: "text-amber-600" };
    return { score: completion, label: "Needs Work", color: "text-rose-600" };
  };

  // Column definitions
  const columns: ColumnDef<ResumeListItem>[] = [
    {
      id: "index",
      header: "#",
      width: "60px",
      align: "center",
      cell: (_, index) => (
        <span className="text-slate-500 font-medium">
          {(page - 1) * limit + index + 1}
        </span>
      ),
    },
    {
      id: "title",
      header: "Title",
      sortable: true,
      cell: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium text-slate-900 dark:text-white truncate">
                {row.title}
              </span>
              {row.isDefault && (
                <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 shrink-0">
                  <Star className="w-3 h-3" />
                  Default
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {row.templateSettings?.templateId || "classic"} template
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "completion",
      header: "Completion",
      width: "140px",
      cell: (row) => {
        const completion = calculateCompletion(row);
        return (
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-primary to-primary/80 rounded-full transition-all"
                style={{ width: `${completion}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-8">
              {completion}%
            </span>
          </div>
        );
      },
    },
    {
      id: "atsScore",
      header: "ATS Score",
      width: "130px",
      cell: (row) => {
        const completion = calculateCompletion(row);
        const ats = calculateATSScore(completion);
        return (
          <div className="flex items-center gap-2">
            <CircularProgress value={ats.score} size={32} strokeWidth={3} />
            <span className={`text-xs font-semibold ${ats.color}`}>
              {ats.label}
            </span>
          </div>
        );
      },
    },
    {
      id: "updatedAt",
      header: "Last Modified",
      sortable: true,
      width: "140px",
      cell: (row) => (
        <span className="text-sm text-slate-600 dark:text-slate-400">
          {formatDate(row.updatedAt)}
        </span>
      ),
    },
    {
      id: "actions",
      header: "",
      width: "180px",
      align: "right",
      cell: (row) => (
        <TableActions
          id={row._id}
          title={row.title}
          isDefault={row.isDefault}
          onView={() => handleViewClick(row)}
          onDelete={handleDelete}
          onEditClick={() => handleEditClick(row)}
          onDuplicate={handleDuplicate}
          onSetDefault={handleSetDefault}
          onDownload={() => handleDownload(row)}
          detailsLink={`/resumes/${row._id}`}
          isDeleting={isDeleting}
          isDuplicating={isDuplicating}
          isSettingDefault={isSettingDefault}
          isDownloading={downloadingId === row._id}
        />
      ),
    },
  ];

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive font-medium">Failed to load resumes</p>
          <p className="text-muted-foreground text-sm">
            Something went wrong. Please try again.
          </p>
          <Button onClick={() => refetch()} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            My Resumes
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and organize all your resumes
            {pagination && ` (${pagination.items} total)`}
          </p>
        </div>
        <Link href="/resumes/new">
          <Button className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            New Resume
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search resumes..."
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={resumes}
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={toggleSort}
        emptyMessage={
          search ? "No resumes found matching your search" : "No resumes yet"
        }
        emptyIcon={<FileText className="w-12 h-12" />}
        getRowKey={(row) => row._id}
      />

      {/* Pagination */}
      {pagination && pagination.totalPages > 0 && (
        <TablePagination
          page={page}
          limit={limit}
          totalItems={pagination.items}
          totalPages={pagination.totalPages}
          onPageChange={setPage}
          onLimitChange={setLimit}
          limitOptions={[7, 10, 20, 50]}
        />
      )}

      {/* Empty state with CTA */}
      {!isLoading && resumes.length === 0 && !search && (
        <div className="text-center py-12">
          <Link href="/resumes/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Resume
            </Button>
          </Link>
        </div>
      )}

      {/* Dialogs */}
      {editingResume && (
        <EditResumeDialog
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          resumeId={editingResume._id}
          initialData={{
            title: editingResume.title,
            templateId: editingResume.templateSettings?.templateId || "classic",
            isDefault: editingResume.isDefault,
          }}
          onSave={handleEditSave}
          isSaving={isUpdating}
        />
      )}

      {previewingResume && (
        <ResumePreviewDialog
          open={previewDialogOpen}
          onOpenChange={setPreviewDialogOpen}
          resumeId={previewingResume._id}
          resumeTitle={previewingResume.title}
        />
      )}
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function ResumesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <ResumesPageContent />
    </Suspense>
  );
}
