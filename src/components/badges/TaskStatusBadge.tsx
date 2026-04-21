import { createElement, type FC } from 'react';

import { STATUS_UI_MAP } from '@/constants/ui.ts';
import { TaskStatus } from '@/types/tasks.ts';
import { cn } from '@/utils/ui.ts';

interface TaskStatusBadgeProps {
  taskStatus: TaskStatus;
}

export const TaskStatusBadge: FC<TaskStatusBadgeProps> = ({ taskStatus }) => {
  const status = STATUS_UI_MAP[taskStatus];

  return (
    <span className={cn('flex h-fit w-fit items-center gap-1.5 rounded-full py-1.5 pr-3 pl-2 text-xs', status.ui)}>
      {createElement(status.icon, { className: 'w-4 h-4' })}
      {status.label}
    </span>
  );
};
