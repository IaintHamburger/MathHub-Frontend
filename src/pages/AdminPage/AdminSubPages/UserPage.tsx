import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import UserForm from "@/components/UserForm/UserForm";
import type { TableColumn } from "@/components/ui/adminPage/data-table";
import { StatusRenderer } from "@/components/ui/table-renderers";
import { useDataTable } from "@/hooks/useDataTable";
import { type ActionConfig, AdminPageLayout } from "@/pages/AdminPage/AdminPageLayout";
import { userAPI } from "@/services/userService";
import type { UserCreateRequest, UserItem, UserUpdateRequest } from "@/types/userApi";

export default function UserPage() {
  const { t } = useTranslation();

  const initialCreateData = useMemo(
    () => ({
      name: "",
      email: "",
      password: "",
      status: "",
      role: ["general"],
      birthday: Date.now(),
      grade: "",
      isActive: false,
    }),
    [],
  );

  const [currentData, setCurrentData] = useState<UserCreateRequest | UserUpdateRequest | null>(
    initialCreateData as UserCreateRequest,
  );

  const apiCall = async (postData: any) => {
    const res = await userAPI.getUserByPagination(postData);

    return {
      rows: res?.data || [],
      totalNum: res?.totalNum || 0,
    };
  };

  // 使用 useDataTable hook，設定初始參數
  const {
    data,
    loading,
    currentPage,
    pageSize,
    totalItems,
    handlePaginationChange,
    // biome-ignore lint/correctness/noUnusedVariables: 搜尋功能暫時未實作
    handleSearchChange,
    // biome-ignore lint/correctness/noUnusedVariables: 排序功能暫時未實作
    handleSortChange,
    refreshData,
  } = useDataTable<UserItem>(apiCall, {
    filter: {},
    sort: { createdAt: -1 },
    projection: {},
  });

  const handleNew = () => {
    setCurrentData(initialCreateData as UserCreateRequest);
  };

  const handleEdit = (row: UserItem) => {
    // biome-ignore lint/correctness/noUnusedVariables: creator 欄位不需要在編輯時使用
    const { createdAt, updatedAt, creator, ...rest } = row;

    setCurrentData(rest as UserUpdateRequest);
  };

  const handleDelete = async (row: UserItem) => {
    const res = await userAPI.deleteUser({ id: row.id });
    if (res?.success) {
      refreshData();
    }
  };

  const onSubmitData = async (data: UserCreateRequest | UserUpdateRequest) => {
    data.birthday = data.birthday ? dayjs(data.birthday).startOf("day").valueOf() : 0;

    console.log("onSubmitData", data);

    return;
    if ("id" in data) {
      const res = await userAPI.updateUser(data as UserUpdateRequest);
      if (res?.success) {
        refreshData();
      }
    } else {
      const res = await userAPI.createUser(data as UserCreateRequest);
      if (res?.success) {
        refreshData();
      }
    }
  };

  const columns: TableColumn<UserItem>[] = [
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
      render: (value) => (value.includes("admin") ? t("role.admin") : t("role.general")),
    },
    {
      fieldKey: "status",
      label: t("userPage.table.status"),
      render: (value) => (
        <StatusRenderer
          value={value}
          statusMap={{
            active: { label: t("status.active"), className: "bg-green-500/20 text-green-400" },
            inactive: { label: t("status.inactive"), className: "bg-red-500/20 text-red-400" },
          }}
        />
      ),
    },
  ];

  const actions: ActionConfig<UserItem>[] = [
    {
      type: "edit",
      label: t("common.edit"),
      onClick: handleEdit,
      className: "text-blue-400 hover:text-blue-300",
    },
    {
      type: "delete",
      label: t("common.delete"),
      onClick: handleDelete,
      className: "text-red-400 hover:text-red-300",
    },
  ];

  // 分頁處理函數
  const onPageChange = (page: number) => {
    const skip = (page - 1) * pageSize;
    handlePaginationChange(pageSize, skip);
  };

  const onPageSizeChange = (size: number) => {
    handlePaginationChange(size, 0);
  };

  return (
    <AdminPageLayout
      actionButton={{
        label: t("userPage.btn.addUser"),
        onClick: handleNew,
      }}
      columns={columns}
      data={data}
      loading={loading}
      currentPage={currentPage}
      totalPages={Math.ceil(totalItems / pageSize)}
      totalItems={totalItems}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      actions={actions}
    >
      <UserForm
        currentData={currentData}
        setCurrentData={setCurrentData}
        onSubmitData={onSubmitData}
        onClearData={() => setCurrentData(initialCreateData as UserCreateRequest)}
      />
    </AdminPageLayout>
  );
}
