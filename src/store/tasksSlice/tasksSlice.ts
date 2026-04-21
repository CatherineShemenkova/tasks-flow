import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ALL_OPTION } from '@/constants';
import { PAGINATION } from '@/constants/pagination.ts';
import { SortOption } from '@/types/tasks.ts';
import type { TasksSliceFilter, TasksSliceState } from './types.ts';

const initialState: TasksSliceState = {
  pagination: { page: PAGINATION.DEFAULT_PAGE, pageSize: PAGINATION.DEFAULT_SIZE },
  filter: {
    search: '',
    status: ALL_OPTION,
    priority: ALL_OPTION,
    selectedTags: [],
  },
  sort: SortOption.CREATED_AT_DESC,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    changePage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
      state.pagination = initialState.pagination;
    },
    changeFilter: (state, action: PayloadAction<Partial<TasksSliceFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.pagination = initialState.pagination;
    },
    resetSingleFilter: (state, action: PayloadAction<keyof TasksSliceFilter>) => {
      state.filter = { ...state.filter, [action.payload]: initialState.filter[action.payload] };
      state.pagination = initialState.pagination;
    },
    resetFilter: (state) => {
      state.filter = initialState.filter;
      state.pagination = initialState.pagination;
    },
  },
  selectors: {
    selectTasksFilter: (state) => state.filter,
    selectPriority: (state) => state.filter.priority,
    selectSearch: (state) => state.filter.search,
    selectStatus: (state) => state.filter.status,
    selectTasksSort: (state) => state.sort,
    selectPagination: (state) => state.pagination,
    selectHasActiveFilters: (state) => {
      const filter = state.filter;
      return filter.selectedTags.length > 0 || filter.status !== ALL_OPTION || filter.priority !== ALL_OPTION;
    },
    selectSelectedTags: (state) => state.filter.selectedTags,
  },
});

export const { changePage, changeSort, changeFilter, resetSingleFilter, resetFilter } = tasksSlice.actions;
export const {
  selectTasksFilter,
  selectPriority,
  selectSearch,
  selectStatus,
  selectTasksSort,
  selectPagination,
  selectHasActiveFilters,
  selectSelectedTags,
} = tasksSlice.selectors;

export default tasksSlice.reducer;
