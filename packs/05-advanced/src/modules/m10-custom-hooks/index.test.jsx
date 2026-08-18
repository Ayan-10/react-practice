import { render, screen, act, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE HookBox mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY.
import { useToggle, usePrevious, useDebounce, useLocalStorage } from "./components/hooks.js"; // eslint-disable-line
import { LS_KEY } from "./data/info.js";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe("m10 · HookBox — app renders", () => {
  it("renders navbar, home page and the demo", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-btn")).toBeInTheDocument();
  });

  it("navigates to the About route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-about"));
    expect(await screen.findByTestId("about-page")).toBeInTheDocument();
  });
});

describe("m10 · useToggle — via Demo", () => {
  it("flips toggle-state when the button is clicked", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByTestId("toggle-state")).toHaveTextContent("off");
    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("toggle-state")).toHaveTextContent("on");
    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("toggle-state")).toHaveTextContent("off");
  });
});

describe("m10 · useDebounce + usePrevious — via Demo (fake timers)", () => {
  // NOTE: we drive the input with fireEvent.change (synchronous) rather than
  // userEvent, so it plays nicely with fake timers — userEvent's internal
  // inter-keystroke delays don't mix well with vi.useFakeTimers().
  it("does not update immediately, then settles after the delay", () => {
    vi.useFakeTimers();
    try {
      renderApp();

      const input = screen.getByTestId("deb-input");
      act(() => {
        fireEvent.change(input, { target: { value: "hello" } });
      });

      // Immediately after typing, the debounced value has NOT caught up.
      expect(screen.getByTestId("deb-value")).toHaveTextContent("");

      // Advance past the debounce delay (300ms).
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByTestId("deb-value")).toHaveTextContent("hello");
    } finally {
      vi.useRealTimers();
    }
  });

  it("usePrevious exposes the prior debounced value after a second settle", () => {
    vi.useFakeTimers();
    try {
      renderApp();

      const input = screen.getByTestId("deb-input");

      act(() => {
        fireEvent.change(input, { target: { value: "aa" } });
      });
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByTestId("deb-value")).toHaveTextContent("aa");

      act(() => {
        fireEvent.change(input, { target: { value: "aabb" } });
      });
      act(() => {
        vi.advanceTimersByTime(300);
      });
      expect(screen.getByTestId("deb-value")).toHaveTextContent("aabb");
      // previous debounced value should be the earlier "aa".
      expect(screen.getByTestId("prev-value")).toHaveTextContent("aa");
    } finally {
      vi.useRealTimers();
    }
  });
});

describe("m10 · useLocalStorage — via Demo", () => {
  it("writes typed text to window.localStorage under LS_KEY", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.type(screen.getByTestId("ls-input"), "remember me");
    expect(JSON.parse(window.localStorage.getItem(LS_KEY))).toBe("remember me");
  });

  it("a fresh render reads the previously stored value", () => {
    window.localStorage.setItem(LS_KEY, JSON.stringify("persisted!"));

    renderApp();

    expect(screen.getByTestId("ls-value")).toHaveTextContent("persisted!");
    expect(screen.getByTestId("ls-input")).toHaveValue("persisted!");
  });
});

describe("m10 · hooks — direct unit checks", () => {
  it("usePrevious returns undefined on first render", () => {
    let seen = "sentinel";
    function Probe() {
      seen = usePrevious("first");
      return null;
    }
    render(<Probe />);
    expect(seen).toBeUndefined();
  });
});
