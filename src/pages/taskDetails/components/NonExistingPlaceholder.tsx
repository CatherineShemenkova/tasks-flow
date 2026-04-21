import type { FC } from 'react';
import { NavLink } from 'react-router';
import { ArrowLeft } from 'lucide-react';

import { BUTTON_VARIANTS } from '@/components/ui/button.tsx';
import { PATHS } from '@/routes/paths.ts';

export const NonExistingPlaceholder: FC = () => (
  <div className="flex flex-col items-center justify-center gap-4 py-12">
    <h2 className="text-xl font-semibold">Task not found</h2>

    <p className="text-muted-foreground">The task you're looking for doesn't exist.</p>

    <NavLink to={PATHS.HOME} className={BUTTON_VARIANTS({ size: 'lg' })}>
      <ArrowLeft />
      Back to Tasks
    </NavLink>
  </div>
);
