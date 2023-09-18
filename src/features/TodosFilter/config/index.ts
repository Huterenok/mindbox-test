import { Filter, FilterType } from "../types";

export const filters: Filter[] = [
  {
    type: FilterType.ALL,
    title: "All",
    isActive: true,
  },
  {
    type: FilterType.COMPLETED,
    title: "Completed",
    isActive: false,
  },
  {
    type: FilterType.UNCOMPLETED,
    title: "Uncompleted",
    isActive: false,
  },
];
