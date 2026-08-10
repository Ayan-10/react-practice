import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import SearchBar from "./index.jsx";

// Mock the shared API so tests are deterministic and offline.
vi.mock("../../shared/api.js", () => ({
  searchProducts: vi.fn(async () => [
    { id: 1, title: "123 Test Avenue, Test City" },
    { id: 2, title: "456 Sample Street, Sample City" },
  ]),
}));

function renderWithRouter() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <div data-testid="outside-area">
        <SearchBar />
        <Link to="/other">Go elsewhere</Link>
        <Routes>
          <Route path="/" element={<div>home</div>} />
          <Route path="/other" element={<div>other page</div>} />
        </Routes>
      </div>
    </MemoryRouter>
  );
}

describe("SearchBar — outside click behaviour", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows the dropdown when typing", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.type(screen.getByTestId("search-input"), "test");
    expect(await screen.findByTestId("search-div")).toBeInTheDocument();
    expect(screen.getAllByTestId("apartment-name-search-result")).toHaveLength(2);
  });

  it("keeps the dropdown open when clicking inside a result", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.type(screen.getByTestId("search-input"), "test");
    const results = await screen.findAllByTestId("apartment-name-search-result");
    await user.click(results[0]);
    // Clicking inside the dropdown should NOT close it.
    expect(screen.getByTestId("search-div")).toBeInTheDocument();
  });

  it("closes the dropdown when clicking completely outside the search area", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.type(screen.getByTestId("search-input"), "test");
    expect(await screen.findByTestId("search-div")).toBeInTheDocument();

    await user.click(screen.getByTestId("outside-area"));

    await waitFor(() =>
      expect(screen.queryByTestId("search-div")).not.toBeInTheDocument()
    );
  });

  it("closes the dropdown when navigating to a new page", async () => {
    const user = userEvent.setup();
    renderWithRouter();
    await user.type(screen.getByTestId("search-input"), "test");
    expect(await screen.findByTestId("search-div")).toBeInTheDocument();

    await user.click(screen.getByText("Go elsewhere"));

    await waitFor(() =>
      expect(screen.queryByTestId("search-div")).not.toBeInTheDocument()
    );
  });
});
