import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/ui/tooltip.tsx';
import { Layout } from '@/layout/Layout.tsx';
import { ThemeProvider } from '@/context/theme/ThemeProvider.tsx';
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
          { index: true, element: <Navigate to={PATHS.HOME} /> },
          {
            path: ':id',
            lazy: () =>
              import('./pages/taskDetails/TaskDetailsPage.tsx').then((m) => ({ Component: m.TaskDetailsPage })),
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <Toaster position="top-right" expand={false} richColors />

        <TooltipProvider>
          <RouterProvider router={router} />
        </TooltipProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
