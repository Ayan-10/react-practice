import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Comments from "./index.jsx";

const tree = [
  {
    id: 1,
    text: "Root",
    replies: [
      { id: 2, text: "Child A", replies: [{ id: 4, text: "Grandchild" }] },
      { id: 3, text: "Child B" },
    ],
  },
];

describe("m09 — nested comments", () => {
  it("renders the full tree expanded by default", () => {
    render(<Comments comments={tree} />);
    expect(screen.getByTestId("comment-1")).toHaveTextContent("Root");
    expect(screen.getByTestId("comment-2")).toBeInTheDocument();
    expect(screen.getByTestId("comment-3")).toBeInTheDocument();
    expect(screen.getByTestId("comment-4")).toBeInTheDocument();
  });

  it("collapses a node's descendants", async () => {
    const user = userEvent.setup();
    render(<Comments comments={tree} />);
    // Collapse comment 2 -> its grandchild (4) disappears; siblings remain.
    await user.click(screen.getByTestId("toggle-2"));
    expect(screen.queryByTestId("comment-4")).toBeNull();
    expect(screen.getByTestId("comment-2")).toBeInTheDocument();
    expect(screen.getByTestId("comment-3")).toBeInTheDocument();
  });

  it("collapsing the root hides everything below it", async () => {
    const user = userEvent.setup();
    render(<Comments comments={tree} />);
    await user.click(screen.getByTestId("toggle-1"));
    expect(screen.queryByTestId("comment-2")).toBeNull();
    expect(screen.queryByTestId("comment-3")).toBeNull();
    expect(screen.queryByTestId("comment-4")).toBeNull();
    expect(screen.getByTestId("comment-1")).toBeInTheDocument();
  });
});
