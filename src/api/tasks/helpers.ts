import { ALL_OPTION } from '@/constants';
import type { TasksSliceState } from '@/store/tasksSlice/types.ts';

export function buildSearchParams({ pagination, sort, filter }: TasksSliceState): Record<string, string | number> {
  const searchParams: Record<string, string | number> = {
    _page: pagination.page,
    _limit: pagination.pageSize,
    _sort: sort.replace('-', ''),
    _order: sort.startsWith('-') ? 'desc' : 'asc',
  };

  if (filter.search) searchParams.q = filter.search;
  if (filter.priority && filter.priority !== ALL_OPTION) searchParams.priority = filter.priority;
  if (filter.status && filter.status !== ALL_OPTION) searchParams.status = filter.status;

  if (filter.selectedTags.length) {
    searchParams['tags_include'] = filter.selectedTags.map((tag) => tag.id).join(',');
  }

  return searchParams;
}
