// SOLUTION — m04 Schema-driven form.
import { useState } from "react";

export const defaultSchema = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "age", label: "Age", type: "number", required: false },
];

export default function SchemaForm({ schema = defaultSchema, onSubmit = () => {} }) {
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
        next[f.name] = "Invalid email";
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
      payload[f.name] = f.type === "number" ? Number(values[f.name]) : values[f.name];
    }
    onSubmit(payload);
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
          {errors[field.name] && (
            <p data-testid={`error-${field.name}`} style={{ color: "crimson", margin: "4px 0 0" }}>
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
      <button className="btn" type="submit" data-testid="submit">Submit</button>
    </form>
  );
}
