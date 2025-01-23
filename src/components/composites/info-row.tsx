import { cn } from "@/lib/utils";

interface InfoRowProps {
  label: string;
  value?: string | number | null;
  className?: string;
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div
      className={cn("grid grid-cols-[80px_1fr] items-center py-2", className)}
    >
      <div className="text-sm text-muted-foreground">{label}</div>
      <div>{value || "-"}</div>
    </div>
  );
}
