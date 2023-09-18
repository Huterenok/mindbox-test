import { beforeEach, describe, expect, test } from "vitest";
import { fork, allSettled } from "effector";

import { $todos, addTodoEv, removeTodoEv, updateTodoEv } from ".";
import { Todo } from "../types";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("Todo Model", () => {
  beforeEach(() => {});

  test("should have initial todos", () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    expect(scope.getState($todos)).toEqual(mock);
  });

  test("should add todo", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const mock_result: Todo[] = [
      ...mock,
      { completed: false, content: "todo5", id: 5 },
    ];

    await allSettled(addTodoEv, { scope, params: "todo5" });

    expect(scope.getState($todos)).toEqual(mock_result);
  });

  test("should remove todo at the end of array", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const mock_result: Todo[] = mock.slice(0, 3);

    await allSettled(removeTodoEv, { scope, params: 4 });

    expect(scope.getState($todos)).toEqual(mock_result);
  });

  test("should remove todo inside array", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const mock_result: Todo[] = mock.slice(0, 2);
    mock_result.push(mock[3]);

    await allSettled(removeTodoEv, { scope, params: 3 });

    expect(scope.getState($todos)).toEqual(mock_result);
  });

  test("should update todo", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const mock_result: Todo[] = mock;
    mock_result[3].content = "bebra";

    await allSettled(updateTodoEv, {
      scope,
      params: { id: 4, content: "bebra" },
    });

    expect(scope.getState($todos)).toEqual(mock_result);
  });
});
