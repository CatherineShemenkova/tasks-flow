import { type FC } from 'react';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeFilter, selectPriority } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { ALL_OPTION } from '@/constants';
import { PRIORITY_UI_MAP } from '@/constants/ui.ts';
import { TaskPriority } from '@/types/tasks.ts';

export const PriorityPicker: FC = () => {
  const dispatch = useAppDispatch();

  const priority = useAppSelector(selectPriority);

  const handleSelectPriority = (priority: TaskPriority) => {
    dispatch(changeFilter({ priority }));
  };

  return (
    <Select value={priority} onValueChange={handleSelectPriority}>
      <SelectTrigger className="h-9! w-full">
        <ListFilter />
        <SelectValue placeholder="Priority" />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectItem value={ALL_OPTION}>All Priority</SelectItem>
        <SelectItem value={TaskPriority.HIGH}>{PRIORITY_UI_MAP[TaskPriority.HIGH].label}</SelectItem>
        <SelectItem value={TaskPriority.MEDIUM}>{PRIORITY_UI_MAP[TaskPriority.MEDIUM].label}</SelectItem>
        <SelectItem value={TaskPriority.LOW}>{PRIORITY_UI_MAP[TaskPriority.LOW].label}</SelectItem>
      </SelectContent>
    </Select>
  );
};
