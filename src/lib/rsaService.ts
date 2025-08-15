// RSA 加密服務
// 用於加密敏感資料（如密碼）在傳輸到後端之前

// 從環境變數獲取公鑰
const getPublicKey = (): string => {
	const publicKey = import.meta.env.VITE_RSA_PUBLIC_KEY;
	if (!publicKey) {
		throw new Error('RSA 公鑰未設定，請檢查 .env.local 檔案');
	}
	return publicKey;
};

// 使用 RSA 公鑰加密資料
export const encryptWithRSA = async (data: string): Promise<string> => {
	try {
		const publicKey = getPublicKey();

		// 使用 Web Crypto API 進行 RSA 加密
		const encoder = new TextEncoder();
		const dataBuffer = encoder.encode(data);

		// 匯入公鑰
		const keyData = atob(publicKey.replace(/^-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----$/g, ''));
		const keyBuffer = new Uint8Array(keyData.length);
		for (let i = 0; i < keyData.length; i++) {
			keyBuffer[i] = keyData.charCodeAt(i);
		}

		const cryptoKey = await crypto.subtle.importKey(
			'spki',
			keyBuffer,
			{
				name: 'RSA-OAEP',
				hash: 'SHA-256',
			},
			false,
			['encrypt']
		);

		// 加密資料
		const encryptedBuffer = await crypto.subtle.encrypt(
			{
				name: 'RSA-OAEP',
			},
			cryptoKey,
			dataBuffer
		);

		// 轉換為 base64 字串
		return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
	} catch (error) {
		console.error('RSA 加密失敗:', error);
		throw new Error('資料加密失敗，請稍後再試');
	}
};

// 加密登入憑證
export const encryptDataWithRSA = async (data: string) => {
	try {
		const encryptedData = await encryptWithRSA(data);
		return encryptedData;
	} catch (error) {
		console.error('加密登入憑證失敗:', error);
		throw error;
	}
};
