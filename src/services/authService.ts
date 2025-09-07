import { deviceUtils } from "@/lib/utils";
import { logout, refreshTokenFailure } from "@/redux/slices/AuthSlice";
import { store } from "@/redux/store/app";

// API 基礎 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const useCredentials = import.meta.env.VITE_USE_CREDENTIALS === "true";

// 併發 API Queue 機制
interface QueuedRequest {
  endpoint: string;
  options: RequestInit;
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
}

class AuthQueue {
  private queue: QueuedRequest[] = [];
  private isRefreshing = false;
  private refreshAttempts = 0;
  private readonly MAX_REFRESH_ATTEMPTS = 3;

  // 加入請求到 Queue
  enqueue(endpoint: string, options: RequestInit): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.queue.push({ endpoint, options, resolve, reject });
    });
  }

  // 處理 Queue 中的所有請求
  async processQueue(newAccessToken: string) {
    const requests = [...this.queue];
    this.queue = [];

    for (const request of requests) {
      try {
        const newOptions = {
          ...request.options,
          headers: {
            ...request.options.headers,
            Authorization: `Bearer ${newAccessToken}`,
          },
        };

        const url = `${API_BASE_URL}${request.endpoint}`;
        const response = await fetch(url, newOptions);

        if (response.ok) {
          const data = await response.json();
          request.resolve(data);
        } else {
          request.reject(new Error(`HTTP error! status: ${response.status}`));
        }
      } catch (error) {
        request.reject(error as Error);
      }
    }
  }

  // 清空 Queue 並拒絕所有請求
  clearQueue(error: Error) {
    const requests = [...this.queue];
    this.queue = [];
    requests.forEach((request) => {
      request.reject(error);
    });
  }

  // 檢查是否正在刷新
  getRefreshing() {
    return this.isRefreshing;
  }

  // 設定刷新狀態
  setRefreshing(refreshing: boolean) {
    this.isRefreshing = refreshing;
  }

  // 增加刷新嘗試次數
  incrementRefreshAttempts() {
    this.refreshAttempts++;
    console.log(`Refresh attempt ${this.refreshAttempts}/${this.MAX_REFRESH_ATTEMPTS}`);

    // 如果達到最大嘗試次數，自動登出
    if (this.hasExceededMaxAttempts()) {
      console.log("Max refresh attempts reached, logging out user");
      store.dispatch(logout());
    }
  }

  // 重置刷新嘗試次數
  resetRefreshAttempts() {
    this.refreshAttempts = 0;
    console.log("Refresh attempts reset to 0");
  }

  // 檢查是否超過最大嘗試次數
  hasExceededMaxAttempts() {
    return this.refreshAttempts >= this.MAX_REFRESH_ATTEMPTS;
  }

  // 獲取當前嘗試次數
  getRefreshAttempts() {
    return this.refreshAttempts;
  }

  // 獲取最大嘗試次數
  getMaxRefreshAttempts() {
    return this.MAX_REFRESH_ATTEMPTS;
  }
}

// 全域 Queue 實例
const authQueue = new AuthQueue();

// 請求攔截器：自動添加 token
const createAuthHeaders = (): HeadersInit => {
  const accessToken = localStorage.getItem("accessToken");
  const csrfToken = localStorage.getItem("csrfToken");

  return {
    "Content-Type": "application/json",
    ...(csrfToken && { "x-csrf-token": csrfToken }),
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };
};

