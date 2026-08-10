import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CurrencyConverter from "./index.jsx";

// Deterministic rates keyed by "FROM_TO".
const RATES = { USD_EUR: 0.9, USD_GBP: 0.8, USD_INR: 83, EUR_INR: 90 };

vi.mock("../../shared/api.js", () => ({
  fetchRate: vi.fn(async (from, to) => RATES[`${from}_${to}`] ?? 1),
}));

import { fetchRate } from "../../shared/api.js";

describe("Currency converter", () => {
  beforeEach(() => vi.clearAllMocks());

  it("converts the default amount on mount", async () => {
    render(<CurrencyConverter />);
    // amount 1 USD -> EUR at 0.9
    await waitFor(() =>
      expect(screen.getByTestId("result")).toHaveTextContent("0.90")
    );
  });

  it("updates the result when the amount changes", async () => {
    const user = userEvent.setup();
    render(<CurrencyConverter />);
    await waitFor(() => expect(screen.getByTestId("result")).toHaveTextContent("0.90"));
    const amount = screen.getByTestId("amount");
    await user.clear(amount);
    await user.type(amount, "10");
    await waitFor(() => expect(screen.getByTestId("result")).toHaveTextContent("9.00"));
  });

  it("refetches and updates when currencies change", async () => {
    const user = userEvent.setup();
    render(<CurrencyConverter />);
    await waitFor(() => expect(screen.getByTestId("result")).toHaveTextContent("0.90"));
    await user.selectOptions(screen.getByTestId("to"), "INR");
    await waitFor(() => expect(screen.getByTestId("result")).toHaveTextContent("83.00"));
    expect(fetchRate).toHaveBeenCalledWith("USD", "INR");
  });
});
