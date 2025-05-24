export interface QuestItem {
  id: number;
  title: string;
  tags: string;
  publisher: string;
  publish_time: string;
}

export interface QuestDetail {
  id: number;
  title: string;
  question: string;
}

// 用於 Home 頁面的 API 回應
export type HomeApiResponse = string;

// 用於 Quest 列表的 API 回應
export type QuestListResponse = QuestItem[];

// 用於單一 Quest 的 API 回應
export type QuestDetailResponse = QuestDetail;
