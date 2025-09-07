export interface UserBasicRequest {
  name: string; // 用戶名稱
  email: string; // 電子郵件
  status: "active" | "inactive"; // 狀態
  role: string[]; // 角色
  birthday: number; // 生日
  grade: string; // 年級
  isActive: boolean; // 是否啟用
}

export interface UserCreateRequest extends UserBasicRequest {
  password: string; // 密碼
}
export interface UserUpdateRequest extends UserCreateRequest {
  id: string; // 用戶 ID
}

export interface UserItem extends UserUpdateRequest {
  creator: {
    // 創建者
    id: string;
    name: string;
    email: string;
  };
  createdAt: number; // 創建時間
  updatedAt: number; // 更新時間
}

// 用於 /adminPage/User 頁面的 API 回應
export type UserListResponse = UserItem[];
