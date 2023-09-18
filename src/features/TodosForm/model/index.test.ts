import { describe, expect, test } from "vitest";
import { fork, allSettled } from "effector";

import { $todos, Todo } from "entities/Todo";
import { $todosForm, changeInputEv, submitFormEv } from ".";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodosForm Model", () => {
  test("should have empty initial value", () => {
    const scope = fork({
      values: [[$todosForm, ""]],
    });

    expect(scope.getState($todosForm)).toEqual("");
  });

  test("should change value", async () => {
    const scope = fork({
      values: [[$todosForm, ""]],
    });
    const changeInput = "bebra";

    await allSettled(changeInputEv, { scope, params: changeInput });

    expect(scope.getState($todosForm)).toEqual(changeInput);
  });

  test("should clear value after submit", async () => {
    const scope = fork({
      values: [[$todosForm, "bebra"]],
    });

    await allSettled(submitFormEv, { scope });

    expect(scope.getState($todosForm)).toEqual("");
  });

  test("should create new todo", async () => {
    const scope = fork({
      values: [
        [$todos, mock],
        [$todosForm, "bebra"],
      ],
    });
    const result: Todo[] = [
      ...mock,
      { completed: false, id: 5, content: "bebra" },
    ];

    await allSettled(submitFormEv, { scope });

    expect(scope.getState($todos)).toEqual(result);
  });
});
