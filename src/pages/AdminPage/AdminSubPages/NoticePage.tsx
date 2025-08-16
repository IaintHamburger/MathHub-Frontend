import { useTranslation } from "react-i18next";
import { AdminPageLayout } from "@/components/admin/AdminPageLayout";
import type { TableColumn } from "@/components/ui/data-table";
import { ActionButtonsRenderer, StatusRenderer } from "@/components/ui/table-renderers";
import { useDataTable } from "@/hooks/useDataTable";

interface Notice {
  id: number;
  title: string;
  date: string;
  status: "published" | "draft";
}

export default function NoticePage() {
  const { t } = useTranslation();

  // 模擬數據
  const mockData: Notice[] = [
    { id: 1, title: "系統公告 #1", date: "2023/06/11", status: "published" },
    { id: 2, title: "系統公告 #2", date: "2023/06/12", status: "draft" },
    { id: 3, title: "系統公告 #3", date: "2023/06/13", status: "published" },
    { id: 4, title: "系統公告 #4", date: "2023/06/14", status: "draft" },
  ];

  const { data, currentPage, pageSize, totalItems, totalPages, setCurrentPage, setPageSize } =
    useDataTable<Notice>(mockData, 10);

  const handleAddNotice = () => {
    console.log("新增公告");
    // TODO: 實作新增公告邏輯
  };

  const handleEdit = (row: Notice) => {
    console.log("編輯公告:", row.id);
    // TODO: 實作編輯邏輯
  };

  const handlePublish = (row: Notice) => {
    console.log("發布公告:", row.id);
    // TODO: 實作發布邏輯
  };

  const handleDelete = (row: Notice) => {
    console.log("刪除公告:", row.id);
    // TODO: 實作刪除邏輯
  };

  const columns: TableColumn<Notice>[] = [
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
      fieldKey: "date",
      label: t("noticePage.table.date"),
    },
    {
      fieldKey: "status",
      label: t("noticePage.table.status"),
      render: (value) => (
        <StatusRenderer
          value={value}
          statusMap={{
            published: { label: "已發布", className: "bg-green-500/20 text-green-400" },
            draft: { label: "草稿", className: "bg-slate-500/20 text-slate-400" },
          }}
        />
      ),
    },
    {
      fieldKey: "actions",
      label: t("noticePage.table.action"),
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
              label: "發布",
              onClick: handlePublish,
              className: "text-green-400 hover:text-green-300",
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
      title={t("noticePage.title")}
      actionButton={{
        label: t("noticePage.btn.addNotice"),
        onClick: handleAddNotice,
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
