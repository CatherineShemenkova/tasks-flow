import { isBefore, startOfDay } from 'date-fns';

import { type Task, TaskStatus, type TaskTag } from '@/types/tasks.ts';

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
