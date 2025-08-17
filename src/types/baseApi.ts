export interface BaseItem<T = any> {
  data: T;
  success: boolean;
  message: string;
  error: string;
  totalNum?: number;
}
