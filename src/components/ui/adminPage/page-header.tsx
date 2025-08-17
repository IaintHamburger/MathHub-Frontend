import type { ReactNode } from "react";
import { Button } from "../button";

interface PageHeaderProps {
  actionButton?: {
    label: string;
    onClick: () => void;
    variant?: "default" | "outline" | "ghost";
    className?: string;
  };
  children?: ReactNode;
}

export function PageHeader({ actionButton, children }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        {children}
        {actionButton && (
          <Button
            onClick={actionButton.onClick}
            variant={actionButton.variant || "default"}
            className={actionButton.className || "bg-blue-600 hover:bg-blue-700"}
          >
            {actionButton.label}
          </Button>
        )}
      </div>
    </div>
  );
}
