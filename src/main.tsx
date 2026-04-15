import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { Layout } from '@/layout/Layout.tsx';
import { IntermediatePageGuard } from '@/components/guards/IntermediatePageGuarg.tsx';
import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx';
import { Theme } from '@/context/theme/constants.ts';
import { MainPage } from '@/pages/main/MainPage.tsx';
import { store } from '@/store/store.ts';
import { PATHS } from '@/routes/paths.ts';

import './index.css';

const router = createBrowserRouter([
  {
    path: PATHS.HOME,
    Component: Layout,
    children: [
      { index: true, Component: MainPage },
      {
        path: PATHS.TASKS,
        children: [
          { index: true, Component: IntermediatePageGuard },
          {
            path: ':id',
            lazy: () => import('./pages/task/TaskPage.tsx').then((m) => ({ Component: m.TaskPage })),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme={Theme.SYSTEM}>
        <Toaster position="top-right" expand={false} richColors />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
