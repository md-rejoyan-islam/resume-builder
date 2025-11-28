"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { ColumnDef, DataTableProps, SortDirection } from "./types";

// Reusable sort icon component
function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc") {
    return <ArrowUp className="w-3.5 h-3.5" />;
  }
  if (direction === "desc") {
    return <ArrowDown className="w-3.5 h-3.5" />;
  }
  return <ArrowUpDown className="w-3.5 h-3.5 opacity-50" />;
}

// Header cell component
function HeaderCell<T>({
  column,
  sortBy,
  sortOrder,
  onSort,
}: {
  column: ColumnDef<T>;
  sortBy?: string | null;
  sortOrder?: SortDirection;
  onSort?: (columnId: string) => void;
}) {
  const isSorted = sortBy === column.id;
  const alignClass = {
    left: "justify-start text-left",
    center: "justify-center text-center",
    right: "justify-end text-right",
  };

  return (
    <th
      className={cn(
        "px-4 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider whitespace-nowrap",
        column.sortable &&
          "cursor-pointer select-none hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
      )}
      style={{ width: column.width }}
      onClick={column.sortable ? () => onSort?.(column.id) : undefined}
    >
      <div
        className={cn(
          "flex items-center gap-1.5",
          alignClass[column.align || "left"]
        )}
      >
        <span>{column.header}</span>
        {column.sortable && (
          <SortIcon direction={isSorted ? sortOrder || null : null} />
        )}
      </div>
    </th>
  );
}

// Data cell component
function DataCell<T>({
  column,
  row,
  rowIndex,
}: {
  column: ColumnDef<T>;
  row: T;
  rowIndex: number;
}) {
  const alignClass = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  const content = column.cell
    ? column.cell(row, rowIndex)
    : column.accessorKey
      ? String((row as Record<string, unknown>)[column.accessorKey as string] ?? "")
      : null;

  return (
    <td
      className={cn(
        "px-4 py-3 text-sm text-slate-700 dark:text-slate-300",
        alignClass[column.align || "left"]
      )}
      style={{ width: column.width }}
    >
      {content}
    </td>
  );
}

// Loading skeleton row
function SkeletonRow<T>({ columns }: { columns: ColumnDef<T>[] }) {
  return (
    <tr>
      {columns.map((column, idx) => (
        <td key={`skeleton-${idx}`} className="px-4 py-3">
          <Skeleton className="h-5 w-full max-w-[200px]" />
        </td>
      ))}
    </tr>
  );
}

// Empty state row
function EmptyRow<T>({
  columns,
  message,
  icon,
}: {
  columns: ColumnDef<T>[];
  message: string;
  icon?: React.ReactNode;
}) {
  return (
    <tr>
      <td colSpan={columns.length} className="px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-3">
          {icon && (
            <div className="text-slate-300 dark:text-slate-600">{icon}</div>
          )}
          <p className="text-slate-500 dark:text-slate-400">{message}</p>
        </div>
      </td>
    </tr>
  );
}

// Main DataTable component
export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = "No data available",
  emptyIcon,
  getRowKey,
  rowClassName,
  className,
}: DataTableProps<T>) {
  const skeletonRows = 5;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900",
        className
      )}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <tr>
              {columns.map((column) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  sortBy={sortBy}
                  sortOrder={sortOrder}
                  onSort={onSort}
                />
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {/* Loading State */}
            {isLoading &&
              Array.from({ length: skeletonRows }).map((_, idx) => (
                <SkeletonRow key={`skeleton-row-${idx}`} columns={columns} />
              ))}

            {/* Data Rows */}
            {!isLoading &&
              data.length > 0 &&
              data.map((row, rowIdx) => {
                const rowKey = getRowKey
                  ? getRowKey(row, rowIdx)
                  : `row-${rowIdx}`;
                const rowClasses =
                  typeof rowClassName === "function"
                    ? rowClassName(row, rowIdx)
                    : rowClassName;

                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors",
                      rowClasses
                    )}
                  >
                    {columns.map((column) => (
                      <DataCell
                        key={`${rowKey}-${column.id}`}
                        column={column}
                        row={row}
                        rowIndex={rowIdx}
                      />
                    ))}
                  </tr>
                );
              })}

            {/* Empty State */}
            {!isLoading && data.length === 0 && (
              <EmptyRow
                columns={columns}
                message={emptyMessage}
                icon={emptyIcon}
              />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Keep backward compatibility alias
export const PremiumTable = DataTable;
