import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE HouseFinder app (navbar + search + pages), exactly like a
// user would see it. The only thing broken is the search dropdown's
// close-behaviour, which lives in components/SearchBar.jsx.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m01 · HouseFinder — search dropdown close behaviour", () => {
  it("app renders: navbar + listing grid are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // Listing grid shows the house cards.
    expect(screen.getAllByTestId("house-card").length).toBeGreaterThan(0);
  });

  it("shows the dropdown when typing a query", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "house");
    const dropdown = await screen.findByTestId("search-div");
    expect(dropdown).toBeInTheDocument();
    expect(
      within(dropdown).getAllByTestId("house-search-result").length
    ).toBeGreaterThan(0);
  });

  it("keeps the dropdown open when interacting inside it", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "cabin");
    const dropdown = await screen.findByTestId("search-div");
    // Clicking the search input again (inside the search area) must NOT close it.
    await user.click(screen.getByTestId("search-input"));
    expect(dropdown).toBeInTheDocument();
  });

  it("closes the dropdown when clicking outside the search area", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "house");
    expect(await screen.findByTestId("search-div")).toBeInTheDocument();

    // Click somewhere clearly outside the navbar search — e.g. the page heading.
    await user.click(screen.getByTestId("home-page"));

    await waitFor(() =>
      expect(screen.queryByTestId("search-div")).not.toBeInTheDocument()
    );
  });

  it("closes the dropdown when navigating to another route", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("search-input"), "house");
    expect(await screen.findByTestId("search-div")).toBeInTheDocument();

    // Navigate to the Saved page via the navbar.
    await user.click(screen.getByTestId("nav-saved"));

    expect(await screen.findByTestId("saved-page")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.queryByTestId("search-div")).not.toBeInTheDocument()
    );
  });
});
