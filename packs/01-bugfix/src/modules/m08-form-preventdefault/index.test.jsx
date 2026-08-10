import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormPreventDefault from "./index.jsx";

describe("Quick list — preventDefault on submit", () => {
  it("calls preventDefault on the submit event", () => {
    render(<FormPreventDefault />);
    const form = screen.getByTestId("form");
    const submitEvent = new Event("submit", { bubbles: true, cancelable: true });
    const prevented = vi.spyOn(submitEvent, "preventDefault");
    fireEvent(form, submitEvent);
    expect(prevented).toHaveBeenCalled();
  });

  it("adds an item and clears the input on submit", async () => {
    const user = userEvent.setup();
    render(<FormPreventDefault />);
    await user.type(screen.getByTestId("item-input"), "milk");
    await user.click(screen.getByTestId("submit"));
    expect(screen.getAllByTestId("item")).toHaveLength(1);
    expect(screen.getByText("milk")).toBeInTheDocument();
    expect(screen.getByTestId("item-input")).toHaveValue("");
  });
});
