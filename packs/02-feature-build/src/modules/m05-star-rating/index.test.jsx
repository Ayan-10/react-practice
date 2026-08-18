import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE MovieRatings app (navbar + home + featured movie + the star
// widget), exactly like a user would see it. The only thing to BUILD is the
// star rating, which lives in components/StarRating.jsx.
//
// Featured movie shown on Home: "Interstellar" (Sci-Fi, 2014).

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

const filledCount = () =>
  [1, 2, 3, 4, 5].filter((n) =>
    /filled/.test(screen.getByTestId(`star-${n}`).className)
  ).length;

describe("m05 · MovieRatings — app renders", () => {
  it("renders navbar, home page and the star widget", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("rating-value")).toBeInTheDocument();
    // five stars are always present, even on the stub
    [1, 2, 3, 4, 5].forEach((n) =>
      expect(screen.getByTestId(`star-${n}`)).toBeInTheDocument()
    );
  });

  it("navigates to the My Ratings route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-ratings"));
    expect(await screen.findByTestId("ratings-page")).toBeInTheDocument();
  });
});

describe("m05 · MovieRatings — star rating feature", () => {
  it("sets the rating on click and fills that many stars", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("star-3"));
    expect(screen.getByTestId("rating-value")).toHaveTextContent("3");
    expect(filledCount()).toBe(3);
  });

  it("reflects the chosen rating in the page summary", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("star-4"));
    expect(screen.getByTestId("last-rating")).toHaveTextContent("4/5");
  });

  it("previews on hover and restores the selected value on leave", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("star-2")); // selected 2
    await user.hover(screen.getByTestId("star-4")); // preview 4
    expect(filledCount()).toBe(4);
    await user.unhover(screen.getByTestId("star-4"));
    expect(filledCount()).toBe(2); // back to selected
  });
});
