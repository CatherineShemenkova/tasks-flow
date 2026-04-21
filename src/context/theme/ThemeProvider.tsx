import { useEffect, useState, type PropsWithChildren, type FC } from 'react';

import { Theme } from './constants.ts';
import { ThemeProviderContext, type ThemeProviderState } from './context.ts';

type ThemeProviderProps = {
  storageKey?: string;
};

export const ThemeProvider: FC<PropsWithChildren<ThemeProviderProps>> = ({ children, storageKey = 'tf-ui-theme' }) => {
  const [theme, setTheme] = useState<Theme>(
    () =>
      (localStorage.getItem(storageKey) as Theme) ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.DARK : Theme.LIGHT)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.LIGHT, Theme.DARK);
    root.classList.add(theme);
  }, [theme]);

  const value: ThemeProviderState = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
};
