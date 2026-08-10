import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DebouncedSearch from "./index.jsx";

describe("m02 — debounced search", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("fires the search only once after the user stops typing", async () => {
    const search = vi.fn().mockResolvedValue([{ id: 1, title: "Mouse" }]);
    render(<DebouncedSearch search={search} />);

    const input = screen.getByTestId("search-input");
    // Three quick keystrokes within the debounce window.
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.change(input, { target: { value: "abc" } });
    expect(search).not.toHaveBeenCalled(); // still debouncing

    // Flush the 300ms debounce timer + the resolved promise microtasks.
    await vi.advanceTimersByTimeAsync(300);

    expect(search).toHaveBeenCalledTimes(1);
    expect(search).toHaveBeenCalledWith("abc");
    expect(screen.getAllByTestId("result-item")).toHaveLength(1);
  });

  it("does not call search for an empty query", async () => {
    const search = vi.fn().mockResolvedValue([]);
    render(<DebouncedSearch search={search} />);
    await vi.advanceTimersByTimeAsync(500);
    expect(search).not.toHaveBeenCalled();
  });
});
