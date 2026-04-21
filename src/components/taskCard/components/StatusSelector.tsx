import type { FC } from 'react';

import { usePartialUpdateTaskMutation } from '@/api/tasks/tasksApi.ts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { TaskStatusBadge } from '@/components/badges/TaskStatusBadge.tsx';
import { DelayedLoader } from '@/components/loader/Loader.tsx';
import { type Task, TaskStatus } from '@/types/tasks.ts';

interface StatusSelectorProps {
  task: Task;
}

export const StatusSelector: FC<StatusSelectorProps> = ({ task }) => {
  const [updateTaskStatus, { isLoading }] = usePartialUpdateTaskMutation();

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
          {isLoading && <DelayedLoader />}
        </SelectValue>
      </SelectTrigger>

      <SelectContent position="popper">
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
