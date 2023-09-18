import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

import { TodosFilter } from ".";
import { filters } from "../config";

describe("TodosFilter UI", () => {
  test("should render TodosFilter", () => {
    const { baseElement } = render(<TodosFilter />);

    const tab1El = screen.getByText(filters[0].title);
    const tab2El = screen.getByText(filters[1].title);
    const tab3El = screen.getByText(filters[2].title);

    expect(baseElement).toBeInTheDocument();
    expect(tab1El).toBeInTheDocument();
    expect(tab2El).toBeInTheDocument();
    expect(tab3El).toBeInTheDocument();
  });
});
