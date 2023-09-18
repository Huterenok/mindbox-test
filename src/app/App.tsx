import { useUnit } from "effector-react";

import { TodosClear, TodosFilter, TodosForm } from "features";
import { $todosFiltered } from "features/TodosFilter";
import { TodoList } from "entities/Todo";

import "./styles/index.css";

export const App = () => {
  const todos = useUnit($todosFiltered);

  return (
    <div className="app">
      <h1 className="title">Todo App</h1>
      <TodosForm />
      <TodosFilter />
      <TodoList todos={todos} />
      <TodosClear />
    </div>
  );
};
