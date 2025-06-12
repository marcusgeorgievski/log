// types/log.ts
export interface Log {
  id: string;
  resource: string;
  pages: number;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface LogFilters {
  startDate?: Date;
  endDate?: Date;
  resource?: string;
}
