import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import DataTable from "./index.jsx";

const rows = [
  { id: 1, name: "Banana", price: 30, rating: 4.1 },
  { id: 2, name: "Apple", price: 10, rating: 4.9 },
  { id: 3, name: "Cherry", price: 20, rating: 4.5 },
];

function orderedIds() {
  return screen
    .getAllByTestId(/^row-/)
    .map((el) => el.getAttribute("data-testid"));
}

describe("m05 — data table", () => {
  it("sorts ascending then descending by price", async () => {
    const user = userEvent.setup();
    render(<DataTable rows={rows} />);

    await user.click(screen.getByTestId("sort-price"));
    expect(orderedIds()).toEqual(["row-2", "row-3", "row-1"]); // 10,20,30

    await user.click(screen.getByTestId("sort-price"));
    expect(orderedIds()).toEqual(["row-1", "row-3", "row-2"]); // 30,20,10
  });

  it("sorts ascending by name", async () => {
    const user = userEvent.setup();
    render(<DataTable rows={rows} />);
    await user.click(screen.getByTestId("sort-name"));
    expect(orderedIds()).toEqual(["row-2", "row-1", "row-3"]); // Apple,Banana,Cherry
  });

  it("filters by name (case-insensitive)", async () => {
    const user = userEvent.setup();
    render(<DataTable rows={rows} />);
    await user.type(screen.getByTestId("filter"), "an");
    // "Banana" contains "an"; others don't.
    expect(orderedIds()).toEqual(["row-1"]);
  });
});
