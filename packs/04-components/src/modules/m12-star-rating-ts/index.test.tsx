import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE RateWidget mini-app (navbar + rating + a second route), mounted
// exactly like a user would see it.
import App from "./index.tsx";
// The feature under construction, imported DIRECTLY so we can drive hover /
// click / value behaviour deterministically.
import StarRating from "./components/StarRating.tsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m12 · RateWidget — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the History route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-history"));
    expect(await screen.findByTestId("history-page")).toBeInTheDocument();
  });
});

describe("m12 · RateWidget — [TS] star rating feature", () => {
  it("fills stars up to the current value", () => {
    render(<StarRating value={3} />);
    for (const n of [1, 2, 3]) {
      expect(screen.getByTestId(`star-${n}`).className).toMatch(/filled/);
    }
    expect(screen.getByTestId("star-4").className).not.toMatch(/filled/);
    expect(screen.getByTestId("rating-value")).toHaveTextContent("3");
  });

  it("previews on hover and reverts on leave", async () => {
    const user = userEvent.setup();
    render(<StarRating value={1} />);
    await user.hover(screen.getByTestId("star-4"));
    expect(screen.getByTestId("star-4").className).toMatch(/filled/);

    await user.unhover(screen.getByTestId("star-4"));
    expect(screen.getByTestId("star-4").className).not.toMatch(/filled/);
    expect(screen.getByTestId("star-1").className).toMatch(/filled/);
  });

  it("calls onChange when a star is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<StarRating value={0} onChange={onChange} />);
    await user.click(screen.getByTestId("star-4"));
    expect(onChange).toHaveBeenCalledWith(4);
  });
});
