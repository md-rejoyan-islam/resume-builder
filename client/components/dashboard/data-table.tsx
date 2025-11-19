"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

interface Column {
  key: string;
  label: string;
  render?: (value: unknown) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: Record<string, unknown>[];
  onEdit?: (item: Record<string, unknown>) => void;
  onDelete?: (item: Record<string, unknown>) => void;
  onView?: (item: Record<string, unknown>) => void;
  paginated?: boolean;
  pageSize?: number;
}

export function DataTable({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  paginated = false,
  pageSize = 10,
}: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const displayData = paginated
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  const totalPages = Math.ceil(data.length / pageSize);

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="px-6 py-4 text-left font-semibold text-foreground"
                  >
                    {column.label}
                  </th>
                ))}
                {(onEdit || onDelete || onView) && (
                  <th className="px-6 py-4 text-left font-semibold text-foreground">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayData.length === 0 ? (
                <tr>
                  <td
                    colSpan={
                      columns.length + (onEdit || onDelete || onView ? 1 : 0)
                    }
                    className="px-6 py-8 text-center text-muted-foreground"
                  >
                    No data available
                  </td>
                </tr>
              ) : (
                displayData.map((item, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-foreground"
                      >
                        {column.render
                          ? column.render(item[column.key])
                          : (item[column.key] as React.ReactNode)}
                      </td>
                    ))}
                    {(onEdit || onDelete || onView) && (
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {onView && (
                            <button
                              onClick={() => onView(item)}
                              className="p-1 hover:bg-accent rounded transition"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          )}
                          {onEdit && (
                            <button
                              onClick={() => onEdit(item)}
                              className="p-1 hover:bg-accent rounded transition"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(item)}
                              className="p-1 hover:bg-destructive/10 text-destructive rounded transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {paginated && totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, data.length)} of {data.length}{" "}
            results
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
