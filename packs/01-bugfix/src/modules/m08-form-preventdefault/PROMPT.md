# NewsletterSignup — Signup form reloads the page

**Time box:** ~8 min · **Difficulty:** warmup · **Topic:** form submit, `preventDefault`

## The app
You've been handed **NewsletterSignup** ("The Dispatch"), a small but complete
marketing site:

```
m08-form-preventdefault/
├── App.jsx                    app root (layout + routes)
├── components/
│   ├── Navbar.jsx             brand + nav links
│   ├── SignupForm.jsx   👈     THE FILE YOU FIX
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx              hero + signup form (owns the subscribers list)
│   └── Subscribers.jsx       second route
├── data/subscribers.js       local seed data (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m08**: a navbar, a hero, a newsletter
signup form, and a "Newest subscribers" list. Everything works — **except one bug**.

## The bug
Type an email and press **Subscribe**. Instead of the JS handler taking over, the
form fires the browser's **native submit** — in a real browser this **reloads the
whole page** and throws away the new state. The handler must cancel the default
submit so the app stays a single-page app.

## Your task
Fix **only** `components/SignupForm.jsx` so that:

1. Submitting the form does **not** trigger the native submit (no page reload).
2. A valid email is added to the top of the subscribers list and a success
   message appears.

## Constraints
- Edit **only** `components/SignupForm.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — tests depend on them:
  `signup-form`, `email-input`, `subscribe-btn`, `success-msg`,
  `subscriber-list`, `subscriber-email`.

## How to run
```bash
npm test -- m08
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hint (peek only if stuck)
- Add `e.preventDefault();` as the **first** line of the submit handler.
