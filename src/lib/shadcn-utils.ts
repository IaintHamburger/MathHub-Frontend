import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// 這個檔案專門給 shadcn 使用
// 只包含 shadcn 需要的 cn 函數
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
