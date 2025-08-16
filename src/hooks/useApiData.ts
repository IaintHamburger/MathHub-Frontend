import { useCallback, useEffect } from "react";
import { type FilterConfig, type SortConfig, useDataTable } from "./useDataTable";

export interface ApiParams {
  page: number;
  pageSize: number;
  sort?: SortConfig;
  filters?: FilterConfig[];
  search?: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UseApiDataOptions<T> {
  initialPageSize?: number;
  autoFetch?: boolean;
  transformData?: (data: T[]) => T[];
  onError?: (error: Error) => void;
}

export function useApiData<T>(
  fetchFunction: (params: ApiParams) => Promise<ApiResponse<T>>,
  options: UseApiDataOptions<T> = {},
) {
  const { initialPageSize = 10, autoFetch = true, transformData, onError } = options;

  const dataTable = useDataTable<T>([], initialPageSize);

  const fetchData = useCallback(
    async (params?: Partial<ApiParams>) => {
      try {
        dataTable.setLoading(true);

        const apiParams: ApiParams = {
          page: params?.page ?? dataTable.currentPage,
          pageSize: params?.pageSize ?? dataTable.pageSize,
          sort: params?.sort ?? dataTable.sortConfig ?? undefined,
          filters: params?.filters ?? dataTable.filters,
          search: params?.search,
        };

        const response = await fetchFunction(apiParams);

        let processedData = response.data;
        if (transformData) {
          processedData = transformData(processedData);
        }

        dataTable.setData(processedData);
        dataTable.setTotalItems(response.total);
        dataTable.setCurrentPage(response.page);
        dataTable.setPageSize(response.pageSize);
      } catch (error) {
        const errorObj = error instanceof Error ? error : new Error(String(error));
        if (onError) {
          onError(errorObj);
        } else {
          console.error("API 調用失敗:", errorObj);
        }
      } finally {
        dataTable.setLoading(false);
      }
    },
    [fetchFunction, dataTable, transformData, onError],
  );

  const refreshData = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const handlePageChange = useCallback(
    (page: number) => {
      dataTable.setCurrentPage(page);
      fetchData({ page });
    },
    [dataTable, fetchData],
  );

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      dataTable.setPageSize(pageSize);
      fetchData({ pageSize, page: 1 });
    },
    [dataTable, fetchData],
  );

  const handleSort = useCallback(
    (field: string, direction: "asc" | "desc") => {
      const sortConfig: SortConfig = { field, direction };
      dataTable.setSortConfig(sortConfig);
      fetchData({ sort: sortConfig, page: 1 });
    },
    [dataTable, fetchData],
  );

  const handleFilter = useCallback(
    (filter: FilterConfig) => {
      dataTable.addFilter(filter);
      fetchData({ filters: [...dataTable.filters, filter], page: 1 });
    },
    [dataTable, fetchData],
  );

  const handleSearch = useCallback(
    (search: string) => {
      fetchData({ search, page: 1 });
    },
    [fetchData],
  );

  // 自動獲取數據
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    ...dataTable,
    fetchData,
    refreshData,
    handlePageChange,
    handlePageSizeChange,
    handleSort,
    handleFilter,
    handleSearch,
  };
}
