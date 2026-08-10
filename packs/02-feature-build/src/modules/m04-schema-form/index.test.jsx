import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SchemaForm from "./index.jsx";

describe("Schema-driven form", () => {
  it("renders an input per schema field", () => {
    render(<SchemaForm />);
    expect(screen.getByTestId("field-name")).toBeInTheDocument();
    expect(screen.getByTestId("field-email")).toBeInTheDocument();
    expect(screen.getByTestId("field-age")).toBeInTheDocument();
  });

  it("shows errors and does not submit when required fields are empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SchemaForm onSubmit={onSubmit} />);
    await user.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error-name")).toBeInTheDocument();
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("validates email format", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SchemaForm onSubmit={onSubmit} />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "not-an-email");
    await user.click(screen.getByTestId("submit"));
    expect(screen.getByTestId("error-email")).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("submits coerced values when valid", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<SchemaForm onSubmit={onSubmit} />);
    await user.type(screen.getByTestId("field-name"), "Ayan");
    await user.type(screen.getByTestId("field-email"), "a@x.com");
    await user.type(screen.getByTestId("field-age"), "27");
    await user.click(screen.getByTestId("submit"));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({ name: "Ayan", email: "a@x.com", age: 27 });
  });
});
