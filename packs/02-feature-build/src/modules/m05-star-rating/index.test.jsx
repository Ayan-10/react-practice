import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StarRating from "./index.jsx";

const filledCount = () =>
  [1, 2, 3, 4, 5].filter((n) => /filled/.test(screen.getByTestId(`star-${n}`).className)).length;

describe("Star rating", () => {
  it("sets the rating on click", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating onChange={onChange} />);
    await user.click(screen.getByTestId("star-3"));
    expect(screen.getByTestId("rating-value")).toHaveTextContent("3");
    expect(filledCount()).toBe(3);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it("previews on hover and restores on leave", async () => {
    const user = userEvent.setup();
    render(<StarRating />);
    await user.click(screen.getByTestId("star-2")); // selected 2
    await user.hover(screen.getByTestId("star-4")); // preview 4
    expect(filledCount()).toBe(4);
    await user.unhover(screen.getByTestId("star-4"));
    expect(filledCount()).toBe(2); // back to selected
  });
});
