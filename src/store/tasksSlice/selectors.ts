import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from '@/store/store.ts';
import { ALL_OPTION } from '@/constants';

export const selectTasksFilter = (state: RootState) => state.tasks.filter;

export const selectTasksSort = (state: RootState) => state.tasks.sort;

export const selectPagination = (state: RootState) => state.tasks.pagination;

export const selectHasActiveFilters = createSelector([selectTasksFilter], (filter) => {
  return (
    filter.search || filter.selectedTags.length > 0 || filter.status !== ALL_OPTION || filter.priority !== ALL_OPTION
  );
});

export const selectSelectedTags = createSelector([selectTasksFilter], (filter) => filter.selectedTags);

export const selectSelectedTagIds = createSelector([selectSelectedTags], (selectedTags) => {
  return new Set(selectedTags.map((t) => t.id));
});
