import { fork } from "effector";
import { Provider } from "effector-react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { $todos, Todo, TodoList } from "entities/Todo";
import { $filter, $todosFiltered } from "features/TodosFilter/model";
import { FilterType } from "features/TodosFilter/types";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodoList UI", () => {
  afterEach(cleanup);

  test("should render TodoList", () => {
    const scope = fork({
      values: [[$todos, mock]],
    });

    const { baseElement } = render(
      <Provider value={scope}>
        <TodoList todos={scope.getState($todos)} />
      </Provider>
    );

    const todo1El = screen.queryByDisplayValue("todo1");
    const todo2El = screen.queryByDisplayValue("todo2");
    const todo3El = screen.queryByDisplayValue("todo3");
    const todo4El = screen.queryByDisplayValue("todo4");

    expect(baseElement).toBeInTheDocument();
    expect(todo1El).toBeInTheDocument();
    expect(todo2El).toBeInTheDocument();
    expect(todo3El).toBeInTheDocument();
    expect(todo4El).toBeInTheDocument();
  });

  test("should render filtered by completed TodoList", () => {
    const scope = fork({
      values: [
        [$todos, mock],
        [$filter, FilterType.COMPLETED],
      ],
    });
    render(
      <Provider value={scope}>
        <TodoList todos={scope.getState($todosFiltered)} />
      </Provider>
    );

    const todo1El = screen.queryByDisplayValue("todo1");
    const todo2El = screen.queryByDisplayValue("todo2");
    const todo3El = screen.queryByDisplayValue("todo3");
    const todo4El = screen.queryByDisplayValue("todo4");

    expect(todo1El).not.toBeInTheDocument();
    expect(todo2El).toBeInTheDocument();
    expect(todo3El).not.toBeInTheDocument();
    expect(todo4El).toBeInTheDocument();
  });
});
