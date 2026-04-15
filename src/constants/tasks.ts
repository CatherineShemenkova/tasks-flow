export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export enum SortOption {
  CREATEDAT_DESC = '-createdAt',
  CREATEDAT_ASC = 'createdAt',
  DEADLINE_DESC = '-deadline',
  DEADLINE_ASC = 'deadline',
}
