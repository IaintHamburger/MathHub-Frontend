import { useCallback, useMemo, useState } from "react";

export interface SortConfig {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterConfig {
  field: string;
  value: string | number | boolean;
  operator: "eq" | "ne" | "gt" | "lt" | "gte" | "lte" | "contains" | "startsWith";
}

export interface DataTableState<T> {
  data: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  loading: boolean;
  sortConfig: SortConfig | null;
  filters: FilterConfig[];
}

export interface UseDataTableReturn<T> extends DataTableState<T> {
  setData: (data: T[]) => void;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalItems: (total: number) => void;
  setLoading: (loading: boolean) => void;
  setSortConfig: (config: SortConfig | null) => void;
  addFilter: (filter: FilterConfig) => void;
  removeFilter: (field: string) => void;
  clearFilters: () => void;
  resetToPage: (page: number) => void;
  paginatedData: T[];
  totalPages: number;
}

export function useDataTable<T>(
  initialData: T[] = [],
  initialPageSize: number = 10,
): UseDataTableReturn<T> {
  const [state, setState] = useState<DataTableState<T>>({
    data: initialData,
    currentPage: 1,
    pageSize: initialPageSize,
    totalItems: initialData.length,
    loading: false,
    sortConfig: null,
    filters: [],
  });

  const setData = useCallback((data: T[]) => {
    setState((prev) => ({ ...prev, data, totalItems: data.length }));
  }, []);

  const setCurrentPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const setPageSize = useCallback((size: number) => {
    setState((prev) => ({ ...prev, pageSize: size, currentPage: 1 }));
  }, []);

  const setTotalItems = useCallback((total: number) => {
    setState((prev) => ({ ...prev, totalItems: total }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  const setSortConfig = useCallback((config: SortConfig | null) => {
    setState((prev) => ({ ...prev, sortConfig: config, currentPage: 1 }));
  }, []);

  const addFilter = useCallback((filter: FilterConfig) => {
    setState((prev) => ({
      ...prev,
      filters: [...prev.filters.filter((f) => f.field !== filter.field), filter],
      currentPage: 1,
    }));
  }, []);

  const removeFilter = useCallback((field: string) => {
    setState((prev) => ({
      ...prev,
      filters: prev.filters.filter((f) => f.field !== field),
      currentPage: 1,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setState((prev) => ({ ...prev, filters: [], currentPage: 1 }));
  }, []);

  const resetToPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, currentPage: page }));
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(state.totalItems / state.pageSize);
  }, [state.totalItems, state.pageSize]);

  const paginatedData = useMemo(() => {
    const startIndex = (state.currentPage - 1) * state.pageSize;
    const endIndex = startIndex + state.pageSize;
    return state.data.slice(startIndex, endIndex);
  }, [state.data, state.currentPage, state.pageSize]);

  return {
    ...state,
    setData,
    setCurrentPage,
    setPageSize,
    setTotalItems,
    setLoading,
    setSortConfig,
    addFilter,
    removeFilter,
    clearFilters,
    resetToPage,
    paginatedData,
    totalPages,
  };
}
