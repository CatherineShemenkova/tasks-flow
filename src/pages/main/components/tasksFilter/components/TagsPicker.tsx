import { type FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Check, ChevronsUpDown, Tag as TagIcon } from 'lucide-react';

import { useGetTasksTagsQuery } from '@/api/tasks/tasks.ts';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { selectSelectedTagIds } from '@/store/tasksSlice/selectors.ts';
import { onFilterChange } from '@/store/tasksSlice';
import type { TaskTag } from '@/types/tasks.ts';
import { cn } from '@/utils';

interface TagsPickerProps {
  selectedTags: TaskTag[];
}

export const TagsPicker: FC<TagsPickerProps> = ({ selectedTags }) => {
  const { data: tags } = useGetTasksTagsQuery();

  const dispatch = useDispatch();

  const [isOpen, setOpen] = useState(false);

  const selectedIds = useSelector(selectSelectedTagIds);

  const handleSelect = (tag: TaskTag) => () => {
    if (selectedIds.has(tag.id)) {
      dispatch(onFilterChange({ selectedTags: selectedTags.filter((t) => t.id !== tag.id) }));
    } else {
      dispatch(onFilterChange({ selectedTags: [...selectedTags, tag] }));
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button className="h-[38px]! justify-between" variant="outline" size="lg">
          <TagIcon />
          {selectedTags.length > 0 ? `${selectedTags.length} tags` : 'Filter by tags'}
          <ChevronsUpDown className="shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" align="end">
        <Command>
          <CommandInput placeholder="Search tags..." />

          <CommandList>
            <CommandEmpty>No tags found</CommandEmpty>

            <CommandGroup>
              {tags?.map((tag) => (
                <CommandItem key={tag.id} value={tag.name} onSelect={handleSelect(tag)}>
                  <Check className={cn(selectedIds.has(tag.id) ? 'opacity-100' : 'opacity-0')} />
                  {tag.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
