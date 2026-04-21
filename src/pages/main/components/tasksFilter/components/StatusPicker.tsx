import { type FC } from 'react';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { changeFilter, selectStatus } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { ALL_OPTION } from '@/constants';
import { STATUS_UI_MAP } from '@/constants/ui.ts';
import { TaskStatus } from '@/types/tasks.ts';

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
        <SelectItem value={TaskStatus.TODO}>{STATUS_UI_MAP[TaskStatus.TODO].label}</SelectItem>
        <SelectItem value={TaskStatus.IN_PROGRESS}>{STATUS_UI_MAP[TaskStatus.IN_PROGRESS].label}</SelectItem>
        <SelectItem value={TaskStatus.DONE}>{STATUS_UI_MAP[TaskStatus.DONE].label}</SelectItem>
      </SelectContent>
    </Select>
  );
};
