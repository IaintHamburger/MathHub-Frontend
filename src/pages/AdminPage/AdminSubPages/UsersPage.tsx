import { useTranslation } from "react-i18next";
import type { TableColumn } from "@/components/ui/data-table";
import { ActionButtonsRenderer, StatusRenderer } from "@/components/ui/table-renderers";
import { useDataTable } from "@/hooks/useDataTable";
import { AdminPageLayout } from "@/pages/AdminPage/AdminPageLayout";

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
}

export default function UsersPage() {
  const { t } = useTranslation();

  // 模擬數據
  const mockData: User[] = [
    { id: 1, name: "用戶1", email: "user1@example.com", role: "admin", status: "active" },
    { id: 2, name: "用戶2", email: "user2@example.com", role: "user", status: "active" },
    { id: 3, name: "用戶3", email: "user3@example.com", role: "user", status: "inactive" },
    { id: 4, name: "用戶4", email: "user4@example.com", role: "user", status: "active" },
    { id: 5, name: "用戶5", email: "user5@example.com", role: "user", status: "inactive" },
  ];

  const { data, currentPage, pageSize, totalItems, totalPages, setCurrentPage, setPageSize } =
    useDataTable<User>(mockData, 10);

  const handleAddUser = () => {
    console.log("新增用戶");
    // TODO: 實作新增用戶邏輯
  };

  const handleEdit = (row: User) => {
    console.log("編輯用戶:", row.id);
    // TODO: 實作編輯邏輯
  };

  const handleDelete = (row: User) => {
    console.log("刪除用戶:", row.id);
    // TODO: 實作刪除邏輯
  };

  const columns: TableColumn<User>[] = [
    {
      fieldKey: "id",
      label: t("userPage.table.id"),
      width: "80px",
    },
    {
      fieldKey: "name",
      label: t("userPage.table.name"),
    },
    {
      fieldKey: "email",
      label: t("userPage.table.email"),
    },
    {
      fieldKey: "role",
      label: t("userPage.table.role"),
      render: (value) => (value === "admin" ? "管理員" : "一般用戶"),
    },
    {
      fieldKey: "status",
      label: t("userPage.table.status"),
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
      fieldKey: "actions",
      label: t("userPage.table.action"),
      width: "200px",
      render: (value, row) => (
        <ActionButtonsRenderer
          actions={[
            {
              label: "編輯",
              onClick: handleEdit,
              className: "text-blue-400 hover:text-blue-300",
            },
            {
              label: "刪除",
              onClick: handleDelete,
              className: "text-red-400 hover:text-red-300",
            },
          ]}
          row={row}
          rowIndex={row.id}
        />
      ),
    },
  ];

  return (
    <AdminPageLayout
      title={t("userPage.title")}
      actionButton={{
        label: t("userPage.btn.addUser"),
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
      showPageSizeSelector
    />
  );
}
