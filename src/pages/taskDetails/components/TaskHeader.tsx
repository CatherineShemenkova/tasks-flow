import type { FC } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, Pencil, Trash2 } from 'lucide-react';

import { useDeleteTaskMutation } from '@/api/tasks/tasksApi.ts';
import { TaskPriorityBadge } from '@/components/badges/TaskPriorityBadge.tsx';
import { Badge } from '@/components/ui/badge.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TaskFormModal } from '@/components/taskFormModal/TaskFormModal.tsx';
import { Popconfirm } from '@/components/popconfirm/Popconfirm.tsx';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { PageTitle } from '@/components/page/Page.tsx';
import { PATHS } from '@/routes/paths.ts';
import type { Task } from '@/types/tasks.ts';

interface TaskHeaderProps {
  task: Task;
  overdue: boolean;
}

export const TaskHeader: FC<TaskHeaderProps> = ({ task, overdue }) => {
  const [deleteTask] = useDeleteTaskMutation();

  const navigate = useNavigate();

  const handleDelete = () => {
    deleteTask(task.id)
      .unwrap()
      .then(() => navigate(PATHS.HOME));
  };

  return (
    <div className="flex w-full justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <TaskPriorityBadge priority={task.priority} />

          {overdue && (
            <Badge variant="destructive">
              <AlertTriangle />
              Overdue
            </Badge>
          )}
        </div>

        <PageTitle title={task.title} subtitle={task.description} />
      </div>

      <div className="flex gap-2">
        <TaskFormModal task={task}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Edit task">
              <Pencil />
            </Button>
          </DialogTrigger>
        </TaskFormModal>

        <Popconfirm
          title="Delete Task"
          description="Are you sure you want to delete this task? This action cannot be undone."
          action="Delete"
          onAction={handleDelete}
        >
          <Button variant="destructive" size="icon" aria-label="Delete task">
            <Trash2 />
          </Button>
        </Popconfirm>
      </div>
    </div>
  );
};
