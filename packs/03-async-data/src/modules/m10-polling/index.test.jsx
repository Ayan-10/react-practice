import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Poller from "./index.jsx";

describe("m10 — polling", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("fetches on mount and again after the interval", async () => {
    let n = 0;
    const load = vi.fn(() => Promise.resolve(`v${++n}`));
    render(<Poller load={load} />);

    // Initial fetch resolves (flush timers + promise microtasks inside act).
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    expect(screen.getByTestId("value")).toHaveTextContent("v1");
    expect(screen.getByTestId("poll-count")).toHaveTextContent("1");

    // Advance one interval -> second fetch.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByTestId("value")).toHaveTextContent("v2");
    expect(screen.getByTestId("poll-count")).toHaveTextContent("2");
  });

  it("stops polling after unmount", async () => {
    const load = vi.fn().mockResolvedValue("x");
    const { unmount } = render(<Poller load={load} />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });
    const callsBefore = load.mock.calls.length;

    unmount();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(load.mock.calls.length).toBe(callsBefore);
  });
});
