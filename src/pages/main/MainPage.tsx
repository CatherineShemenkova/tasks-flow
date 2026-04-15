import { type FC, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus } from 'lucide-react';

import { useGetTasksQuery } from '@/api/tasks/tasks.ts';
import { PageContainer, PageTitle } from '@/components/page/Page.tsx';
import { Button } from '@/components/ui/button.tsx';
import { TaskCard } from '@/components/taskCard/TaskCard.tsx';
import { Pagination } from '@/components/pagination/Pagination.tsx';
import { TaskFormModal } from '@/components/taskFormModal/TaskFormModal.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { EmptyPlaceholder } from './components/EmptyPlaceholder.tsx';
import { TasksFilter } from './components/tasksFilter/TasksFilter.tsx';
import { selectPagination, selectTasksFilter, selectTasksSort } from '@/store/tasksSlice/selectors.ts';
import { onPageChange } from '@/store/tasksSlice';

export const MainPage: FC = () => {
  const pagination = useSelector(selectPagination);
  const sort = useSelector(selectTasksSort);
  const filter = useSelector(selectTasksFilter);

  const { data: tasks, isLoading, isError } = useGetTasksQuery({ pagination, sort, filter });

  const dispatch = useDispatch();

  const handlePageChange = (p: number) => {
    dispatch(onPageChange(p));
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <PageContainer className="flex flex-col gap-6">
      <PageTitle
        title="Tasks"
        subtitle="Manage and track your tasks efficiently"
        action={
          <TaskFormModal>
            <Button size="lg">
              <Plus strokeWidth={3} /> Create Task
            </Button>
          </TaskFormModal>
        }
      />

      <TasksFilter filter={filter} sort={sort} />

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
