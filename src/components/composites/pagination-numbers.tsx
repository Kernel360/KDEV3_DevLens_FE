import { PaginationLink, PaginationItem } from "@ui";

export default function PaginationNumbers({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const maxVisible = 5;

  let visiblePages = pages;
  if (totalPages > maxVisible) {
    const start = Math.max(
      Math.min(
        currentPage - Math.floor(maxVisible / 2),
        totalPages - maxVisible + 1,
      ),
      1,
    );
    visiblePages = pages.slice(start - 1, start - 1 + maxVisible);
  }

  return (
    <>
      {visiblePages.map((pageNum) => (
        <PaginationItem key={pageNum}>
          <PaginationLink
            onClick={() => onPageChange(pageNum)}
            isActive={currentPage === pageNum}
          >
            {pageNum}
          </PaginationLink>
        </PaginationItem>
      ))}
    </>
  );
}
