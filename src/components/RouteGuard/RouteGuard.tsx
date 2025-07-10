import { useAuth } from "@/hooks/useAuth";
import { useRoutePermission } from "@/hooks/useRouteGuard";
import { tokenUtils } from "@/lib/cookieUtils";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  permissions?: string[];
  requireAllPermissions?: boolean; // true: 需要所有權限, false: 需要任一權限
  fallback?: ReactNode; // 權限不足時的替代內容
}

export const RouteGuard = ({
  children,
  requireAuth = false,
  redirectTo = "/login",
  permissions = [],
  requireAllPermissions = false,
  fallback,
}: RouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  const hasIdToken = !!tokenUtils.getIdToken();
  const { hasPermission, hasAllPermissions } = useRoutePermission(permissions);

  // 檢查是否已登入
  const isLoggedIn = isAuthenticated || hasIdToken;

  // 檢查認證狀態
  if (requireAuth && !isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  // 檢查權限
  if (permissions.length > 0) {
    const hasRequiredPermission = requireAllPermissions ? hasAllPermissions : hasPermission;

    if (!hasRequiredPermission) {
      // 如果有 fallback 內容，顯示 fallback
      if (fallback) {
        return <>{fallback}</>;
      }

      // 否則重定向到首頁
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
};

// 登入頁面專用保護組件
interface LoginRouteGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export const LoginRouteGuard = ({ children, redirectTo = "/" }: LoginRouteGuardProps) => {
  const { isAuthenticated } = useAuth();
  const hasIdToken = !!tokenUtils.getIdToken();

  // 檢查是否已登入
  const isLoggedIn = isAuthenticated || hasIdToken;

  // 如果已登入，重定向到指定頁面
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

// 權限不足時的預設組件
export const PermissionDenied = () => (
  <div className="flex flex-col items-center justify-center min-h-screen">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">權限不足</h1>
      <p className="text-gray-600 mb-4">您沒有權限訪問此頁面</p>
      <Navigate to="/" replace />
    </div>
  </div>
);
