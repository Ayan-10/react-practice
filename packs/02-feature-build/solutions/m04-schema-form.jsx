// SOLUTION — m04 JobApply schema-driven form.
// Copy this over components/SchemaForm.jsx to self-check.
import { useState } from "react";
import { APPLICATION_SCHEMA } from "../data/schema.js";

export default function SchemaForm({
  schema = APPLICATION_SCHEMA,
  onSubmit = () => {},
}) {
  const [values, setValues] = useState(
    Object.fromEntries(schema.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function validate() {
    const next = {};
    for (const f of schema) {
      const val = String(values[f.name] ?? "").trim();
      if (f.required && val === "") {
        next[f.name] = `${f.label} is required`;
        continue;
      }
      if (f.type === "email" && val !== "" && !val.includes("@")) {
        next[f.name] = "Enter a valid email";
      }
    }
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    const payload = {};
    for (const f of schema) {
      payload[f.name] =
        f.type === "number" ? Number(values[f.name]) : values[f.name];
    }
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
