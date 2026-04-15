import type { FC } from 'react';

import { usePartialUpdateTaskMutation } from '@/api/tasks/tasks.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { TaskStatusBadge } from '@/components/badges/TaskStatusBadge.tsx';
import { type Task } from '@/types/tasks.ts';
import { TaskStatus } from '@/constants/tasks.ts';

interface StatusSelectorProps {
  task: Task;
}

export const StatusSelector: FC<StatusSelectorProps> = ({ task }) => {
  const [updateTaskStatus] = usePartialUpdateTaskMutation();

  const handleStatusChange = (newStatus: TaskStatus) => {
    updateTaskStatus({ id: task.id, status: newStatus });
  };

  return (
    <Select value={task.status} onValueChange={handleStatusChange}>
      <SelectTrigger
        className="border-transparent bg-transparent p-0 hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent"
        size="sm"
      >
        <SelectValue>
          <TaskStatusBadge taskStatus={task.status} />
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value={TaskStatus.TODO}>
          <TaskStatusBadge taskStatus={TaskStatus.TODO} />
        </SelectItem>

        <SelectItem value={TaskStatus.IN_PROGRESS}>
          <TaskStatusBadge taskStatus={TaskStatus.IN_PROGRESS} />
        </SelectItem>

        <SelectItem value={TaskStatus.DONE}>
          <TaskStatusBadge taskStatus={TaskStatus.DONE} />
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
