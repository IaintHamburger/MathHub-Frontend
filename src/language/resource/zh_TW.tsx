const env = {
  "env.title": "MathHub"
}

const common = {


}

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
  "navigate.admin.announcements": "公告編輯",
  "navigate.admin.settings": "系統設定",
}

const header = {
  "header.user": "用戶",

  "header.register": "註冊",
  "header.login": "登入",
  "header.logout": "登出",
}

// 後台 管理員 頁面
const adminPage = {
  "adminPage.title": "MathHub 管理",

  "adminPage.menuItem.userInfo": "個人資料",
  "adminPage.menuItem.userStatistics": "解題統計",
  "adminPage.menuItem.accountSettings": "帳號設定",
}

const userPage = {
  "userPage.title": "用戶列表",

  "userPage.table.id": "ID",
  "userPage.table.name": "用戶名",
  "userPage.table.email": "電子郵件",
  "userPage.table.role": "角色",
  "userPage.table.status": "狀態",
  "userPage.table.action": "操作",

  "userPage.btn.addUser": "新增用戶",
}

const zh_TW = Object.assign(
  {},
  env,
  common,
  navigate,

  header,

  adminPage,
  userPage,
);

export default zh_TW;
