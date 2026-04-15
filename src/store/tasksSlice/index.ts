import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { ALL_OPTION } from '@/constants';
import { PAGINATION } from '@/constants/pagination.ts';
import { SortOption } from '@/constants/tasks.ts';
import type { TasksSliceFilter, TasksSliceState } from './types.ts';

const initialState: TasksSliceState = {
  pagination: { page: PAGINATION.DEFAULT_PAGE, pageSize: PAGINATION.DEFAULT_SIZE },
  filter: {
    search: '',
    status: ALL_OPTION,
    priority: ALL_OPTION,
    selectedTags: [],
  },
  sort: SortOption.CREATEDAT_DESC,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    onPageChange: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    onSortChange: (state, action: PayloadAction<SortOption>) => {
      state.sort = action.payload;
      state.pagination = initialState.pagination;
    },
    onFilterChange: (state, action: PayloadAction<Partial<TasksSliceFilter>>) => {
      state.filter = { ...state.filter, ...action.payload };
      state.pagination = initialState.pagination;
    },
    onSingleFilterReset: (state, action: PayloadAction<keyof TasksSliceFilter>) => {
      state.filter = { ...state.filter, [action.payload]: initialState.filter[action.payload] };
      state.pagination = initialState.pagination;
    },
    onFilterReset: (state) => {
      state.filter = initialState.filter;
      state.pagination = initialState.pagination;
    },
  },
});

export const { onPageChange, onSortChange, onFilterChange, onSingleFilterReset, onFilterReset } = tasksSlice.actions;

export default tasksSlice.reducer;
