import { Button } from "./button";

// 狀態標籤渲染器
export function StatusRenderer({
  value,
  statusMap,
}: {
  value: string | number;
  statusMap: Record<string | number, { label: string; className: string }>;
}) {
  const status = statusMap[value];
  if (!status) return <span className="text-slate-400">未知狀態</span>;

  return (
    <span className={`px-2 py-1 rounded-full text-xs ${status.className}`}>{status.label}</span>
  );
}

// 操作按鈕渲染器
export function ActionButtonsRenderer({
  actions,
  row,
  rowIndex,
}: {
  actions: Array<{
    label: string;
    onClick: (row: any, index: number) => void;
    variant?: "default" | "outline" | "ghost";
    className?: string;
    disabled?: boolean;
  }>;
  row: any;
  rowIndex: number;
}) {
  return (
    <div className="flex space-x-2">
      {actions.map((action, index) => (
        <Button
          key={`${action.label}-${index}`}
          variant={action.variant || "ghost"}
          size="sm"
          onClick={() => action.onClick(row, rowIndex)}
          disabled={action.disabled}
          className={action.className}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}

// 日期渲染器
export function DateRenderer({ value }: { value: string | Date }) {
  if (!value) return <span className="text-slate-400">-</span>;

  const date = new Date(value);
  if (isNaN(date.getTime())) return <span className="text-slate-400">無效日期</span>;

  return <span>{date.toLocaleDateString("zh-TW")}</span>;
}

// 數字渲染器
export function NumberRenderer({
  value,
  format,
}: {
  value: number;
  format?: "currency" | "percentage" | "decimal";
}) {
  if (value == null) return <span className="text-slate-400">-</span>;

  switch (format) {
    case "currency":
      return <span>{value.toLocaleString("zh-TW", { style: "currency", currency: "TWD" })}</span>;
    case "percentage":
      return <span>{value.toFixed(2)}%</span>;
    case "decimal":
      return <span>{value.toFixed(2)}</span>;
    default:
      return <span>{value.toLocaleString("zh-TW")}</span>;
  }
}

// 文字截斷渲染器
export function TruncatedTextRenderer({
  value,
  maxLength = 50,
}: {
  value: string;
  maxLength?: number;
}) {
  if (!value) return <span className="text-slate-400">-</span>;

  if (value.length <= maxLength) {
    return <span>{value}</span>;
  }

  return <span title={value}>{value.substring(0, maxLength)}...</span>;
}

// 頭像渲染器
export function AvatarRenderer({ value, fallback }: { value?: string; fallback: string }) {
  if (value) {
    return (
      <div className="flex items-center space-x-2">
        <img src={value} alt="avatar" className="w-8 h-8 rounded-full" />
        <span>{fallback}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300">
        {fallback.charAt(0).toUpperCase()}
      </div>
      <span>{fallback}</span>
    </div>
  );
}
