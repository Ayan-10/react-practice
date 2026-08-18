# m07 — OnboardWizard · Progress stepper (back / next + progress bar)

**Time box:** ~12 min

You're given a complete **OnboardWizard** mini-app: a navbar, an onboarding flow
(Home), and a Help route — all working. The ONE thing to build is the stepper
that shows progress through N steps.

> 👉 The file to edit is **`components/Stepper.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

Next/Back move between steps and a progress bar reflects completion percentage.

## Folder

```
m07-progress-stepper/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Stepper.jsx              👈 BUILD THIS
  pages/    Home.jsx  Help.jsx
  data/steps.js              local onboarding steps
  styles.css
```

## Requirements

- `steps` is an array of labels. Current step index starts at 0.
- `data-testid="current-label"` shows the current step's label.
- `data-testid="step-indicator"` shows `Step X of N` (1-indexed X).
- `data-testid="progress"` element has an inline style `width` = the percentage
  complete: `((index) / (N - 1)) * 100` as a string like `"50%"` (step 1 of 3 = 0%,
  last step = 100%).
- `data-testid="next"` advances (disabled on last step);
  `data-testid="back"` goes back (disabled on first step).

## Gotchas

- Clamp the index within `[0, N-1]`.
- Progress at the first step is 0%, at the last step is 100%.

## Run

```
npx vitest run src/modules/m07-progress-stepper/
```
