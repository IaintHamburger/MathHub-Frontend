import React, { createContext, type ReactNode, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tokenUtils } from "@/lib/cookieUtils";
import { deviceUtils } from "@/lib/utils";
import {
  initializeAuth,
  loginFailure,
  loginStart,
  loginSuccess,
  logout,
} from "@/redux/slices/AuthSlice";
import type { RootState } from "@/redux/store/app";
import { authAPI, cleanupTokenRefresh, setupTokenRefresh } from "@/services/authService";
import type { UpdateProfileResponse, User } from "@/types/auth";

// 定義 Auth Context 的類型
interface AuthContextType {
  // 狀態
  user: User | null;
  isAuthenticated: boolean;
  isFetching: boolean;
  error: string | null;

  // 操作
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<boolean>;
  updateUserInfo: (
    userData: Partial<User>,
  ) => Promise<{ success: boolean; user?: User; error?: string }>;
  changePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;

  // 權限檢查
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
}

// 創建 Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// 內部 hook 實現
const useAuthInternal = (): AuthContextType => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.authSlice);

  // 初始化認證狀態
  useEffect(() => {
    const initializeAuthState = async () => {
      // 如果已經認證且有用戶資料，不重複初始化
      if (authState.isAuthenticated && authState.user) {
        return;
      }

      const accessToken = tokenUtils.getAccessToken();

      if (accessToken) {
        try {
          // 檢查 token 是否過期
          if (!tokenUtils.isTokenExpired(accessToken)) {
            // 獲取用戶資訊
            const userDataRes = (await authAPI.getCurrentUser()) as {
              success: boolean;
              data: User;
            };

            if (userDataRes.success) {
              dispatch(
                initializeAuth({
                  user: userDataRes?.data || null,
                }),
              );
            }
          } else {
            // Token 過期，嘗試刷新
            const refreshResult = await authAPI.refreshToken();
            if (!refreshResult) {
              // 刷新失敗，清除所有 tokens
              tokenUtils.clearTokens();
            }
          }
        } catch (error) {
          console.error("Failed to initialize auth state:", error);
          tokenUtils.clearTokens();
        }
      }
    };

    initializeAuthState();
  }, [dispatch, authState.isAuthenticated, authState.user]);

  // 設定自動刷新 token
  useEffect(() => {
    if (authState.isAuthenticated) {
      setupTokenRefresh();
    }

    // 清理函數：組件卸載時清理定時器
    return () => {
      cleanupTokenRefresh();
    };
  }, [authState.isAuthenticated]);

  // 登入
  const login = async (credentials: { email: string; password: string }) => {
    dispatch(loginStart());

    try {
      const response = (await authAPI.login(credentials)) as {
        accessToken: string;
        expiresIn: number;
        user: User;
      };

      console.log("response", response);

      // 更新 Redux state
      dispatch(
        loginSuccess({
          user: response.user,
        }),
      );

      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "登入失敗，請稍後再試";
      dispatch(loginFailure(errorMessage));
      return { success: false, error: errorMessage };
    }
  };

  // 登出
  const logoutUser = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // 清除本地 tokens 和 deviceID
      tokenUtils.clearTokens();
      deviceUtils.clearDeviceID();
      dispatch(logout());
      navigate("/");
    }
  };

  // 刷新 token
  const refreshToken = async () => {
    return await authAPI.refreshToken();
  };

  // 更新用戶資訊
  const updateUserInfo = async (userData: Partial<User>) => {
    try {
      const response = (await authAPI.updateProfile(userData)) as UpdateProfileResponse;
      return { success: true, user: response.user };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "更新失敗";
      return { success: false, error: errorMessage };
    }
  };

  // 更改密碼
  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await authAPI.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "密碼更改失敗";
      return { success: false, error: errorMessage };
    }
  };

  // 忘記密碼
  const forgotPassword = async (email: string) => {
    try {
      await authAPI.forgotPassword(email);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "發送失敗";
      return { success: false, error: errorMessage };
    }
  };

  // 檢查是否有特定權限
  const hasPermission = (permission: string): boolean => {
    return authState.user?.permissionList.includes(permission) || false;
  };

  // 檢查是否有任一權限
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some((permission) => hasPermission(permission));
  };

  // 檢查是否有所有權限
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((permission) => hasPermission(permission));
  };

  return {
    // 狀態
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isFetching: authState.isFetching,
    error: authState.error,

    // 操作
    login,
    logout: logoutUser,
    refreshToken,
    updateUserInfo,
    changePassword,
    forgotPassword,

    // 權限檢查
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
};

// AuthProvider 組件
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const authValue = useAuthInternal();

  return React.createElement(AuthContext.Provider, { value: authValue }, children);
};

// 對外暴露的 useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
