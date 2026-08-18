import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE TeamDirectory mini-app (navbar + people + a second route),
// mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can inject mock
// loaders (deterministic users + dependent posts).
import DependentFetch from "./components/DependentFetch.jsx";

const USERS = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];
const POSTS = {
  1: [{ id: 11, title: "Engines" }, { id: 12, title: "Bernoulli" }],
  2: [{ id: 13, title: "Computable" }],
};

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m08 · TeamDirectory — app renders", () => {
  it("renders navbar and the home page with the member selector", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("user-select")).toBeInTheDocument();
    // No member is selected yet, so the hint should show.
    expect(screen.getByTestId("no-selection")).toBeInTheDocument();
  });

  it("navigates to the Org route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-org"));
    expect(await screen.findByTestId("org-page")).toBeInTheDocument();
  });
});

describe("m08 · TeamDirectory — dependent fetch feature", () => {
  it("loads users and shows a no-selection prompt", async () => {
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    const loadPosts = vi.fn();
    render(<DependentFetch loadUsers={loadUsers} loadPosts={loadPosts} />);

    await waitFor(() => screen.getByText("Ada"));
    expect(screen.getByTestId("no-selection")).toHaveTextContent(/pick a user/i);
    expect(loadPosts).not.toHaveBeenCalled();
  });

  it("loads posts for the selected user and refetches on change", async () => {
    const user = userEvent.setup();
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    const loadPosts = vi.fn((id) => Promise.resolve(POSTS[id]));
    render(<DependentFetch loadUsers={loadUsers} loadPosts={loadPosts} />);

    await waitFor(() => screen.getByText("Ada"));
    await user.selectOptions(screen.getByTestId("user-select"), "1");

    await waitFor(() =>
      expect(screen.getAllByTestId("post-item")).toHaveLength(2)
    );
    expect(loadPosts).toHaveBeenCalledWith("1");

    await user.selectOptions(screen.getByTestId("user-select"), "2");
    await waitFor(() =>
      expect(screen.getAllByTestId("post-item")).toHaveLength(1)
    );
  });
});
