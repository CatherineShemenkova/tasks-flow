import { type FC } from 'react';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeFilter, selectStatus } from '@/store/tasksSlice/tasksSlice';
import { ALL_OPTION } from '@/constants';
import { STATUS_UI_MAP } from '@/constants/ui.ts';
import { TaskStatus } from '@/types/tasks.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';

export const StatusPicker: FC = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectStatus);

  const handleSelectStatus = (status: TaskStatus) => {
    dispatch(changeFilter({ status }));
  };

  return (
    <Select value={status} onValueChange={handleSelectStatus}>
      <SelectTrigger className="h-9! w-full">
        <ListFilter />
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent position="popper">
        <SelectItem value={ALL_OPTION}>All Statuses</SelectItem>

        {Object.values(TaskStatus).map((status) => (
          <SelectItem key={status} value={status}>
            {STATUS_UI_MAP[status].label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
