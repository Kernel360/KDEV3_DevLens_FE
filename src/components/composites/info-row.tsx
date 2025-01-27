import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value?: ReactNode;
  className?: string;
  valueClassName?: string;
  isEditing?: boolean;
  onValueChange?: (value: string) => void;
}

export function InfoRow({
  label,
  value,
  className,
  valueClassName,
  isEditing = false,
  onValueChange,
}: InfoRowProps) {
  return (
    <div
      className={cn("grid grid-cols-[80px_1fr] items-center py-2", className)}
    >
      <div className="break-keep text-sm text-muted-foreground">{label}</div>
      {isEditing ? (
        <Input
          defaultValue={value as string}
          onChange={(e) => onValueChange?.(e.target.value)}
          className="h-8"
        />
      ) : (
        <div className={valueClassName}>{value || "-"}</div>
      )}
    </div>
  );
}
