import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Cart from "./index.jsx";

// fallbackProducts: id1 $25, id2 $75, id3 $40, ...

describe("Cart management", () => {
  it("adds a product to the cart", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await user.click(screen.getByTestId("add-1"));
    expect(screen.getByTestId("cart-line-1")).toBeInTheDocument();
    expect(screen.getByTestId("qty-1")).toHaveTextContent("1");
    expect(screen.getByTestId("total-count")).toHaveTextContent("1");
    expect(screen.getByTestId("total-price")).toHaveTextContent("25.00");
  });

  it("increments quantity when the same product is added again", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await user.click(screen.getByTestId("add-1"));
    await user.click(screen.getByTestId("add-1"));
    expect(screen.getByTestId("qty-1")).toHaveTextContent("2");
    expect(screen.getByTestId("total-count")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("50.00");
  });

  it("adds multiple different products and totals correctly", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await user.click(screen.getByTestId("add-1")); // 25
    await user.click(screen.getByTestId("add-2")); // 75
    expect(screen.getByTestId("total-count")).toHaveTextContent("2");
    expect(screen.getByTestId("total-price")).toHaveTextContent("100.00");
  });

  it("increments and decrements from the cart", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await user.click(screen.getByTestId("add-2")); // qty1
    await user.click(screen.getByTestId("inc-2")); // qty2
    expect(screen.getByTestId("qty-2")).toHaveTextContent("2");
    await user.click(screen.getByTestId("dec-2")); // qty1
    expect(screen.getByTestId("qty-2")).toHaveTextContent("1");
  });

  it("removes the line when quantity reaches 0", async () => {
    const user = userEvent.setup();
    render(<Cart />);
    await user.click(screen.getByTestId("add-3"));
    await user.click(screen.getByTestId("dec-3"));
    expect(screen.queryByTestId("cart-line-3")).not.toBeInTheDocument();
    expect(screen.getByTestId("total-count")).toHaveTextContent("0");
    expect(screen.getByTestId("total-price")).toHaveTextContent("0.00");
  });
});
