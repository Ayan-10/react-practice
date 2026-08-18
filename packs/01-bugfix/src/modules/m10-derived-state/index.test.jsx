import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE ExpenseTracker app (navbar + expenses page + reports route),
// exactly like a user would see it. The only thing broken is the derived
// list/total in components/ExpenseList.jsx.
function renderApp(entries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={entries}>
      <App />
    </MemoryRouter>
  );
}

describe("m10 · ExpenseTracker — derived state (list + total stay fresh)", () => {
  it("app renders: navbar + home page + expense list are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("list")).toBeInTheDocument();
  });

  it("seeds the expense list and total", () => {
    renderApp();
    expect(screen.getAllByTestId("list-item").length).toBeGreaterThan(0);
    // Seed total = 54 + 30 + 88 + 24 + 12 = 208
    expect(screen.getByTestId("total")).toHaveTextContent("208");
  });

  it("filters the list by category", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.selectOptions(screen.getByTestId("category-filter"), "Food");
    const rows = screen.getAllByTestId("list-item");
    expect(rows.map((r) => r.textContent).join(" ")).toContain("Groceries");
    expect(rows.map((r) => r.textContent).join(" ")).not.toContain("Bus pass");
    // Food total = 54 + 12 = 66
    expect(screen.getByTestId("total")).toHaveTextContent("66");
  });

  it("shows the Reports route with its category breakdown", () => {
    renderApp(["/reports"]);
    const page = screen.getByTestId("reports-page");
    expect(page).toBeInTheDocument();
    expect(within(page).getAllByTestId("report-row").length).toBeGreaterThan(0);
  });

  // THE BUG TEST — fails on the stub (derived state stored in state goes stale
  // on Add), passes on the fix. Adding an expense must immediately show the new
  // row AND update the total, without touching the category filter.
  it("adding an expense updates the list and total immediately", async () => {
    const user = userEvent.setup();
    renderApp();
    const before = screen.getAllByTestId("list-item").length;

    await user.type(screen.getByTestId("new-title"), "Book");
    await user.type(screen.getByTestId("new-amount"), "20");
    await user.click(screen.getByTestId("add"));

    expect(screen.getAllByTestId("list-item").length).toBe(before + 1);
    expect(screen.getByText("Book")).toBeInTheDocument();
    // New total = 208 + 20 = 228
    expect(screen.getByTestId("total")).toHaveTextContent("228");
  });
});
