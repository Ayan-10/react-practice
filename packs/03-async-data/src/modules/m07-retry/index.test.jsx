import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import RetryList from "./index.jsx";

describe("m07 — retry", () => {
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
