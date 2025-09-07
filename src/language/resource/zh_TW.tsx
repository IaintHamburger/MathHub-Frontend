const env = {
  "env.title": "MathHub",
};

const common = {
  "common.backToHome": "返回首頁",

  "common.loading": "載入中...",
  "common.noData": "沒有資料",

  "common.notice": "公告",

  // 操作按鈕
  "common.actions": "操作",
  "common.edit": "編輯",
  "common.delete": "刪除",
  "common.publish": "發布",
  "common.cancel": "取消",
  "common.unpublish": "取消發布",
  "common.view": "查看",
  "common.custom": "自定義",
  "common.unknown": "未知",
  "common.invalidDate": "無效日期",
};

const navigate = {
  "navigate.dailyProblem": "每日一題",
  "navigate.problems": "題目",
  "navigate.concepts": "觀念",
  "navigate.leaderboard": "排行榜",
  "navigate.announcements": "公告",
  "navigate.supports": "支援",

  "navigate.faqs": "FAQ",
  "navigate.reportIssue": "問題回報",
  "navigate.about": "關於我們",

  "navigate.admin.dashboard": "儀表板",
  "navigate.admin.users": "帳號管理",
  "navigate.admin.comments": "留言管理",
  "navigate.admin.problemsAdd": "審題/新增題目",
  "navigate.admin.problemsStatus": "修改題目狀態",
  "navigate.admin.reports": "檢舉審核",
  "navigate.admin.notice": "公告編輯",
  "navigate.admin.permission": "權限管理",
  "navigate.admin.settings": "系統設定",
};

const slot = {
  "slot.create": "新增{{label}}",
  "slot.edit": "編輯{{label}}",
  "slot.delete": "刪除{{label}}",

  "slot.create.success": "新增{{label}}成功",
  "slot.edit.success": "編輯{{label}}成功",
  "slot.delete.success": "刪除{{label}}成功",

  "slot.input.placeholder": "請輸入{{label}}",
  "slot.select.placeholder": "請選擇{{label}}",
};

const status = {
  "status.public": "已發布",
  "status.draft": "草稿",

  "status.undefined": "未知",
  "status.null": "未知",
  "status.unknown": "未知",
};

const header = {
  "header.user": "用戶",

  "header.register": "註冊",
  "header.login": "登入",
  "header.logout": "登出",
};

// 頁腳
const footer = {
  "footer.copyright": "© 2025 MathHub. 讓數學學習變得更美好。",
};

// 分頁
const pagination = {
  "pagination.show": "顯示",
  "pagination.total": "共",
  "pagination.page": "頁",
  "pagination.pageSize": "每頁顯示",
  "pagination.previous": "上一頁",
  "pagination.next": "下一頁",
};

// 登入頁面
const login = {
  "login.title": "歡迎回來",
  "login.subtitle": "登入您的 MathHub 帳戶",

  "login.form.email": "電子郵件",
  "login.form.emailPlaceholder": "請輸入您的電子郵件",
  "login.form.password": "密碼",
  "login.form.passwordPlaceholder": "請輸入您的密碼",
  "login.form.rememberMe": "記住我",
  "login.form.forgotPassword": "忘記密碼？",

  "login.button.login": "登入",
  "login.button.loggingIn": "登入中...",

  "login.divider.or": "或",

  "login.social.google": "Google",
  "login.social.twitter": "Twitter",

  "login.signup.noAccount": "還沒有帳戶？",
  "login.signup.registerNow": "立即註冊",

  "login.terms.agreement": "登入即表示您同意我們的",
  "login.terms.serviceTerms": "服務條款",
  "login.terms.and": "和",
  "login.terms.privacyPolicy": "隱私政策",

  "login.validation.emailRequired": "請輸入電子郵件",
  "login.validation.emailInvalid": "請輸入有效的電子郵件格式",
  "login.validation.passwordRequired": "請輸入密碼",
  "login.validation.passwordMinLength": "密碼至少需要 6 個字元",

  "login.error.loginFailed": "登入失敗",
  "login.error.rsaError": "RSA 加密錯誤",
  "login.error.rsaNotConfigured": "RSA 加密服務未設定，請檢查環境變數設定",
};

// 首頁
const home = {
  "home.subtitle": "一個專為自學數學的平台",
  "home.search.placeholder": "搜尋數學公式、概念或題目...",
  "home.search.button": "搜尋",

  "home.announcements.title": "最新公告",
  "home.announcements.more": "更多 →",
  "home.announcements.maintenance.title": "系統維護通知",
  "home.announcements.maintenance.preview": "系統將於本週末進行例行維護，預計影響時間...",
  "home.announcements.feature.title": "新功能上線",
  "home.announcements.feature.preview": "我們很高興宣布 LaTeX 編輯器新增了更多功能...",
  "home.announcements.daily.title": "每日一題活動開始",
  "home.announcements.daily.preview": "全新的每日一題挑戰活動正式開始，歡迎大家參與...",

  "home.features.problems.title": "題庫",
  "home.features.problems.description": "豐富的數學題目練習",
  "home.features.problems.button": "開始練習",

  "home.features.daily.title": "每日一題",
  "home.features.daily.description": "每天挑戰一道精選題目",
  "home.features.daily.button": "今日挑戰",

  "home.features.concepts.title": "觀念學習",
  "home.features.concepts.description": "系統化的數學概念",
  "home.features.concepts.button": "開始學習",

  "home.categories.title": "分類",
  "home.categories.description": "可以選擇已經編輯/學習的概念/項目",

  "home.problems.title": "問題",
  "home.problems.description": "簡單feature介紹",
  "home.problems.search": "搜尋問題",

  "home.concepts.title": "觀念",
  "home.concepts.description": "簡潔feature介紹",
  "home.concepts.search": "搜尋觀念",
};

