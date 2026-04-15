import type { Task } from '@/types/tasks.ts';

export const PATHS = {
  HOME: '/',
  TASKS: '/tasks',
  TASK_DETAILS: (id: Task['id']) => `/tasks/${id}`,
} as const;
