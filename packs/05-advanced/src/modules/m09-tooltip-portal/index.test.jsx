import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE HelpHint mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive the tooltip.
import Tooltip from "./components/Tooltip.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m09 · HelpHint — app renders", () => {
  it("renders navbar, home page and the tooltip trigger", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("tooltip-trigger")).toBeInTheDocument();
  });

  it("navigates to the Docs route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-docs"));
    expect(await screen.findByTestId("docs-page")).toBeInTheDocument();
  });
});

describe("m09 · Tooltip — portal + hover/focus", () => {
  const LABEL = "Your public handle, 3–20 characters.";

  function renderTooltip() {
    return render(
      <Tooltip label={LABEL}>
        <span>Username</span>
      </Tooltip>
    );
  }

  it("is not in the document initially", () => {
    renderTooltip();
    expect(screen.queryByTestId("tooltip")).toBeNull();
  });

  it("appears on hover with the correct text and disappears on unhover", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.hover(screen.getByTestId("tooltip-trigger"));
    const tip = await screen.findByTestId("tooltip");
    expect(tip).toHaveTextContent(LABEL);
    expect(tip).toHaveAttribute("role", "tooltip");

    await user.unhover(screen.getByTestId("tooltip-trigger"));
    expect(screen.queryByTestId("tooltip")).toBeNull();
  });

  it("appears on focus and hides on blur, wiring aria-describedby", async () => {
    const user = userEvent.setup();
    renderTooltip();

    // Tab focuses the trigger (tabIndex=0).
    await user.tab();
    const trigger = screen.getByTestId("tooltip-trigger");
    expect(trigger).toHaveFocus();

    const tip = await screen.findByTestId("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tip.getAttribute("id"));

    // Tab away → blur hides the tooltip.
    await user.tab();
    expect(screen.queryByTestId("tooltip")).toBeNull();
    expect(trigger).not.toHaveAttribute("aria-describedby");
  });

  it("is rendered via a portal (mounted on document.body, not inside the trigger)", async () => {
    const user = userEvent.setup();
    renderTooltip();

    await user.hover(screen.getByTestId("tooltip-trigger"));
    const tip = await screen.findByTestId("tooltip");
    const trigger = screen.getByTestId("tooltip-trigger");

    // Portaled: the tooltip is NOT a descendant of the trigger subtree.
    expect(trigger.contains(tip)).toBe(false);
    // But it IS attached under document.body.
    expect(document.body.contains(tip)).toBe(true);
  });
});
