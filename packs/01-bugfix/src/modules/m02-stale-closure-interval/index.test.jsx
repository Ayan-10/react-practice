import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StaleClosureInterval from "./index.jsx";

describe("Auto counter — stale closure", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("keeps incrementing every second while running", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<StaleClosureInterval />);
    expect(screen.getByTestId("count")).toHaveTextContent("0");

    await user.click(screen.getByTestId("toggle"));

    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByTestId("count")).toHaveTextContent("1");
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    act(() => vi.advanceTimersByTime(1000));
    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });

  it("stops when toggled off", async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
    render(<StaleClosureInterval />);
    await user.click(screen.getByTestId("toggle"));
    act(() => vi.advanceTimersByTime(2000));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
    await user.click(screen.getByTestId("toggle"));
    act(() => vi.advanceTimersByTime(3000));
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
});
