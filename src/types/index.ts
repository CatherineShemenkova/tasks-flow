import type { ComponentType } from 'react';

export interface WithClassName {
  className?: string;
}

export interface Paginated {
  page: number;
  pageSize: number;
}

export interface Pageable<T> {
  data: T;
  total: number;
}

export interface PriorityConfig {
  label: string;
  ui: string;
}

export interface StatusConfig extends PriorityConfig {
  icon: ComponentType<WithClassName>;
}
