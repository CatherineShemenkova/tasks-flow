import { type FC, useRef } from 'react';
import { ChevronDownIcon, TagIcon } from 'lucide-react';

import { useGetTasksTagsQuery } from '@/api/tasks/tasksApi.ts';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from '@/components/ui/combobox.tsx';
import { Button } from '@/components/ui/button';
import { changeFilter, selectSelectedTags } from '@/store/tasksSlice/tasksSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import type { TaskTag } from '@/types/tasks.ts';
import { itemEqualToItemId } from '@/utils/ui.ts';

export const TagsPicker: FC = () => {
  const { data: tags } = useGetTasksTagsQuery();

  const anchor = useRef<HTMLButtonElement>(null);

  const dispatch = useAppDispatch();

  const selectedTags = useAppSelector(selectSelectedTags);

  const handleTagsChange = (selectedTags: TaskTag[]) => {
    dispatch(changeFilter({ selectedTags }));
  };

  return (
    <Combobox
      items={tags}
      value={selectedTags}
      onValueChange={handleTagsChange}
      isItemEqualToValue={itemEqualToItemId}
      multiple
    >
      <ComboboxTrigger
        render={
          <Button ref={anchor} variant="outline" size="lg" className="justify-between font-normal">
            <TagIcon />
            {selectedTags.length > 0 ? `${selectedTags.length} tags` : 'Filter by tags'}
            <ChevronDownIcon className="text-muted-foreground" />
          </Button>
        }
      />

      <ComboboxContent anchor={anchor}>
        <ComboboxInput showTrigger={false} placeholder="Search" />
        <ComboboxEmpty>No tags found</ComboboxEmpty>
        <ComboboxList>
          {(tag: TaskTag) => (
            <ComboboxItem key={tag.id} value={tag}>
              {tag.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
