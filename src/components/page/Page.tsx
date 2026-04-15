import type { FC, PropsWithChildren, ReactNode } from 'react';

import type { WithClassName } from '@/types';
import { cn } from '@/utils';

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
      <p className="text-muted-foreground">{subtitle}</p>
    </div>

    {action}
  </div>
);
