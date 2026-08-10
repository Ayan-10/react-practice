import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Autocomplete from "./index.jsx";

const getSuggestions = vi.fn(async (q) => {
  const all = ["Apple", "Apricot", "Avocado"];
  return all.filter((x) => x.toLowerCase().startsWith(q.toLowerCase()));
});

describe("m04 — autocomplete", () => {
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
