import type { ReactNode } from "react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DataTable, type TableColumn } from "@/components/ui/adminPage/data-table";
import { PageHeader } from "@/components/ui/adminPage/page-header";
import { Pagination } from "@/components/ui/adminPage/pagination";
import { ActionButtonsRenderer } from "@/components/ui/table-renderers";

export interface ActionConfig<T> {
  type: "edit" | "delete" | "publish" | "unpublish" | "view" | "custom";
  label: string;
  onClick: (row: T) => void;
  className?: string;
  icon?: string;
  variant?: "default" | "outline" | "ghost" | "destructive";
}

export interface AdminPageLayoutProps<T> {
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
    className?: string;
  };
  headerChildren?: ReactNode;
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  actions?: ActionConfig<T>[];
  // 分頁相關
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  showPageSizeSelector?: boolean;
  pageSizeOptions?: number[];
  className?: string;
}

export function AdminPageLayout<T>({
  actionButton,
  headerChildren,
  columns,
  data,
  loading = false,
  emptyMessage,
  actions = [],
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  showPageSizeSelector = false,
  pageSizeOptions = [10, 20, 50, 100],
  className = "",
}: AdminPageLayoutProps<T>) {
  const { t } = useTranslation();
  // 自動添加 actions column
  const columnsWithActions = useMemo(() => {
    if (actions.length === 0) return columns;

    return [
      ...columns,
      {
        fieldKey: "actions",
        label: t("common.actions"),
        width: "200px",
        render: (value, row) => (
          <ActionButtonsRenderer
            actions={actions.map((action) => ({
              label: action.label,
              onClick: () => action.onClick(row),
              className: action.className,
            }))}
            row={row}
            rowIndex={(row as any).id || 0}
          />
        ),
      },
    ];
  }, [columns, actions, t]);

  return (
    <div className={`space-y-6 ${className}`}>
      <PageHeader actionButton={actionButton}>{headerChildren}</PageHeader>

      <DataTable
        columns={columnsWithActions}
        data={data}
        loading={loading}
        emptyMessage={emptyMessage}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector={showPageSizeSelector}
        pageSizeOptions={pageSizeOptions}
      />
    </div>
  );
}
