import { Todo } from "entities/Todo";

export const addTodo = (todos: Todo[], content: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    content,
    completed: false,
  },
];
