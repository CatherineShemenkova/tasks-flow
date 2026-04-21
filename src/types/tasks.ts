import type { ISODateString } from '@/types/shared.ts';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags: Array<TaskTag['id']>;
  deadline: ISODateString;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface TaskTag {
  id: string;
  name: string;
}

export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum SortOption {
  CREATED_AT_DESC = '-createdAt',
  CREATED_AT_ASC = 'createdAt',
  DEADLINE_DESC = '-deadline',
  DEADLINE_ASC = 'deadline',
}
