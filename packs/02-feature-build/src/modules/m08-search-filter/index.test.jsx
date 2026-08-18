import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE ContactsApp (navbar + home + contacts list), exactly like a
// user would see it. The only thing to BUILD is the search filter, which lives
// in components/ContactList.jsx.
//
// Fallback data used by the module (6 contacts):
//   1 Alice Johnson   2 Bob Smith      3 Carol Williams
//   4 David Brown     5 Eve Davis      6 Frank Miller

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

const items = () => screen.queryAllByTestId("contact-item");

describe("m08 · ContactsApp — app renders", () => {
  it("renders navbar, home page and the contacts list", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("contact-item")).toHaveLength(6);
  });

  it("navigates to the Favorites route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-favorites"));
    expect(await screen.findByTestId("favorites-page")).toBeInTheDocument();
  });
});

describe("m08 · ContactsApp — search filter feature", () => {
  it("shows all contacts initially", () => {
    renderApp();
    expect(items()).toHaveLength(6);
  });

  it("filters case-insensitively by name substring", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "ali"); // only Alice
    expect(items()).toHaveLength(1);
    expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
  });

  it("shows no-results when nothing matches", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "zzzz");
    expect(items()).toHaveLength(0);
    expect(screen.getByTestId("no-results")).toBeInTheDocument();
  });
});
