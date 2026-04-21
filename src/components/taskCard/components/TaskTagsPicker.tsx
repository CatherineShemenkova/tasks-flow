import type { FC } from 'react';

import { useGetTasksTagsQuery } from '@/api/tasks/tasksApi.ts';
import { changeFilter, selectSelectedTags } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';
import { TagBadge } from '@/components/badges/TagBadge.tsx';
import type { Task, TaskTag } from '@/types/tasks.ts';
import { mapFromTags } from '@/utils/tasks.ts';

interface TaskTagsPickerProps {
  task: Task;
}

export const TaskTagsPicker: FC<TaskTagsPickerProps> = ({ task }) => {
  const { data: tags } = useGetTasksTagsQuery();

  const dispatch = useAppDispatch();

  const selectedTags = useAppSelector(selectSelectedTags);

  const selectedIds = new Set(selectedTags.map((t) => t.id));
  const tagsMap = mapFromTags(tags);

  const handleFilterByTag = (tag: TaskTag) => () => {
    if (selectedIds.has(tag.id)) {
      dispatch(changeFilter({ selectedTags: selectedTags.filter((t) => t.id !== tag.id) }));
    } else {
      dispatch(changeFilter({ selectedTags: [...selectedTags, tag] }));
    }
  };

  if (!tags) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {task.tags.map((tagId) => {
        const tag = tagsMap[tagId];
        return tag && <TagBadge key={tagId} label={tag.name} withIcon onClick={handleFilterByTag(tag)} />;
      })}
    </div>
  );
};
