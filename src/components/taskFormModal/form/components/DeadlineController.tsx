import { type FC, Fragment } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

import { Field } from '@/components/ui/field.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Calendar } from '@/components/ui/calendar.tsx';
import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { cn } from '@/utils/shared';
import type { TaskFormValues } from '../form.ts';

export const DeadlineController: FC = () => {
  const { control } = useFormContext<TaskFormValues>();

  return (
    <Field>
      <FormFieldLabel id="deadline" label="Deadline" required />

      <Controller
        name="deadline"
        control={control}
        render={({ field, fieldState }) => {
          const handleBlur = (open: boolean) => {
            if (!open) field.onBlur();
          };

          return (
            <Fragment>
              <Popover onOpenChange={handleBlur}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'h-10 justify-start text-sm font-normal',
                      !field.value && 'text-muted-foreground',
                      fieldState.error && 'border-destructive!'
                    )}
                    disabled={field.disabled}
                  >
                    <CalendarIcon className="mr-0.5 mb-px" />
                    {field.value ? format(field.value, 'PP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>

                <PopoverContent align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} />
                </PopoverContent>
              </Popover>

              <FormFieldError message={fieldState.error?.message} />
            </Fragment>
          );
        }}
      />
    </Field>
  );
};
