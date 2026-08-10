import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchFilter from "./index.jsx";

describe("Search filter", () => {
  it("shows all products initially", () => {
    render(<SearchFilter />);
    expect(screen.getAllByTestId("product-item")).toHaveLength(6);
  });

  it("filters case-insensitively by title substring", async () => {
    const user = userEvent.setup();
    render(<SearchFilter />);
    await user.type(screen.getByTestId("search-input"), "key");
    expect(screen.getAllByTestId("product-item")).toHaveLength(1);
    expect(screen.getByText("Mechanical Keyboard")).toBeInTheDocument();
  });

  it("shows no-results when nothing matches", async () => {
    const user = userEvent.setup();
    render(<SearchFilter />);
    await user.type(screen.getByTestId("search-input"), "zzzz");
    expect(screen.queryAllByTestId("product-item")).toHaveLength(0);
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });
});
