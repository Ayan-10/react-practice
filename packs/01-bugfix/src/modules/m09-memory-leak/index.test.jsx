import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import MemoryLeak from "./index.jsx";

// A controllable deferred fetch so we can unmount mid-flight.
let resolveFetch;
vi.mock("../../shared/api.js", () => ({
  fetchProducts: vi.fn(
    () =>
      new Promise((resolve) => {
        resolveFetch = () => resolve({ products: [{ id: 1, title: "Item A" }], total: 1 });
      })
  ),
}));

describe("MemoryLeak — no setState after unmount", () => {
  beforeEach(() => {
    resolveFetch = undefined;
  });

  it("does NOT commit the result if unmounted before the fetch resolves", async () => {
    const onCommit = vi.fn();
    const { unmount } = render(<MemoryLeak onCommit={onCommit} />);
    // Unmount before resolving.
    unmount();
    // Now resolve the pending fetch.
    resolveFetch();
    await new Promise((r) => setTimeout(r, 20));
    expect(onCommit).not.toHaveBeenCalled();
  });

  it("commits the result normally when it stays mounted", async () => {
    const onCommit = vi.fn();
    render(<MemoryLeak onCommit={onCommit} />);
    resolveFetch();
    await waitFor(() => expect(screen.getByTestId("product")).toBeInTheDocument());
    expect(onCommit).toHaveBeenCalledTimes(1);
  });
});
