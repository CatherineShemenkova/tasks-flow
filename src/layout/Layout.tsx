import { type FC } from 'react';
import { Outlet } from 'react-router';

import { Header } from '@/layout/header/Header.tsx';

export const Layout: FC = () => (
  <div className="bg-background min-h-screen">
    <Header />

    <main>
      <Outlet />
    </main>
  </div>
);
