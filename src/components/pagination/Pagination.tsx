import type { FC } from 'react';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { PAGINATION } from '@/constants/pagination.ts';
import { cn } from '@/utils/ui.ts';
import { ELLIPSIS_PAGE, getPages } from './helpers.ts';

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ current, pageSize, total, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const pages = getPages(current, totalPages);

  const handlePrev = () => {
    onPageChange(Math.max(PAGINATION.DEFAULT_PAGE, current - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, current + 1));
  };

  if (totalPages <= 1) return null;

  return (
    <ShadcnPagination className="w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(current === PAGINATION.DEFAULT_PAGE && 'pointer-events-none opacity-50')}
            onClick={handlePrev}
          />
        </PaginationItem>

        {pages.map((page, i) => (
          <PaginationItem key={i}>
            {page === ELLIPSIS_PAGE ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink onClick={() => onPageChange(page)} isActive={current === page}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            className={cn(current === totalPages && 'pointer-events-none opacity-50')}
            onClick={handleNext}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};