const userPage = {
  "userPage.title": "用戶列表",

  "userPage.table.id": "ID",
  "userPage.table.name": "用戶名",
  "userPage.table.email": "電子郵件",
  "userPage.table.role": "角色",
  "userPage.table.status": "狀態",
  "userPage.table.action": "操作",

  "userPage.btn.addUser": "新增用戶",
};

// 問題回報頁面
const reportIssue = {
  "reportIssue.title": "問題回報",
  "reportIssue.subtitle": "遇到問題或有建議嗎？請告訴我們，我們會盡快處理您的回饋。",

  "reportIssue.types.bug.title": "錯誤回報",
  "reportIssue.types.bug.description": "回報系統錯誤、功能異常或其他技術問題",

  "reportIssue.types.feature.title": "功能建議",
  "reportIssue.types.feature.description": "提出新功能想法或改善現有功能的建議",

  "reportIssue.types.content.title": "內容問題",
  "reportIssue.types.content.description": "回報題目錯誤、概念說明不清楚等內容問題",

  "reportIssue.form.title": "提交問題回報",
  "reportIssue.form.issueType": "問題類型 *",
  "reportIssue.form.issueTypePlaceholder": "選擇問題類型",
  "reportIssue.form.priority": "優先級",
  "reportIssue.form.priorityPlaceholder": "選擇優先級",
  "reportIssue.form.issueTitle": "問題標題 *",
  "reportIssue.form.issueTitlePlaceholder": "簡短描述您遇到的問題",
  "reportIssue.form.description": "詳細描述 *",
  "reportIssue.form.descriptionPlaceholder":
    "請詳細描述問題的情況，包括：\n1. 您在做什麼時遇到這個問題？\n2. 預期的結果是什麼？\n3. 實際發生了什麼？\n4. 如何重現這個問題？",
  "reportIssue.form.email": "您的電子郵件",
  "reportIssue.form.emailPlaceholder": "your@email.com",
  "reportIssue.form.emailHelp": "選填，用於回覆您的問題",
  "reportIssue.form.browser": "瀏覽器資訊",
  "reportIssue.form.browserPlaceholder": "Chrome 120, Safari 17, Firefox 121...",
  "reportIssue.form.browserHelp": "選填，有助於我們診斷問題",
  "reportIssue.form.screenshot": "螢幕截圖或附件",
  "reportIssue.form.screenshotHelp": "點擊上傳檔案或拖拽檔案到此處",
  "reportIssue.form.screenshotFormat": "支援 PNG, JPG, GIF, PDF 格式，最大 10MB",

  "reportIssue.form.submit": "提交回報",

  "reportIssue.options.bug": "🐛 錯誤回報",
  "reportIssue.options.feature": "💡 功能建議",
  "reportIssue.options.content": "⚠️ 內容問題",
  "reportIssue.options.other": "📝 其他",

  "reportIssue.priority.low": "🟢 低 - 一般問題",
  "reportIssue.priority.medium": "🟡 中 - 影響使用體驗",
  "reportIssue.priority.high": "🟠 高 - 重要功能異常",
  "reportIssue.priority.critical": "🔴 緊急 - 系統無法使用",
};

// 遊樂場頁面
const playground = {
  "playground.defaultContent":
    "這是 **Markdown** 語法\n行內公式：$E = mc^2$\n區塊公式：$$\\int_0^\\infty x^2 dx$$",
  "playground.nativeMarkdown": "原生 Markdown 渲染",
  "playground.reactMarkdown": "React Markdown 渲染",
};

// 後台 管理員 頁面
const adminPage = {
  "adminPage.title": "MathHub 管理",

  "adminPage.menuItem.userInfo": "個人資料",
  "adminPage.menuItem.userStatistics": "解題統計",
  "adminPage.menuItem.accountSettings": "帳號設定",

  // 後台 管理員 頁面 - 公告管理
  ...{
    "noticePage.title": "公告編輯",
    "noticePage.btn.addNotice": "新增公告",

    "noticePage.table.id": "ID",
    "noticePage.table.title": "標題",
    "noticePage.table.createdAt": "發布日期",
    "noticePage.table.status": "狀態",
    "noticePage.table.action": "操作",

    "noticePage.form.title": "公告標題",
    "noticePage.form.content": "公告內容",
    "noticePage.form.pin": "置頂公告",

    "noticePage.btn.publish": "發布公告",
    "noticePage.btn.draft": "儲存草稿",
  },
};

const zh_TW = Object.assign(
  {},
  env,
  common,
  navigate,
  slot,
  status,
  header,
  footer,
  pagination,
  login,
  home,
  userPage,
  reportIssue,
  playground,

  // 後台 管理員 頁面
  adminPage,
);

export default zh_TW;
