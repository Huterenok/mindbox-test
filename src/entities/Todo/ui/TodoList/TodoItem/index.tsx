import { ChangeEvent, FC, memo } from "react";
import { useUnit } from "effector-react";

import { Todo } from "../../../types";
import { removeTodoEv, toggleTodoEv, updateTodoEv } from "../../../model";

import { Button, Card, Checkbox, Input } from "shared/ui";
import styles from "./Todo.module.css";

interface TodoProps {
  todo: Todo;
}

export const TodoItem: FC<TodoProps> = memo(
  ({ todo }) => {
    const [updateTodo, removeTodo, toggleTodo] = useUnit([
      updateTodoEv,
      removeTodoEv,
      toggleTodoEv,
    ]);

    const onToggle = () => toggleTodo(todo.id);
    const onInput = (e: ChangeEvent<HTMLInputElement>) =>
      updateTodo({ content: e.target.value, id: todo.id });
    const onRemove = () => removeTodo(todo.id);

    return (
      <Card className={styles.wrapper}>
        <Checkbox checked={todo.completed} onChange={onToggle} />
        <Input
          value={todo.content}
          onChange={onInput}
          isCrossed={todo.completed}
          placeholder="Your Todo"
        />
        <Button onClick={onRemove}>Delete</Button>
      </Card>
    );
  },
  (prev, next) =>
    prev.todo.content == next.todo.content &&
    prev.todo.completed == next.todo.completed
);
