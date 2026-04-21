import type { FC } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { FormFieldError, FormFieldLabel } from '@/components/formField/FormField.tsx';
import { Input } from '@/components/ui/input.tsx';
import { Field } from '@/components/ui/field.tsx';
import type { TaskFormValues } from '../form.ts';

export const TitleController: FC = () => {
  const { register, control } = useFormContext<TaskFormValues>();

  const { fieldState } = useController({ control, name: 'title' });

  return (
    <Field>
      <FormFieldLabel id="title" label="Title" required />

      <Input
        {...register('title')}
        id="title"
        className="h-10 text-sm"
        placeholder="Enter task title (min 5 characters)"
        error={!!fieldState.error}
      />

      <FormFieldError message={fieldState.error?.message} />
    </Field>
  );
};
