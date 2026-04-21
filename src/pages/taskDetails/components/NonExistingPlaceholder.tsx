import type { FC } from 'react';
import { NavLink } from 'react-router';
import { ArrowLeft, NotepadTextDashed } from 'lucide-react';

import { BUTTON_VARIANTS } from '@/components/ui/button.tsx';
import { PageContainer, PagePlaceholder } from '@/components/page/Page.tsx';
import { PATHS } from '@/routes/paths.ts';

export const NonExistingPlaceholder: FC = () => (
  <PageContainer>
    <PagePlaceholder title="Task not found" label="The task you're looking for doesn't exist" icon={NotepadTextDashed}>
      <NavLink to={PATHS.HOME} className={BUTTON_VARIANTS({ size: 'lg' })}>
        <ArrowLeft />
        Back to Tasks
      </NavLink>
    </PagePlaceholder>
  </PageContainer>
);
