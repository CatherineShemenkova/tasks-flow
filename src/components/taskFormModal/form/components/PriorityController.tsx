import type { FC } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { TaskPriorityBadge } from '@/components/badges/TaskPriorityBadge.tsx';
import { Field } from '@/components/ui/field.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { TaskPriority } from '@/constants/tasks.ts';
import { type TaskFormValues } from '../form.ts';

export const PriorityController: FC = () => {
  const { control } = useFormContext<TaskFormValues>();

  const { fieldState } = useController({ control, name: 'priority' });

  return (
    <Field>
      <FormFieldLabel id="priority" label="Priority" required />

      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <RadioGroup value={field.value} onValueChange={field.onChange} className="flex gap-3">
            {Object.values(TaskPriority).map((p) => (
              <label key={p} className="flex cursor-pointer items-center gap-2 transition-colors">
                <RadioGroupItem value={p} id={p} />
                <TaskPriorityBadge priority={p} />
              </label>
            ))}
          </RadioGroup>
        )}
      />

      <FormFieldError message={fieldState.error?.message} />
    </Field>
  );
};
