import type { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetTasksTagsQuery } from '@/api/tasks/tasks.ts';
import { TagBadge } from '@/components/badges/TagBadge.tsx';
import type { Task, TaskTag } from '@/types/tasks.ts';
import { mapFromTags } from '@/utils';
import { onFilterChange } from '@/store/tasksSlice';
import { selectSelectedTagIds, selectSelectedTags } from '@/store/tasksSlice/selectors.ts';

interface TaskTagsPickerProps {
  task: Task;
}

export const TaskTagsPicker: FC<TaskTagsPickerProps> = ({ task }) => {
  const { data: tags } = useGetTasksTagsQuery();

  const selectedTags = useSelector(selectSelectedTags);
  const selectedIds = useSelector(selectSelectedTagIds);

  const dispatch = useDispatch();

  const tagsMap = mapFromTags(tags);

  const handleFilterByTag = (tag: TaskTag) => () => {
    if (selectedIds.has(tag.id)) {
      dispatch(onFilterChange({ selectedTags: selectedTags.filter((t) => t.id !== tag.id) }));
    } else {
      dispatch(onFilterChange({ selectedTags: [...selectedTags, tag] }));
    }
  };

  if (!tags) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {task.tags.map((tagId) => {
        const tag = tagsMap[tagId];
        return <TagBadge key={tagId} label={tag.name} withIcon onClick={handleFilterByTag(tag)} />;
      })}
    </div>
  );
};
