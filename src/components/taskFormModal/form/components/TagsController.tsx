import { type FC, Fragment, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Plus, Tag } from 'lucide-react';

import { useCreateTaskTagMutation } from '@/api/tasks/tasksApi.ts';
import { Field } from '@/components/ui/field.tsx';
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from '@/components/ui/combobox.tsx';
import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { DelayedLoader } from '@/components/loader/Loader.tsx';
import { Button } from '@/components/ui/button.tsx';
import type { TaskTag } from '@/types/tasks.ts';
import type { TaskFormValues } from '../form.ts';
import { cn } from '@/utils/shared.ts';

interface TagsControllerProps {
  tags?: TaskTag[];
}

export const TagsController: FC<TagsControllerProps> = ({ tags }) => {
  const [createTag, { isLoading }] = useCreateTaskTagMutation();

  const anchor = useComboboxAnchor();

  const { control, formState } = useFormContext<TaskFormValues>();

  const [search, setSearch] = useState('');

  return (
    <Field>
      <FormFieldLabel id="tags" label="Tags" required />

      <Controller
        name="tags"
        control={control}
        render={({ field, fieldState }) => {
          const handleCreateTag = () => {
            createTag({ name: search })
              .unwrap()
              .then((res) => {
                field.onChange([...field.value, res]);
                setSearch('');
              });
          };

          return (
            <Fragment>
              <Combobox
                items={tags}
                value={field.value}
                onValueChange={field.onChange}
                inputValue={search}
                onInputValueChange={setSearch}
                isItemEqualToValue={(a, b) => a.id === b.id}
                multiple
              >
                <ComboboxChips ref={anchor} className={cn('min-h-10', fieldState.error && 'border-destructive')}>
                  <ComboboxValue>
                    {(values: TaskTag[]) => (
                      <Fragment>
                        {values.map((value) => (
                          <ComboboxChip key={value.id}>{value.name}</ComboboxChip>
                        ))}

                        <ComboboxChipsInput placeholder="Select or add tags" />

                        <Tag className="h-4 w-4 opacity-50" />
                      </Fragment>
                    )}
                  </ComboboxValue>
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty className="px-3">
                    <Button className="pointer-events-auto max-w-full" variant="secondary" onClick={handleCreateTag}>
                      <Plus />
                      <span className="truncate">Create &quot;{search}&quot;</span>
                      {isLoading && <DelayedLoader />}
                    </Button>
                  </ComboboxEmpty>

                  <ComboboxList className="pointer-events-auto">
                    {(tag) => (
                      <ComboboxItem key={tag.id} value={tag}>
                        {tag.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Fragment>
          );
        }}
      />

      <FormFieldError message={formState.errors.tags?.message} />
    </Field>
  );
};
