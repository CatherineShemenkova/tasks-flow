import type { TaskStatus, TaskPriority } from '@/constants/tasks.ts';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  deadline: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface TaskTag {
  id: string;
  name: string;
}
