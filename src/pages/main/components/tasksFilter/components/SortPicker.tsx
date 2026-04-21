import type { FC } from 'react';
import { ArrowUpDown } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeSort, selectTasksSort } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { SortOption } from '@/types/tasks.ts';

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
        <SelectItem value={SortOption.CREATED_AT_DESC}>Created: Newest</SelectItem>
        <SelectItem value={SortOption.CREATED_AT_ASC}>Created: Oldest</SelectItem>
        <SelectItem value={SortOption.DEADLINE_ASC}>Deadline: Soonest</SelectItem>
        <SelectItem value={SortOption.DEADLINE_DESC}>Deadline: Latest</SelectItem>
      </SelectContent>
    </Select>
  );
};
