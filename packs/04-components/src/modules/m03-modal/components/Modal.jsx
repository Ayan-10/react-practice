import { useEffect, useState } from "react";

/**
 * THE FEATURE — m03 ImageGallery modal (lightbox).
 *
 * Self-contained: an "Open" trigger opens a modal shown over a backdrop.
 * The modal closes on the Close button, on a backdrop click (but NOT on a
 * click inside the modal content), and on Escape.
 *
 * REQUIRED data-testids: open-btn, backdrop, modal, close-btn.
 */
export default function Modal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div>
      <h2>Modal</h2>
      <button
        className="ig-open-btn"
        data-testid="open-btn"
        onClick={() => setOpen(true)}
      >
        Open
      </button>

      {open && (
        <div
          data-testid="backdrop"
          className="ig-modal-backdrop"
          onClick={() => setOpen(false)}
        >
          <div
            data-testid="modal"
            className="ig-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <p>Modal content</p>
            <button
              className="ig-close-btn"
              data-testid="close-btn"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
