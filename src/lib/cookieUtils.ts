// Cookie 管理工具
export const cookieUtils = {
	// 設定 Cookie
	setCookie: (
		name: string,
		value: string,
		options: {
			expires?: number; // 過期時間（秒）
			path?: string;
			domain?: string;
			secure?: boolean;
			sameSite?: 'Strict' | 'Lax' | 'None';
		} = {}
	) => {
		const {
			expires = 7 * 24 * 60 * 60, // 預設 7 天
			path = '/',
			domain,
			secure = true,
			sameSite = 'Strict',
		} = options;

		const expiresDate = new Date();
		expiresDate.setTime(expiresDate.getTime() + expires * 1000);

		let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expiresDate.toUTCString()}; path=${path}`;

		if (domain) {
			cookieString += `; domain=${domain}`;
		}

		if (secure) {
			cookieString += '; secure';
		}

		if (sameSite) {
			cookieString += `; samesite=${sameSite}`;
		}

		document.cookie = cookieString;
	},

	// 獲取 Cookie
	getCookie: (name: string): string | null => {
		const nameEQ = `${name}=`;
		const ca = document.cookie.split(';');

		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === ' ') {
				c = c.substring(1, c.length);
			}
			if (c.indexOf(nameEQ) === 0) {
				return decodeURIComponent(c.substring(nameEQ.length, c.length));
			}
		}
		return null;
	},

	// 刪除 Cookie
	deleteCookie: (
		name: string,
		options: {
			path?: string;
			domain?: string;
		} = {}
	) => {
		const { path = '/', domain } = options;

		let cookieString = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;

		if (domain) {
			cookieString += `; domain=${domain}`;
		}

		document.cookie = cookieString;
	},

	// 檢查 Cookie 是否存在
	hasCookie: (name: string): boolean => {
		return cookieUtils.getCookie(name) !== null;
	},

	// 清除所有認證相關的 Cookie
	clearAuthCookies: () => {
		cookieUtils.deleteCookie('accessToken');
		cookieUtils.deleteCookie('idToken');
		// 注意：refreshToken 不應該存在於 Cookie 中，應該在 localStorage
	},
};

// Token 管理工具
export const tokenUtils = {
	// 設定 access token 到 localStorage
	setAccessToken: (token: string, expiresIn?: number) => {
		localStorage.setItem('accessToken', token);
		if (expiresIn) {
			const expiryTime = Date.now() + expiresIn * 1000;
			localStorage.setItem('accessTokenExpiry', expiryTime.toString());
		}
	},

	// 設定 id token 到 localStorage
	setIdToken: (token: string, expiresIn?: number) => {
		localStorage.setItem('idToken', token);
		if (expiresIn) {
			const expiryTime = Date.now() + expiresIn * 1000;
			localStorage.setItem('idTokenExpiry', expiryTime.toString());
		}
	},

	// Refresh Token 由後端設定為 HttpOnly Cookie
	// 前端不需要手動儲存，但保留方法以維持 API 一致性
	setRefreshToken: (token: string) => {
		// 注意：在 JWT + Refresh Token 架構中，Refresh Token 應該由後端設定為 HttpOnly Cookie
		// 前端不應該手動儲存 refresh token，這會造成安全風險
		console.warn('setRefreshToken: 在 JWT + Refresh Token 架構中，Refresh Token 應該由後端設定為 HttpOnly Cookie');
	},

	// 獲取 access token
	getAccessToken: (): string | null => {
		return localStorage.getItem('accessToken');
	},

	// 獲取 id token
	getIdToken: (): string | null => {
		return localStorage.getItem('idToken');
	},

	// 獲取 refresh token（從 Cookie，需要後端配合）
	getRefreshToken: (): string | null => {
		// 注意：在 JWT + Refresh Token 架構中，Refresh Token 應該設定為 HttpOnly Cookie
		// 如果設定為 HttpOnly，前端無法直接讀取，這是安全的做法
		// 這裡僅用於開發環境或非 HttpOnly 的情況
		return cookieUtils.getCookie('refreshToken');
	},

	// 清除所有 tokens
	clearTokens: () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('idToken');
		// Refresh Token 由後端清除 Cookie
	},

	// 檢查 token 是否過期
	isTokenExpired: (token: string): boolean => {
		try {
			const payload = JSON.parse(atob(token.split('.')[1]));
			const currentTime = Math.floor(Date.now() / 1000);
			return payload.exp < currentTime;
		} catch {
			return true;
		}
	},

	// 解析 JWT token 內容
	parseToken: (token: string) => {
		try {
			const payload = JSON.parse(atob(token.split('.')[1]));
			return payload;
		} catch {
			return null;
		}
	},
};
