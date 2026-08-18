import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE DocsViewer mini-app (navbar + tabbed home + a second route).
import App from "./index.jsx";
// The feature, imported DIRECTLY so we can drive it in isolation.
import Tabs from "./components/Tabs.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m01 · DocsViewer — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Changelog route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-changelog"));
    expect(await screen.findByTestId("changelog-page")).toBeInTheDocument();
  });
});

const tabs = [
  { id: "a", label: "A", content: "Content A" },
  { id: "b", label: "B", content: "Content B" },
  { id: "c", label: "C", content: "Content C" },
];

describe("m01 · DocsViewer — tabs feature", () => {
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
    expect(screen.getByTestId("tab-b").className).toMatch(/active/);
    expect(screen.getByTestId("tab-a").className).not.toMatch(/active/);
  });

  it("renders only one panel at a time", async () => {
    const user = userEvent.setup();
    render(<Tabs tabs={tabs} />);
    await user.click(screen.getByTestId("tab-c"));
    expect(screen.getByTestId("panel")).toHaveTextContent("Content C");
    expect(screen.getByTestId("panel")).not.toHaveTextContent("Content A");
  });
});
