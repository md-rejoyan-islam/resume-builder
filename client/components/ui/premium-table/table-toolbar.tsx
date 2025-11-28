"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Filter, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ToolbarProps } from "./types";

export function TableToolbar({
  search = "",
  onSearchChange,
  searchPlaceholder = "Search...",
  filters = [],
  activeFilters = {},
  onFilterChange,
  onClearFilters,
  className,
  children,
}: ToolbarProps) {
  const [localSearch, setLocalSearch] = useState(search);

  // Sync local search with prop
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce search - only trigger after 300ms of no typing
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        onSearchChange?.(localSearch);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, onSearchChange]);

  const hasActiveFilters =
    Object.values(activeFilters).some((v) => v && v !== "all") ||
    search.length > 0;

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Left side - Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {filters.map((filter) => (
            <Select
              key={filter.id}
              value={activeFilters[filter.id] || "all"}
              onValueChange={(value) => onFilterChange?.(filter.id, value)}
            >
              <SelectTrigger className="h-9 w-auto min-w-[120px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-sm">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <SelectValue placeholder={filter.label} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filter.label}</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          {hasActiveFilters && onClearFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-9 px-3 text-slate-500 hover:text-slate-700"
            >
              <X className="w-3.5 h-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Right side - Search and custom actions */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {onSearchChange && (
            <div className="relative flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder={searchPlaceholder}
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-9 pr-4 h-9 w-full sm:w-[240px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
              />
              {localSearch && (
                <button
                  onClick={() => {
                    setLocalSearch("");
                    onSearchChange("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
