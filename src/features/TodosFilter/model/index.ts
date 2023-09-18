import { createEvent, createStore, sample, combine } from "effector";

import { FilterType } from "../types";
import { $todos } from "entities/Todo";

export const setFilterEv = createEvent<FilterType>();
export const $filter = createStore<FilterType>(FilterType.ALL);

sample({
  clock: setFilterEv,
  target: $filter,
});

export const $todosFiltered = combine($todos, $filter, (todos, filter) => {
  if (filter == FilterType.ALL) {
    return todos;
  } else if (filter == FilterType.COMPLETED) {
    return todos.filter((todo) => todo.completed === true);
  } else {
    return todos.filter((todo) => todo.completed === false);
  }
});
