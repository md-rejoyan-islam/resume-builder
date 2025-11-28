"use client";

import { TableActions } from "@/components/dashboard/table-actions";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  DataTable,
  TablePagination,
  TableToolbar,
  useTableUrlState,
} from "@/components/ui/premium-table";
import {
  CoverLetterListItem,
  useDeleteCoverLetterMutation,
  useDuplicateCoverLetterMutation,
  useListCoverLettersQuery,
  useSetDefaultCoverLetterMutation,
} from "@/lib/features/cover-letter/cover-letter-slice";
import { FileText, Plus, RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback } from "react";
import { toast } from "sonner";

function CoverLettersPageContent() {
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

  // API hooks
  const {
    data: coverLettersResponse,
    isLoading,
    isError,
    refetch,
  } = useListCoverLettersQuery({
    page,
    limit,
    sortBy: (sortBy as "title" | "updatedAt" | "createdAt") || "updatedAt",
    sortOrder: sortOrder || "desc",
    search: search || undefined,
  });

  const [deleteCoverLetter, { isLoading: isDeleting }] =
    useDeleteCoverLetterMutation();
  const [duplicateCoverLetter, { isLoading: isDuplicating }] =
    useDuplicateCoverLetterMutation();
  const [setDefaultCoverLetter, { isLoading: isSettingDefault }] =
    useSetDefaultCoverLetterMutation();

  const coverLetters = coverLettersResponse?.data || [];
  const pagination = coverLettersResponse?.pagination;

  // Action handlers
  const handleDelete = useCallback(
    async (id: number | string) => {
      try {
        await deleteCoverLetter(String(id)).unwrap();
        toast.success("Cover letter deleted successfully");
        refetch();
      } catch (error) {
        console.error("Failed to delete cover letter:", error);
        toast.error("Failed to delete cover letter");
      }
    },
    [deleteCoverLetter, refetch]
  );

  const handleDuplicate = useCallback(
    async (id: number | string) => {
      try {
        await duplicateCoverLetter({ id: String(id) }).unwrap();
        toast.success("Cover letter duplicated successfully");
        refetch();
      } catch (error) {
        console.error("Failed to duplicate cover letter:", error);
        toast.error("Failed to duplicate cover letter");
      }
    },
    [duplicateCoverLetter, refetch]
  );

  const handleSetDefault = useCallback(
    async (id: number | string) => {
      try {
        await setDefaultCoverLetter(String(id)).unwrap();
        toast.success("Default cover letter updated");
        refetch();
      } catch (error) {
        console.error("Failed to set default cover letter:", error);
        toast.error("Failed to set default cover letter");
      }
    },
    [setDefaultCoverLetter, refetch]
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

  // Column definitions
  const columns: ColumnDef<CoverLetterListItem>[] = [
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
          </div>
        </div>
      ),
    },
    {
      id: "status",
      header: "Status",
      width: "120px",
      cell: (row) => (
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${
            row.status === "completed"
              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
          }`}
        >
          {row.status === "completed" ? "Completed" : "Draft"}
        </span>
      ),
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
          onDelete={handleDelete}
          onDuplicate={handleDuplicate}
          onSetDefault={handleSetDefault}
          detailsLink={`/cover-letters/${row._id}`}
          isDeleting={isDeleting}
          isDuplicating={isDuplicating}
          isSettingDefault={isSettingDefault}
        />
      ),
    },
  ];

  // Error state
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-destructive font-medium">
            Failed to load cover letters
          </p>
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
            My Cover Letters
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and organize all your cover letters
            {pagination && ` (${pagination.items} total)`}
          </p>
        </div>
        <Link href="/cover-letters/new">
          <Button className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            New Cover Letter
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search cover letters..."
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={coverLetters}
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={toggleSort}
        emptyMessage={
          search
            ? "No cover letters found matching your search"
            : "No cover letters yet"
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
      {!isLoading && coverLetters.length === 0 && !search && (
        <div className="text-center py-12">
          <Link href="/cover-letters/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Cover Letter
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function CoverLettersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <CoverLettersPageContent />
    </Suspense>
  );
}
