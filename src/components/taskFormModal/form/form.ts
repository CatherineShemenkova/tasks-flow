import * as z from 'zod';

import { TaskPriority, TaskStatus } from '@/types/tasks.ts';

export const DESCRIPTION_MAX_LENGTH = 500;

export const validationSchema = z.object({
  title: z.string().trim().min(5, 'Title must be at least 5 characters'),
  description: z.string().max(DESCRIPTION_MAX_LENGTH, 'Description must not exceed 500 characters').optional(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  deadline: z
    .date()
    .optional()
    .pipe(z.date({ message: 'Deadline date is required' }))
    .transform((d) => d.toISOString()),
  tags: z
    .array(z.object({ id: z.string(), name: z.string() }))
    .nonempty('At least one tag is required')
    .transform((tags) => tags.map((t) => t.id)),
});

export type TaskFormValues = z.input<typeof validationSchema>;
export type TaskApiRequest = z.output<typeof validationSchema>;

export const initialValues: TaskFormValues = {
  title: '',
  description: '',
  status: TaskStatus.TODO,
  priority: TaskPriority.MEDIUM,
  tags: [],
};
