import { Provider } from "effector-react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { fork } from "effector";

import { $todos, Todo } from "entities/Todo";

import { TodosForm } from ".";
import { $todosForm } from "../model";

const mock: Todo[] = [
  { id: 1, completed: false, content: "todo1" },
  { id: 2, completed: true, content: "todo2" },
  { id: 3, completed: false, content: "todo3" },
  { id: 4, completed: true, content: "todo4" },
];

describe("TodosForm UI", () => {
  afterEach(cleanup);

  test("should render TodosForm", () => {
    const { baseElement } = render(<TodosForm />);

    expect(baseElement).toBeInTheDocument();
  });

  test("should change input value", () => {
    const scope = fork({
      values: [[$todosForm, ""]],
    });

    render(
      <Provider value={scope}>
        <TodosForm />
      </Provider>
    );
    const input: HTMLInputElement =
      screen.getByPlaceholderText("Your next Todo");

    fireEvent.change(input, { target: { value: "todo5" } });

    expect(input.value).toBe("todo5");
    expect(scope.getState($todosForm)).toEqual("todo5");
  });

  test("should add todo on submit", () => {
    const scope = fork({
      values: [
        [$todos, mock],
        [$todosForm, ""],
      ],
    });
    const result: Todo[] = [
      ...mock,
      { completed: false, id: 5, content: "todo5" },
    ];

    render(
      <Provider value={scope}>
        <TodosForm />
      </Provider>
    );
    const input: HTMLInputElement =
      screen.getByPlaceholderText("Your next Todo");
    const button: HTMLButtonElement = screen.getByText("Submit");

    fireEvent.input(input, { target: { value: "todo5" } });
    fireEvent.click(button);

    expect(scope.getState($todos)).toEqual(result);
    expect(input.value).toBe("");
  });
});
