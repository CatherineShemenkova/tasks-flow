import { type FC } from 'react';
import { NavLink, useParams } from 'react-router';
import { ArrowLeft, Calendar } from 'lucide-react';
import { format } from 'date-fns';

import { useGetTaskByIdQuery, useGetTasksTagsQuery } from '@/api/tasks/tasksApi.ts';
import { PageContainer } from '@/components/page/Page.tsx';
import { NonExistingPlaceholder } from './components/NonExistingPlaceholder.tsx';
import { TaskHeader } from './components/TaskHeader.tsx';
import { TaskStatusBadge } from '@/components/badges/TaskStatusBadge.tsx';
import { Label } from '@/components/ui/label.tsx';
import { TagBadge } from '@/components/badges/TagBadge.tsx';
import { BUTTON_VARIANTS } from '@/components/ui/button.tsx';
import { ScreenLoader } from '@/components/loader/Loader.tsx';
import { PATHS } from '@/routes/paths.ts';
import { isOverdue, mapFromTags } from '@/utils/tasks.ts';
import { cn } from '@/utils/shared';

export const TaskDetailsPage: FC = () => {
  const { id } = useParams();

  const { data: task, isLoading } = useGetTaskByIdQuery(id!);
  const { data: tags } = useGetTasksTagsQuery();

  const overdue = !!task && isOverdue(task);
  const tagsMap = mapFromTags(tags);

  if (isLoading) return <ScreenLoader />;
  if (!task) return <NonExistingPlaceholder />;

  return (
    <PageContainer className="flex flex-col items-start gap-6">
      <NavLink to={PATHS.HOME} className={BUTTON_VARIANTS({ variant: 'ghost', size: 'lg' })}>
        <ArrowLeft />
        Back to Tasks
      </NavLink>

      <div
        className={cn(
          'bg-card mx-auto flex w-full max-w-3xl flex-col items-start gap-6 rounded-xl border p-6 md:p-8',
          overdue && 'border-destructive/50'
        )}
      >
        <TaskHeader task={task} overdue={overdue} />

        {task.description && <p className="text-card-foreground leading-relaxed">{task.description}</p>}

        <div className="flex w-full flex-wrap items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Deadline</Label>

            <span
              className={cn(
                'text-card-foreground flex items-center gap-2 leading-relaxed',
                overdue && 'text-destructive'
              )}
            >
              <Calendar className="h-4 w-4" /> {format(task.deadline, 'PP')}
            </span>
          </div>

          <TaskStatusBadge taskStatus={task.status} />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-muted-foreground">Tags</Label>

          <div className="flex flex-wrap gap-2">
            {task.tags.map((tagId) => {
              const tag = tagsMap[tagId];
              return tag && <TagBadge key={tag.id} label={tag.name} withIcon />;
            })}
          </div>
        </div>

        <div className="border-border text-muted-foreground grid w-full gap-4 border-t pt-6 text-sm sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Created</Label>
            <span className="leading-relaxed">{format(task.createdAt, 'PP p')}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Last Updated</Label>
            <span className="leading-relaxed">{format(task.updatedAt, 'PP p')}</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};
