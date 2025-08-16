import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { tokenUtils } from "@/lib/cookieUtils";
import { getRouteRedirect, isRouteProtected } from "@/routes/routeConfig";
import { useAuth } from "./useAuth";

export const useRouteGuard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const hasAccessToken = !!tokenUtils.getAccessToken();

  // 檢查是否已登入（優先使用 Redux 狀態，fallback 到 localStorage）
  const isLoggedIn = isAuthenticated || hasAccessToken;

  useEffect(() => {
    const currentPath = location.pathname;

    // 檢查當前路由是否需要認證
    if (isRouteProtected(currentPath) && !isLoggedIn) {
      const redirectTo = getRouteRedirect(currentPath) || "/login";
      navigate(redirectTo, { replace: true });
      return;
    }

    // 如果已登入且訪問登入頁面，重定向到首頁
    if (["/login", "/register"].includes(currentPath) && isLoggedIn) {
      navigate("/", { replace: true });
      return;
    }
  }, [location.pathname, isLoggedIn, navigate]);

  return {
    isLoggedIn,
    currentPath: location.pathname,
    isRouteProtected: (path: string) => isRouteProtected(path),
  };
};

// 路由權限檢查 hook
export const useRoutePermission = (requiredPermissions?: string[]) => {
  const { hasAnyPermission, hasAllPermissions } = useAuth();

  const checkPermission = () => {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // 預設使用 hasAnyPermission（任一權限即可）
    return hasAnyPermission(requiredPermissions);
  };

  const checkAllPermissions = () => {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    return hasAllPermissions(requiredPermissions);
  };

  return {
    hasPermission: checkPermission(),
    hasAllPermissions: checkAllPermissions(),
    hasAnyPermission: checkPermission(), // 與 hasPermission 相同，保持 API 一致性
    checkPermission,
    checkAllPermissions,
  };
};
