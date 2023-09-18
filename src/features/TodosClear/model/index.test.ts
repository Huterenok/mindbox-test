import { describe, expect, test } from "vitest";
import { fork, allSettled } from "effector";

import { $todos, Todo } from "entities/Todo";

import { clearAllEv, clearCompletedEv } from ".";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodosForm Model", () => {
	

  test("should clear all todos", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });

    await allSettled(clearAllEv, { scope });

    expect(scope.getState($todos)).toEqual([]);
  });

  test("should clear completed todos", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const result: Todo[] = mock.filter((todo) => todo.completed != true);

    await allSettled(clearCompletedEv, { scope });

    expect(scope.getState($todos)).toEqual(result);
  });
});
