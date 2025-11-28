import { ReactNode } from "react";

// Sort direction type
export type SortDirection = "asc" | "desc" | null;

// Column definition - user defines headers and how to render cells
export interface ColumnDef<T> {
  id: string;
  header: string | ReactNode;
  accessorKey?: keyof T;
  sortable?: boolean;
  width?: string;
  align?: "left" | "center" | "right";
  cell?: (row: T, index: number) => ReactNode;
}

// Table state for URL persistence
export interface TableState {
  page: number;
  limit: number;
  search: string;
  sortBy: string | null;
  sortOrder: SortDirection;
  filters: Record<string, string>;
}

// Pagination configuration from API response
export interface PaginationConfig {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

// Filter options for toolbar
export interface FilterOption {
  value: string;
  label: string;
}

export interface TableFilter {
  id: string;
  label: string;
  options: FilterOption[];
}

// Main table props - simple API for reusability
export interface DataTableProps<T> {
  // Required: columns and data
  columns: ColumnDef<T>[];
  data: T[];

  // Loading state
  isLoading?: boolean;

  // Sorting (optional)
  sortBy?: string | null;
  sortOrder?: SortDirection;
  onSort?: (columnId: string) => void;

  // Empty state
  emptyMessage?: string;
  emptyIcon?: ReactNode;

  // Row customization
  getRowKey?: (row: T, index: number) => string | number;
  rowClassName?: string | ((row: T, index: number) => string);

  // Styling
  className?: string;
}

// Pagination props
export interface PaginationProps {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  limitOptions?: number[];
  className?: string;
}

// Toolbar props
export interface ToolbarProps {
  search?: string;
  onSearchChange?: (search: string) => void;
  searchPlaceholder?: string;
  filters?: TableFilter[];
  activeFilters?: Record<string, string>;
  onFilterChange?: (key: string, value: string) => void;
  onClearFilters?: () => void;
  className?: string;
  children?: ReactNode;
}

// Keep backward compatibility
export type PaginationInfo = PaginationConfig;
