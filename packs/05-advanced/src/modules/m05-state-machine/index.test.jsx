import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE CrossWalk mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can unit-test the
// pure state machine and drive the light UI.
import TrafficLight, { nextState, TRANSITIONS } from "./components/TrafficLight.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m05 · CrossWalk — app renders", () => {
  it("renders navbar, home page and the light", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("light")).toBeInTheDocument();
  });

  it("navigates to the Rules route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-rules"));
    expect(await screen.findByTestId("rules-page")).toBeInTheDocument();
  });
});

describe("m05 · nextState — pure state machine", () => {
  it("cycles green → yellow → red → green", () => {
    expect(nextState("green")).toBe("yellow");
    expect(nextState("yellow")).toBe("red");
    expect(nextState("red")).toBe("green");
  });

  it("TRANSITIONS map matches the cycle", () => {
    expect(TRANSITIONS.green).toBe("yellow");
    expect(TRANSITIONS.yellow).toBe("red");
    expect(TRANSITIONS.red).toBe("green");
  });

  it("is pure (repeated calls give the same result)", () => {
    expect(nextState("green")).toBe(nextState("green"));
  });
});

describe("m05 · TrafficLight — wired UI", () => {
  it("advances the light and flips the walk indicator at red", async () => {
    const user = userEvent.setup();
    render(<TrafficLight />);

    const light = screen.getByTestId("light");
    const walk = screen.getByTestId("walk");

    // starts green → Don't Walk
    expect(light).toHaveAttribute("data-state", "green");
    expect(walk).toHaveTextContent("Don't Walk");

    await user.click(screen.getByTestId("next-btn")); // → yellow
    expect(light).toHaveAttribute("data-state", "yellow");
    expect(walk).toHaveTextContent("Don't Walk");

    await user.click(screen.getByTestId("next-btn")); // → red
    expect(light).toHaveAttribute("data-state", "red");
    expect(walk).toHaveTextContent("Walk");

    await user.click(screen.getByTestId("next-btn")); // → green (wrap)
    expect(light).toHaveAttribute("data-state", "green");
    expect(walk).toHaveTextContent("Don't Walk");
  });
});
