import { type FC } from 'react';
import { CircleAlert, Search } from 'lucide-react';

import { PagePlaceholder } from '@/components/page/Page.tsx';

interface EmptyPlaceholderProps {
  isError: boolean;
}

export const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({ isError }) => (
  <PagePlaceholder
    title="No tasks found"
    label={
      isError
        ? 'A server error occurred. Please try again later'
        : 'Create your first task to get started or try adjusting your search or filters'
    }
    icon={isError ? CircleAlert : Search}
  />
);
