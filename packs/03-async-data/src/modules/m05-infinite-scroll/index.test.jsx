import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import InfiniteList from "./index.jsx";

const ALL = [
  { id: 1, title: "A" },
  { id: 2, title: "B" },
  { id: 3, title: "C" },
  { id: 4, title: "D" },
];

function makeLoad() {
  return vi.fn(({ limit, skip }) =>
    Promise.resolve({ products: ALL.slice(skip, skip + limit), total: ALL.length })
  );
}

describe("m05 — infinite scroll", () => {
  it("loads the first batch on mount", async () => {
    render(<InfiniteList load={makeLoad()} />);
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(2)
    );
  });

  it("appends the next batch on load-more", async () => {
    const user = userEvent.setup();
    const load = makeLoad();
    render(<InfiniteList load={load} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("load-more"));
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(4)
    );
    expect(load).toHaveBeenLastCalledWith({ limit: 2, skip: 2 });
  });

  it("shows an end marker when everything is loaded", async () => {
    const user = userEvent.setup();
    render(<InfiniteList load={makeLoad()} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("load-more"));
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(4)
    );
    expect(screen.queryByTestId("load-more")).toBeNull();
    expect(screen.getByTestId("end")).toHaveTextContent(/no more/i);
  });
});
