import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DerivedState from "./index.jsx";

describe("Filterable list — derived state", () => {
  it("shows a newly added item immediately (no stale derived state)", async () => {
    const user = userEvent.setup();
    render(<DerivedState />);
    expect(screen.getAllByTestId("list-item")).toHaveLength(3);

    await user.type(screen.getByTestId("new-item"), "date");
    await user.click(screen.getByTestId("add"));

    expect(screen.getAllByTestId("list-item")).toHaveLength(4);
    expect(screen.getByText("date")).toBeInTheDocument();
  });

  it("filters correctly and stays consistent after adding", async () => {
    const user = userEvent.setup();
    render(<DerivedState />);
    await user.type(screen.getByTestId("filter"), "a");
    // apple, banana match "a"
    expect(screen.getAllByTestId("list-item").map((n) => n.textContent).sort()).toEqual(
      ["apple", "banana"]
    );
    await user.type(screen.getByTestId("new-item"), "avocado");
    await user.click(screen.getByTestId("add"));
    // avocado matches "a" too, should appear immediately
    expect(screen.getByText("avocado")).toBeInTheDocument();
  });
});
