import { FC } from "react";
import { useUnit } from "effector-react";

import { clearAllEv, clearCompletedEv } from "../model";

import { $todos, $todosCompleted } from "entities/Todo";
import { $todosFiltered } from "features/TodosFilter";

import styles from "./TodosClear.module.css";
import { Button } from "shared/ui";

export const TodosClear: FC = () => {
  const [clearCompleted, clearAll] = useUnit([clearCompletedEv, clearAllEv]);
  const [todos, todosFiltered, todosCompleted] = useUnit([
    $todos,
    $todosFiltered,
    $todosCompleted,
  ]);

  return (
    <div className={styles.wrapper}>
      {todos.length > 0 && todosFiltered.length > 0 && (
        <Button onClick={() => clearAll()}>Clear All</Button>
      )}
      {todosCompleted.length > 0 && todosFiltered.length > 0 && (
        <Button onClick={() => clearCompleted()}>Clear Completed</Button>
      )}
    </div>
  );
};
