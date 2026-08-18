import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE CommandPalette mini-app (navbar + palette home + a second route).
import App from "./index.jsx";
// The feature, imported DIRECTLY so we can inject a deterministic loader.
import Autocomplete from "./components/Autocomplete.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m04 · CommandPalette — app renders", () => {
  it("renders navbar and the home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the Shortcuts route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-shortcuts"));
    expect(await screen.findByTestId("shortcuts-page")).toBeInTheDocument();
  });
});

const getSuggestions = vi.fn(async (q) => {
  const all = ["Apple", "Apricot", "Avocado"];
  return all.filter((x) => x.toLowerCase().startsWith(q.toLowerCase()));
});

describe("m04 · CommandPalette — autocomplete feature", () => {
  it("fetches and renders suggestions on type", async () => {
    const user = userEvent.setup();
    render(<Autocomplete getSuggestions={getSuggestions} />);
    await user.type(screen.getByTestId("ac-input"), "a");
    await waitFor(() => expect(screen.getByTestId("ac-list")).toBeInTheDocument());
    expect(screen.getByTestId("option-0")).toHaveTextContent("Apple");
  });

  it("moves highlight with arrow keys and selects with Enter", async () => {
    const user = userEvent.setup();
    render(<Autocomplete getSuggestions={getSuggestions} />);
    const input = screen.getByTestId("ac-input");
    await user.type(input, "a");
    await waitFor(() => screen.getByTestId("ac-list"));

    await user.keyboard("{ArrowDown}"); // highlight index 1
    expect(screen.getByTestId("option-1").className).toMatch(/highlight/);

    await user.keyboard("{Enter}");
    expect(input).toHaveValue("Apricot");
    expect(screen.queryByTestId("ac-list")).toBeNull();
  });

  it("selects an option on click", async () => {
    const user = userEvent.setup();
    render(<Autocomplete getSuggestions={getSuggestions} />);
    const input = screen.getByTestId("ac-input");
    await user.type(input, "a");
    await waitFor(() => screen.getByTestId("ac-list"));

    await user.click(screen.getByTestId("option-2"));
    expect(input).toHaveValue("Avocado");
    expect(screen.queryByTestId("ac-list")).toBeNull();
  });
});
