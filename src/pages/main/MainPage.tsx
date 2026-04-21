import { type FC, Fragment } from 'react';
import { Plus } from 'lucide-react';

import { useGetTasksQuery, useGetTasksTagsQuery } from '@/api/tasks/tasksApi.ts';
import { PageContainer, PageTitle } from '@/components/page/Page.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TaskCard } from '@/components/taskCard/TaskCard.tsx';
import { Pagination } from '@/components/pagination/Pagination.tsx';
import { TaskFormModal } from '@/components/taskFormModal/TaskFormModal.tsx';
import { ScreenLoader } from '@/components/loader/Loader.tsx';
import { changePage, selectPagination, selectTasksFilter, selectTasksSort } from '@/store/tasksSlice/tasksSlice';
import { EmptyPlaceholder } from './components/EmptyPlaceholder.tsx';
import { TasksFilter } from './components/tasksFilter/TasksFilter.tsx';
import { DialogTrigger } from '@/components/ui/dialog.tsx';
import { useAppDispatch, useAppSelector } from '@/store/store.ts';

export const MainPage: FC = () => {
  const pagination = useAppSelector(selectPagination);
  const sort = useAppSelector(selectTasksSort);
  const filter = useAppSelector(selectTasksFilter);

  const { isLoading: areTasksTagsLoading } = useGetTasksTagsQuery();
  const { data: tasks, isLoading, isError } = useGetTasksQuery({ pagination, sort, filter });

  const dispatch = useAppDispatch();

  const handlePageChange = (p: number) => {
    dispatch(changePage(p));
  };

  if (isLoading || areTasksTagsLoading) return <ScreenLoader />;

  return (
    <PageContainer className="flex flex-col gap-6">
      <PageTitle
        title="Tasks"
        subtitle="Manage and track your tasks efficiently"
        action={
          <TaskFormModal>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus strokeWidth={3} /> Create Task
              </Button>
            </DialogTrigger>
          </TaskFormModal>
        }
      />

      <TasksFilter />

      {tasks?.data.length ? (
        <Fragment>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.data.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>

          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div className="text-muted-foreground grow text-sm">
              Showing {tasks.data.length} of {tasks.total} tasks
            </div>

            <Pagination
              current={pagination.page}
              pageSize={pagination.pageSize}
              total={tasks.total}
              onPageChange={handlePageChange}
            />
          </div>
        </Fragment>
      ) : (
        <EmptyPlaceholder isError={isError} />
      )}
    </PageContainer>
  );
};
