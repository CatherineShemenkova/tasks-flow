import { isBefore, startOfDay } from 'date-fns';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { type TaskTag, type Task } from '@/types/tasks.ts';
import { TaskStatus } from '@/constants/tasks.ts';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function isOverdue(task: Task): boolean {
  if (task.status === TaskStatus.DONE) return false;

  return isBefore(new Date(task.deadline), startOfDay(new Date()));
}

export function mapFromTags(tags?: TaskTag[]): Record<TaskTag['id'], TaskTag> {
  if (!tags) return {};

  return tags.reduce(
    (acc, cur) => {
      acc[cur.id] = cur;
      return acc;
    },
    {} as Record<TaskTag['id'], TaskTag>
  );
}
