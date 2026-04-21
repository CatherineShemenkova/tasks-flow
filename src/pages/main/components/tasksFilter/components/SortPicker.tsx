import type { FC } from 'react';
import { ArrowUpDown } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeSort, selectTasksSort } from '@/store/tasksSlice/tasksSlice';
import { SortOption } from '@/types/tasks.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { SORT_UI_MAP } from '@/constants/ui.ts';

export const SortPicker: FC = () => {
  const dispatch = useAppDispatch();

  const sort = useAppSelector(selectTasksSort);

  const handleSort = (sort: SortOption) => {
    dispatch(changeSort(sort));
  };

  return (
    <Select value={sort} onValueChange={handleSort}>
      <SelectTrigger className="h-9! w-full">
        <ArrowUpDown />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent position="popper">
        {Object.values(SortOption).map((sort) => (
          <SelectItem key={sort} value={sort}>
            {SORT_UI_MAP[sort].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
