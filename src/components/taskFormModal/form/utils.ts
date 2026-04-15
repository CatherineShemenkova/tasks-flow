import { type TaskTag, type Task } from '@/types/tasks.ts';
import type { TaskFormValues } from './form.ts';

export function mapTaskToFormValues(task: Task, tags?: TaskTag[]): TaskFormValues {
  return {
    ...task,
    deadline: task.deadline ? new Date(task.deadline) : undefined,
    tags: tags?.filter((t) => task.tags.includes(t.id)) || [],
    description: task.description ?? '',
  };
}
