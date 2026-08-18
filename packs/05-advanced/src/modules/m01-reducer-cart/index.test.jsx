import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE BudgetBuddy mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can unit-test the
// reducer (the core skill) and drive the cart UI.
import Cart, { cartReducer, initialState } from "./components/Cart.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m01 · BudgetBuddy — app renders", () => {
  it("renders navbar, home page and the catalogue", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("add-p1")).toBeInTheDocument();
  });

  it("navigates to the Saved route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-saved"));
    expect(await screen.findByTestId("saved-page")).toBeInTheDocument();
  });
});

describe("m01 · cartReducer — pure logic", () => {
  const product = { id: "p1", name: "Keyboard", price: 80 };

  it("adds a new product with qty 1", () => {
    const next = cartReducer(initialState, { type: "add", product });
    expect(next.items).toEqual([{ id: "p1", name: "Keyboard", price: 80, qty: 1 }]);
  });

  it("bumps qty when the same product is added again", () => {
    let s = cartReducer(initialState, { type: "add", product });
    s = cartReducer(s, { type: "add", product });
    expect(s.items).toHaveLength(1);
    expect(s.items[0].qty).toBe(2);
  });

  it("inc / dec change qty, and dec to 0 removes the line", () => {
    let s = cartReducer(initialState, { type: "add", product });
    s = cartReducer(s, { type: "inc", id: "p1" });
    expect(s.items[0].qty).toBe(2);
    s = cartReducer(s, { type: "dec", id: "p1" });
    s = cartReducer(s, { type: "dec", id: "p1" });
    expect(s.items).toHaveLength(0);
  });

  it("clear empties the cart, unknown action is a no-op", () => {
    let s = cartReducer(initialState, { type: "add", product });
    expect(cartReducer(s, { type: "clear" }).items).toEqual([]);
    expect(cartReducer(s, { type: "???" })).toBe(s);
  });

  it("does not mutate the previous state", () => {
    const s0 = { items: [{ id: "p1", name: "Keyboard", price: 80, qty: 1 }] };
    const snapshot = JSON.stringify(s0);
    cartReducer(s0, { type: "inc", id: "p1" });
    expect(JSON.stringify(s0)).toBe(snapshot);
  });
});

describe("m01 · Cart — wired UI", () => {
  it("adds items and updates count + total; dec to 0 removes the line", async () => {
    const user = userEvent.setup();
    render(<Cart />);

    expect(screen.getByTestId("cart-empty")).toBeInTheDocument();

    await user.click(screen.getByTestId("add-p1")); // 80
    await user.click(screen.getByTestId("add-p2")); // 30
    await user.click(screen.getByTestId("add-p1")); // 80 again -> qty 2

    expect(screen.getByTestId("qty-p1")).toHaveTextContent("2");
    expect(screen.getByTestId("cart-count")).toHaveTextContent("3");
    expect(screen.getByTestId("cart-total")).toHaveTextContent("190");

    const p2line = screen.getByTestId("line-p2");
    await user.click(within(p2line).getByTestId("dec-p2")); // qty 0 -> removed
    expect(screen.queryByTestId("line-p2")).toBeNull();
    expect(screen.getByTestId("cart-total")).toHaveTextContent("160");

    await user.click(screen.getByTestId("clear-cart"));
    expect(screen.getByTestId("cart-empty")).toBeInTheDocument();
  });
});
