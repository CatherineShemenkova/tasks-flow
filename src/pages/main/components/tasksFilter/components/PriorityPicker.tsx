import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { onFilterChange } from '@/store/tasksSlice';
import { ALL_OPTION } from '@/constants';
import { PRIORITY_UI_MAP } from '@/constants/ui.ts';
import { TaskPriority } from '@/constants/tasks.ts';

interface PriorityPickerProps {
  value: string;
}

export const PriorityPicker: FC<PriorityPickerProps> = ({ value }) => {
  const dispatch = useDispatch();

  const handleSelectPriority = (priority: string) => {
    dispatch(onFilterChange({ priority }));
  };

  return (
    <Select value={value} onValueChange={handleSelectPriority}>
      <SelectTrigger className="h-[38px]! w-full">
        <ListFilter />
        <SelectValue placeholder="Priority" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_OPTION}>All Priority</SelectItem>
        <SelectItem value={TaskPriority.HIGH}>{PRIORITY_UI_MAP[TaskPriority.HIGH].label}</SelectItem>
        <SelectItem value={TaskPriority.MEDIUM}>{PRIORITY_UI_MAP[TaskPriority.MEDIUM].label}</SelectItem>
        <SelectItem value={TaskPriority.LOW}>{PRIORITY_UI_MAP[TaskPriority.LOW].label}</SelectItem>
      </SelectContent>
    </Select>
  );
};
