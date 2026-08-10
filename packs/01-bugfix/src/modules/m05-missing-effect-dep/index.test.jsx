import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MissingEffectDep from "./index.jsx";

vi.mock("../../shared/api.js", () => ({
  searchProducts: vi.fn(async (q) => [
    { id: 1, title: `${q} result A` },
    { id: 2, title: `${q} result B` },
  ]),
}));

import { searchProducts } from "../../shared/api.js";

describe("Product search — missing dep", () => {
  beforeEach(() => vi.clearAllMocks());

  it("fetches results when the query changes", async () => {
    const user = userEvent.setup();
    render(<MissingEffectDep />);
    expect(screen.queryAllByTestId("result-item")).toHaveLength(0);

    await user.type(screen.getByTestId("query"), "phone");

    await waitFor(() =>
      expect(screen.getAllByTestId("result-item").length).toBeGreaterThan(0)
    );
    expect(searchProducts).toHaveBeenCalledWith("phone");
    expect(screen.getByText("phone result A")).toBeInTheDocument();
  });

  it("clears results when the query is emptied", async () => {
    const user = userEvent.setup();
    render(<MissingEffectDep />);
    await user.type(screen.getByTestId("query"), "x");
    await waitFor(() =>
      expect(screen.getAllByTestId("result-item").length).toBeGreaterThan(0)
    );
    await user.clear(screen.getByTestId("query"));
    await waitFor(() =>
      expect(screen.queryAllByTestId("result-item")).toHaveLength(0)
    );
  });
});
