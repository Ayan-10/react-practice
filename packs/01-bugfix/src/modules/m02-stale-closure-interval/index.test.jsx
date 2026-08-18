import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE FocusTimer app (navbar + timer panel + pages), exactly like a
// user would see it. The only thing broken is the timer's auto-increment, which
// lives in components/TimerPanel.jsx (a stale closure in setInterval).
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m02 · FocusTimer — auto counter (stale closure)", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("app renders: navbar + home page + timer are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The timer panel and its count start at 0.
    expect(screen.getByTestId("timer-panel")).toBeInTheDocument();
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("shows preset chips and recent sessions on the home page", () => {
    renderApp();
    expect(screen.getAllByTestId("preset-chip").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("session-row").length).toBeGreaterThan(0);
  });

  it("does not advance while the timer is stopped", async () => {
    renderApp();
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    // Never pressed Start — still 0.
    expect(screen.getByTestId("count")).toHaveTextContent("0");
  });

  it("keeps incrementing every second while running (1, 2, 3, …)", async () => {
    renderApp();

    // Start the timer.
    fireEvent.click(screen.getByTestId("toggle"));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByTestId("count")).toHaveTextContent("1");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1000);
    });
    expect(screen.getByTestId("count")).toHaveTextContent("3");
  });

  it("stops advancing when toggled off", async () => {
    renderApp();

    fireEvent.click(screen.getByTestId("toggle"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });
    expect(screen.getByTestId("count")).toHaveTextContent("2");

    // Stop the timer, then let time pass — it must freeze at 2.
    fireEvent.click(screen.getByTestId("toggle"));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(screen.getByTestId("count")).toHaveTextContent("2");
  });
});
