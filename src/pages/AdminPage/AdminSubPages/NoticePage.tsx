import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import NoticeForm from "@/components/NoticeForm/NoticeForm";
import type { TableColumn } from "@/components/ui/adminPage/data-table";
import { StatusRenderer } from "@/components/ui/table-renderers";
import { useDataTable } from "@/hooks/useDataTable";
import { type ActionConfig, AdminPageLayout } from "@/pages/AdminPage/AdminPageLayout";
import { noticeAPI } from "@/services/noticeService";
import type { NoticeCreateRequest, NoticeItem, NoticeUpdateRequest } from "@/types/noticeApi";

export default function NoticePage() {
  const { t } = useTranslation();

  const initialCreateData = useMemo(
    () => ({
      title: "",
      content: "",
      status: "draft",
      pin: false,
      scheduleAt: 0,
    }),
    [],
  );

  const [currentData, setCurrentData] = useState<NoticeCreateRequest | NoticeUpdateRequest | null>(
    initialCreateData as NoticeCreateRequest,
  );

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
    // biome-ignore lint/correctness/noUnusedVariables: 搜尋功能暫時未實作
    handleSearchChange,
    // biome-ignore lint/correctness/noUnusedVariables: 排序功能暫時未實作
    handleSortChange,
    refreshData,
  } = useDataTable<NoticeItem>(apiCall, {
    filter: {},
    sort: { createdAt: -1 },
    projection: {},
  });

  const handleNew = () => {
    setCurrentData(initialCreateData as NoticeCreateRequest);
  };

  const handleEdit = (row: NoticeItem) => {
    // biome-ignore lint/correctness/noUnusedVariables: creator 欄位不需要在編輯時使用
    const { createdAt, updatedAt, creator, ...rest } = row;

    setCurrentData(rest as NoticeUpdateRequest);
  };

  const handlePublish = async (row: NoticeItem) => {
    // biome-ignore lint/correctness/noUnusedVariables: creator 欄位不需要在發布時使用
    const { createdAt, updatedAt, creator, ...rest } = row;

    const postData = {
      ...rest,
      status: "public",
    };

    const res = await noticeAPI.updateNotice(postData as NoticeUpdateRequest);
    if (res.success) {
      refreshData();
    }
  };

  const handleDelete = async (row: NoticeItem) => {
    const res = await noticeAPI.deleteNotice({ id: row.id });
    if (res.success) {
      refreshData();
    }
  };

  const onSubmitData = async (data: NoticeCreateRequest | NoticeUpdateRequest) => {
    if ("id" in data) {
      const res = await noticeAPI.updateNotice(data as NoticeUpdateRequest);
      if (res?.success) {
        refreshData();
      }
    } else {
      const res = await noticeAPI.createNotice(data as NoticeCreateRequest);
      if (res?.success) {
        refreshData();
      }
    }
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
      fieldKey: "createdAt",
      label: t("noticePage.table.createdAt"),
      render: (value) => new Date(value).toLocaleDateString("zh-TW"),
    },
    {
      fieldKey: "status",
      label: t("noticePage.table.status"),
      render: (value) => (
        <StatusRenderer
          value={value}
          statusMap={{
            public: { label: t("status.public"), className: "bg-green-500/20 text-green-400" },
            draft: { label: t("status.draft"), className: "bg-slate-500/20 text-slate-400" },
          }}
        />
      ),
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
      actionButton={{
        label: t("noticePage.btn.addNotice"),
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
      <NoticeForm
        currentData={currentData as NoticeCreateRequest | NoticeUpdateRequest | null}
        setCurrentData={
          setCurrentData as (data: NoticeCreateRequest | NoticeUpdateRequest | null) => void
        }
        onSubmitData={onSubmitData}
      />
    </AdminPageLayout>
  );
}
