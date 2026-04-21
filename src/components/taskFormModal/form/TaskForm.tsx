import { type FC, useEffect, useMemo, useRef } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useCreateTaskMutation, useGetTasksTagsQuery, useUpdateTaskMutation } from '@/api/tasks/tasksApi.ts';
import { DialogClose, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog.tsx';
import { FieldGroup } from '@/components/ui/field.tsx';
import { TitleController } from './components/TitleController.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { DescriptionController } from './components/DescriptionController.tsx';
import { StatusController } from './components/StatusController.tsx';
import { PriorityController } from './components/PriorityController.tsx';
import { DeadlineController } from './components/DeadlineController.tsx';
import { TagsController } from './components/TagsController.tsx';
import type { Task } from '@/types/tasks.ts';
import { initialValues, type TaskApiRequest, validationSchema } from './form.ts';
import { mapTaskToFormValues } from './mapper.ts';

interface TaskFormProps {
  task?: Task;
}

/* Task and tags are expected to be provided synchronously  */
export const TaskForm: FC<TaskFormProps> = ({ task }) => {
  const isEditing = !!task;

  const { data: tags } = useGetTasksTagsQuery();
  const [createTask, { isSuccess: isCreateSuccess }] = useCreateTaskMutation();
  const [updateTask, { isSuccess: isUpdateSuccess }] = useUpdateTaskMutation();

  const closeRef = useRef<HTMLButtonElement>(null);

  const defaultValues = useMemo(() => {
    return isEditing ? mapTaskToFormValues(task, tags) : initialValues;
  }, [isEditing, task, tags]);

  const methods = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isUpdateSuccess || isCreateSuccess) {
      closeRef.current?.click();
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  const onSubmit: SubmitHandler<TaskApiRequest> = async (data) => {
    if (isEditing && task) {
      await updateTask({ ...task, ...data });
    } else {
      await createTask(data);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      </DialogHeader>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-6" onSubmit={methods.handleSubmit(onSubmit)}>
          <FieldGroup>
            <TitleController />
            <DescriptionController />
            <StatusController />
            <DeadlineController />
            <TagsController tags={tags} />
            <PriorityController />
          </FieldGroup>

          <DialogFooter>
            <DialogClose ref={closeRef} asChild>
              <Button variant="outline" size="lg">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" size="lg" disabled={methods.formState.isSubmitting}>
              {methods.formState.isSubmitting && <Spinner />}
              {isEditing ? 'Save Changes' : 'Create Task'}
            </Button>
          </DialogFooter>
        </form>
      </FormProvider>
    </>
  );
};
