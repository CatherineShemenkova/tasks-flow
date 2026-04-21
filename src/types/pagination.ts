export interface Paginated {
  page: number;
  pageSize: number;
}

export interface Pageable<T> {
  data: T;
  total: number;
}
