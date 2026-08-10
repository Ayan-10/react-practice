// SOLUTION — m07. Controlled inputs + generic change handler.
import { useState } from "react";

export default function ControlledInput() {
  const [form, setForm] = useState({ name: "", email: "" }); // never undefined

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // update the right field
  }

  return (
    <div className="card">
      <h2>Profile</h2>
      <input data-testid="name" name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <input data-testid="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <p data-testid="preview">{form.name} — {form.email}</p>
    </div>
  );
}
