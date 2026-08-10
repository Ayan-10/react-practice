import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Tabs, { type Tab } from "./index.tsx";

const tabs: Tab[] = [
  { id: "a", label: "A", content: "Content A" },
  { id: "b", label: "B", content: "Content B" },
];

describe("m10 — [TS] tabs", () => {
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
