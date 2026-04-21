import { useContext } from 'react';

import { ThemeProviderContext } from './context.ts';

export function useTheme() {
  return useContext(ThemeProviderContext);
}
