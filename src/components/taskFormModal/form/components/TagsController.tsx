import { type FC, Fragment, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { Check, ChevronsUpDown, Plus } from 'lucide-react';

import { useCreateTaskTagMutation } from '@/api/tasks/tasks.ts';
import { Field } from '@/components/ui/field.tsx';
import { TagBadge } from '@/components/badges/TagBadge.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command.tsx';
import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { TaskTag } from '@/types/tasks.ts';
import { cn } from '@/utils';
import type { TaskFormValues } from '../form.ts';

interface TagsControllerProps {
  tags?: TaskTag[];
}

export const TagsController: FC<TagsControllerProps> = ({ tags }) => {
  const [createTag] = useCreateTaskTagMutation();

  const { control, formState } = useFormContext<TaskFormValues>();
  const { remove, append, fields } = useFieldArray({ name: 'tags', control });

  const [isOpen, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const handleCreateTag = () => {
    createTag({ name: search })
      .unwrap()
      .then((res) => {
        handleSelectTag(res);
        setSearch('');
      });
  };

  const handleDeselectTag = (tag: TaskTag) => {
    remove(fields.findIndex((t) => t.id === tag.id));
  };

  const handleSelectTag = (tag: TaskTag) => {
    append(tag);
  };

  return (
    <Field>
      <FormFieldLabel id="tags" label="Tags" required />

      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => {
          const selectedTags: TaskTag[] = field.value;
          const selectedIds = new Set(selectedTags.map((t) => t.id));

          return (
            <Fragment>
              <Popover open={isOpen} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className={cn(
                      'h-[38px] justify-between px-3 font-normal',
                      fieldState.error && 'border-destructive!'
                    )}
                  >
                    <span className="text-muted-foreground">Select or add tags</span>
                    <ChevronsUpDown className="shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-full p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search tags..." value={search} onValueChange={setSearch} />

                    <CommandList>
                      <CommandEmpty>
                        <Button variant="ghost" type="button" onClick={handleCreateTag}>
                          <Plus />
                          Create &quot;{search}&quot;
                        </Button>
                      </CommandEmpty>

                      <CommandGroup>
                        {tags?.map((tag) => (
                          <CommandItem
                            key={tag.id}
                            value={tag.name}
                            onSelect={() => {
                              if (selectedIds.has(tag.id)) {
                                handleDeselectTag(tag);
                              } else {
                                handleSelectTag(tag);
                              }
                            }}
                          >
                            <Check className={cn(selectedIds.has(tag.id) ? 'opacity-100' : 'opacity-0')} />
                            {tag.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              <div className="flex flex-wrap gap-2">
                {selectedTags.map((tag) => (
                  <TagBadge key={tag.id} label={tag.name} onClick={() => handleDeselectTag(tag)} removable withIcon />
                ))}
              </div>
            </Fragment>
          );
        }}
      />

      <FormFieldError message={formState.errors.tags?.message} />
    </Field>
  );
};
