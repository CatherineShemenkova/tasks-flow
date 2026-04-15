import { type FC, Fragment, type MouseEventHandler, useState } from 'react';
import { NavLink } from 'react-router';
import { Calendar, Pencil } from 'lucide-react';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button.tsx';
import { TaskFormModal } from '@/components/taskFormModal/TaskFormModal.tsx';
import { TaskPriorityBadge } from '@/components/badges/TaskPriorityBadge.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { StatusSelector } from './components/StatusSelector.tsx';
import { OverdueMark } from './components/OverdueMark.tsx';
import { TaskTagsPicker } from './components/TaskTagsPicker.tsx';
import { type Task } from '@/types/tasks.ts';
import { cn, isOverdue } from '@/utils';
import { PATHS } from '@/routes/paths.ts';

interface TaskCardProps {
  task: Task;
}

export const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const [isFormOpen, setFormOpen] = useState(false);

  const overdue = isOverdue(task);

  const handleModalOpen: MouseEventHandler = (e) => {
    e.preventDefault();
    setFormOpen(true);
  };

  return (
    <Fragment>
      <NavLink
        to={PATHS.TASK_DETAILS(task.id)}
        className={cn(
          'group hover:border-primary/50 relative flex flex-col justify-between gap-3 rounded-lg border p-4 transition-all hover:shadow-md',
          overdue && 'border-destructive/50 bg-destructive/2 hover:border-destructive'
        )}
      >
        {overdue && <OverdueMark />}

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2">
            <h3 className="line-clamp-2 font-medium">{task.title}</h3>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                className="opacity-0 transition-opacity group-hover:opacity-100"
                size="icon"
                onClick={handleModalOpen}
              >
                <Pencil />
              </Button>

              <TaskPriorityBadge priority={task.priority} />
            </div>
          </div>

          <div className={cn('text-muted-foreground flex items-center gap-2 text-sm', overdue && 'text-destructive')}>
            <Calendar className="h-4 w-4" />
            <span>{format(task.deadline, 'PP')}</span>
          </div>

          {task.description && <p className="text-muted-foreground line-clamp-2 text-sm">{task.description}</p>}

          <TaskTagsPicker task={task} />
        </div>

        <div className="flex flex-col gap-3">
          <Separator />
          <StatusSelector task={task} />
        </div>
      </NavLink>

      <TaskFormModal task={task} isOpen={isFormOpen} onOpenChange={setFormOpen} />
    </Fragment>
  );
};
