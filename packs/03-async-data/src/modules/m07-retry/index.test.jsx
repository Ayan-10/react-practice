import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE CryptoTicker mini-app (navbar + home + coin grid + a second
// route), mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can inject a mock
// `load` (deterministic success/failure) to prove the retry behaviour.
import RetryList from "./components/RetryList.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m07 · CryptoTicker — app renders", () => {
  it("renders navbar, home page and the coin list (default loader)", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The default local loader resolves asynchronously, so wait for items.
    const items = await screen.findAllByTestId("product-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("navigates to the Watchlist route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-watchlist"));
    expect(await screen.findByTestId("watchlist-page")).toBeInTheDocument();
  });
});

describe("m07 · CryptoTicker — retry feature", () => {
  it("shows an error with a retry button on failure", async () => {
    const load = vi.fn().mockRejectedValue(new Error("x"));
    render(<RetryList load={load} />);
    await waitFor(() =>
      expect(screen.getByTestId("error")).toHaveTextContent(/failed/i)
    );
    expect(screen.getByTestId("retry")).toBeInTheDocument();
  });

  it("recovers when retry succeeds", async () => {
    const user = userEvent.setup();
    const load = vi
      .fn()
      .mockRejectedValueOnce(new Error("x"))
      .mockResolvedValueOnce({ products: [{ id: 1, title: "A" }], total: 1 });

    render(<RetryList load={load} />);
    await waitFor(() => screen.getByTestId("retry"));

    await user.click(screen.getByTestId("retry"));
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(1)
    );
    expect(screen.queryByTestId("error")).toBeNull();
    expect(load).toHaveBeenCalledTimes(2);
  });
});
