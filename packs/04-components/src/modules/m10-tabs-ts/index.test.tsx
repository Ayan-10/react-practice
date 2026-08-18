import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SettingsTabs mini-app (navbar + settings + a second route),
// mounted exactly like a user would see it.
import App from "./index.tsx";
// The feature under construction, imported DIRECTLY so we can inject typed
// tabs and prove the switching behaviour.
import Tabs, { type Tab } from "./components/Tabs.tsx";

const tabs: Tab[] = [
  { id: "a", label: "A", content: "Content A" },
  { id: "b", label: "B", content: "Content B" },
];

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m10 · SettingsTabs — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Account route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-account"));
    expect(await screen.findByTestId("account-page")).toBeInTheDocument();
  });
});

describe("m10 · SettingsTabs — [TS] tabs feature", () => {
  it("shows the first tab by default", () => {
    render(<Tabs tabs={tabs} />);
    expect(screen.getByTestId("panel")).toHaveTextContent("Content A");
    expect(screen.getByTestId("tab-a").className).toMatch(/active/);
  });

  it("switches panels on click", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByTestId("tab-b"));
    expect(screen.getByTestId("panel")).toHaveTextContent("Content B");
    expect(screen.getByTestId("tab-a").className).not.toMatch(/active/);
  });
});
