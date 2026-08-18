import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SketchPad mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can unit-test the
// reducer (the core skill) and drive the editor UI.
import History, { historyReducer, initialState } from "./components/History.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m02 · SketchPad — app renders", () => {
  it("renders navbar and the editor home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("value")).toBeInTheDocument();
  });

  it("navigates to the History route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-history"));
    expect(await screen.findByTestId("history-page")).toBeInTheDocument();
  });
});

describe("m02 · historyReducer — pure logic", () => {
  it("set pushes present onto past, sets new present, clears future", () => {
    const next = historyReducer(initialState, { type: "set", value: 5 });
    expect(next).toEqual({ past: [0], present: 5, future: [] });
  });

  it("set clears any existing future", () => {
    const s = { past: [1], present: 2, future: [3, 4] };
    const next = historyReducer(s, { type: "set", value: 9 });
    expect(next).toEqual({ past: [1, 2], present: 9, future: [] });
  });

  it("undo pops past into present and pushes old present to front of future", () => {
    let s = historyReducer(initialState, { type: "set", value: 5 }); // {past:[0],present:5,future:[]}
    s = historyReducer(s, { type: "set", value: 8 }); // {past:[0,5],present:8,future:[]}
    const undone = historyReducer(s, { type: "undo" });
    expect(undone).toEqual({ past: [0], present: 5, future: [8] });
  });

  it("redo shifts future into present and pushes old present onto past", () => {
    const s = { past: [0], present: 5, future: [8] };
    const redone = historyReducer(s, { type: "redo" });
    expect(redone).toEqual({ past: [0, 5], present: 8, future: [] });
  });

  it("undo is a no-op when past is empty; redo is a no-op when future is empty", () => {
    expect(historyReducer(initialState, { type: "undo" })).toBe(initialState);
    expect(historyReducer(initialState, { type: "redo" })).toBe(initialState);
  });

  it("reset returns to initialState; unknown action is a no-op", () => {
    const s = { past: [0, 1], present: 2, future: [] };
    expect(historyReducer(s, { type: "reset" })).toEqual(initialState);
    expect(historyReducer(s, { type: "???" })).toBe(s);
  });

  it("does not mutate the previous state", () => {
    const s0 = { past: [0], present: 5, future: [8] };
    const snapshot = JSON.stringify(s0);
    historyReducer(s0, { type: "undo" });
    historyReducer(s0, { type: "redo" });
    expect(JSON.stringify(s0)).toBe(snapshot);
  });
});

describe("m02 · History — wired UI", () => {
  it("inc/undo/redo update the value and disabled states", async () => {
    const user = userEvent.setup();
    render(<History />);

    // Both undo and redo start disabled (no history yet).
    expect(screen.getByTestId("undo-btn")).toBeDisabled();
    expect(screen.getByTestId("redo-btn")).toBeDisabled();

    // Increment three times → 3.
    await user.click(screen.getByTestId("inc-btn"));
    await user.click(screen.getByTestId("inc-btn"));
    await user.click(screen.getByTestId("inc-btn"));
    expect(screen.getByTestId("value")).toHaveTextContent("3");
    expect(screen.getByTestId("undo-btn")).not.toBeDisabled();

    // Undo twice → 1.
    await user.click(screen.getByTestId("undo-btn"));
    await user.click(screen.getByTestId("undo-btn"));
    expect(screen.getByTestId("value")).toHaveTextContent("1");
    expect(screen.getByTestId("redo-btn")).not.toBeDisabled();

    // Redo once → 2.
    await user.click(screen.getByTestId("redo-btn"));
    expect(screen.getByTestId("value")).toHaveTextContent("2");

    // Reset → 0, both disabled again.
    await user.click(screen.getByTestId("reset-btn"));
    expect(screen.getByTestId("value")).toHaveTextContent("0");
    expect(screen.getByTestId("undo-btn")).toBeDisabled();
    expect(screen.getByTestId("redo-btn")).toBeDisabled();
  });
});
