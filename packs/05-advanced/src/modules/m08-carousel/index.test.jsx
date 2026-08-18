import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SnapGallery mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive the carousel.
import Carousel from "./components/Carousel.jsx";
import { SLIDES } from "./data/slides.js";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m08 · SnapGallery — app renders", () => {
  it("renders navbar, home page and the carousel stage", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("slide")).toBeInTheDocument();
  });

  it("navigates to the Albums route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-albums"));
    expect(await screen.findByTestId("albums-page")).toBeInTheDocument();
  });
});

describe("m08 · Carousel — wrap-around navigation", () => {
  const n = SLIDES.length;

  it("starts on the first slide with correct index label", () => {
    render(<Carousel />);
    expect(screen.getByTestId("slide")).toHaveTextContent(SLIDES[0].label);
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`1 / ${n}`);
  });

  it("next advances and wraps from the last slide back to the first", async () => {
    const user = userEvent.setup();
    render(<Carousel />);

    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("slide")).toHaveTextContent(SLIDES[1].label);
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`2 / ${n}`);

    // advance to the last slide
    for (let i = 2; i < n; i++) {
      await user.click(screen.getByTestId("next-btn"));
    }
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`${n} / ${n}`);

    // one more wraps around to the first
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("slide")).toHaveTextContent(SLIDES[0].label);
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`1 / ${n}`);
  });

  it("prev wraps from the first slide to the last", async () => {
    const user = userEvent.setup();
    render(<Carousel />);

    await user.click(screen.getByTestId("prev-btn"));
    expect(screen.getByTestId("slide")).toHaveTextContent(SLIDES[n - 1].label);
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`${n} / ${n}`);
  });

  it("clicking dot-3 jumps straight to slide index 3 and marks it active", async () => {
    const user = userEvent.setup();
    render(<Carousel />);

    await user.click(screen.getByTestId("dot-3"));
    expect(screen.getByTestId("slide")).toHaveTextContent(SLIDES[3].label);
    expect(screen.getByTestId("slide-index")).toHaveTextContent(`4 / ${n}`);
    expect(screen.getByTestId("dot-3")).toHaveAttribute("aria-current", "true");
    expect(screen.getByTestId("dot-0")).not.toHaveAttribute("aria-current");
  });
});
