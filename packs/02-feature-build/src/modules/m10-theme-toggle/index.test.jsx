import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE ReaderApp (navbar + home + library route), exactly like a
// user would see it. The only thing to BUILD is the theme toggle via Context,
// which lives in components/ThemeContext.jsx. A nested component (the Navbar)
// must be able to read and flip the theme WITHOUT prop drilling, and the app
// root (data-testid="reader-app") reflects data-theme.

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m10 · ReaderApp — app renders", () => {
  it("renders the navbar, home page and the theme label", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("theme-label")).toBeInTheDocument();
  });

  it("navigates to the Library route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-library"));
    expect(await screen.findByTestId("library-page")).toBeInTheDocument();
  });
});

describe("m10 · ReaderApp — theme toggle via context", () => {
  it("starts light and toggles to dark and back", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByTestId("reader-app")).toHaveAttribute(
      "data-theme",
      "light"
    );
    expect(screen.getByTestId("theme-label")).toHaveTextContent("light");

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("reader-app")).toHaveAttribute(
      "data-theme",
      "dark"
    );
    expect(screen.getByTestId("theme-label")).toHaveTextContent("dark");

    await user.click(screen.getByTestId("toggle-btn"));
    expect(screen.getByTestId("reader-app")).toHaveAttribute(
      "data-theme",
      "light"
    );
    expect(screen.getByTestId("theme-label")).toHaveTextContent("light");
  });
});
