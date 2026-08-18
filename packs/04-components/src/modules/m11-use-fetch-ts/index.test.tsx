import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE DataLoader mini-app (navbar + user directory + a second route),
// mounted exactly like a user would see it.
import App from "./index.tsx";
// The feature under construction, imported DIRECTLY so we can inject mock
// loaders (deterministic loading / success / error).
import UserList, { type User } from "./components/UserList.tsx";

const USERS: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m11 · DataLoader — app renders", () => {
  it("renders navbar, home page and the user list (default loader)", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The default local loader resolves asynchronously, so wait for items.
    const items = await screen.findAllByTestId("user-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("navigates to the Docs route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-docs"));
    expect(await screen.findByTestId("docs-page")).toBeInTheDocument();
  });
});

describe("m11 · DataLoader — [TS] useFetch feature", () => {
  it("shows loading then renders users", async () => {
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    render(<UserList loadUsers={loadUsers} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getAllByTestId("user-item")).toHaveLength(2)
    );
  });

  it("shows an error on failure", async () => {
    const loadUsers = vi.fn().mockRejectedValue(new Error("x"));
    render(<UserList loadUsers={loadUsers} />);
    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
  });
});
