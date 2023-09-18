import { fork } from "effector";
import { Provider } from "effector-react";
import { beforeEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { $todos } from "entities/Todo";

import { TodoItem } from ".";
import { Todo } from "../../../types";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodoItem UI", () => {
  beforeEach(cleanup);

  test("should render TodoItem", async () => {
    const { baseElement } = render(<TodoItem todo={mock[0]} />);

    expect(baseElement).toBeInTheDocument();
  });

  test("should be able to be deleted", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const result: Todo[] = mock.slice(1);
    const testId = "todo-item";

    render(
      <Provider value={scope}>
        <TodoItem todo={mock[0]} data-testid={testId} />
      </Provider>
    );
    const deleteBtn = screen.getByText("Delete");
    const todo = screen.queryByTestId(testId);

    fireEvent.click(deleteBtn);

    expect(scope.getState($todos)).toEqual(result);
    expect(todo).not.toBeInTheDocument();
  });

  test("should be able to be changed", async () => {
    const scope = fork({
      values: [[$todos, mock]],
    });
    const result = "bebra";

    render(
      <Provider value={scope}>
        <TodoItem todo={mock[0]} />
      </Provider>
    );
    const input: HTMLInputElement = screen.getByPlaceholderText("Your Todo");

    fireEvent.change(input, { target: { value: result } });

    expect(scope.getState($todos)[0].content).toEqual(result);
  });
});
