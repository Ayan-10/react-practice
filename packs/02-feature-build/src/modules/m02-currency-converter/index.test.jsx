import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE TravelWallet app (navbar + converter screen + rates route),
// exactly like a user would see it. The only thing to BUILD is the live
// conversion, which lives in components/CurrencyConverter.jsx.
//
// The shared API is mocked with deterministic rates keyed by "FROM_TO".
const RATES = { USD_EUR: 0.9, USD_GBP: 0.8, USD_INR: 83, EUR_INR: 90 };

vi.mock("../../shared/api.js", () => ({
  fetchRate: vi.fn(async (from, to) => RATES[`${from}_${to}`] ?? 1),
}));

import { fetchRate } from "../../shared/api.js";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m02 · TravelWallet — app renders", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders navbar, home page and the converter", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("amount")).toBeInTheDocument();
    expect(screen.getByTestId("from")).toBeInTheDocument();
    expect(screen.getByTestId("to")).toBeInTheDocument();
  });

  it("navigates to the Rates route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-rates"));
    expect(await screen.findByTestId("rates-page")).toBeInTheDocument();
  });
});

describe("m02 · TravelWallet — currency converter feature", () => {
  beforeEach(() => vi.clearAllMocks());

  it("converts the default amount on mount", async () => {
    renderApp();
    // amount 1 USD -> EUR at 0.9
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("0.90")
    );
  });

  it("updates the result when the amount changes", async () => {
    const user = userEvent.setup();
    renderApp();
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("0.90")
    );
    const amount = screen.getByTestId("amount");
    await user.clear(amount);
    await user.type(amount, "10");
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("9.00")
    );
  });

  it("refetches and updates when currencies change", async () => {
    const user = userEvent.setup();
    renderApp();
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("0.90")
    );
    await user.selectOptions(screen.getByTestId("to"), "INR");
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("83.00")
    );
    expect(fetchRate).toHaveBeenCalledWith("USD", "INR");
  });
});
