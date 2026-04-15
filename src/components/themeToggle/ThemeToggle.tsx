import type { FC } from 'react';
import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button.tsx';
import { useTheme } from '@/context/theme/useTheme.ts';
import { Theme } from '@/context/theme/constants.ts';

export const ThemeToggle: FC = () => {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    setTheme(theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT);
  };

  return (
    <Button variant="outline" size="icon" onClick={handleThemeToggle}>
      {theme === Theme.LIGHT ? (
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      )}
    </Button>
  );
};
