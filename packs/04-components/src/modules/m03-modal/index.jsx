import { useState } from "react";

/**
 * MODULE m03 — Modal / dialog. Read PROMPT.md.
 */
export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  // TODO: close on Escape (add/remove a keydown listener while open).

  return (
    <div>
      <h2>Modal</h2>
      <button data-testid="open-btn" onClick={() => setOpen(true)}>
        Open
      </button>

      {/* TODO: when open, render a backdrop (closes on click) containing the
          modal (does NOT close on click), with a close button and Escape support. */}
    </div>
  );
}
