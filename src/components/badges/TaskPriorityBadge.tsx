import type { FC } from 'react';

import { Badge } from '@/components/ui/badge.tsx';
import { PRIORITY_UI_MAP } from '@/constants/ui.ts';
import { TaskPriority } from '@/types/tasks.ts';
import { cn } from '@/utils/ui';

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
