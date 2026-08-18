import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SalesTable mini-app (navbar + table home + a second route).
import App from "./index.jsx";
// The feature, imported DIRECTLY so we can drive it with fixture rows.
import DataTable from "./components/DataTable.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m05 · SalesTable — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Summary route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-summary"));
    expect(await screen.findByTestId("summary-page")).toBeInTheDocument();
  });
});

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

describe("m05 · SalesTable — data table feature", () => {
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
