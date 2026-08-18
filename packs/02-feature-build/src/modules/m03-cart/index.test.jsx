import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE GroceryCart app (navbar + shop grid + cart), exactly like a
// user would see it. The only thing to BUILD is the cart behavior + totals,
// which live in components/CartManager.jsx.
//
// Local dataset used by the module:
//   id1 Avocados       — $25
//   id2 Wild Salmon    — $75
//   id3 Olive Oil      — $40
//   id4 Sourdough Loaf — $30
//   id5 Aged Cheddar   — $55
//   id6 Truffle Butter — $150

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m03 · GroceryCart — app renders", () => {
  it("renders navbar, home page and the product list", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("product-list")).toBeInTheDocument();
    expect(screen.queryAllByTestId("product-card").length).toBeGreaterThan(0);
  });

  it("navigates to the Orders route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-orders"));
    expect(await screen.findByTestId("orders-page")).toBeInTheDocument();
  });
});

describe("m03 · GroceryCart — cart management feature", () => {
  it("adds a product to the cart", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-1"));
    expect(screen.getByTestId("cart-line-1")).toBeInTheDocument();
    expect(screen.getByTestId("qty-1")).toHaveTextContent("1");
    expect(screen.getByTestId("total-count")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("25.00");
  });

  it("increments quantity when the same product is added again", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-1"));
    await user.click(screen.getByTestId("add-1"));
    expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
    expect(screen.getByTestId("total-count")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("50.00");
  });

  it("adds multiple different products and totals correctly", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-1")); // 25
    await user.click(screen.getByTestId("add-2")); // 75
    expect(screen.getByTestId("total-count")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("100.00");
  });

  it("increments and decrements from the cart", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-2")); // qty1
    await user.click(screen.getByTestId("inc-2")); // qty2
    expect(screen.getByTestId("qty-2")).toHaveTextContent("2");
    await user.click(screen.getByTestId("dec-2")); // qty1
    expect(screen.getByTestId("qty-2")).toHaveTextContent("1");
  });

  it("removes the line when quantity reaches 0", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-3"));
    await user.click(screen.getByTestId("dec-3"));
    expect(screen.queryByTestId("cart-line-3")).not.toBeInTheDocument();
    expect(screen.getByTestId("total-count")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
  });
});
