import { type FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TagBadge } from '@/components/badges/TagBadge.tsx';
import { SearchInput } from './components/SearchInput.tsx';
import { TagsPicker } from './components/TagsPicker.tsx';
import { StatusPicker } from './components/StatusPicker.tsx';
import { PriorityPicker } from './components/PriorityPicker.tsx';
import { SortPicker } from './components/SortPicker.tsx';
import { selectHasActiveFilters } from '@/store/tasksSlice/selectors.ts';
import { onFilterChange, onSingleFilterReset, onFilterReset } from '@/store/tasksSlice';
import type { TasksSliceFilter } from '@/store/tasksSlice/types.ts';
import { type TaskTag } from '@/types/tasks.ts';
import { type TaskPriority, type TaskStatus, SortOption } from '@/constants/tasks.ts';
import { PRIORITY_UI_MAP, STATUS_UI_MAP } from '@/constants/ui.ts';
import { ALL_OPTION } from '@/constants';

interface TasksFilterProps {
  filter: TasksSliceFilter;
  sort: SortOption;
}

export const TasksFilter: FC<TasksFilterProps> = ({ filter, sort }) => {
  const dispatch = useDispatch();

  const hasActiveFilters = useSelector(selectHasActiveFilters);

  const handleResetTag = (tag: TaskTag) => () => {
    const selectedTags = filter.selectedTags.filter((t) => t.id !== tag.id);
    dispatch(onFilterChange({ selectedTags }));
  };

  const handleResetSingleFilter = (key: keyof TasksSliceFilter) => () => {
    dispatch(onSingleFilterReset(key));
  };

  const handleReset = () => {
    dispatch(onFilterReset());
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col flex-wrap gap-4 md:flex-row md:[&_>_button]:w-[180px]">
        <SearchInput value={filter.search} />
        <TagsPicker selectedTags={filter.selectedTags} />
        <StatusPicker value={filter.status} />
        <PriorityPicker value={filter.priority} />
        <SortPicker value={sort} />
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
