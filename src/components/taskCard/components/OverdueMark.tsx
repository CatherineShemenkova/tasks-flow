import type { FC } from 'react';
import { ClockAlert } from 'lucide-react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const OverdueMark: FC = () => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="bg-destructive absolute -top-2 -right-2 flex items-center justify-center rounded-full p-1.5">
        <ClockAlert className="h-3.5 w-3.5 text-white" />
      </div>
    </TooltipTrigger>

    <TooltipContent>The task is overdue</TooltipContent>
  </Tooltip>
);
