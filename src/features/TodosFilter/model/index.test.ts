import { describe, expect, test } from "vitest";
import { fork, allSettled } from "effector";

import { $todos, Todo } from "entities/Todo";

import { $filter, $todosFiltered, setFilterEv } from ".";
import { FilterType } from "../types";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodosFilter Model", () => {
  test("should have initial $filter as ALL", () => {
    const scope = fork({
      values: [[$filter, FilterType.ALL]],
    });
    expect(scope.getState($filter)).toEqual(FilterType.ALL);
  });

  test("should change $filter", async () => {
    const scope = fork({
      values: [[$filter, FilterType.ALL]],
    });

    allSettled(setFilterEv, { scope, params: FilterType.COMPLETED });

    expect(scope.getState($filter)).toEqual(FilterType.COMPLETED);
  });

  test("should change $todosFiltered", async () => {
    const scope = fork({
      values: [
        [$filter, FilterType.ALL],
        [$todos, mock],
      ],
    });
    const result = [mock[1], mock[3]];
		
    await allSettled(setFilterEv, { scope, params: FilterType.COMPLETED });

    expect(scope.getState($todosFiltered)).toEqual(result);
  });
});
