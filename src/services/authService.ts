import { deviceUtils } from '@/lib/utils';
import { logout, refreshTokenFailure } from '@/redux/slices/AuthSlice';
import { store } from '@/redux/store/app';

// API 基礎 URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

// 請求攔截器：自動添加 token
const createAuthHeaders = (): HeadersInit => {
	const accessToken = localStorage.getItem('accessToken');

	return {
		'Content-Type': 'application/json',
		...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
	};
};

// 響應攔截器：處理 token 過期
const handleResponse = async (response: Response, originalRequest?: Request): Promise<unknown> => {
	if (response.status === 401) {
		// 如果這是已經嘗試過刷新的請求，直接登出
		if (originalRequest) {
			store.dispatch(logout());
			throw new Error('認證已過期，請重新登入');
		}

		// Token 過期，嘗試刷新
		const refreshResult = await authAPI.refreshToken();
		if (refreshResult) {
			// 重新發送原始請求
			const accessToken = localStorage.getItem('accessToken');
			const newRequest = new Request(response.url, {
				method: response.type === 'opaqueredirect' ? 'GET' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${accessToken}`,
				},
				body: response.body,
			});

			// 標記這是重試請求，避免無限循環
			const retryResponse = await fetch(newRequest);
			return handleResponse(retryResponse, newRequest);
		}
		// 刷新失敗，登出用戶
		store.dispatch(logout());
		throw new Error('認證已過期，請重新登入');
	}

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
	}

	return response.json();
};

// 通用 API 請求函數
const apiRequest = async (endpoint: string, options: RequestInit = {}): Promise<unknown> => {
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
		return await handleResponse(response);
	} catch (error) {
		console.error('API request failed:', error);
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
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...credentials,
				deviceID,
			}),
			// FIXME
			// credentials: 'include', // 暫時註解掉避免 CORS 錯誤
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// 檢查回應格式
		if (!data.success) {
			throw new Error(data.message || '登入失敗');
		}

		// 只儲存 accessToken 到 localStorage
		localStorage.setItem('accessToken', data.data.accessToken);

		// refreshToken 由後端設定為 HttpOnly Cookie，前端不需要手動儲存
		// 設定過期時間
		const expiryTime = Date.now() + data.data.expiresIn.millisecond;
		localStorage.setItem('accessTokenExpiry', expiryTime.toString());

		return data.data;
	},

	// 登出
	logout: async () => {
		// 獲取當前 deviceID
		const deviceID = deviceUtils.getDeviceID();

		const result = await apiRequest('/auth/logout', {
			method: 'POST',
			body: JSON.stringify({ deviceID }),
		});

		// 登出成功後清除 deviceID
		deviceUtils.clearDeviceID();

		return result;
	},

	// 刷新 Token
	refreshToken: async () => {
		try {
			// refreshToken 現在透過 HttpOnly Cookie 自動發送
			// 不需要手動從 localStorage 讀取
			const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include', // 重要：自動發送包含 refreshToken 的 Cookie
			});

			if (response.ok) {
				const data = await response.json();

				// 檢查回應格式
				if (!data.success) {
					throw new Error(data.message || 'Token 刷新失敗');
				}

				// 更新 accessToken
				localStorage.setItem('accessToken', data.data.accessToken);

				// refreshToken 由後端更新 Cookie，前端不需要手動處理
				// 設定過期時間
				const expiryTime = Date.now() + data.data.expiresIn * 1000;
				localStorage.setItem('accessTokenExpiry', expiryTime.toString());

				store.dispatch({
					type: 'auth/refreshTokenSuccess',
				});
				return true;
			}
			store.dispatch(refreshTokenFailure('Token 刷新失敗'));
			return false;
		} catch (error) {
			store.dispatch(refreshTokenFailure('Token 刷新失敗'));
			return false;
		}
	},

	// 獲取當前用戶資訊
	getCurrentUser: async () => {
		return apiRequest('/auth/me');
	},

	// 忘記密碼
	forgotPassword: async (email: string) => {
		return apiRequest('/auth/forgot-password', {
			method: 'POST',
			body: JSON.stringify({ email }),
		});
	},

	// 重置密碼
	resetPassword: async (token: string, newPassword: string) => {
		return apiRequest('/auth/reset-password', {
			method: 'POST',
			body: JSON.stringify({ token, newPassword }),
		});
	},

	// 更改密碼
	changePassword: async (currentPassword: string, newPassword: string) => {
		return apiRequest('/auth/change-password', {
			method: 'POST',
			body: JSON.stringify({ currentPassword, newPassword }),
		});
	},

	// 註冊
	register: async (userData: { username: string; email: string; password: string }) => {
		return apiRequest('/auth/register', {
			method: 'POST',
			body: JSON.stringify(userData),
		});
	},

	// 驗證 Email
	verifyEmail: async (token: string) => {
		return apiRequest('/auth/verify-email', {
			method: 'POST',
			body: JSON.stringify({ token }),
		});
	},

	// 重新發送驗證 Email
	resendVerificationEmail: async (email: string) => {
		return apiRequest('/auth/resend-verification', {
			method: 'POST',
			body: JSON.stringify({ email }),
		});
	},

	// 更新用戶資料
	updateProfile: async (
		userData: Partial<{
			name: string;
			email: string;
		}>
	) => {
		return apiRequest('/auth/profile', {
			method: 'PUT',
			body: JSON.stringify(userData),
		});
	},

	// 獲取用戶權限
	getUserPermissions: async () => {
		return apiRequest('/auth/permissions');
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
		const accessToken = localStorage.getItem('accessToken');

		if (isAuthenticated && accessToken) {
			// 檢查 token 是否即將過期
			try {
				const payload = JSON.parse(atob(accessToken.split('.')[1]));
				const currentTime = Math.floor(Date.now() / 1000);
				const timeUntilExpiry = payload.exp - currentTime;

				// 如果 token 將在 5 分鐘內過期，則刷新
				if (timeUntilExpiry < 5 * 60 && timeUntilExpiry > 0) {
					await authAPI.refreshToken();
				}
			} catch (error) {
				console.error('Failed to parse token:', error);
			}
		}
	};

	// 根據 token 剩餘時間動態調整檢查頻率
	const calculateCheckInterval = () => {
		const state = store.getState();
		const { isAuthenticated } = state.authSlice;
		const accessToken = localStorage.getItem('accessToken');

		if (!isAuthenticated || !accessToken) {
			return 5 * 60 * 1000; // 5分鐘
		}

		try {
			const payload = JSON.parse(atob(accessToken.split('.')[1]));
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
			console.error('Failed to parse token:', error);
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
