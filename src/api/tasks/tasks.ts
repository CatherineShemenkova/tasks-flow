import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { toast } from 'sonner';

import type { TasksSliceState } from '@/store/tasksSlice/types.ts';
import { type Task, type TaskTag } from '@/types/tasks.ts';
import type { Pageable } from '@/types';
import { ApiTag } from './constants.ts';
import { buildSearchParams } from './helpers.ts';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getTasks: builder.query<Pageable<Task[]>, TasksSliceState>({
      providesTags: [ApiTag.TASKS],
      query: (params) => ({
        url: '/tasks',
        params: buildSearchParams(params),
      }),
      transformResponse: (data: Task[], meta) => {
        const headers = meta?.response?.headers;
        return {
          data,
          total: Number(headers?.get('X-Total-Count')),
        };
      },
    }),
    getTaskById: builder.query<Task, Task['id']>({
      query: (id) => `/tasks/${id}`,
    }),
    createTask: builder.mutation<Task, Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (task) => {
        const now = new Date().toISOString();
        return {
          url: '/tasks',
          method: 'POST',
          body: { ...task, createdAt: now, updatedAt: now },
        };
      },
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error('Failed to create task', {
            description: 'A server error occurred. Please try again later.',
          });
        }
      },
    }),
    updateTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: { ...task, updatedAt: new Date().toISOString() },
      }),
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error('Failed to update task', {
            description: 'A server error occurred. Please try again later.',
          });
        }
      },
    }),
    partialUpdateTask: builder.mutation<Task, Partial<Task>>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: { ...patch, updatedAt: new Date().toISOString() },
      }),
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error('Failed to update task', { description: 'A server error occurred. Please try again later.' });
        }
      },
    }),
    deleteTask: builder.mutation<void, Task['id']>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_id, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch {
          toast.error('Failed to delete task', {
            description: 'A server error occurred. Please try again later.',
          });
        }
      },
    }),
    getTasksTags: builder.query<TaskTag[], void>({
      providesTags: [ApiTag.TASK_TAGS],
      query: () => '/tags',
    }),
    createTaskTag: builder.mutation<TaskTag, Pick<TaskTag, 'name'>>({
      query: (body) => ({
        url: '/tags',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiTag.TASK_TAGS],
    }),
  }),
});

export const {
  useGetTasksTagsQuery,
  useCreateTaskTagMutation,
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  usePartialUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
