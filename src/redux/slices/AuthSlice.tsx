import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  account: string;
  permissionList: string[];
}

interface AuthState {
  // User Info
  user: User | null;

  // Auth State
  isAuthenticated: boolean;
  isFetching: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isFetching: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 登入流程
    loginStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },

    loginSuccess: (
      state,
      action: PayloadAction<{
        user: User;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isFetching = false;
      state.error = null;
    },

    loginFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isFetching = false;
      state.error = action.payload;
    },

    // 登出
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isFetching = false;
      state.error = null;
    },

    // Token 更新
    refreshTokenStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },

    refreshTokenSuccess: (state) => {
      state.isFetching = false;
      state.error = null;
    },

    refreshTokenFailure: (state, action: PayloadAction<string>) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isFetching = false;
      state.error = action.payload;
    },

    // 更新用戶資訊
    updateUserInfo: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // 清除錯誤
    clearError: (state) => {
      state.error = null;
    },

    // 初始化認證狀態（從 localStorage 恢復）
    initializeAuth: (
      state,
      action: PayloadAction<{
        user: User;
      }>,
    ) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  refreshTokenStart,
  refreshTokenSuccess,
  refreshTokenFailure,
  updateUserInfo,
  clearError,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
