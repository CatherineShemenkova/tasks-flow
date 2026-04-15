import type { FC } from 'react';
import { NavLink } from 'react-router';
import { CheckSquare } from 'lucide-react';

import { ThemeToggle } from '@/components/themeToggle/ThemeToggle.tsx';
import { PATHS } from '@/routes/paths.ts';

export const Header: FC = () => (
  <header className="bg-background/95 sticky top-0 z-50 justify-between border-b backdrop-blur">
    <div className="container mx-auto flex h-14 items-center justify-between px-4">
      <NavLink to={PATHS.HOME} className="flex items-center gap-2 font-semibold">
        <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
          <CheckSquare className="text-primary-foreground h-5 w-5" />
        </div>

        <span className="text-lg">TaskFlow</span>
      </NavLink>

      <ThemeToggle />
    </div>
  </header>
);
