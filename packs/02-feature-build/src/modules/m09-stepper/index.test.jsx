import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Stepper from "./index.jsx";

describe("Multi-step form", () => {
  it("blocks Next on an invalid step", async () => {
    const user = userEvent.setup();
    render(<Stepper />);
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-error")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
  });

  it("advances through steps when valid and can go back", async () => {
    const user = userEvent.setup();
    render(<Stepper />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 2 of 3");
    await user.click(screen.getByTestId("back-btn"));
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
    expect(screen.getByTestId("field-name")).toHaveValue("Ayan");
  });

  it("validates email on step 2", async () => {
    const user = userEvent.setup();
    render(<Stepper />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    await user.type(screen.getByTestId("field-email"), "bad");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-error")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 2 of 3");
  });

  it("reviews and submits", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<Stepper onSubmit={onSubmit} />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("review-name")).toHaveTextContent("Ayan");
    expect(screen.getByTestId("review-email")).toHaveTextContent("a@x.com");
    await user.click(screen.getByTestId("submit-btn"));
    expect(onSubmit).toHaveBeenCalledWith({ name: "Ayan", email: "a@x.com" });
  });
});
