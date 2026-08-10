import { render, screen, act, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Stopwatch from "./index.jsx";

describe("m06 — stopwatch", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const advance = async (ms) => {
    await act(async () => {
      await vi.advanceTimersByTimeAsync(ms);
    });
  };

  it("ticks while running", async () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByTestId("start"));
    await advance(300);
    expect(screen.getByTestId("elapsed")).toHaveTextContent("3");
  });

  it("stops (pauses) and preserves the value", async () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByTestId("start"));
    await advance(200);
    fireEvent.click(screen.getByTestId("stop"));
    await advance(500);
    expect(screen.getByTestId("elapsed")).toHaveTextContent("2");
  });

  it("reset returns to 0", async () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByTestId("start"));
    await advance(200);
    fireEvent.click(screen.getByTestId("reset"));
    expect(screen.getByTestId("elapsed")).toHaveTextContent("0");
  });

  it("double start does not double-count", async () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByTestId("start"));
    fireEvent.click(screen.getByTestId("start"));
    await advance(300);
    expect(screen.getByTestId("elapsed")).toHaveTextContent("3");
  });
});
