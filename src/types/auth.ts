// 用戶資訊介面
export interface User {
  id: string;
  name: string;
  email: string;
  account: string;
  permissionList: string[];
  createdAt?: string;
  updatedAt?: string;
  emailVerified?: boolean;
}

// 登入請求
export interface LoginRequest {
  email: string;
  password: string;
  deviceID: string;
}

// 登入回應
export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
}

// 登入 API 回應（包含 success 包裝）
export interface LoginApiResponse extends ApiResponse<LoginResponse> {}

// 註冊請求
export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// 註冊回應
export interface RegisterResponse {
  message: string;
  user: User;
}

// 忘記密碼請求
export interface ForgotPasswordRequest {
  email: string;
}

// 忘記密碼回應
export interface ForgotPasswordResponse {
  message: string;
}

// 重置密碼請求
export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

// 重置密碼回應
export interface ResetPasswordResponse {
  message: string;
}

// 更改密碼請求
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// 更改密碼回應
export interface ChangePasswordResponse {
  message: string;
}

// 更新個人資料請求
export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

// 更新個人資料回應
export interface UpdateProfileResponse {
  message: string;
  user: User;
}

// 刷新 Token 回應
export interface RefreshTokenResponse {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

// 驗證 Email 請求
export interface VerifyEmailRequest {
  token: string;
}

// 驗證 Email 回應
export interface VerifyEmailResponse {
  message: string;
}

// 重新發送驗證 Email 請求
export interface ResendVerificationRequest {
  email: string;
}

// 重新發送驗證 Email 回應
export interface ResendVerificationResponse {
  message: string;
}

// 獲取用戶權限回應
export interface GetPermissionsResponse {
  permissions: string[];
}

// 錯誤回應
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

// API 回應通用格式
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorResponse;
  message?: string;
}
