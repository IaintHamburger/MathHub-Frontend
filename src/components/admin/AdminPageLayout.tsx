import type { ReactNode } from "react";
import { DataTable, type TableColumn } from "@/components/ui/data-table";
import { PageHeader } from "@/components/ui/page-header";
import { Pagination } from "@/components/ui/pagination";

export interface AdminPageLayoutProps<T> {
  title: string;
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
  title,
  actionButton,
  headerChildren,
  columns,
  data,
  loading = false,
  emptyMessage = "沒有資料",
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
  return (
    <div className={`space-y-6 ${className}`}>
      <PageHeader title={title} actionButton={actionButton}>
        {headerChildren}
      </PageHeader>

      <DataTable columns={columns} data={data} loading={loading} emptyMessage={emptyMessage} />

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
