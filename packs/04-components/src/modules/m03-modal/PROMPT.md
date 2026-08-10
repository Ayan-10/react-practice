# m03 — Modal / dialog

**Time box:** ~15 min

Build a Modal. A trigger button opens it; it can be closed by the close button,
by clicking the backdrop, or by pressing Escape. Clicking the modal content must
NOT close it.

## Requirements

- Trigger: `data-testid="open-btn"`.
- When open, render `data-testid="backdrop"` containing `data-testid="modal"`.
- Close via: `data-testid="close-btn"`, clicking the backdrop, or pressing `Escape`.
- Clicking inside `data-testid="modal"` must NOT close it.
- When closed, neither backdrop nor modal is in the DOM.

## Gotchas

- Backdrop click closes; stop propagation on the inner modal's click so it
  doesn't bubble to the backdrop.
- Add the Escape keydown listener only while open, and clean it up.
