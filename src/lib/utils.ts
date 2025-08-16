// 這個檔案是為了匯出 shadcn 的 cn 函數和自定義函數

// 重新匯出 shadcn 的 cn 函數
export { cn } from './shadcn-utils';

// 匯出我們的自定義函數
export { getUUID } from './customUtils';

// 導入自定義函數供內部使用
import { getUUID } from './customUtils';

// Device ID 管理工具
export const deviceUtils = {
	// 生成 UUID v4
	generateDeviceID: getUUID,

	// 獲取當前 deviceID，如果不存在則生成新的
	getDeviceID: (): string => {
		const existingDeviceID = localStorage.getItem('deviceID');

		if (existingDeviceID) {
			return existingDeviceID;
		}

		// 生成新的 deviceID
		const newDeviceID = getUUID();
		localStorage.setItem('deviceID', newDeviceID);
		return newDeviceID;
	},

	// 設定 deviceID
	setDeviceID: (deviceID: string): void => {
		localStorage.setItem('deviceID', deviceID);
	},

	// 清除 deviceID（登出時使用）
	clearDeviceID: (): void => {
		localStorage.removeItem('deviceID');
	},

	// 重新生成 deviceID（登入時可能需要）
	regenerateDeviceID: (): string => {
		const newDeviceID = getUUID();
		localStorage.setItem('deviceID', newDeviceID);
		return newDeviceID;
	},

	// 檢查是否有有效的 deviceID
	hasValidDeviceID: (): boolean => {
		const deviceID = localStorage.getItem('deviceID');
		return !!deviceID && deviceID.length > 0;
	},
};
