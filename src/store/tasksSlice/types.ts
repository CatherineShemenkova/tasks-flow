import type { SortOption, TaskPriority, TaskStatus, TaskTag } from '@/types/tasks.ts';
import type { Paginated } from '@/types/pagination.ts';
import { ALL_OPTION } from '@/constants';

export interface TasksSliceState {
  pagination: Paginated;
  filter: TasksSliceFilter;
  sort: SortOption;
}

export interface TasksSliceFilter {
  search: string;
  selectedTags: TaskTag[];
  priority: TaskPriority | typeof ALL_OPTION;
  status: TaskStatus | typeof ALL_OPTION;
}
