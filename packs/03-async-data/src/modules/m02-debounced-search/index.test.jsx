import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

import App from "./App.jsx";
import GifSearch from "./components/GifSearch.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m02 — app renders (GifSearch mini-app)", () => {
  // Real timers here: routing/navigation shouldn't fight fake timers.
  it("mounts the app shell with navbar and home page", () => {
    renderApp();
    expect(screen.getByTestId("gifsearch-app")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the trending route", () => {
    renderApp();
    // Home is shown first.
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("nav-trending"));

    expect(screen.getByTestId("trending-page")).toBeInTheDocument();
    expect(screen.queryByTestId("home-page")).not.toBeInTheDocument();
  });
});

describe("m02 — debounced search feature", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("fires the search only once after the user stops typing", async () => {
    const search = vi.fn().mockResolvedValue([{ id: 1, title: "Mouse" }]);
    render(<GifSearch search={search} />);

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
    render(<GifSearch search={search} />);
    await vi.advanceTimersByTimeAsync(500);
    expect(search).not.toHaveBeenCalled();
  });
});
