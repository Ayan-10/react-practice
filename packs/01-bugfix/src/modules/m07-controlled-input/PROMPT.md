# ProfileSettings — Email field is broken; edits write the wrong field

**Time box:** ~10 min · **Difficulty:** warmup · **Topic:** controlled inputs, generic change handler

## The app
You've been handed **ProfileSettings**, a small but complete account-settings app:

```
m07-controlled-input/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             brand + nav links (Profile / Account)
│   ├── SettingsForm.jsx 👈     THE FILE YOU FIX
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              profile edit form
│   └── Account.jsx           second route (read-only account)
├── data/profile.js           local seed profile (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m07**: a navbar, a profile-edit form with
a live preview, and an Account route. Everything works — **except one bug**.

## The bug
The settings form has two problems, both classic controlled-input mistakes:

1. `email` starts as `undefined` in state, so React renders the email field as an
   **uncontrolled** input (and warns in the console).
2. The change handler **hard-codes the `name` key**, so typing in the EMAIL field
   overwrites `name` instead — the email never updates and the preview is wrong.

## Your task
Fix **only** `components/SettingsForm.jsx` so that:

1. Both inputs are controlled (no uncontrolled-input warning).
2. Editing name and email updates each field independently and the live preview
   shows `<name> — <email>`.

## Constraints
- Edit **only** `components/SettingsForm.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — tests depend on them:
  `name`, `email`, `preview`, `save`, `saved-msg`.

## How to run
```bash
npm test -- m07
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hint (peek only if stuck)
- Initialise `email` to a string (never `undefined`).
- Use the input's own `name` in the handler:
  `setForm(prev => ({ ...prev, [name]: value }));`
