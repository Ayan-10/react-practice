# m08 — SnapGallery · Carousel with wrap-around

**Time box:** ~20 min

You're given a complete **SnapGallery** mini-app: a navbar, a Home page with a
carousel, and a second Albums route — all working. The ONE thing to build is the
carousel's navigation logic.

> 👉 The file to edit is **`components/Carousel.jsx`**. The JSX (stage, arrows,
> dots, index label) is already wired; you only need to implement the movement
> handlers.

## Requirements

Drive the carousel with a single `index` state over the `SLIDES` array:

- **Show the current slide** — its label in `data-testid="slide"`.
- **Progress** — `data-testid="slide-index"` shows `"N / total"` (1-based),
  e.g. `"1 / 5"`.
- **prev-btn / next-btn** move backward / forward with **wrap-around**:
  - `next` on the last slide wraps to index `0`.
  - `prev` on the first slide wraps to the last slide.
- **Dots** — one `data-testid="dot-<i>"` per slide (0-based). Clicking a dot
  jumps directly to that slide, and the active dot has `aria-current="true"`.

## Gotchas

- Use modular arithmetic for wrap-around: `(index + 1) % n` and
  `(index - 1 + n) % n`.
- Keep it deterministic — no autoplay in the core. If you add autoplay, gate it
  behind a prop that defaults to **off** and test it with fake timers.
- The dot index is **0-based**; the `slide-index` label is **1-based**.

## Run

```
npx vitest run src/modules/m08-carousel/
```
