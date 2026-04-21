import { type FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { TaskPriorityBadge } from '@/components/badges/TaskPriorityBadge.tsx';
import { Field } from '@/components/ui/field.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { TaskPriority } from '@/types/tasks.ts';
import { type TaskFormValues } from '../form.ts';

export const PriorityController: FC = () => {
  const { control } = useFormContext<TaskFormValues>();

  return (
    <Field>
      <FormFieldLabel id="priority" label="Priority" required />

      <Controller
        name="priority"
        control={control}
        render={({ field, fieldState }) => {
          const handleChange = (value: string) => {
            field.onChange(value);
            field.onBlur();
          };

          return (
            <Fragment>
              <RadioGroup {...field} onValueChange={handleChange} className="flex gap-3">
                {Object.values(TaskPriority).map((p) => (
                  <label key={p} className="flex cursor-pointer items-center gap-2 transition-colors">
                    <RadioGroupItem value={p} id={p} />
                    <TaskPriorityBadge priority={p} />
                  </label>
                ))}
              </RadioGroup>

              <FormFieldError message={fieldState.error?.message} />
            </Fragment>
          );
        }}
      />
    </Field>
  );
};
