import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface ApiParams {
  limit: number;
  skip: number;
  filter?: Record<string, any>;
  sort?: Record<string, 1 | -1>;
  projection?: Record<string, any>;
}

export interface UseDataTableReturn<T> {
  // 資料和狀態
  data: T[];
  totalItems: number;
  loading: boolean;

  // 分頁相關
  currentPage: number;
  pageSize: number;

  // 操作方法
  handlePaginationChange: (pageSize: number, skip: number) => void;
  handleSearchChange: (searchConditions: any) => void;
  handleSortChange: (sortModel: any) => void;
  refreshData: () => void;

  // 當前狀態
  queryParams: ApiParams;
  currentSearchConditions: any;
}

export function useDataTable<T>(
  apiCall: (params: ApiParams) => Promise<{ rows: T[]; totalNum: number }>,
  initialParams: Partial<ApiParams> = {},
): UseDataTableReturn<T> {
  const initializeOnceRef = useRef(false);

  // 查詢參數狀態
  const [queryParams, setQueryParams] = useState<ApiParams>(() => ({
    limit: 10,
    skip: 0,
    filter: {},
    sort: { createdAt: -1 },
    projection: {},
    ...initialParams,
  }));

  // 搜尋條件狀態
  const [searchConditions, setSearchConditions] = useState<any>(null);

  // 資料狀態
  const [data, setData] = useState<T[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  // API 調用方法
  const performSearch = useCallback(
    async (params: ApiParams) => {
      try {
        setLoading(true);

        const postData = {
          // limit: params.limit,
          // skip: params.skip,
          // filter: {
          //   ...(params.filter || {}),
          //   ...(searchConditions?.filter || {}),
          // },
          // sort: params.sort || { createdAt: -1 },
          // projection: params.projection || {},
        };

        console.log("API call params:", postData);

        const response = await apiCall(postData);

        setData(response.rows || []);
        setTotalItems(response.totalNum || 0);
      } catch (error) {
        console.error("API調用失敗:", error);
        setData([]);
        setTotalItems(0);
      } finally {
        setLoading(false);
      }
    },
    [apiCall, searchConditions],
  );

  // 初始化 - 只執行一次
  useEffect(() => {
    if (!initializeOnceRef.current) {
      initializeOnceRef.current = true;
      performSearch(queryParams);
    }
  }, [performSearch, queryParams]);

  // 分頁變更
  const handlePaginationChange = useCallback(
    (pageSize: number, skip: number) => {
      setQueryParams((prev) => ({
        ...prev,
        limit: pageSize,
        skip: skip,
      }));

      // 直接調用 API
      performSearch({
        ...queryParams,
        limit: pageSize,
        skip: skip,
      });
    },
    [queryParams, performSearch],
  );

  // 搜尋條件變更
  const handleSearchChange = useCallback(
    (searchConditions: any) => {
      setSearchConditions(searchConditions);

      // 直接調用 API
      performSearch({
        ...queryParams,
        skip: 0,
      });
    },
    [queryParams, performSearch],
  );

  // 排序變更
  const handleSortChange = useCallback(
    (sortModel: any) => {
      let newSort: Record<string, 1 | -1> = { createdAt: -1 };

      if (sortModel && sortModel.length > 0) {
        const { field, sort: direction } = sortModel[0];
        newSort = {
          [field]: direction === "asc" ? 1 : -1,
        };
      }

      setQueryParams((prev) => ({
        ...prev,
        sort: newSort,
      }));

      // 直接調用 API
      performSearch({
        ...queryParams,
        sort: newSort,
        skip: 0,
      });
    },
    [queryParams, performSearch],
  );

  // 重新整理資料
  const refreshData = useCallback(() => {
    performSearch(queryParams);
  }, [performSearch, queryParams]);

  // 計算當前頁面
  const currentPage = Math.floor(queryParams.skip / queryParams.limit) + 1;

  return {
    data,
    totalItems,
    loading,
    currentPage,
    pageSize: queryParams.limit,
    handlePaginationChange,
    handleSearchChange,
    handleSortChange,
    refreshData,
    queryParams,
    currentSearchConditions: searchConditions,
  };
}
