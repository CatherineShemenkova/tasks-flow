import { type FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.tsx';
import { TaskStatusBadge } from '@/components/badges/TaskStatusBadge.tsx';
import { TaskStatus } from '@/types/tasks.ts';
import { cn } from '@/utils/shared';
import { type TaskFormValues } from '../form.ts';

export const StatusController: FC = () => {
  const { control } = useFormContext<TaskFormValues>();

  return (
    <Field>
      <FormFieldLabel id="status" label="Status" required />

      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => {
          const handleBlur = (open: boolean) => {
            if (!open) field.onBlur();
          };

          return (
            <Fragment>
              <Select {...field} onValueChange={field.onChange} onOpenChange={handleBlur}>
                <SelectTrigger id="status" className={cn('h-10!', fieldState.error && 'border-destructive')}>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent position="popper">
                  {Object.values(TaskStatus).map((s) => (
                    <SelectItem key={s} value={s}>
                      <TaskStatusBadge taskStatus={s} />
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormFieldError message={fieldState.error?.message} />
            </Fragment>
          );
        }}
      />
    </Field>
  );
};
