import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import RaceDetails from "./index.jsx";

// A loader where item 1 is SLOW (60ms) and item 2 is FAST (10ms).
// If stale responses aren't ignored, clicking 2 right after mount lets the
// slow "detail-1" overwrite the correct "detail-2".
function makeLoader() {
  return (id) =>
    new Promise((resolve) => {
      const delay = id === 1 ? 60 : 10;
      setTimeout(() => resolve(`detail-${id}`), delay);
    });
}

describe("m03 — race condition", () => {
  it("ignores the stale earlier response and keeps the latest id's result", async () => {
    const user = userEvent.setup();
    render(<RaceDetails load={makeLoader()} />);

    // Mount kicks off slow load(1). Immediately switch to fast load(2).
    await user.click(screen.getByTestId("select-2"));

    // Fast one resolves first -> detail-2.
    await waitFor(() =>
      expect(screen.getByTestId("detail")).toHaveTextContent("detail-2")
    );

    // Give the slow load(1) time to resolve; it must NOT overwrite.
    await new Promise((r) => setTimeout(r, 80));
    expect(screen.getByTestId("detail")).toHaveTextContent("detail-2");
  });
});
