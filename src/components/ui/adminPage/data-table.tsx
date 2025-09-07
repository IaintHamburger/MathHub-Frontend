import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "../card";

export interface TableColumn<T = any> {
  fieldKey: keyof T | string;
  label: string;
  width?: string;
  render?: (value: any, row: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage,
  className = "",
}: DataTableProps<T>) {
  const { t } = useTranslation();

  if (loading) {
    return (
      <Card className={`bg-slate-800 border-blue-400/20 ${className}`}>
        <CardContent className="p-8 text-center text-slate-400">{t("common.loading")}</CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className={`bg-slate-800 border-blue-400/20 ${className}`}>
        <CardContent className="p-8 text-center text-slate-400">
          {emptyMessage || t("common.noData")}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`bg-slate-800 border-blue-400/20 py-0 ${className}`}>
      <CardContent className="p-0">
        <div className="overflow-x-auto rounded-t-xl">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                {columns.map((column) => (
                  <th
                    key={String(column.fieldKey)}
                    className="text-left p-4 text-blue-200"
                    style={{ width: column.width }}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {data.map((row, rowIndex) => {
                const rowKey = `row-${rowIndex}`;
                return (
                  <tr key={rowKey} className="hover:bg-slate-700/50">
                    {columns.map((column) => (
                      <td
                        key={`${String(column.fieldKey)}-${rowKey}`}
                        className="p-4 text-slate-300"
                      >
                        {column.render
                          ? column.render(
                              typeof column.fieldKey === "string" &&
                                column.fieldKey in (row as object)
                                ? row[column.fieldKey as keyof T]
                                : undefined,
                              row,
                              rowIndex,
                            )
                          : typeof column.fieldKey === "string" &&
                              column.fieldKey in (row as object)
                            ? String(row[column.fieldKey as keyof T] ?? "")
                            : ""}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
