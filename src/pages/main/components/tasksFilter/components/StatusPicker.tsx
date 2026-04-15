import { type FC } from 'react';
import { useDispatch } from 'react-redux';
import { ListFilter } from 'lucide-react';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { onFilterChange } from '@/store/tasksSlice';
import { ALL_OPTION } from '@/constants';
import { STATUS_UI_MAP } from '@/constants/ui.ts';
import { TaskStatus } from '@/constants/tasks.ts';

interface StatusPickerProps {
  value: string;
}

export const StatusPicker: FC<StatusPickerProps> = ({ value }) => {
  const dispatch = useDispatch();

  const handleSelectStatus = (status: string) => {
    dispatch(onFilterChange({ status }));
  };

  return (
    <Select value={value} onValueChange={handleSelectStatus}>
      <SelectTrigger className="h-[38px]! w-full">
        <ListFilter />
        <SelectValue placeholder="Status" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={ALL_OPTION}>All Status</SelectItem>
        <SelectItem value={TaskStatus.TODO}>{STATUS_UI_MAP[TaskStatus.TODO].label}</SelectItem>
        <SelectItem value={TaskStatus.IN_PROGRESS}>{STATUS_UI_MAP[TaskStatus.IN_PROGRESS].label}</SelectItem>
        <SelectItem value={TaskStatus.DONE}>{STATUS_UI_MAP[TaskStatus.DONE].label}</SelectItem>
      </SelectContent>
    </Select>
  );
};
