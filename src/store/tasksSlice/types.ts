import type { TaskTag } from '@/types/tasks.ts';
import type { SortOption } from '@/constants/tasks.ts';
import type { Paginated } from '@/types';

export interface TasksSliceState {
  pagination: Paginated;
  filter: TasksSliceFilter;
  sort: SortOption;
}

export interface TasksSliceFilter {
  search: string;
  selectedTags: TaskTag[];
  priority: string;
  status: string;
}
