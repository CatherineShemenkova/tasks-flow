import { type FC } from 'react';
import { Search } from 'lucide-react';

interface EmptyPlaceholderProps {
  isError: boolean;
}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({ isError }) => (
  <div className="flex flex-col items-center justify-center gap-1 rounded-lg border px-6 py-12">
    <div className="bg-muted rounded-full p-3">
      <Search className="text-muted-foreground" />
    </div>

    <h3 className="font-medium">No tasks found</h3>

    <p className="text-muted-foreground text-center text-sm">
      {isError
        ? 'A server error occurred. Please try again later.'
        : 'Create your first task to get started or try to adjusting your search or filters'}
    </p>
  </div>
);
