import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ProductList from "./index.jsx";

const sample = [
  { id: 1, title: "Wireless Mouse", price: 25 },
  { id: 2, title: "Keyboard", price: 75 },
];

describe("m01 — fetch states", () => {
  it("shows a loading state initially", () => {
    const load = () => new Promise(() => {}); // never resolves
    render(<ProductList load={load} />);
    expect(screen.getByTestId("loading")).toHaveTextContent(/loading/i);
  });

  it("renders products on success", async () => {
    const load = vi.fn().mockResolvedValue({ products: sample, total: 2 });
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(2)
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });

  it("shows an empty state when there are no products", async () => {
    const load = vi.fn().mockResolvedValue({ products: [], total: 0 });
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getByTestId("empty")).toHaveTextContent(/no products/i)
    );
  });

  it("shows an error state when the request fails", async () => {
    const load = vi.fn().mockRejectedValue(new Error("boom"));
    render(<ProductList load={load} />);
    await waitFor(() =>
      expect(screen.getByTestId("error")).toHaveTextContent(/something went wrong/i)
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });
});
