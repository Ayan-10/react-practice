import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE StatusMonitor mini-app (navbar + live value + a second route),
// mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive `load`
// deterministically with fake timers.
import Poller from "./components/Poller.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

// The app-render tests use REAL timers. The Poller runs its default loader on
// mount; findBy* waits out the microtask so there are no act() warnings.
describe("m10 · StatusMonitor — app renders", () => {
  it("renders navbar, home page and the live value", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The default loader resolves asynchronously; wait for the first poll.
    expect(await screen.findByTestId("value")).toBeInTheDocument();
  });

  it("navigates to the History route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-history"));
    expect(await screen.findByTestId("history-page")).toBeInTheDocument();
  });
});

// The feature tests use FAKE timers to control the polling interval precisely.
describe("m10 · StatusMonitor — polling feature", () => {
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
