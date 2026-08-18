import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE BookStore app (navbar + catalog + a second route), exactly
// like a user would see it. The only thing to BUILD is the sort control, which
// lives in components/BookList.jsx.
//
// Catalog data used by the module (price / rating):
//   1 A Tale of Two Cities  — $12 — 4.5
//   2 Brave New World       — $30 — 4.8
//   3 Crime and Punishment  — $18 — 4.1
//   4 Dune                  — $25 — 4.9
//   5 East of Eden          — $40 — 4.0
//   6 Fahrenheit 451        — $9  — 4.6

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

const titles = () =>
  screen.getAllByTestId("book-title").map((n) => n.textContent);

describe("m07 · BookStore — app renders", () => {
  it("renders navbar, home page and at least one book", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("book-item").length).toBeGreaterThan(0);
  });

  it("navigates to the Bestsellers route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-bestsellers"));
    expect(await screen.findByTestId("bestsellers-page")).toBeInTheDocument();
  });
});

describe("m07 · BookStore — sort feature", () => {
  it("sorts by price ascending by default", () => {
    renderApp();
    // cheapest first: Fahrenheit 451 (9) … most expensive last: East of Eden (40)
    expect(titles()[0]).toBe("Fahrenheit 451");
    expect(titles()[titles().length - 1]).toBe("East of Eden");
  });

  it("sorts by price descending", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByTestId("sort-select"), "price-desc");
    expect(titles()[0]).toBe("East of Eden");
    expect(titles()[titles().length - 1]).toBe("Fahrenheit 451");
  });

  it("sorts by rating descending", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByTestId("sort-select"), "rating-desc");
    expect(titles()[0]).toBe("Dune"); // 4.9
  });

  it("sorts by title A→Z", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByTestId("sort-select"), "title-asc");
    const sorted = [...titles()].sort((a, b) => a.localeCompare(b));
    expect(titles()).toEqual(sorted);
  });
});
