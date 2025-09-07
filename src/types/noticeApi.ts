export interface NoticeBasicRequest {
  title: string; // 公告標題
  content: string; // 公告內容
  status: "public" | "draft"; // 公告狀態, public 已發布, draft 草稿
  scheduleAt: number; // 預約發布時間, 立即發布為 0
}

export interface NoticeCreateRequest extends NoticeBasicRequest {
  pin?: boolean; // 是否置頂
}
export interface NoticeUpdateRequest extends NoticeCreateRequest {
  id: string; // 公告 ID
  pinOrder?: number; // 置頂排序 (後端自動設定，前端不需要傳, 前端如果傳了就是指定 pinOrder)
}

export interface NoticeItem extends NoticeUpdateRequest {
  creator: {
    // 創建者
    id: string;
    name: string;
    email: string;
  };
  createdAt: number; // 創建時間
  updatedAt: number; // 更新時間
}

// 用於 /adminPage/Notice 頁面的 API 回應
export type NoticeListResponse = NoticeItem[];
