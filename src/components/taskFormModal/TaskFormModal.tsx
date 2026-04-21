import { type FC, type PropsWithChildren } from 'react';

import { Dialog, DialogContent } from '@/components/ui/dialog.tsx';
import { TaskForm } from './form/TaskForm.tsx';
import { type Task } from '@/types/tasks.ts';

interface TaskFormModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  task?: Task;
}

export const TaskFormModal: FC<PropsWithChildren<TaskFormModalProps>> = ({ task, children, isOpen, onOpenChange }) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    {children}

    <DialogContent
      className="max-h-[95vh] overflow-y-scroll"
      onOpenAutoFocus={(e) => e.preventDefault()}
      aria-description="Fill out the fields below to add a new task to your list"
    >
      <TaskForm task={task} />
    </DialogContent>
  </Dialog>
);
