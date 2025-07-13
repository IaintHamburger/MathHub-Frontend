# 路由系統使用說明

## 概述

這個路由系統提供了以下功能：

- ✅ 懶加載（Lazy Loading）
- ✅ 權限判斷（Authentication & Authorization）
- ✅ 路由保護（Route Protection）
- ✅ 自動重定向（Auto Redirect）
- ✅ 404 處理（404 Handling）

## 路由配置

### 基本配置

在 `src/routes/routeConfig.ts` 中配置路由：

```typescript
export const routes: RouteConfig[] = [
	// 公開路由
	{
		path: '/',
		element: Home,
		title: '首頁',
		description: 'MathHub 首頁',
	},

	// 需要登入的路由
	{
		path: '/math',
		element: MathPage,
		requireAuth: true,
		redirectTo: '/login',
		title: '數學頁面',
		description: '數學學習頁面',
	},

	// 需要特定權限的路由
	{
		path: '/admin',
		element: AdminPage,
		requireAuth: true,
		redirectTo: '/login',
		permissions: ['admin'],
		title: '管理頁面',
		description: '管理員專用頁面',
	},
];
```

### 路由配置選項

| 選項          | 類型                | 說明               |
| ------------- | ------------------- | ------------------ |
| `path`        | string              | 路由路徑           |
| `element`     | LazyExoticComponent | 懶加載的組件       |
| `requireAuth` | boolean             | 是否需要登入       |
| `redirectTo`  | string              | 未登入時重定向路徑 |
| `permissions` | string[]            | 需要的權限列表     |
| `title`       | string              | 頁面標題           |
| `description` | string              | 頁面描述           |

## 使用方式

### 1. 基本路由保護

```tsx
// 在組件中使用 RouteGuard
import { RouteGuard } from '@/components/RouteGuard/RouteGuard';

const MyComponent = () => {
	return (
		<RouteGuard requireAuth={true} redirectTo='/login'>
			<div>需要登入才能看到的內容</div>
		</RouteGuard>
	);
};
```

### 2. 權限檢查

```tsx
// 檢查特定權限
<RouteGuard
  requireAuth={true}
  permissions={['admin', 'moderator']}
  fallback={<div>權限不足</div>}
>
  <AdminPanel />
</RouteGuard>

// 需要所有權限
<RouteGuard
  requireAuth={true}
  permissions={['admin', 'moderator']}
  requireAllPermissions={true}
>
  <SuperAdminPanel />
</RouteGuard>
```

### 3. 登入頁面保護

```tsx
// 已登入用戶不能訪問登入頁面
import { LoginRouteGuard } from '@/components/RouteGuard/RouteGuard';

const LoginPage = () => {
	return (
		<LoginRouteGuard>
			<LoginForm />
		</LoginRouteGuard>
	);
};
```

### 4. 使用 Hook 檢查權限

```tsx
import { useRoutePermission } from '@/hooks/useRouteGuard';

const MyComponent = () => {
	const { hasPermission, hasAllPermissions } = useRoutePermission(['admin', 'moderator']);

	if (!hasPermission) {
		return <div>權限不足</div>;
	}

	return <div>有權限的內容</div>;
};
```

## 認證狀態檢查

系統會按以下順序檢查登入狀態：

1. **Redux 狀態**：`useAuth().isAuthenticated`
2. **localStorage**：`tokenUtils.getIdToken()`

如果任一為 true，則認為用戶已登入。

## 自動重定向邏輯

- **未登入訪問受保護路由** → 重定向到 `/login`
- **已登入訪問登入頁面** → 重定向到 `/`
- **訪問不存在的路由** → 重定向到 `/`
- **權限不足** → 顯示權限不足頁面或重定向到 `/`

## 自定義權限檢查

```tsx
// 在組件內部檢查權限
import { useAuth } from '@/hooks/useAuth';

const MyComponent = () => {
	const { hasPermission, hasAnyPermission, hasAllPermissions } = useAuth();

	// 檢查單一權限
	if (!hasPermission('admin')) {
		return <div>需要管理員權限</div>;
	}

	// 檢查任一權限
	if (!hasAnyPermission(['admin', 'moderator'])) {
		return <div>需要管理員或版主權限</div>;
	}

	// 檢查所有權限
	if (!hasAllPermissions(['admin', 'moderator'])) {
		return <div>需要管理員和版主權限</div>;
	}

	return <div>有完整權限的內容</div>;
};
```

## 注意事項

1. **路由順序**：404 路由必須放在最後
2. **懶加載**：所有頁面組件都使用懶加載
3. **權限檢查**：權限檢查在認證檢查之後進行
4. **重定向**：使用 `replace` 模式避免瀏覽器歷史堆疊問題
5. **Token 檢查**：優先使用 Redux 狀態，fallback 到 localStorage
