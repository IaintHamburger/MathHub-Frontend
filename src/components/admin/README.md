# Admin 組件系統

這個系統提供了可重複使用的管理頁面組件，讓你可以快速建立具有表格、分頁和操作功能的頁面。

## 主要組件

### 1. AdminPageLayout
整合了頁面標題、表格和分頁的完整佈局組件。

```tsx
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";

<AdminPageLayout
  title="用戶管理"
  actionButton={{
    label: "新增用戶",
    onClick: handleAddUser,
  }}
  columns={columns}
  data={users}
  currentPage={currentPage}
  totalPages={totalPages}
  totalItems={totalItems}
  pageSize={pageSize}
  onPageChange={setCurrentPage}
  onPageSizeChange={setPageSize}
  showPageSizeSelector
/>
```

### 2. DataTable
可配置的表格組件，支援自定義渲染。

```tsx
import { DataTable, TableColumn } from "@/components/ui/data-table";

const columns: TableColumn<User>[] = [
  {
    fieldKey: "id",
    label: "ID",
    width: "80px",
  },
  {
    fieldKey: "name",
    label: "姓名",
  },
  {
    fieldKey: "status",
    label: "狀態",
    render: (value) => (
      <StatusRenderer
        value={value}
        statusMap={{
          active: { label: "啟用", className: "bg-green-500/20 text-green-400" },
          inactive: { label: "停用", className: "bg-red-500/20 text-red-400" },
        }}
      />
    ),
  },
];
```

### 3. 渲染器組件
提供常用的表格內容渲染方式：

- `StatusRenderer`: 狀態標籤
- `ActionButtonsRenderer`: 操作按鈕
- `DateRenderer`: 日期格式化
- `NumberRenderer`: 數字格式化
- `TruncatedTextRenderer`: 文字截斷
- `AvatarRenderer`: 頭像顯示

### 4. Hooks

#### useDataTable
處理表格數據邏輯的 hook。

```tsx
import { useDataTable } from "@/hooks/useDataTable";

const {
  data,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  setCurrentPage,
  setPageSize,
  setSortConfig,
  addFilter,
} = useDataTable<User>(initialData, 10);
```

#### useApiData
處理 API 調用和數據獲取的 hook。

```tsx
import { useApiData } from "@/hooks/useApiData";

const {
  data,
  loading,
  currentPage,
  totalPages,
  handlePageChange,
  handlePageSizeChange,
  handleSort,
  handleFilter,
  handleSearch,
} = useApiData(fetchUsers, {
  initialPageSize: 20,
  autoFetch: true,
});
```

## 使用範例

### 基本表格頁面
```tsx
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import { useDataTable } from "@/hooks/useDataTable";

export default function UsersPage() {
  const {
    data,
    currentPage,
    pageSize,
    totalItems,
    totalPages,
    setCurrentPage,
    setPageSize,
  } = useDataTable<User>(users, 10);

  const columns = [
    { fieldKey: "id", label: "ID" },
    { fieldKey: "name", label: "姓名" },
    { fieldKey: "email", label: "Email" },
  ];

  return (
    <AdminPageLayout
      title="用戶管理"
      actionButton={{
        label: "新增用戶",
        onClick: handleAddUser,
      }}
      columns={columns}
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={setCurrentPage}
      onPageSizeChange={setPageSize}
    />
  );
}
```

### 帶有自定義渲染的表格
```tsx
const columns: TableColumn<User>[] = [
  { fieldKey: "id", label: "ID" },
  { fieldKey: "name", label: "姓名" },
  {
    fieldKey: "status",
    label: "狀態",
    render: (value) => (
      <StatusRenderer
        value={value}
        statusMap={{
          active: { label: "啟用", className: "bg-green-500/20 text-green-400" },
          inactive: { label: "停用", className: "bg-red-500/20 text-red-400" },
        }}
      />
    ),
  },
  {
    fieldKey: "id",
    label: "操作",
    render: (value, row) => (
      <ActionButtonsRenderer
        actions={[
          { label: "編輯", onClick: handleEdit, className: "text-blue-400" },
          { label: "刪除", onClick: handleDelete, className: "text-red-400" },
        ]}
        row={row}
        rowIndex={row.id}
      />
    ),
  },
];
```

## 配置選項

### TableColumn 配置
- `fieldKey`: 數據欄位名稱
- `label`: 欄位標籤
- `width`: 欄位寬度
- `render`: 自定義渲染函數

### AdminPageLayout 配置
- `title`: 頁面標題
- `actionButton`: 主要操作按鈕
- `headerChildren`: 標題區域的額外內容
- `columns`: 表格欄位配置
- `data`: 表格數據
- `loading`: 載入狀態
- `emptyMessage`: 空數據訊息
- 分頁相關配置

這個系統讓你可以快速建立一致的管理頁面，同時保持靈活性和可維護性。
