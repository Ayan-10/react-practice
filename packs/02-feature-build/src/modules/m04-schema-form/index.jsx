import { useState } from "react";

/**
 * FEATURE MODULE m04 — Schema-driven form.
 *
 * You are given a `schema` describing fields. Render a controlled form from it,
 * validate on submit, and pass the collected values to `onSubmit`.
 *
 * Each field: { name, label, type, required }.
 *   - type "text" | "email" | "number"
 *   - required fields must be non-empty
 *   - email fields must contain "@"
 *
 * Required data-testids:
 *   - field-<name>   : the input for each field
 *   - error-<name>   : error message element (only rendered when invalid)
 *   - submit         : submit button
 *
 * onSubmit(values) is called ONLY when all validations pass, with an object
 * mapping field name -> value (numbers coerced to Number for type "number").
 */
export const defaultSchema = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: false },
];

export default function SchemaForm({ schema = defaultSchema, onSubmit = () => {} }) {
  // TODO: initialise form values from schema (each field -> "")
  const [values, setValues] = useState({});
  // TODO: track errors per field

  function handleChange(e) {
    // TODO: update the changed field's value
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: validate all fields; if valid call onSubmit(coercedValues),
    //       else set errors so error-<name> renders.
  }

  return (
    <form className="card" style={{ maxWidth: 420 }} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      {schema.map((field) => (
        <div key={field.name} style={{ marginBottom: 12 }}>
          <label>
            {field.label}
            <input
              data-testid={`field-${field.name}`}
              name={field.name}
              type={field.type === "number" ? "number" : "text"}
              value={values[field.name] ?? ""}
              onChange={handleChange}
            />
          </label>
          {/* TODO: render error-<name> when there's an error for this field */}
        </div>
      ))}
      <button className="btn" type="submit" data-testid="submit">Submit</button>
    </form>
  );
}
