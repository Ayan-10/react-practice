import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE GymTimer mini-app (navbar + timer + a second route), mounted
// exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive the
// interval with fake timers and prove the start/stop/reset behaviour.
import Stopwatch from "./components/Stopwatch.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m06 · GymTimer — app renders", () => {
  // The stopwatch starts stopped, so real timers are fine here (no hang).
  it("renders navbar, home page and the stopwatch", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("elapsed")).toBeInTheDocument();
  });

  it("navigates to the Workouts route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-workouts"));
    expect(await screen.findByTestId("workouts-page")).toBeInTheDocument();
  });
});

describe("m06 · GymTimer — stopwatch feature", () => {
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
