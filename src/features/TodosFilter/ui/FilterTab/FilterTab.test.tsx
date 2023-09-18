import { fork } from "effector";
import { Provider } from "effector-react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { FilterTab } from ".";
import { filters } from "../../config";
import { $filter } from "../../model";
import { FilterType } from "features/TodosFilter/types";

describe("FilterTab UI", () => {
  afterEach(cleanup);

  test("should render FilterTab", () => {
    const { baseElement } = render(<FilterTab filter={filters[0]} />);

    expect(baseElement).toBeInTheDocument();
  });

  test("should change $filter", () => {
    const scope = fork({
      values: [[$filter, FilterType.ALL]],
    });
    const result = FilterType.COMPLETED;

    render(
      <Provider value={scope}>
        <FilterTab filter={filters[1]} />
      </Provider>
    );
    const tabEl = screen.getByText("Completed");

    fireEvent.click(tabEl);

    expect(scope.getState($filter)).toEqual(result);
  });
});
