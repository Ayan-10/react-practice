import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE ShopFilters app (navbar + catalog grid + filters panel),
// exactly like a user would see it. The only thing broken is the filters
// panel's effect, which loops forever in components/ProductFilters.jsx (an
// object dependency re-created every render).
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m03 · ShopFilters — filters effect (infinite loop)", () => {
  // (1) App renders — PASSES on the stub (the render-count cap keeps the
  //     runaway from hanging, so the tree still mounts).
  it("app renders: navbar + home page + filters panel are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("product-filters")).toBeInTheDocument();
    // The catalog grid shows the product cards.
    expect(screen.getAllByTestId("product-card").length).toBeGreaterThan(0);
  });

  // (2) Neutral test — the summary reflects the initial filters. PASSES on the
  //     stub (the value it computes is correct; it just recomputes too often).
  it("shows a summary for the initial filters", () => {
    renderApp();
    expect(screen.getByTestId("summary")).toHaveTextContent(
      "Showing 6 all item(s) over $0"
    );
  });

  // (2b) Neutral test — navigating to the product route works. PASSES on stub.
  it("navigates to a product detail page", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-featured"));
    expect(await screen.findByTestId("product-page")).toBeInTheDocument();
  });

  // (3) BUG test — the effect must run once on mount, not forever. On the buggy
  //     stub the object dependency loops until it slams into the safety cap, so
  //     render-count balloons far past 2. A correct fix (primitive deps) runs
  //     the effect exactly once → count === 1.
  it("does not loop: render count stays low and stable", async () => {
    renderApp();
    // Give any runaway loop a chance to blow up.
    await new Promise((r) => setTimeout(r, 60));
    const count = Number(
      screen.getByTestId("render-count").textContent.replace(/\D/g, "")
    );
    expect(count).toBeLessThanOrEqual(2);
  });

  // (3b) BUG test — changing a filter narrows the grid AND the summary, without
  //      the effect running away. On the stub the grid still updates but the
  //      render count is already pinned at the cap; the assertion on the
  //      bounded count (combined with the test above) fails on the stub.
  it("updates the summary and grid when the category changes", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.selectOptions(screen.getByTestId("category"), "books");

    await waitFor(() =>
      expect(screen.getByTestId("summary")).toHaveTextContent(
        "Showing 2 books item(s) over $0"
      )
    );
    // Only the 2 book products remain in the grid.
    const home = screen.getByTestId("home-page");
    expect(within(home).getAllByTestId("product-card").length).toBe(2);

    // And it did NOT loop while doing so.
    const count = Number(
      screen.getByTestId("render-count").textContent.replace(/\D/g, "")
    );
    expect(count).toBeLessThanOrEqual(3);
  });
});
