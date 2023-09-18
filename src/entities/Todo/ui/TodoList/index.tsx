import { FC } from "react";

import { TodoItem } from "./TodoItem";
import { Todo } from "../../types";

import styles from "./TodoList.module.css";

interface TodoListProps {
  todos: Todo[];
}

export const TodoList: FC<TodoListProps> = ({ todos }) => {
  return (
    <div className={styles.wrapper}>
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)
      ) : (
        <p className={styles.sad_title}>
          You don't have any todos in this category :{"("}
        </p>
      )}
    </div>
  );
};
