import { createStore, createEvent, sample } from "effector";

import { addTodoEv } from "entities/Todo";

export const changeInputEv = createEvent<string>();
export const submitFormEv = createEvent();

export const $todosForm = createStore<string>("");
$todosForm.reset(addTodoEv);

sample({
  clock: changeInputEv,
  target: $todosForm,
});

sample({
  clock: submitFormEv,
  source: $todosForm,
  target: addTodoEv,
});
