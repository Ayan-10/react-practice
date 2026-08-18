import { useState } from "react";
import { APPLICATION_SCHEMA } from "../data/schema.js";

/**
 * FEATURE MODULE m04 — Schema-driven form (👈 THIS is the file you build).
 *
 * Read PROMPT.md. Right now this component only renders an input per field.
 * You must IMPLEMENT the controlled state, validation and onSubmit emit.
 *
 * You are given a `schema` describing fields. Render a controlled form from it,
 * validate on submit, and pass the collected values to `onSubmit`.
 *
 * Each field: { name, label, type, required }.
 *   - type "text" | "email" | "number"
 *   - required fields must be non-empty
 *   - email fields must contain "@"
 *
 * REQUIRED data-testids:
 *   - field-<name>   : the input for each field (already provided below)
 *   - error-<name>   : error message element (only rendered when invalid)
 *   - submit         : submit button (already provided below)
 *
 * onSubmit(values) is called ONLY when all validations pass, with an object
 * mapping field name -> value (numbers coerced to Number for type "number").
 */
export default function SchemaForm({
  schema = APPLICATION_SCHEMA,
  onSubmit = () => {},
}) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(schema.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = {};
    for (const field of schema) {
      const raw = String(values[field.name] ?? "").trim();
      if (field.required && raw === "") {
        nextErrors[field.name] = `${field.label} is required`;
        continue;
      }
      if (field.type === "email" && raw !== "" && !raw.includes("@")) {
        nextErrors[field.name] = "Invalid email";
      }
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    const payload = Object.fromEntries(
      schema.map((field) => {
        const raw = values[field.name];
        return [field.name, field.type === "number" ? Number(raw) : raw];
      })
    );
    onSubmit(payload);
  }

  return (
    <form
      className="ja-form"
      style={{ maxWidth: 420 }}
      onSubmit={handleSubmit}
      data-testid="apply-form"
    >
      <h2 className="ja-form-title">Apply now</h2>
      {schema.map((field) => (
        <div key={field.name} className="ja-field">
          <label className="ja-label">
            {field.label}
            <input
              className="ja-input"
              data-testid={`field-${field.name}`}
              name={field.name}
              type={field.type === "number" ? "number" : "text"}
              value={values[field.name] ?? ""}
              onChange={handleChange}
            />
          </label>
          {errors[field.name] && (
            <p className="ja-error" data-testid={`error-${field.name}`}>
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
      <button className="ja-btn" type="submit" data-testid="submit">
        Submit
      </button>
    </form>
  );
}
