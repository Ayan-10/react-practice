import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import Stepper from "./index.jsx";

const steps = ["A", "B", "C"];

describe("m07 — progress stepper", () => {
  it("starts on the first step at 0%", () => {
    render(<Stepper steps={steps} />);
    expect(screen.getByTestId("current-label")).toHaveTextContent("A");
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
    expect(screen.getByTestId("progress")).toHaveStyle({ width: "0%" });
    expect(screen.getByTestId("back")).toBeDisabled();
  });

  it("advances and updates progress", async () => {
    const user = userEvent.setup();
    render(<Stepper steps={steps} />);
    await user.click(screen.getByTestId("next"));
    expect(screen.getByTestId("current-label")).toHaveTextContent("B");
    expect(screen.getByTestId("progress")).toHaveStyle({ width: "50%" });

    await user.click(screen.getByTestId("next"));
    expect(screen.getByTestId("progress")).toHaveStyle({ width: "100%" });
    expect(screen.getByTestId("next")).toBeDisabled();
  });

  it("goes back", async () => {
    const user = userEvent.setup();
    render(<Stepper steps={steps} />);
    await user.click(screen.getByTestId("next"));
    await user.click(screen.getByTestId("back"));
    expect(screen.getByTestId("current-label")).toHaveTextContent("A");
  });
});
