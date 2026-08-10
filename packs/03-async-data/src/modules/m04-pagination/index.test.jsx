import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Pagination from "./index.jsx";

const ALL = [
  { id: 1, title: "A" },
  { id: 2, title: "B" },
  { id: 3, title: "C" },
  { id: 4, title: "D" },
  { id: 5, title: "E" },
];

// Server-like loader that slices by skip/limit and reports the true total.
function makeLoad() {
  return vi.fn(({ limit, skip }) =>
    Promise.resolve({ products: ALL.slice(skip, skip + limit), total: ALL.length })
  );
}

describe("m04 — pagination", () => {
  it("shows the first page and correct page info", async () => {
    render(<Pagination load={makeLoad()} />);
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(2)
    );
    expect(screen.getByTestId("page-info")).toHaveTextContent("Page 1 of 3");
    expect(screen.getByTestId("prev")).toBeDisabled();
  });

  it("navigates to the next page and refetches with the right skip", async () => {
    const load = makeLoad();
    const user = userEvent.setup();
    render(<Pagination load={load} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("next"));
    await waitFor(() =>
      expect(screen.getByTestId("page-info")).toHaveTextContent("Page 2 of 3")
    );
    expect(load).toHaveBeenLastCalledWith({ limit: 2, skip: 2 });
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("disables next on the last page", async () => {
    const user = userEvent.setup();
    render(<Pagination load={makeLoad()} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("next"));
    await waitFor(() => screen.getByText("C"));
    await user.click(screen.getByTestId("next"));
    await waitFor(() =>
      expect(screen.getByTestId("page-info")).toHaveTextContent("Page 3 of 3")
    );
    expect(screen.getByTestId("next")).toBeDisabled();
  });
});
