import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Tabs from "./index.jsx";

const tabs = [
  { id: "a", label: "A", content: "Content A" },
  { id: "b", label: "B", content: "Content B" },
  { id: "c", label: "C", content: "Content C" },
];

describe("m01 — tabs", () => {
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
