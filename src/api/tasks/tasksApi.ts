import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { TasksSliceState } from '@/store/tasksSlice/types.ts';
import { type Task, type TaskTag } from '@/types/tasks.ts';
import type { Pageable } from '@/types/pagination.ts';
import { ENV_CONFIG } from '@/env/config.ts';
import { ApiTag } from './constants.ts';
import { buildTasksSearchParams, handleQueryError } from './helpers.ts';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: ENV_CONFIG.API_URL }),
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getTasks: builder.query<Pageable<Task[]>, TasksSliceState>({
      providesTags: [ApiTag.TASKS],
      query: (params) => ({
        url: '/tasks',
        params: buildTasksSearchParams(params),
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
      providesTags: (_result, _error, id) => [{ type: ApiTag.TASK, id }],
      query: (id) => `/tasks/${id}`,
    }),

    createTask: builder.mutation<Task, Omit<Task, 'id' | 'createdAt' | 'updatedAt'>>({
      query: (task) => {
        const now = new Date().toISOString();
        return {
          url: '/tasks',
          method: 'POST',
          // "createdAt" and "updatedAt" should be initialized on server
          body: { ...task, createdAt: now, updatedAt: now },
        };
      },
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        await handleQueryError(queryFulfilled, 'Failed to create task');
      },
    }),

    updateTask: builder.mutation<Task, Task>({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        // "updatedAt" should be updated on server
        body: { ...task, updatedAt: new Date().toISOString() },
      }),
      invalidatesTags: (_result, _error, task) => [{ type: ApiTag.TASK, id: task.id }, ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        await handleQueryError(queryFulfilled, 'Failed to update task');
      },
    }),

    partialUpdateTask: builder.mutation<Task, Partial<Task> & Pick<Task, 'id'>>({
      query: ({ id, ...patch }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: { ...patch, updatedAt: new Date().toISOString() },
      }),
      invalidatesTags: (_result, _error, task) => [{ type: ApiTag.TASK, id: task.id }, ApiTag.TASKS],
      async onQueryStarted(_task, { queryFulfilled }) {
        await handleQueryError(queryFulfilled, 'Failed to update task');
      },
    }),

    deleteTask: builder.mutation<void, Task['id']>({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [ApiTag.TASKS],
      async onQueryStarted(_id, { queryFulfilled }) {
        await handleQueryError(queryFulfilled, 'Failed to delete task');
      },
    }),

    getTasksTags: builder.query<TaskTag[], void>({
      providesTags: [ApiTag.TASK_TAGS],
      query: () => '/tags',
    }),

    createTaskTag: builder.mutation<TaskTag, Omit<TaskTag, 'id'>>({
      query: (body) => ({
        url: '/tags',
        method: 'POST',
        body,
      }),
      invalidatesTags: [ApiTag.TASK_TAGS],
      async onQueryStarted(_id, { queryFulfilled }) {
        await handleQueryError(queryFulfilled, 'Failed to create tag');
      },
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
