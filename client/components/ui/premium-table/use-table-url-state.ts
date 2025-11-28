"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SortDirection, TableState } from "./types";

interface UseTableUrlStateOptions {
  defaultLimit?: number;
  defaultSortBy?: string;
  defaultSortOrder?: SortDirection;
}

export function useTableUrlState(options: UseTableUrlStateOptions = {}) {
  const {
    defaultLimit = 10,
    defaultSortBy = null,
    defaultSortOrder = null,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current state from URL
  const state: TableState = useMemo(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || String(defaultLimit), 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || defaultSortBy;
    const sortOrder = (searchParams.get("sortOrder") as SortDirection) || defaultSortOrder;

    // Parse filters (any param starting with "filter_")
    const filters: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      if (key.startsWith("filter_")) {
        filters[key.replace("filter_", "")] = value;
      }
    });

    return { page, limit, search, sortBy, sortOrder, filters };
  }, [searchParams, defaultLimit, defaultSortBy, defaultSortOrder]);

  // Update URL with new state
  const updateState = useCallback(
    (updates: Partial<TableState>) => {
      const params = new URLSearchParams(searchParams.toString());

      // Update page
      if (updates.page !== undefined) {
        if (updates.page === 1) {
          params.delete("page");
        } else {
          params.set("page", String(updates.page));
        }
      }

      // Update limit
      if (updates.limit !== undefined) {
        if (updates.limit === defaultLimit) {
          params.delete("limit");
        } else {
          params.set("limit", String(updates.limit));
        }
      }

      // Update search
      if (updates.search !== undefined) {
        if (updates.search === "") {
          params.delete("search");
        } else {
          params.set("search", updates.search);
        }
        // Reset page when search changes
        params.delete("page");
      }

      // Update sort
      if (updates.sortBy !== undefined) {
        if (updates.sortBy === null || updates.sortBy === defaultSortBy) {
          params.delete("sortBy");
        } else {
          params.set("sortBy", updates.sortBy);
        }
      }

      if (updates.sortOrder !== undefined) {
        if (updates.sortOrder === null || updates.sortOrder === defaultSortOrder) {
          params.delete("sortOrder");
        } else {
          params.set("sortOrder", updates.sortOrder);
        }
      }

      // Update filters
      if (updates.filters !== undefined) {
        // Remove old filter params
        const keysToDelete: string[] = [];
        params.forEach((_, key) => {
          if (key.startsWith("filter_")) {
            keysToDelete.push(key);
          }
        });
        keysToDelete.forEach((key) => params.delete(key));

        // Add new filter params
        Object.entries(updates.filters).forEach(([key, value]) => {
          if (value && value !== "all") {
            params.set(`filter_${key}`, value);
          }
        });
        // Reset page when filters change
        params.delete("page");
      }

      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
    },
    [searchParams, pathname, router, defaultLimit, defaultSortBy, defaultSortOrder]
  );

  // Convenience methods
  const setPage = useCallback(
    (page: number) => updateState({ page }),
    [updateState]
  );

  const setLimit = useCallback(
    (limit: number) => updateState({ limit, page: 1 }),
    [updateState]
  );

  const setSearch = useCallback(
    (search: string) => updateState({ search }),
    [updateState]
  );

  const setSort = useCallback(
    (sortBy: string | null, sortOrder: SortDirection) =>
      updateState({ sortBy, sortOrder }),
    [updateState]
  );

  const toggleSort = useCallback(
    (columnId: string) => {
      if (state.sortBy !== columnId) {
        updateState({ sortBy: columnId, sortOrder: "asc" });
      } else if (state.sortOrder === "asc") {
        updateState({ sortBy: columnId, sortOrder: "desc" });
      } else {
        updateState({ sortBy: null, sortOrder: null });
      }
    },
    [state.sortBy, state.sortOrder, updateState]
  );

  const setFilter = useCallback(
    (key: string, value: string) => {
      updateState({ filters: { ...state.filters, [key]: value } });
    },
    [state.filters, updateState]
  );

  const clearFilters = useCallback(() => {
    updateState({ filters: {}, search: "" });
  }, [updateState]);

  return {
    state,
    updateState,
    setPage,
    setLimit,
    setSearch,
    setSort,
    toggleSort,
    setFilter,
    clearFilters,
  };
}
