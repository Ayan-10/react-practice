import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./index.jsx";

describe("m08 — pagination component", () => {
  it("windows to 5 pages centered on current", () => {
    render(<Pagination totalPages={10} current={5} onChange={() => {}} />);
    // window centered on 5 => 3,4,5,6,7
    for (const n of [3, 4, 5, 6, 7]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("page-2")).toBeNull();
    expect(screen.queryByTestId("page-8")).toBeNull();
    expect(screen.getByTestId("page-5").className).toMatch(/active/);
  });

  it("clamps the window at the start", () => {
    render(<Pagination totalPages={10} current={1} onChange={() => {}} />);
    for (const n of [1, 2, 3, 4, 5]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("prev")).toBeDisabled();
  });

  it("clamps the window at the end and disables next", () => {
    render(<Pagination totalPages={10} current={10} onChange={() => {}} />);
    for (const n of [6, 7, 8, 9, 10]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("next")).toBeDisabled();
  });

  it("calls onChange for pages and prev/next", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination totalPages={10} current={5} onChange={onChange} />);

    await user.click(screen.getByTestId("page-7"));
    expect(onChange).toHaveBeenCalledWith(7);

    await user.click(screen.getByTestId("next"));
    expect(onChange).toHaveBeenCalledWith(6);

    await user.click(screen.getByTestId("prev"));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
