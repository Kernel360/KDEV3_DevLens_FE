export interface ColumnDef<T> {
  id: string;
  header: string;
  className?: string;
  href?: (row: T) => string;
  cell?: ({ row }: { row: { original: T } }) => React.ReactNode;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  className?: string;
  onRowClick?: (row: T) => void;
  totalPages: number;
}
