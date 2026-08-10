// SOLUTION — m03 Modal / dialog.
import { useEffect, useState } from "react";

export default function ModalDemo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div>
      <h2>Modal</h2>
      <button data-testid="open-btn" onClick={() => setOpen(true)}>
        Open
      </button>

      {open && (
        <div
          data-testid="backdrop"
          className="modal-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            data-testid="modal"
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Modal content</p>
            <button data-testid="close-btn" onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
