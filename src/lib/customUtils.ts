// 自定義工具函數
// 這個檔案不會被 shadcn 覆蓋
// 但記得都要去更新 ./utils.ts 重新匯出

import { v4 as uuidv4 } from "uuid";

// 生成 UUID 的函數
export function getUUID(): string {
  return uuidv4();
}
