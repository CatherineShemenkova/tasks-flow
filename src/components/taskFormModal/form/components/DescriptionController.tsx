import type { FC } from 'react';
import { useController, useFormContext, Watch } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { Field } from '@/components/ui/field.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';
import { cn } from '@/utils/ui.ts';
import { DESCRIPTION_MAX_LENGTH, type TaskFormValues } from '../form.ts';

export const DescriptionController: FC = () => {
  const { register, control } = useFormContext<TaskFormValues>();

  const { fieldState } = useController({ control, name: 'description' });

  return (
    <Field>
      <FormFieldLabel id="description" label="Description">
        <Watch
          name="description"
          control={control}
          render={(value) => (
            <span
              className={cn(
                'text-muted-foreground text-xs',
                (value?.length || 0) > DESCRIPTION_MAX_LENGTH && 'text-destructive'
              )}
            >
              ({value?.length}/{DESCRIPTION_MAX_LENGTH})
            </span>
          )}
        />
      </FormFieldLabel>

      <Textarea
        {...register('description')}
        id="description"
        className="text-sm"
        placeholder="Enter task description (optional)"
        error={!!fieldState.error}
        rows={3}
      />

      <FormFieldError message={fieldState.error?.message} />
    </Field>
  );
};
