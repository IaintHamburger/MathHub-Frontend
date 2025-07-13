import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enString from "./resources/en.js";
import zhTwString from "./resources/zh_TW.js";

const resources = {
  en: {
    translation: enString,
  },
  zh: {
    translation: zhTwString,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en", // 如果當前切換的語言沒有對應的翻譯則使用這個語言
  lng: localStorage.getItem('language')? localStorage.getItem('language') : "zh", // 預設語言
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;