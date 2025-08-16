import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginRouteGuard, PermissionDenied, RouteGuard } from "@/components/RouteGuard/RouteGuard";
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
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={renderRoute(route)} />
        ))}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
