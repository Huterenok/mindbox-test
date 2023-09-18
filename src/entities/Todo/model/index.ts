import { createStore, createEvent, sample, combine } from "effector";
import persist from "effector-localstorage";

import { Todo } from "../types";
import { addTodo, removeTodo, toggleTodo, updateTodo } from "../lib";

export const addTodoEv = createEvent<string>();
export const removeTodoEv = createEvent<number>();
export const updateTodoEv = createEvent<{ id: number; content: string }>();
export const toggleTodoEv = createEvent<number>();

export const $todos = createStore<Todo[]>([]);

persist({
  key: "todos",
  store: $todos,
});

sample({
  clock: addTodoEv,
  source: $todos,
  fn: (source, clock) => {
    return addTodo(source, clock);
  },
  target: $todos,
});

sample({
  clock: removeTodoEv,
  source: $todos,
  fn: (source, clock) => {
    return removeTodo(source, clock);
  },
  target: $todos,
});

sample({
  clock: updateTodoEv,
  source: $todos,
  fn: (source, clock) => {
    return updateTodo(source, clock.id, clock.content);
  },
  target: $todos,
});

sample({
  clock: toggleTodoEv,
  source: $todos,
  fn: (source, clock) => {
    return toggleTodo(source, clock);
  },
  target: $todos,
});

export const $todosCompleted = combine($todos, (todos) => {
  return todos.filter((todo) => todo.completed === true);
});
