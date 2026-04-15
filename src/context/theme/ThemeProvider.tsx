import { useEffect, useState, type PropsWithChildren, type FC } from 'react';

import { Theme } from './constants.ts';
import { ThemeProviderContext } from './context.ts';

type ThemeProviderProps = {
  defaultTheme?: Theme;
  storageKey?: string;
};

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = 'ui-theme',
}) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(Theme.LIGHT, Theme.DARK);

    if (theme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};
