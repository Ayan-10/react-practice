import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE JobApply app (navbar + apply form + submissions route),
// exactly like a user would see it. The only thing to BUILD is the schema-driven
// form, which lives in components/SchemaForm.jsx.
//
// Default schema used by the module (data/schema.js):
//   name  (text,   required)
//   email (email,  required)
//   age   (number, optional — coerced to Number in the emitted payload)

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m04 · JobApply — app renders", () => {
  it("renders navbar, home page and an input per schema field", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("field-name")).toBeInTheDocument();
    expect(screen.getByTestId("field-email")).toBeInTheDocument();
    expect(screen.getByTestId("field-age")).toBeInTheDocument();
  });

  it("navigates to the Submissions route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-submissions"));
    expect(await screen.findByTestId("submissions-page")).toBeInTheDocument();
  });
});

describe("m04 · JobApply — schema-driven form feature", () => {
  it("shows errors and does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    // No success receipt because onSubmit never fired.
    expect(screen.queryByTestId("apply-receipt")).not.toBeInTheDocument();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "not-an-email");
    await user.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    expect(screen.queryByTestId("apply-receipt")).not.toBeInTheDocument();
  });

  it("submits and shows a receipt with coerced values when valid", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.type(screen.getByTestId("field-age"), "27");
    await user.click(screen.getByTestId("submit"));
    // Valid submission surfaces the receipt driven by onSubmit(values).
    expect(await screen.findByTestId("apply-receipt")).toBeInTheDocument();
    expect(screen.getByText(/Ayan/)).toBeInTheDocument();
    expect(screen.getByText(/a@x\.com/)).toBeInTheDocument();
  });

  it("clears field errors once a valid submission goes through", async () => {
    const user = userEvent.setup();
    renderApp();
    // First an empty submit to trigger errors.
    await user.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    // Now fill everything and submit again.
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.click(screen.getByTestId("submit"));
    expect(screen.queryByTestId("error-name")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-email")).not.toBeInTheDocument();
  });

  it("passes exactly the coerced payload to onSubmit via a custom schema", async () => {
    // Mount SchemaForm in isolation with a spy to assert the emitted payload.
    const { default: SchemaForm } = await import("./components/SchemaForm.jsx");
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    const schema = [
      { name: "name", label: "Name", type: "text", required: true },
      { name: "email", label: "Email", type: "email", required: true },
      { name: "age", label: "Age", type: "number", required: false },
    ];
    render(<SchemaForm schema={schema} onSubmit={onSubmit} />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.type(screen.getByTestId("field-age"), "27");
    await user.click(screen.getByTestId("submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      name: "Ayan",
      email: "a@x.com",
      age: 27,
    });
  });
});
