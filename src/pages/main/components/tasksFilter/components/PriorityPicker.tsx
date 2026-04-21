import { type FC } from 'react';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeFilter, selectPriority } from '@/store/tasksSlice/tasksSlice';
import { ALL_OPTION } from '@/constants';
import { PRIORITY_UI_MAP } from '@/constants/ui.ts';
import { TaskPriority } from '@/types/tasks.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';

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

        {Object.values(TaskPriority).map((priority) => (
          <SelectItem key={priority} value={priority}>
            {PRIORITY_UI_MAP[priority].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
