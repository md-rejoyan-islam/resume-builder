"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface DataTableProps {
  headers: string[];
  data: React.ReactNode[][];
  isLoading?: boolean;
  noDataMessage?: string;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  currentPage?: number;
  itemsPerPage?: number;
  totalItems?: number;
  limitOptions?: number[];
}

export function DataTable({
  headers,
  data,
  isLoading = false,
  noDataMessage = "No data available.",
  onPageChange,
  onLimitChange,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  limitOptions = [1, 5, 10, 20, 35, 50, 100],
}: DataTableProps) {
  const [limit, setLimit] = useState(itemsPerPage);
  const [page, setPage] = useState(currentPage);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    onPageChange?.(newPage);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
    onLimitChange?.(newLimit);
  };

  const totalPages = Math.ceil(totalItems / limit);

  return (
    <div className="w-full space-y-6">
      {/* Table */}
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card">
        <Table>
          <TableHeader className="bg-primary/4">
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header} className="px-6 py-4">
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="border-b">
            {isLoading &&
              [1, 2, 3, 4, 5, 6, 7].map((loader) => (
                <TableRow key={loader}>
                  {headers.map((_, idx) => (
                    <TableCell key={idx} className="px-6 py-4">
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading &&
              data.length > 0 &&
              data.map((row, index) => (
                <TableRow key={index}>
                  {row.map((cell, idx) => (
                    <TableCell key={idx} className="px-6 py-4">
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {!isLoading && data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={headers.length}
                  className="py-3 text-center text-muted-foreground"
                >
                  {noDataMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Bottom Bar - Items per page, results info, and pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Show</span>
          <Select
            value={limit.toString()}
            onValueChange={(val) => handleLimitChange(Number(val))}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {limitOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">items</span>
          <span className="text-xs text-muted-foreground ml-4">
            {data.length} of {totalItems} results
          </span>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (page <= 3) {
                pageNum = i + 1;
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = page - 2 + i;
              }
              return (
                <Button
                  key={pageNum}
                  variant={page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="h-8 w-8 p-0"
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
