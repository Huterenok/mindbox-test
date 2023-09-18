import { FC, ChangeEvent, memo } from "react";
import { useUnit } from "effector-react";

import { $todosForm, changeInputEv, submitFormEv } from "../model";

import styles from "./TodosForm.module.css";
import { Button, Input } from "shared/ui";

export const TodosForm: FC = memo(() => {
  const [inputValue, changeInput, submitForm] = useUnit([
    $todosForm,
    changeInputEv,
    submitFormEv,
  ]);

  const onSubmit = () => submitForm();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    changeInput(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <Input
        value={inputValue}
        onChange={onChange}
        placeholder="Your next Todo"
      />
      <Button children="Submit" onClick={onSubmit} />
    </div>
  );
});
