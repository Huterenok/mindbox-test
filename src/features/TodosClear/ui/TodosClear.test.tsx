import { Provider } from "effector-react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { fork } from "effector";

import { $todos, Todo } from "entities/Todo";

import { TodosClear } from ".";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodosClear UI", () => {
  afterEach(cleanup);

  test("should render TodosClear", () => {
    const { baseElement } = render(<TodosClear />);

    expect(baseElement).toBeInTheDocument();
  });

  test("shouldn't render 'Clear All' button on empty $todos", () => {
    const scope = fork({
      values: [[$todos, []]],
    });

    render(
      <Provider value={scope}>
        <TodosClear />
      </Provider>
    );
    const clearBtn = screen.queryByText("Clear All");

    expect(clearBtn).not.toBeInTheDocument();
  });

  test("shouldn't render 'Clear Completed' button on empty $todos", () => {
    const onlyUncompleted = mock.filter((todo) => todo.completed != true);
    const scope = fork({
      values: [[$todos, onlyUncompleted]],
    });
		
    render(
      <Provider value={scope}>
        <TodosClear />
      </Provider>
    );
    const clearBtn = screen.queryByText("Clear Completed");

    expect(clearBtn).not.toBeInTheDocument();
  });

  test("should clear all todos on click", () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const result: Todo[] = [];

    render(
      <Provider value={scope}>
        <TodosClear />
      </Provider>
    );
    const clearBtn: HTMLButtonElement = screen.getByText("Clear All");

    fireEvent.click(clearBtn);

    expect(scope.getState($todos)).toEqual(result);
  });

  test("should clear all completed todos on click", () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const result: Todo[] = mock.filter((todo) => todo.completed != true);

    render(
      <Provider value={scope}>
        <TodosClear />
      </Provider>
    );
    const clearBtn: HTMLButtonElement = screen.getByText("Clear Completed");

    fireEvent.click(clearBtn);

    expect(scope.getState($todos)).toEqual(result);
  });
});
