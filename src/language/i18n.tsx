import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enString from "./resource/en.tsx";
import zhTwString from "./resource/zh_TW.tsx";

const resources = {
  en: {
    translation: enString,
  },
  "zh-TW": {
    translation: zhTwString,
  },
};

// 取得瀏覽器語言或 localStorage 中的語言設定
const getLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  if (savedLanguage) return savedLanguage;

  // 檢查瀏覽器語言
  const browserLang = navigator.language;
  if (browserLang.startsWith('zh')) {
    return 'zh-TW';
  }

  return 'zh-TW'; // 預設使用繁體中文
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "zh-TW", // 如果當前切換的語言沒有對應的翻譯則使用這個語言
  lng: getLanguage(), // 預設語言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
