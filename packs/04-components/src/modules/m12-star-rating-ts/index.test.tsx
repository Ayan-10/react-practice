import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import StarRating from "./index.tsx";

describe("m12 — [TS] star rating", () => {
  it("fills stars up to the current value", () => {
    render(<StarRating value={3} />);
    for (const n of [1, 2, 3]) {
      expect(screen.getByTestId(`star-${n}`).className).toMatch(/filled/);
    }
    expect(screen.getByTestId("star-4").className).not.toMatch(/filled/);
    expect(screen.getByTestId("rating-value")).toHaveTextContent("3");
  });

  it("previews on hover and reverts on leave", async () => {
    const user = userEvent.setup();
    render(<StarRating value={1} />);
    await user.hover(screen.getByTestId("star-4"));
    expect(screen.getByTestId("star-4").className).toMatch(/filled/);

    await user.unhover(screen.getByTestId("star-4"));
    expect(screen.getByTestId("star-4").className).not.toMatch(/filled/);
    expect(screen.getByTestId("star-1").className).toMatch(/filled/);
  });

  it("calls onChange when a star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={0} onChange={onChange} />);
    await user.click(screen.getByTestId("star-4"));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
