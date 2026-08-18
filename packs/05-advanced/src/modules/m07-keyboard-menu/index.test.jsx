import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE QuickCmd mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive the menu.
import Menu, { nextIndex } from "./components/Menu.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m07 · QuickCmd — app renders", () => {
  it("renders navbar, home page and the menu button", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("menu-btn")).toBeInTheDocument();
  });

  it("navigates to the Shortcuts route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-shortcuts"));
    expect(await screen.findByTestId("shortcuts-page")).toBeInTheDocument();
  });
});

describe("m07 · nextIndex — pure movement", () => {
  it("wraps ArrowDown and ArrowUp", () => {
    expect(nextIndex("ArrowDown", 0, 5)).toBe(1);
    expect(nextIndex("ArrowDown", 4, 5)).toBe(0); // wrap to first
    expect(nextIndex("ArrowUp", 0, 5)).toBe(4); // wrap to last
    expect(nextIndex("ArrowUp", 2, 5)).toBe(1);
  });

  it("Home/End jump; other keys keep index", () => {
    expect(nextIndex("Home", 3, 5)).toBe(0);
    expect(nextIndex("End", 1, 5)).toBe(4);
    expect(nextIndex("a", 2, 5)).toBe(2);
  });
});

describe("m07 · Menu — keyboard UI", () => {
  it("ArrowDown/Up move the active index with wrap", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(screen.getByTestId("menu-btn"));

    const idx = () => screen.getByTestId("active-index").textContent;
    expect(idx()).toBe("0");

    await user.keyboard("{ArrowDown}");
    expect(idx()).toBe("1");
    await user.keyboard("{ArrowUp}");
    expect(idx()).toBe("0");
    await user.keyboard("{ArrowUp}"); // wrap to last (5 commands → index 4)
    expect(idx()).toBe("4");
  });

  it("Home and End jump to first/last", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(screen.getByTestId("menu-btn"));

    await user.keyboard("{End}");
    expect(screen.getByTestId("active-index")).toHaveTextContent("4");
    await user.keyboard("{Home}");
    expect(screen.getByTestId("active-index")).toHaveTextContent("0");
  });

  it("Enter selects the active option and closes the menu", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(screen.getByTestId("menu-btn"));

    await user.keyboard("{ArrowDown}"); // index 1 → "Open Folder"
    await user.keyboard("{Enter}");

    expect(screen.getByTestId("selected")).toHaveTextContent("Open Folder");
    expect(screen.queryByTestId("menu-list")).toBeNull(); // closed
  });

  it("Escape closes without selecting", async () => {
    const user = userEvent.setup();
    render(<Menu />);
    await user.click(screen.getByTestId("menu-btn"));

    await user.keyboard("{ArrowDown}");
    await user.keyboard("{Escape}");

    expect(screen.queryByTestId("menu-list")).toBeNull();
    expect(screen.getByTestId("selected")).toHaveTextContent("none");
  });
});
