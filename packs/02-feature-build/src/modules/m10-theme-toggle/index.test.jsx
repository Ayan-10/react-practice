import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ThemeApp from "./index.jsx";

describe("Theme toggle via context", () => {
  it("starts light and toggles to dark and back", async () => {
    const user = userEvent.setup();
    render(<ThemeApp />);
    expect(screen.getByTestId("root")).toHaveAttribute("data-theme", "light");
    expect(screen.getByTestId("theme-label")).toHaveTextContent("light");

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("root")).toHaveAttribute("data-theme", "dark");
    expect(screen.getByTestId("theme-label")).toHaveTextContent("dark");

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("root")).toHaveAttribute("data-theme", "light");
  });
});
