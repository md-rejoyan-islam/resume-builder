"use client";

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
  DisclosureLetterListItem,
  useDeleteDisclosureLetterMutation,
  useDuplicateDisclosureLetterMutation,
  useListDisclosureLettersQuery,
  useSetDefaultDisclosureLetterMutation,
} from "@/lib/features/disclosure-letter/disclosure-letter-slice";
import { FileText, Plus, RefreshCw, Shield, Star } from "lucide-react";
import Link from "next/link";
import { Suspense, useCallback, useState } from "react";
import { toast } from "sonner";

// Disclosure type labels and colors
const disclosureTypeConfig: Record<
  string,
  { label: string; color: string; bgColor: string }
> = {
  criminal: {
    label: "Criminal",
    color: "text-red-700 dark:text-red-400",
    bgColor: "bg-red-100 dark:bg-red-900/30",
  },
  financial: {
    label: "Financial",
    color: "text-blue-700 dark:text-blue-400",
    bgColor: "bg-blue-100 dark:bg-blue-900/30",
  },
  medical: {
    label: "Medical",
    color: "text-green-700 dark:text-green-400",
    bgColor: "bg-green-100 dark:bg-green-900/30",
  },
  employment: {
    label: "Employment",
    color: "text-purple-700 dark:text-purple-400",
    bgColor: "bg-purple-100 dark:bg-purple-900/30",
  },
  other: {
    label: "Other",
    color: "text-slate-700 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-900/30",
  },
};

function DisclosureLettersPageContent() {
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
    data: disclosureLettersResponse,
    isLoading,
    isError,
    refetch,
  } = useListDisclosureLettersQuery({
    page,
    limit,
    sortBy: (sortBy as "title" | "updatedAt" | "createdAt") || "updatedAt",
    sortOrder: sortOrder || "desc",
    search: search || undefined,
  });

  const [deleteDisclosureLetter, { isLoading: isDeleting }] =
    useDeleteDisclosureLetterMutation();
  const [duplicateDisclosureLetter, { isLoading: isDuplicating }] =
    useDuplicateDisclosureLetterMutation();
  const [setDefaultDisclosureLetter, { isLoading: isSettingDefault }] =
    useSetDefaultDisclosureLetterMutation();

  const disclosureLetters = disclosureLettersResponse?.data || [];
  const pagination = disclosureLettersResponse?.pagination;

  // Action handlers
  const handleDelete = useCallback(
    async (id: number | string) => {
      try {
        await deleteDisclosureLetter(String(id)).unwrap();
        toast.success("Disclosure letter deleted successfully");
        refetch();
      } catch (error) {
        console.error("Failed to delete disclosure letter:", error);
        toast.error("Failed to delete disclosure letter");
      }
    },
    [deleteDisclosureLetter, refetch]
  );

  const handleDuplicate = useCallback(
    async (id: number | string) => {
      try {
        await duplicateDisclosureLetter({ id: String(id) }).unwrap();
        toast.success("Disclosure letter duplicated successfully");
        refetch();
      } catch (error) {
        console.error("Failed to duplicate disclosure letter:", error);
        toast.error("Failed to duplicate disclosure letter");
      }
    },
    [duplicateDisclosureLetter, refetch]
  );

  const handleSetDefault = useCallback(
    async (id: number | string) => {
      try {
        await setDefaultDisclosureLetter(String(id)).unwrap();
        toast.success("Default disclosure letter updated");
        refetch();
      } catch (error) {
        console.error("Failed to set default disclosure letter:", error);
        toast.error("Failed to set default disclosure letter");
      }
    },
    [setDefaultDisclosureLetter, refetch]
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
  const columns: ColumnDef<DisclosureLetterListItem>[] = [
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
            <Shield className="w-5 h-5 text-primary" />
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
              {row.disclosureType
                ? disclosureTypeConfig[row.disclosureType]?.label || "Other"
                : "Other"}{" "}
              Disclosure
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "type",
      header: "Type",
      width: "130px",
      cell: (row) => {
        const config =
          disclosureTypeConfig[row.disclosureType || "other"] ||
          disclosureTypeConfig.other;
        return (
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${config.bgColor} ${config.color}`}
          >
            {config.label}
          </span>
        );
      },
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
          detailsLink={`/disclosure-letters/${row._id}`}
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
            Failed to load disclosure letters
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
            Disclosure Letters
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and organize all your disclosure letters
            {pagination && ` (${pagination.items} total)`}
          </p>
        </div>
        <Link href="/disclosure-letters/new">
          <Button className="gap-2 shadow-sm">
            <Plus className="w-4 h-4" />
            New Disclosure Letter
          </Button>
        </Link>
      </div>

      {/* Toolbar */}
      <TableToolbar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search disclosure letters..."
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={disclosureLetters}
        isLoading={isLoading}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={toggleSort}
        emptyMessage={
          search
            ? "No disclosure letters found matching your search"
            : "No disclosure letters yet"
        }
        emptyIcon={<Shield className="w-12 h-12" />}
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
      {!isLoading && disclosureLetters.length === 0 && !search && (
        <div className="text-center py-12">
          <Link href="/disclosure-letters/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Disclosure Letter
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function DisclosureLettersPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      }
    >
      <DisclosureLettersPageContent />
    </Suspense>
  );
}
