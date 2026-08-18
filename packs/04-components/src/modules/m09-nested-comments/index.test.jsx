import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE ForumThread mini-app (navbar + thread + a second route), mounted
// exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive it with a
// deterministic tree and prove the collapse/expand behaviour.
import Comments from "./components/Comments.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

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

describe("m09 · ForumThread — app renders", () => {
  it("renders navbar, home page and the comment thread", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("comment-1")).toBeInTheDocument();
  });

  it("navigates to the Rules route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-rules"));
    expect(await screen.findByTestId("rules-page")).toBeInTheDocument();
  });
});

describe("m09 · ForumThread — nested comments feature", () => {
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
