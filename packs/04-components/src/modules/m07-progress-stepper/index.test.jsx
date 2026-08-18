import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE OnboardWizard mini-app (navbar + stepper + a second route).
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY with injected steps.
import Stepper from "./components/Stepper.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m07 · OnboardWizard — app renders", () => {
  it("renders navbar, home page and the stepper", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toBeInTheDocument();
  });

  it("navigates to the Help route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-help"));
    expect(await screen.findByTestId("help-page")).toBeInTheDocument();
  });
});

const steps = ["A", "B", "C"];

describe("m07 · OnboardWizard — progress stepper feature", () => {
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
