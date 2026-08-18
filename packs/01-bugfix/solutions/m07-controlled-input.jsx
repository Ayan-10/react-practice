// SOLUTION — m07 ProfileSettings. The fix for components/SettingsForm.jsx:
//   1. Start email as INITIAL_PROFILE.email (never undefined) so both inputs
//      are controlled.
//   2. Use a generic change handler that updates the field that changed:
//      setForm(prev => ({ ...prev, [name]: value })).
// Copy this file over components/SettingsForm.jsx to self-check.
import { useState } from "react";
import { INITIAL_PROFILE } from "../data/profile.js";

export default function SettingsForm({ onSave }) {
  const [form, setForm] = useState({
    name: INITIAL_PROFILE.name,
    email: INITIAL_PROFILE.email, // ✅ never undefined — controlled input
  });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value })); // ✅ update the right field
  }

  function handleSave() {
    onSave?.(form);
    setSaved(true);
  }

  return (
    <div className="ps-card">
      <label className="ps-field">
        Display name
        <input
          data-testid="name"
          name="name"
          className="ps-input"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
        />
      </label>

      <label className="ps-field">
        Email
        <input
          data-testid="email"
          name="email"
          className="ps-input"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
        />
      </label>

      <div className="ps-preview-box">
        <span className="ps-preview-label">Preview</span>
        <p data-testid="preview" className="ps-preview">
          {form.name} — {form.email}
        </p>
      </div>

      <button className="ps-btn" data-testid="save" onClick={handleSave}>
        Save changes
      </button>

      {saved && (
        <p data-testid="saved-msg" className="ps-saved">
          ✓ Profile saved.
        </p>
      )}
    </div>
  );
}
