import { type FC } from 'react';

import { TagBadge } from '@/components/badges/TagBadge.tsx';
import { SearchInput } from './components/SearchInput.tsx';
import { TagsPicker } from './components/TagsPicker.tsx';
import { StatusPicker } from './components/StatusPicker.tsx';
import { PriorityPicker } from './components/PriorityPicker.tsx';
import { SortPicker } from './components/SortPicker.tsx';
import {
  changeFilter,
  resetFilters,
  resetSingleFilter,
  selectHasActiveFilters,
  selectTasksFilter,
} from '@/store/tasksSlice/tasksSlice';
import type { TasksSliceFilter } from '@/store/tasksSlice/types.ts';
import { TaskPriority, TaskStatus, type TaskTag } from '@/types/tasks.ts';
import { PRIORITY_UI_MAP, STATUS_UI_MAP } from '@/constants/ui';
import { ALL_OPTION } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';

export const TasksFilter: FC = () => {
  const dispatch = useAppDispatch();

  const filter = useAppSelector(selectTasksFilter);
  const hasActiveFilters = useAppSelector(selectHasActiveFilters);

  const handleResetTag = (tag: TaskTag) => () => {
    const selectedTags = filter.selectedTags.filter((t) => t.id !== tag.id);
    dispatch(changeFilter({ selectedTags }));
  };

  const handleResetSingleFilter = (key: keyof TasksSliceFilter) => () => {
    dispatch(resetSingleFilter(key));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col flex-wrap gap-4 md:flex-row md:[&_>_button]:w-45">
        <SearchInput />
        <TagsPicker />
        <StatusPicker />
        <PriorityPicker />
        <SortPicker />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm">Active filters:</span>

          {filter.selectedTags.map((tag) => (
            <TagBadge key={tag.id} label={tag.name} onClick={handleResetTag(tag)} withIcon removable />
          ))}

          {filter.status !== ALL_OPTION && (
            <TagBadge
              label={`Status: ${STATUS_UI_MAP[filter.status as TaskStatus].label}`}
              onClick={handleResetSingleFilter('status')}
              removable
            />
          )}

          {filter.priority !== ALL_OPTION && (
            <TagBadge
              label={`Priority: ${PRIORITY_UI_MAP[filter.priority as TaskPriority].label}`}
              onClick={handleResetSingleFilter('priority')}
              removable
            />
          )}

          <button
            className="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
            onClick={handleReset}
          >
            Clear all
          </button>
        </div>
      )}
    </div>
  );
};
