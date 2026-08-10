import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortControl from "./index.jsx";

const titles = () =>
  screen.getAllByTestId("product-title").map((n) => n.textContent);

describe("Sort control", () => {
  it("sorts by price ascending by default", () => {
    render(<SortControl />);
    // cheapest first: Mouse 25, Stand 30, Hub 40, Webcam 55, Keyboard 75, Headphones 150
    expect(titles()[0]).toBe("Wireless Mouse");
    expect(titles()[titles().length - 1]).toBe("Noise-Cancel Headphones");
  });

  it("sorts by price descending", async () => {
    const user = userEvent.setup();
    render(<SortControl />);
    await user.selectOptions(screen.getByTestId("sort-select"), "price-desc");
    expect(titles()[0]).toBe("Noise-Cancel Headphones");
    expect(titles()[titles().length - 1]).toBe("Wireless Mouse");
  });

  it("sorts by rating descending", async () => {
    const user = userEvent.setup();
    render(<SortControl />);
    await user.selectOptions(screen.getByTestId("sort-select"), "rating-desc");
    expect(titles()[0]).toBe("Noise-Cancel Headphones"); // 4.9
  });

  it("sorts by title A→Z", async () => {
    const user = userEvent.setup();
    render(<SortControl />);
    await user.selectOptions(screen.getByTestId("sort-select"), "title-asc");
    const sorted = [...titles()].sort((a, b) => a.localeCompare(b));
    expect(titles()).toEqual(sorted);
  });
});
