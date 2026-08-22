// TODO: implement ImageGallery modal (lightbox) behavior — see PROMPT.md

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
  // TODO: track open state; close on Close button, backdrop click, and Escape.

  return (
    <div>
      <h2>Modal</h2>
      <button
        className="ig-open-btn"
        data-testid="open-btn"
        onClick={() => {
          // TODO: open the modal.
        }}
      >
        Open
      </button>

      {/* TODO: when open, render backdrop + modal (data-testid backdrop/modal/close-btn). */}
    </div>
  );
}