// 響應攔截器：處理 token 過期
const handleResponse = async (
  response: Response,
  isRetryRequest = false,
  originalMethod?: string,
): Promise<unknown> => {
  if (response.status === 401) {
    // 如果這是重試請求，直接登出
    if (isRetryRequest) {
      store.dispatch(logout());
      throw new Error("認證已過期，請重新登入");
    }

    // 檢查是否超過最大嘗試次數
    if (authQueue.hasExceededMaxAttempts()) {
      // 強制登出並顯示錯誤訊息
      store.dispatch(logout());
      throw new Error("登入認證已失效，請重新登入後再試");
    }

    // 如果正在刷新 token，將當前請求加入 queue
    if (authQueue.getRefreshing()) {
      console.log("Token refresh in progress, queuing current request");
      // 等待 refresh 完成後重新發送
      return new Promise((resolve, reject) => {
        const checkAndRetry = async () => {
          if (!authQueue.getRefreshing()) {
            try {
              const accessToken = localStorage.getItem("accessToken");
              if (accessToken) {
                const newRequest = new Request(response.url, {
                  method: originalMethod || "GET",
                  headers: {
                    ...Object.fromEntries(response.headers.entries()),
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: response.body,
                });
                const retryResponse = await fetch(newRequest);
                const result = await handleResponse(retryResponse, true, originalMethod);
                resolve(result);
              } else {
                reject(new Error("No access token available"));
              }
            } catch (error) {
              reject(error);
            }
          } else {
            setTimeout(checkAndRetry, 100);
          }
        };
        checkAndRetry();
      });
    }

    // Token 過期，嘗試刷新
    const refreshResult = await authAPI.refreshToken();
    if (refreshResult) {
      // 重新發送原始請求
      const accessToken = localStorage.getItem("accessToken");
      const newRequest = new Request(response.url, {
        method: originalMethod || "GET",
        headers: {
          ...Object.fromEntries(response.headers.entries()),
          Authorization: `Bearer ${accessToken}`,
        },
        body: response.body,
      });

      // 標記這是重試請求，避免無限循環
      const retryResponse = await fetch(newRequest);
      return handleResponse(retryResponse, true, originalMethod);
    }

    // 刷新失敗，登出用戶
    store.dispatch(logout());
    throw new Error("認證已過期，請重新登入");
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// 通用 API 請求函數
export const apiRequest = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  // 檢查是否超過最大嘗試次數
  if (authQueue.hasExceededMaxAttempts()) {
    store.dispatch(logout());
    throw new Error("登入認證已失效，請重新登入後再試");
  }

  // 如果正在刷新 token，將請求加入 queue
  if (authQueue.getRefreshing()) {
    console.log("Token refresh in progress, queuing request:", endpoint);
    return authQueue.enqueue(endpoint, options) as Promise<T>;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    ...options,
    headers: {
      ...createAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return (await handleResponse(response, false, options.method)) as T;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// 認證相關 API
export const authAPI = {
  // 登入
  login: async (credentials: { email: string; password: string }) => {
    // 獲取或生成 deviceID
    const deviceID = deviceUtils.getDeviceID();

    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...credentials,
        deviceID,
      }),
      ...(useCredentials ? { credentials: "include" } : {}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // 檢查回應格式
    if (!data.success) {
      throw new Error(data.message || "登入失敗");
    }

    // 只儲存 accessToken 到 localStorage
    localStorage.setItem("accessToken", data.data.accessToken);

    // refreshToken 由後端設定為 HttpOnly Cookie，前端不需要手動儲存
    // 設定過期時間
    const expiryTime = Date.now() + data.data.expiresIn.millisecond;
    localStorage.setItem("accessTokenExpiry", expiryTime.toString());

    // 獲取 csrf token
    await authAPI.getCsrfToken();

    // 重置刷新嘗試次數
    authQueue.resetRefreshAttempts();

    return data.data;
  },

  // 登出
  logout: async () => {
    // 獲取當前 deviceID
    const deviceID = deviceUtils.getDeviceID();

    const result = await apiRequest("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ deviceID }),
    });

    // 登出成功後清除 deviceID
    deviceUtils.clearDeviceID();

    // 清空 Queue 和重置狀態
    authQueue.clearQueue(new Error("用戶已登出"));
    authQueue.resetRefreshAttempts();

    return result;
  },

  // 刷新 Token
  refreshToken: async () => {
    // 檢查是否超過最大嘗試次數
    if (authQueue.hasExceededMaxAttempts()) {
      console.log("Max refresh attempts reached, cannot refresh token");
      // 強制登出
      store.dispatch(logout());
      return false;
    }

    // 如果正在刷新，將請求加入 Queue
    if (authQueue.getRefreshing()) {
      console.log("Token refresh already in progress, queuing request");
      return new Promise((resolve, reject) => {
        authQueue.enqueue("/auth/refresh", { method: "POST" }).then(resolve).catch(reject);
      });
    }

    // 設定刷新狀態
    authQueue.setRefreshing(true);
    console.log(
      `Starting token refresh (attempt ${authQueue.getRefreshAttempts() + 1}/${authQueue.getMaxRefreshAttempts()})`,
    );

    try {
      // 增加刷新嘗試次數
      authQueue.incrementRefreshAttempts();

      // refreshToken 現在透過 HttpOnly Cookie 自動發送
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        ...(useCredentials ? { credentials: "include" } : {}),
      });

      if (response.ok) {
        const data = await response.json();

        // 檢查回應格式
        if (!data.success) {
          throw new Error(data.message || "Token 刷新失敗");
        }

        // 更新 accessToken
        localStorage.setItem("accessToken", data.data.accessToken);

        // refreshToken 由後端更新 Cookie，前端不需要手動處理
        // 設定過期時間
        const expiryTime = Date.now() + data.data.expiresIn * 1000;
        localStorage.setItem("accessTokenExpiry", expiryTime.toString());

        // 重置刷新嘗試次數
        authQueue.resetRefreshAttempts();
        console.log("Token refresh successful");

        // 處理 Queue 中的所有請求
        await authQueue.processQueue(data.data.accessToken);

        store.dispatch({
          type: "auth/refreshTokenSuccess",
        });

        return true;
      }

      // 刷新失敗
      console.log(`Token refresh failed with status: ${response.status}`);
      store.dispatch(refreshTokenFailure("Token 刷新失敗"));
      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      store.dispatch(refreshTokenFailure("Token 刷新失敗"));
      return false;
    } finally {
      // 重置刷新狀態
      authQueue.setRefreshing(false);
    }
  },

  // 獲取 csrf token
  getCsrfToken: async () => {
    const response = await apiRequest<{ csrfToken: string }>("/security/csrf-token");
    localStorage.setItem("csrfToken", response?.csrfToken as string);

    return response?.csrfToken;
  },

  // 獲取當前用戶資訊
  getCurrentUser: async () => {
    return apiRequest("/auth/me");
  },

  // 忘記密碼
  forgotPassword: async (email: string) => {
    return apiRequest("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // 重置密碼
  resetPassword: async (token: string, newPassword: string) => {
    return apiRequest("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ token, newPassword }),
    });
  },

  // 更改密碼
  changePassword: async (currentPassword: string, newPassword: string) => {
    return apiRequest("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  // 註冊
  register: async (userData: { username: string; email: string; password: string }) => {
    return apiRequest("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // 驗證 Email
  verifyEmail: async (token: string) => {
    return apiRequest("/auth/verify-email", {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  },

  // 重新發送驗證 Email
  resendVerificationEmail: async (email: string) => {
    return apiRequest("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

// 自動刷新 token 的函數
let refreshInterval: NodeJS.Timeout | null = null;

export const setupTokenRefresh = () => {
  // 清理現有的 interval，避免重複設定
  if (refreshInterval) {
    clearInterval(refreshInterval);
  }

  const checkAndRefreshToken = async () => {
    const state = store.getState();
    const { isAuthenticated } = state.authSlice;
    const accessToken = localStorage.getItem("accessToken");

    // 檢查是否超過最大重試次數
    if (authQueue.hasExceededMaxAttempts()) {
      console.log("Max refresh attempts reached, stopping automatic token refresh");
      cleanupTokenRefresh();
      return;
    }

    if (isAuthenticated && accessToken) {
      // 檢查 token 是否即將過期
      try {
        const payload = JSON.parse(atob(accessToken.split(".")[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = payload.exp - currentTime;

        // 如果 token 將在 5 分鐘內過期，則刷新
        if (timeUntilExpiry < 5 * 60 && timeUntilExpiry > 0) {
          await authAPI.refreshToken();
        }
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    }
  };

  // 根據 token 剩餘時間動態調整檢查頻率
  const calculateCheckInterval = () => {
    const state = store.getState();
    const { isAuthenticated } = state.authSlice;
    const accessToken = localStorage.getItem("accessToken");

    if (!isAuthenticated || !accessToken) {
      return 5 * 60 * 1000; // 5分鐘
    }

    try {
      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = payload.exp - currentTime;

      // 如果 token 已經過期，立即檢查
      if (timeUntilExpiry <= 0) {
        return 1000; // 1秒
      }

      // 如果 token 將在 10 分鐘內過期，每分鐘檢查
      if (timeUntilExpiry < 10 * 60) {
        return 60 * 1000; // 1分鐘
      }

      // 如果 token 將在 30 分鐘內過期，每 5 分鐘檢查
      if (timeUntilExpiry < 30 * 60) {
        return 5 * 60 * 1000; // 5分鐘
      }

      // 其他情況，每 15 分鐘檢查
      return 15 * 60 * 1000; // 15分鐘
    } catch (error) {
      console.error("Failed to parse token:", error);
      return 5 * 60 * 1000; // 5分鐘
    }
  };

  // 設定動態檢查間隔
  const scheduleNextCheck = () => {
    const interval = calculateCheckInterval();
    refreshInterval = setTimeout(async () => {
      await checkAndRefreshToken();
      scheduleNextCheck(); // 遞迴設定下一次檢查
    }, interval);
  };

  // 頁面載入時立即檢查一次
  checkAndRefreshToken();

  // 開始動態檢查
  scheduleNextCheck();
};

// 清理 token 刷新機制
export const cleanupTokenRefresh = () => {
  if (refreshInterval) {
    clearTimeout(refreshInterval);
    refreshInterval = null;
  }
};

// 導出 Queue 相關方法供外部使用
export const getAuthQueue = () => authQueue;
