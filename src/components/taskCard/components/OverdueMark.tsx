import type { FC } from 'react';
import { AlertTriangle } from 'lucide-react';

export const OverdueMark: FC = () => (
  <div className="bg-destructive absolute -top-2 -right-2 flex items-center justify-center rounded-full p-1.5">
    <AlertTriangle className="h-3.5 w-3.5 text-white" />
  </div>
);
