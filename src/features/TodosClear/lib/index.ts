import { Todo } from "entities/Todo";

export const clearCompleted = (todos: Todo[]): Todo[] => {
  return todos.filter((todo) => !todo.completed);
};
