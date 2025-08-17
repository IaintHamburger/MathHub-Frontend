import { useTranslation } from "react-i18next";
import type { TableColumn } from "@/components/ui/adminPage/data-table";
import { StatusRenderer } from "@/components/ui/table-renderers";
import { useDataTable } from "@/hooks/useDataTable";
import { type ActionConfig, AdminPageLayout } from "@/pages/AdminPage/AdminPageLayout";
import { noticeAPI } from "@/services/noticeService";
import type { NoticeItem } from "@/types/noticeApi";

export default function NoticePage() {
  const { t } = useTranslation();

  // 直接抄你的 NoticeRecordPage 邏輯
  const apiCall = async (postData: any) => {
    const res = await noticeAPI.getNoticeByPagination(postData);

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
    handleSearchChange,
    handleSortChange,
    refreshData,
  } = useDataTable<NoticeItem>(apiCall, {
    filter: {},
    sort: { createdAt: -1 },
    projection: {},
  });

  const handleAddNotice = () => {
    console.log("新增公告");
    // TODO: 實作新增公告邏輯
  };

  const handleEdit = (row: NoticeItem) => {
    console.log("編輯公告:", row.id);
    // TODO: 實作編輯邏輯
  };

  const handlePublish = (row: NoticeItem) => {
    console.log("發布公告:", row.id);
    // TODO: 實作發布邏輯
  };

  const handleDelete = (row: NoticeItem) => {
    console.log("刪除公告:", row.id);
    // TODO: 實作刪除邏輯
  };

  const columns: TableColumn<NoticeItem>[] = [
    {
      fieldKey: "id",
      label: t("noticePage.table.id"),
      width: "80px",
    },
    {
      fieldKey: "title",
      label: t("noticePage.table.title"),
    },
    {
      fieldKey: "creator",
      label: t("noticePage.table.creator"),
      render: (value) => value?.name || "",
    },
    {
      fieldKey: "status",
      label: t("noticePage.table.status"),
      render: (value) => (
        <StatusRenderer
          value={value}
          statusMap={{
            public: { label: "已發布", className: "bg-green-500/20 text-green-400" },
            draft: { label: "草稿", className: "bg-slate-500/20 text-slate-400" },
          }}
        />
      ),
    },
    {
      fieldKey: "createdAt",
      label: t("noticePage.table.createdAt"),
      render: (value) => new Date(value).toLocaleDateString("zh-TW"),
    },
  ];

  const actions: ActionConfig<NoticeItem>[] = [
    {
      type: "edit",
      label: t("common.edit"),
      onClick: handleEdit,
      className: "text-blue-400 hover:text-blue-300",
    },
    {
      type: "publish",
      label: t("common.publish"),
      onClick: handlePublish,
      className: "text-green-400 hover:text-green-300",
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
      // actionButton={{
      //   label: t("noticePage.btn.addNotice"),
      //   onClick: handleAddNotice,
      // }}
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
    />
  );
}
