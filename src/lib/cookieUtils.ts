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
      sameSite?: "Strict" | "Lax" | "None";
    } = {},
  ) => {
    const {
      expires = 7 * 24 * 60 * 60, // 預設 7 天
      path = "/",
      domain,
      secure = true,
      sameSite = "Strict",
    } = options;

    const expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + expires * 1000);

    let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expiresDate.toUTCString()}; path=${path}`;

    if (domain) {
      cookieString += `; domain=${domain}`;
    }

    if (secure) {
      cookieString += "; secure";
    }

    if (sameSite) {
      cookieString += `; samesite=${sameSite}`;
    }

    document.cookie = cookieString;
  },

  // 獲取 Cookie
  getCookie: (name: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
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
    } = {},
  ) => {
    const { path = "/", domain } = options;

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
    cookieUtils.deleteCookie("accessToken");
    // refreshToken 現在透過 HttpOnly Cookie 管理，由後端自動處理
  },
};

// Token 管理工具
export const tokenUtils = {
  // 設定 access token 到 localStorage
  setAccessToken: (token: string, expiresIn?: number) => {
    localStorage.setItem("accessToken", token);
    if (expiresIn) {
      const expiryTime = Date.now() + expiresIn * 1000;
      localStorage.setItem("accessTokenExpiry", expiryTime.toString());
    }
  },

  // 獲取 access token
  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  // 清除所有 tokens
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessTokenExpiry");
    // refreshToken 由後端清除 HttpOnly Cookie
  },

  // 檢查 token 是否過期
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  },

  // 解析 JWT token 內容
  parseToken: (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  },
};
