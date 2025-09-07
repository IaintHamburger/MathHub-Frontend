import { CheckCircle, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/shadcn-utils";

const Toast = ({
  id = "",
  type = "success", // success | error | warning (default: 'success')
  message = "",
  msBeforeClose = 5000, // milliseconds (default: 5000)
  onClose = () => {},
  isShowAtBottom = false, // (default: false)
}) => {
  const [startCounter, setStartCounter] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 清除之前的 timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // 每次組件重新渲染時，立即重置動畫狀態
    setIsVisible(false);
    setIsLeaving(false);
    setStartCounter(true);

    // 立即觸發進入動畫，不需要延遲
    setIsVisible(true);
  }, []); // 當 id 改變時重新觸發動畫

  useEffect(() => {
    if (startCounter && isVisible) {
      timeoutRef.current = setTimeout(() => {
        setIsLeaving(true);

        // 等待退出動畫完成後才真正移除
        setTimeout(() => {
          onClose();
          setIsLeaving(false);
        }, 300); // 動畫持續時間
      }, msBeforeClose || 5000);

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [startCounter, isVisible, msBeforeClose, onClose]);

  const getIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5 flex-shrink-0" };

    switch (type) {
      case "success":
        return <CheckCircle {...iconProps} />;
      case "error":
        return <XCircle {...iconProps} />;
      default:
        return <CheckCircle {...iconProps} />;
    }
  };

  const getToastStyles = (type: string) => {
    switch (type) {
      case "success":
        return {
          container: "bg-card border-green-200 dark:border-green-800",
          icon: "text-green-600 dark:text-green-400",
          text: "text-card-foreground",
        };
      case "error":
        return {
          container: "bg-card border-destructive/20 dark:border-destructive/30",
          icon: "text-destructive",
          text: "text-card-foreground",
        };
      default:
        return {
          container: "bg-card border-border",
          icon: "text-primary",
          text: "text-card-foreground",
        };
    }
  };

  const styles = getToastStyles(type);

  return (
    <div
      id={id}
      className={cn(
        // 基本樣式 - 使用 shadcn 設計系統
        "w-fit max-w-sm fixed left-1/2 z-[1600] rounded-lg border shadow-lg",
        "px-4 py-3 flex items-center gap-3",
        styles.container,
        // 位置
        isShowAtBottom ? "bottom-6 top-auto" : "top-6",
        // 動畫狀態
        {
          "opacity-0 -translate-x-1/2 -translate-y-2 scale-95": !isVisible && !isLeaving,
          "opacity-100 -translate-x-1/2 translate-y-0 scale-100 transition-all duration-300 ease-out":
            isVisible && !isLeaving,
          "opacity-0 -translate-x-1/2 -translate-y-2 scale-95 transition-all duration-300 ease-out":
            isLeaving,
        },
      )}
    >
      <div className={cn("flex-shrink-0 mt-0.5", styles.icon)}>{getIcon(type)}</div>

      <div className="flex-1 min-w-0">
        <p className={cn("text-sm font-medium leading-5", styles.text)}>{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className={cn(
          "flex-shrink-0 p-1 rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          styles.text,
        )}
        aria-label="關閉通知"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
