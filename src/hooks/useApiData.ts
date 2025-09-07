export interface ApiParams {
  page: number;
  pageSize: number;
  sort?: object;
  filters?: object;
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
