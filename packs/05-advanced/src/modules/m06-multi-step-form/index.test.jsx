import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE ApplyFlow mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can drive the wizard.
import Wizard, { validateStep } from "./components/Wizard.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m06 · ApplyFlow — app renders", () => {
  it("renders navbar, home page and the wizard", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
  });

  it("navigates to the FAQ route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-faq"));
    expect(await screen.findByTestId("faq-page")).toBeInTheDocument();
  });
});

describe("m06 · validateStep — pure validation", () => {
  it("step 1 requires a name", () => {
    expect(validateStep(1, { name: "" })).toHaveProperty("name");
    expect(validateStep(1, { name: "Ada" })).toEqual({});
  });

  it("step 2 checks email format and cross-field confirm", () => {
    expect(validateStep(2, { email: "nope", confirm: "nope" })).toHaveProperty("email");
    expect(
      validateStep(2, { email: "a@b.com", confirm: "different@b.com" })
    ).toHaveProperty("confirm");
    expect(validateStep(2, { email: "a@b.com", confirm: "a@b.com" })).toEqual({});
  });
});

describe("m06 · Wizard — wired UI", () => {
  it("blocks advancing past step 1 with an empty name", async () => {
    const user = userEvent.setup();
    render(<Wizard />);
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    // still on step 1
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 1 of 3");
  });

  it("shows a cross-field error when confirm !== email", async () => {
    const user = userEvent.setup();
    render(<Wizard />);
    await user.type(screen.getByTestId("input-name"), "Ada");
    await user.click(screen.getByTestId("next-btn")); // → step 2
    await user.type(screen.getByTestId("input-email"), "a@b.com");
    await user.type(screen.getByTestId("input-confirm"), "typo@b.com");
    await user.click(screen.getByTestId("next-btn"));
    expect(screen.getByTestId("error-confirm")).toBeInTheDocument();
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 2 of 3");
  });

  it("happy path reaches step 3 and submit → success", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockResolvedValue({ ok: true });
    render(<Wizard onSubmit={onSubmit} />);

    await user.type(screen.getByTestId("input-name"), "Ada");
    await user.click(screen.getByTestId("next-btn")); // → step 2
    await user.type(screen.getByTestId("input-email"), "a@b.com");
    await user.type(screen.getByTestId("input-confirm"), "a@b.com");
    await user.click(screen.getByTestId("next-btn")); // → step 3
    expect(screen.getByTestId("step-indicator")).toHaveTextContent("Step 3 of 3");

    await user.click(screen.getByTestId("submit-btn"));
    await waitFor(() =>
      expect(screen.getByTestId("success")).toBeInTheDocument()
    );
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ name: "Ada", email: "a@b.com" })
    );
  });

  it("shows submit-error when onSubmit rejects", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn().mockRejectedValue(new Error("boom"));
    render(<Wizard onSubmit={onSubmit} />);

    await user.type(screen.getByTestId("input-name"), "Ada");
    await user.click(screen.getByTestId("next-btn"));
    await user.type(screen.getByTestId("input-email"), "a@b.com");
    await user.type(screen.getByTestId("input-confirm"), "a@b.com");
    await user.click(screen.getByTestId("next-btn"));
    await user.click(screen.getByTestId("submit-btn"));

    await waitFor(() =>
      expect(screen.getByTestId("submit-error")).toBeInTheDocument()
    );
  });
});
