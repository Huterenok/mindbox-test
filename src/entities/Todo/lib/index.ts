import { Todo } from "../types";

export const addTodo = (todos: Todo[], content: string): Todo[] => [
  ...todos,
  {
    id: Math.max(0, Math.max(...todos.map(({ id }) => id))) + 1,
    content,
    completed: false,
  },
];

export const updateTodo = (
  todos: Todo[],
  id: number,
  content: string
): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    content: todo.id === id ? content : todo.content,
  }));

export const toggleTodo = (todos: Todo[], id: number): Todo[] =>
  todos.map((todo) => ({
    ...todo,
    completed: todo.id === id ? !todo.completed : todo.completed,
  }));

export const removeTodo = (todos: Todo[], id: number): Todo[] =>
  todos.filter((todo) => todo.id !== id);
