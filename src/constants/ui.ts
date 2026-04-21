import type { ComponentType } from 'react';
import { Circle, CircleCheckBig, Clock } from 'lucide-react';

import { SortOption, TaskPriority, TaskStatus } from '@/types/tasks.ts';
import type { WithClassName } from '@/types/shared.ts';

interface PriorityConfig {
  label: string;
  ui: string;
}

export const PRIORITY_UI_MAP: Record<TaskPriority, PriorityConfig> = {
  [TaskPriority.LOW]: { label: 'Low', ui: 'border-priority-low/50 bg-priority-low/20 text-priority-low' },
  [TaskPriority.MEDIUM]: {
    label: 'Medium',
    ui: 'border-priority-medium/50 bg-priority-medium/20 text-priority-medium',
  },
  [TaskPriority.HIGH]: { label: 'High', ui: 'border-priority-high/50 bg-priority-high/20 text-priority-high' },
};

interface StatusConfig {
  label: string;
  ui: string;
  icon: ComponentType<WithClassName>;
}

export const STATUS_UI_MAP: Record<TaskStatus, StatusConfig> = {
  [TaskStatus.TODO]: {
    label: 'To Do',
    icon: Circle,
    ui: 'bg-status-todo/20 text-status-todo',
  },
  [TaskStatus.IN_PROGRESS]: {
    label: 'In Progress',
    icon: Clock,
    ui: 'bg-status-inprogress/20 text-status-inprogress',
  },
  [TaskStatus.DONE]: {
    label: 'Done',
    icon: CircleCheckBig,
    ui: 'bg-status-done/20 text-status-done',
  },
};

interface SortConfig {
  label: string;
}

export const SORT_UI_MAP: Record<SortOption, SortConfig> = {
  [SortOption.CREATED_AT_DESC]: {
    label: 'Created: Newest',
  },
  [SortOption.CREATED_AT_ASC]: {
    label: 'Created: Oldest',
  },
  [SortOption.DEADLINE_ASC]: {
    label: 'Deadline: Soonest',
  },
  [SortOption.DEADLINE_DESC]: {
    label: 'Deadline: Latest',
  },
};
