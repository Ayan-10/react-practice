import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";
import { subscriberCount, __resetFeed } from "./data/feed.js";

// Mount the WHOLE LiveFeed app (navbar + live ticker + archive route), exactly
// like a user would see it. The only thing broken is the subscription cleanup
// in components/FeedTicker.jsx.
function renderApp(entries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={entries}>
      <App />
    </MemoryRouter>
  );
}

describe("m09 · LiveFeed — subscription cleanup (no leak)", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    __resetFeed();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    __resetFeed();
  });

  it("app renders: navbar + home page + live ticker are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("feed-ticker")).toBeInTheDocument();
  });

  it("streams new live events into the ticker over time", async () => {
    renderApp();
    const before = screen.getAllByTestId("feed-item").length;

    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });

    expect(screen.getAllByTestId("feed-item").length).toBeGreaterThan(before);
  });

  it("shows the Archive route with its past notifications", () => {
    renderApp(["/archive"]);
    const page = screen.getByTestId("archive-page");
    expect(page).toBeInTheDocument();
    expect(within(page).getAllByTestId("archive-item").length).toBeGreaterThan(0);
  });

  // THE BUG TEST — fails on the stub (no cleanup), passes on the fix.
  // Mounting the app opens exactly one subscription. Pausing the feed unmounts
  // FeedTicker; a correctly-cleaned-up effect drops the active subscriber count
  // back to 0. A leaking effect leaves the interval alive (> 0).
  it("cleans up the subscription when the ticker unmounts (count returns to 0)", async () => {
    renderApp();

    // One active subscription while the ticker is mounted.
    expect(subscriberCount()).toBe(1);

    // Pause the feed → FeedTicker unmounts. Cleanup must run here.
    await act(async () => {
      fireEvent.click(screen.getByTestId("toggle-live"));
    });

    // Let any still-alive interval fire; a leak would keep it running.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2000);
    });

    expect(subscriberCount()).toBe(0);
  });
});
