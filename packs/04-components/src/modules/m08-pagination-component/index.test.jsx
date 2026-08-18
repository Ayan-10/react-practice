import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SearchResults mini-app (navbar + paged results + a second route).
import App from "./index.jsx";
// The reusable feature, imported DIRECTLY as a controlled component so we can
// assert the windowing/clamping and onChange calls deterministically.
import { Pagination } from "./components/Pagination.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m08 · SearchResults — app renders", () => {
  it("renders navbar, home page and the pager", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("page-1")).toBeInTheDocument();
  });

  it("navigates to the Saved route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-saved"));
    expect(await screen.findByTestId("saved-page")).toBeInTheDocument();
  });
});

describe("m08 · SearchResults — pagination feature", () => {
  it("windows to 5 pages centered on current", () => {
    render(<Pagination totalPages={10} current={5} onChange={() => {}} />);
    // window centered on 5 => 3,4,5,6,7
    for (const n of [3, 4, 5, 6, 7]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.queryByTestId("page-2")).toBeNull();
    expect(screen.queryByTestId("page-8")).toBeNull();
    expect(screen.getByTestId("page-5").className).toMatch(/active/);
  });

  it("clamps the window at the start", () => {
    render(<Pagination totalPages={10} current={1} onChange={() => {}} />);
    for (const n of [1, 2, 3, 4, 5]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("prev")).toBeDisabled();
  });

  it("clamps the window at the end and disables next", () => {
    render(<Pagination totalPages={10} current={10} onChange={() => {}} />);
    for (const n of [6, 7, 8, 9, 10]) {
      expect(screen.getByTestId(`page-${n}`)).toBeInTheDocument();
    }
    expect(screen.getByTestId("next")).toBeDisabled();
  });

  it("calls onChange for pages and prev/next", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination totalPages={10} current={5} onChange={onChange} />);

    await user.click(screen.getByTestId("page-7"));
    expect(onChange).toHaveBeenCalledWith(7);

    await user.click(screen.getByTestId("next"));
    expect(onChange).toHaveBeenCalledWith(6);

    await user.click(screen.getByTestId("prev"));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
