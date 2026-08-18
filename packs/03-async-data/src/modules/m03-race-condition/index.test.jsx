import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";

import App from "./App.jsx";
import CityDetails from "./components/CityDetails.jsx";

// ---------------------------------------------------------------------------
// 1) App renders — mount the WHOLE CityExplorer app via MemoryRouter and check
//    the navbar, the home page, and navigation to the second route.
// ---------------------------------------------------------------------------
describe("CityExplorer — app renders", () => {
  it("shows navbar + home page and navigates to favorites", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("cityexplorer-app")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();

    await user.click(screen.getByTestId("nav-favorites"));
    expect(screen.getByTestId("favorites-page")).toBeInTheDocument();
  });
});

// ---------------------------------------------------------------------------
// 2) Race condition feature — import the feature (CityDetails) DIRECTLY and
//    replicate the original race test with an injected loader where id 1 is
//    SLOW (60ms) and id 2 is FAST (10ms).
// ---------------------------------------------------------------------------

// A loader where city 1 is SLOW (60ms) and city 2 is FAST (10ms).
// If stale responses aren't ignored, clicking 2 right after mount lets the
// slow "detail-1" overwrite the correct "detail-2".
function makeLoader() {
  return (id) =>
    new Promise((resolve) => {
      const delay = id === 1 ? 60 : 10;
      setTimeout(() => resolve(`detail-${id}`), delay);
    });
}

describe("CityExplorer — race condition feature", () => {
  it("ignores the stale earlier response and keeps the latest id's result", async () => {
    const user = userEvent.setup();
    render(<CityDetails load={makeLoader()} />);

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
