export enum FilterType {
  ALL,
  COMPLETED,
  UNCOMPLETED,
}

export interface Filter {
  type: FilterType;
  title: string;
  isActive: boolean;
}
