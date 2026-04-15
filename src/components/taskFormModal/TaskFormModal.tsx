import { type FC, type PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog.tsx';
import { TaskForm } from './form/TaskForm.tsx';
import { type Task } from '@/types/tasks.ts';

interface TaskFormModalProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  task?: Task;
}

export const TaskFormModal: FC<PropsWithChildren<TaskFormModalProps>> = ({ task, children, isOpen, onOpenChange }) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>{children}</DialogTrigger>

    <DialogContent className="max-h-[95vh] overflow-y-scroll" onOpenAutoFocus={(e) => e.preventDefault()}>
      <TaskForm task={task} />
    </DialogContent>
  </Dialog>
);
