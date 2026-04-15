import type { FC, PropsWithChildren } from 'react';

import { FieldError, FieldLabel } from '@/components/ui/field.tsx';

interface FormFieldErrorProps {
  message?: string;
}

export const FormFieldError: FC<FormFieldErrorProps> = ({ message }) => {
  if (!message) return null;

  return <FieldError className="pl-3">{message}</FieldError>;
};

interface FormFieldLabelProps {
  id: string;
  label: string;
  required?: boolean;
}

export const FormFieldLabel: FC<PropsWithChildren<FormFieldLabelProps>> = ({ id, label, required, children }) => (
  <FieldLabel htmlFor={id}>
    {label} {required && <span className="text-destructive">*</span>}
    {children}
  </FieldLabel>
);
