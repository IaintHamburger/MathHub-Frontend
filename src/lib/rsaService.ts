// RSA 加密服務
// 用於加密敏感資料（如密碼）在傳輸到後端之前

// RSA 加密開關 - 設為 false 時會跳過加密，直接返回原始資料
const RSA_ENCRYPTION_ENABLED = import.meta.env.VITE_RSA_ENCRYPTION_ENABLED === "true";

// 從環境變數獲取公鑰
const getPublicKey = (): string => {
  const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("RSA 公鑰未設定，請檢查 .env.local 檔案中的 VITE_RSA_PUBLIC_KEY");
  }

  // 檢查公鑰格式是否正確
  if (
    !publicKey.includes("-----BEGIN PUBLIC KEY-----") ||
    !publicKey.includes("-----END PUBLIC KEY-----")
  ) {
    throw new Error("RSA 公鑰格式不正確，請檢查 .env.local 檔案中的 VITE_RSA_PUBLIC_KEY 格式");
  }

  return publicKey;
};

// 使用 RSA 公鑰加密資料
export const encryptWithRSA = async (data: string): Promise<string> => {
  // 如果 RSA 加密被禁用，直接返回原始資料
  if (!RSA_ENCRYPTION_ENABLED) {
    console.log("RSA 加密已禁用，返回原始資料");
    return data;
  }

  try {
    const publicKey = getPublicKey();

    // 使用 Web Crypto API 進行 RSA 加密
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);

    // 清理公鑰格式，移除 PEM 標頭和換行符
    const cleanKey = publicKey
      .replace(/^-----BEGIN PUBLIC KEY-----/, "")
      .replace(/-----END PUBLIC KEY-----$/, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "");

    // 檢查清理後的公鑰是否為有效的 base64
    if (!cleanKey || cleanKey.length === 0) {
      throw new Error("RSA 公鑰內容為空，請檢查 .env.local 檔案");
    }

    // 嘗試解碼 base64
    let keyData: string;
    try {
      keyData = atob(cleanKey);
    } catch (error) {
      throw new Error(
        `RSA 公鑰 base64 解碼失敗: ${error instanceof Error ? error.message : "未知錯誤"}`,
      );
    }

    const keyBuffer = new Uint8Array(keyData.length);
    for (let i = 0; i < keyData.length; i++) {
      keyBuffer[i] = keyData.charCodeAt(i);
    }

    const cryptoKey = await crypto.subtle.importKey(
      "spki",
      keyBuffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"],
    );

    // 加密資料
    const encryptedBuffer = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      cryptoKey,
      dataBuffer,
    );

    // 轉換為 base64 字串
    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
  } catch (error) {
    console.error("RSA 加密失敗:", error);
    // 提供更詳細的錯誤訊息
    if (error instanceof Error) {
      throw new Error(`RSA 加密失敗: ${error.message}`);
    }
    throw new Error("資料加密失敗，請稍後再試");
  }
};

// 加密登入憑證
export const encryptDataWithRSA = async (data: string) => {
  try {
    const encryptedData = await encryptWithRSA(data);
    return encryptedData;
  } catch (error) {
    console.error("加密登入憑證失敗:", error);
    throw error;
  }
};
