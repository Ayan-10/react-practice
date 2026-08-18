import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE CheckoutFlow app (navbar + checkout wizard + orders route),
// exactly like a user would see it. The only thing to BUILD is the multi-step
// checkout wizard, which lives in components/CheckoutWizard.jsx.
//
// The wizard emits its final payload via onSubmit({ name, email }), which the
// Home page uses to render the order confirmation — so we assert the confirmation
// (not a vi.fn in isolation). `vi` is imported to keep parity with the pack setup.
void vi;

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m09 · CheckoutFlow — app renders", () => {
  it("renders navbar, home page and the step indicator", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
  });

  it("navigates to the Orders route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-orders"));
    expect(await screen.findByTestId("orders-page")).toBeInTheDocument();
  });
});

describe("m09 · CheckoutFlow — checkout wizard feature", () => {
  it("blocks Next on invalid step 1", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-error")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
  });

  it("advances when valid and can go Back", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 2 of 3");
    await user.click(screen.getByTestId("back-btn"));
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
    expect(screen.getByTestId("field-name")).toHaveValue("Ayan");
  });

  it("validates email on step 2", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    await user.type(screen.getByTestId("field-email"), "bad");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("step-error")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 2 of 3");
  });

  it("reviews and shows order confirmation on submit", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.click(screen.getByTestId("next-btn"));
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("review-name")).toHaveTextContent("Ayan");
    expect(screen.getByTestId("review-email")).toHaveTextContent("a@x.com");
    await user.click(screen.getByTestId("submit-btn"));
    const confirmation = await screen.findByTestId("order-confirmation");
    expect(confirmation).toBeInTheDocument();
    expect(confirmation).toHaveTextContent("Ayan");
    expect(confirmation).toHaveTextContent("a@x.com");
  });
});
