import type { FC } from 'react';

import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination.tsx';
import { cn } from '@/utils';
import { PAGINATION } from '@/constants/pagination.ts';

interface PaginationProps {
  current: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ current, pageSize, total, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);

  const handlePrev = () => {
    onPageChange(Math.max(1, current - 1));
  };

  const handleNext = () => {
    onPageChange(Math.min(totalPages, current + 1));
  };

  return (
    <ShadcnPagination className="w-fit">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={cn(current === PAGINATION.DEFAULT_PAGE && 'pointer-events-none opacity-50')}
            onClick={handlePrev}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink onClick={() => onPageChange(page)} isActive={current === page}>
              {page}
            </PaginationLink>
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
