import { useState } from "react";
import { INITIAL_PROFILE } from "../data/profile.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * SettingsForm lets you edit your display name and email, with a live preview
 * of how the profile card will read.
 *
 * TWO BUGS, both classic "controlled input" mistakes:
 *   1. `email` starts as `undefined` in state, so React renders the email field
 *      as an UNCONTROLLED input (and warns in the console). It should be "".
 *   2. `handleChange` hard-codes the `name` key, so typing in the EMAIL field
 *      wrongly overwrites `name` — the email never updates and the preview is
 *      wrong.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   name, email, preview, save, saved-msg
 */
export default function SettingsForm({ onSave }) {
  const [form, setForm] = useState({ name: INITIAL_PROFILE.name, email: "" });
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // TODO (fix):
  //   1. Start email as "" (never undefined) so both inputs are controlled.
  //   2. Update the field that changed: setForm(prev => ({ ...prev, [name]: value })).

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
