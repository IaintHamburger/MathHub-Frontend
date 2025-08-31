import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginRouteGuard, PermissionDenied, RouteGuard } from "@/components/RouteGuard/RouteGuard";
// Admin 子頁面 import
import AdminPage from "@/pages/AdminPage/AdminPage";
import CommentsPage from "@/pages/AdminPage/AdminSubPages/CommentsPage";
import DashboardPage from "@/pages/AdminPage/AdminSubPages/DashboardPage";
import NoticePage from "@/pages/AdminPage/AdminSubPages/NoticePage";
import PermissionPage from "@/pages/AdminPage/AdminSubPages/PermissionPage";
import ProblemsAddPage from "@/pages/AdminPage/AdminSubPages/ProblemsAddPage";
import ProblemsStatusPage from "@/pages/AdminPage/AdminSubPages/ProblemsStatusPage";
import ReportsPage from "@/pages/AdminPage/AdminSubPages/ReportsPage";
import SettingsPage from "@/pages/AdminPage/AdminSubPages/SettingsPage";
import UsersPage from "@/pages/AdminPage/AdminSubPages/UsersPage";
import { type RouteConfig, routes } from "./routeConfig";

// 載入中組件
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600" />
  </div>
);

// 渲染路由組件
const renderRoute = (route: RouteConfig) => {
  const RouteComponent = route.element;

  // 登入頁面特殊處理
  if (["/login", "/register"].includes(route.path)) {
    return (
      <LoginRouteGuard>
        <RouteComponent />
      </LoginRouteGuard>
    );
  }

  // 需要認證的路由
  if (route.requireAuth) {
    return (
      <RouteGuard
        requireAuth={true}
        redirectTo={route.redirectTo || "/login"}
        permissions={route.permissions}
        fallback={<PermissionDenied />}
      >
        <RouteComponent />
      </RouteGuard>
    );
  }

  // 公開路由
  return <RouteComponent />;
};

export default function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* 遍歷一般路由，但排除 admin 相關路由 */}
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={renderRoute(route)} />
        ))}

        {/* Admin 路由專門處理 */}
        <Route
          path="/admin"
          element={
            <RouteGuard
              requireAuth={true}
              redirectTo="/login"
              permissions={[
                "allowGetNoticeData",
                "allowCreateNotice",
                "allowEditNotice",
                "allowDeleteNotice",
              ]}
              fallback={<PermissionDenied />}
            >
              <AdminPage />
            </RouteGuard>
          }
        >
          {/* 預設重導向到 dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          {/* Admin 子路由 */}
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="problemsAdd" element={<ProblemsAddPage />} />
          <Route path="problemsStatus" element={<ProblemsStatusPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="permission" element={<PermissionPage />} />
          <Route path="settings" element={<SettingsPage />} />

          {/* 無效的 admin 子路徑重定向到 /admin */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Route>

        {/* 其他無效路徑重定向到首頁 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
