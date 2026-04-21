import { type ComponentType, createElement, type FC, type PropsWithChildren, type ReactNode } from 'react';

import type { WithClassName } from '@/types/shared.ts';
import { cn } from '@/utils/ui.ts';

export const PageContainer: FC<PropsWithChildren<WithClassName>> = ({ className, children }) => (
  <div className={cn('container mx-auto px-4 py-8', className)}>{children}</div>
);

interface PageTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export const PageTitle: FC<PageTitleProps> = ({ title, subtitle, action }) => (
  <div className="flex flex-wrap items-start justify-between gap-4">
    <div className="flex flex-col gap-1">
      <h1 className="text-foreground text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
    </div>

    {action}
  </div>
);

interface PagePlaceholderProps {
  title: string;
  label: string;
  icon: ComponentType<WithClassName>;
}

export const PagePlaceholder: FC<PropsWithChildren<PagePlaceholderProps>> = ({ title, label, icon, children }) => (
  <div className="flex flex-col items-center justify-center gap-3 rounded-lg border px-6 py-12">
    <div className="bg-muted rounded-full p-3">
      {createElement(icon, { className: 'text-muted-foreground w-full h-hull' })}
    </div>

    <h3 className="font-medium">{title}</h3>

    <p className="text-muted-foreground text-center text-sm">{label}</p>

    {children}
  </div>
);

