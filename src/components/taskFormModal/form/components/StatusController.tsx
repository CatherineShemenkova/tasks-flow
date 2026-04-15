import type { FC } from 'react';
import { Controller, useController, useFormContext } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { TaskStatusBadge } from '@/components/badges/TaskStatusBadge.tsx';
import { TaskStatus } from '@/constants/tasks.ts';
import { cn } from '@/utils';
import { type TaskFormValues } from '../form.ts';

export const StatusController: FC = () => {
  const { control } = useFormContext<TaskFormValues>();

  const { fieldState } = useController({ control, name: 'status' });

  return (
    <Field>
      <FormFieldLabel id="status" label="Status" required />

      <Controller
        name="status"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="status" className={cn('h-[40px]! px-3', fieldState.error && 'border-destructive')}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>

            <SelectContent>
              {Object.values(TaskStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  <TaskStatusBadge taskStatus={s} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <FormFieldError message={fieldState.error?.message} />
    </Field>
  );
};
