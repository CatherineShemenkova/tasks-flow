import type { FC } from 'react';

import { Badge } from '@/components/ui/badge.tsx';
import { TaskPriority } from '@/constants/tasks.ts';
import { PRIORITY_UI_MAP } from '@/constants/ui.ts';
import { cn } from '@/utils';

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

export const TaskPriorityBadge: FC<TaskPriorityBadgeProps> = ({ priority }) => {
  const config = PRIORITY_UI_MAP[priority];

  return (
    <Badge variant="outline" className={cn('pointer-events-none shrink-0', config.ui)}>
      {config.label}
    </Badge>
  );
};
