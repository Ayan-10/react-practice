import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE NewsletterSignup app (navbar + hero + signup form + pages),
// exactly like a user would see it. The only thing broken is the signup form's
// submit handler in components/SignupForm.jsx.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m08 · NewsletterSignup — form submit (preventDefault)", () => {
  it("app renders: navbar + home page + signup form are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("signup-form")).toBeInTheDocument();
  });

  it("seeds the newest-subscribers list", () => {
    renderApp();
    const list = screen.getByTestId("subscriber-list");
    expect(
      within(list).getAllByTestId("subscriber-email").length
    ).toBeGreaterThan(0);
  });

  it("navigates to the Subscribers page", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-subscribers"));
    expect(await screen.findByTestId("subscribers-page")).toBeInTheDocument();
  });

  // THE BUG TEST — fails on the stub (no preventDefault), passes on the fix.
  // We fire a real, cancelable submit event on the form and assert the handler
  // cancelled it (otherwise a real browser would reload the whole page).
  it("prevents the default submit so the page never reloads", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("email-input"), "newbie@example.com");

    const form = screen.getByTestId("signup-form");
    const submitEvent = new Event("submit", {
      bubbles: true,
      cancelable: true,
    });
    fireEvent(form, submitEvent);

    // If the handler called e.preventDefault(), the event is marked cancelled.
    expect(submitEvent.defaultPrevented).toBe(true);
  });

  it("subscribing shows a success message and adds the email", async () => {
    const user = userEvent.setup();
    renderApp();
    const before = screen.getAllByTestId("subscriber-email").length;

    await user.type(screen.getByTestId("email-input"), "adder@example.com");
    await user.click(screen.getByTestId("subscribe-btn"));

    expect(screen.getByTestId("success-msg")).toHaveTextContent(
      "adder@example.com"
    );
    expect(screen.getAllByTestId("subscriber-email").length).toBe(before + 1);
    expect(screen.getByText("adder@example.com")).toBeInTheDocument();
  });
});
