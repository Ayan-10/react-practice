import { useState } from "react";

/**
 * BUGFIX MODULE m07 — Controlled/uncontrolled input.
 *
 * The email field starts as `undefined` in state, so React renders it as an
 * UNCONTROLLED input; when you type, React warns and the value binding is broken.
 * Also the onChange updates the wrong key so nothing reflects in the preview.
 *
 * Fix the form so both fields are controlled and the live preview updates.
 */
export default function ControlledInput() {
  // BUG: email is undefined -> uncontrolled input warning.
  const [form, setForm] = useState({ name: "", email: undefined });

  function handleChange(e) {
    const { name, value } = e.target;
    // BUG: hard-codes "name", ignoring which field changed.
    setForm({ ...form, name: value });
  }

  return (
    <div className="card">
      <h2>Profile</h2>
      <input
        data-testid="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        data-testid="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <p data-testid="preview">
        {form.name} — {form.email}
      </p>
    </div>
  );
}
