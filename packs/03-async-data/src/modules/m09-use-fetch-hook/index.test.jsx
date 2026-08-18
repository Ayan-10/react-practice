import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE CountryStats mini-app (navbar + home + country list + a second
// route), mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY. UserList is the default
// export; useFetch is the named hook it is built on.
import UserList, { useFetch } from "./components/UserList.jsx";

const COUNTRIES = [
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

describe("m09 · CountryStats — app renders", () => {
  it("renders navbar, home page and the country list (default loader)", async () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // The default local loader resolves asynchronously, so wait for items.
    const items = await screen.findAllByTestId("user-item");
    expect(items.length).toBeGreaterThan(0);
  });

  it("navigates to the About route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-about"));
    expect(await screen.findByTestId("about-page")).toBeInTheDocument();
  });
});

describe("m09 · CountryStats — useFetch hook feature", () => {
  it("exports useFetch as a function", () => {
    expect(typeof useFetch).toBe("function");
  });

  it("shows loading then renders the list", async () => {
    const loadUsers = vi.fn().mockResolvedValue(COUNTRIES);
    render(<UserList loadUsers={loadUsers} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByTestId("user-item")).toHaveLength(2)
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });

  it("shows an error when the fetch fails", async () => {
    const loadUsers = vi.fn().mockRejectedValue(new Error("nope"));
    render(<UserList loadUsers={loadUsers} />);
    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
    expect(screen.queryByTestId("loading")).toBeNull();
  });
});
