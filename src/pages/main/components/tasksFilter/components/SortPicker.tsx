import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowUpDown } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { onSortChange } from '@/store/tasksSlice';
import { SortOption } from '@/constants/tasks.ts';

interface SortPickerProps {
  value: string;
}

export const SortPicker: FC<SortPickerProps> = ({ value }) => {
  const dispatch = useDispatch();

  const handleSort = (sort: SortOption) => {
    dispatch(onSortChange(sort));
  };

  return (
    <Select value={value} onValueChange={handleSort}>
      <SelectTrigger className="h-[38px]! w-full">
        <ArrowUpDown />
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={SortOption.CREATEDAT_DESC}>Created: Newest</SelectItem>
        <SelectItem value={SortOption.CREATEDAT_ASC}>Created: Oldest</SelectItem>
        <SelectItem value={SortOption.DEADLINE_ASC}>Deadline: Soonest</SelectItem>
        <SelectItem value={SortOption.DEADLINE_DESC}>Deadline: Latest</SelectItem>
      </SelectContent>
    </Select>
  );
};
