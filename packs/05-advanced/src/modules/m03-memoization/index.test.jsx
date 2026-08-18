import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE PrimeLab mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive it and
// unit-test the expensive helper.
import PrimeList, { countPrimes } from "./components/PrimeList.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m03 · PrimeLab — app renders", () => {
  it("renders navbar and the lab home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("n-input")).toBeInTheDocument();
  });

  it("navigates to the About route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-about"));
    expect(await screen.findByTestId("about-page")).toBeInTheDocument();
  });
});

describe("m03 · countPrimes — pure helper", () => {
  it("counts primes correctly", () => {
    expect(countPrimes(1)).toBe(0);
    expect(countPrimes(10)).toBe(4); // 2,3,5,7
    expect(countPrimes(100)).toBe(25);
  });
});

describe("m03 · memoization behaviour", () => {
  it("does NOT recompute when the unrelated count is bumped (useMemo)", async () => {
    const user = userEvent.setup();
    render(<PrimeList />);

    const runsAfterMount = Number(
      screen.getByTestId("compute-count").textContent
    );

    // Bump the unrelated counter several times.
    await user.click(screen.getByTestId("bump-btn"));
    await user.click(screen.getByTestId("bump-btn"));
    await user.click(screen.getByTestId("bump-btn"));

    // The unrelated count MUST have changed…
    expect(screen.getByTestId("count-val")).toHaveTextContent("3");
    // …but the expensive computation must NOT have run again.
    expect(screen.getByTestId("compute-count")).toHaveTextContent(
      String(runsAfterMount)
    );
  });

  it("DOES recompute (and updates prime-count) when N changes", async () => {
    const user = userEvent.setup();
    render(<PrimeList />);

    const runsBefore = Number(screen.getByTestId("compute-count").textContent);

    const input = screen.getByTestId("n-input");
    await user.clear(input);
    await user.type(input, "100");

    expect(screen.getByTestId("prime-count")).toHaveTextContent("25");
    // Changing N must have re-run the expensive computation at least once more.
    const runsAfter = Number(screen.getByTestId("compute-count").textContent);
    expect(runsAfter).toBeGreaterThan(runsBefore);
  });
});
