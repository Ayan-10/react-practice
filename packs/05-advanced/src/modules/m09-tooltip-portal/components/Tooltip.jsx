import { useId, useState } from "react";
// 👉 You'll need createPortal from "react-dom" to render into document.body.
// import { createPortal } from "react-dom";

/**
 * THE FEATURE TO BUILD — m09 HelpHint tooltip via a React portal.
 *
 * Wrap a trigger and reveal a tooltip on hover AND keyboard focus, rendering
 * the tooltip through ReactDOM.createPortal into document.body (so it escapes
 * any overflow/stacking context of the trigger's subtree).
 *
 * Props:
 *   - label     (string) the tooltip text
 *   - children  the trigger element(s)
 *
 * Behaviour:
 *   - The trigger wrapper has data-testid="tooltip-trigger".
 *   - onMouseEnter / onFocus → show the tooltip.
 *   - onMouseLeave / onBlur  → hide it.
 *   - While shown, render via createPortal(..., document.body) an element with
 *       data-testid="tooltip", role="tooltip", and the `label` as its text.
 *   - Wire accessibility: give the tooltip an id and set aria-describedby on the
 *     trigger to that id while it's visible.
 *
 * Initially the tooltip must NOT be in the document.
 */
export default function Tooltip({ label, children }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  // TODO: on hover/focus set open=true; on leave/blur set open=false.
  // TODO: when open, render the tooltip into document.body via createPortal
  //       with data-testid="tooltip" and role="tooltip".

  return (
    <span
      className="hh-trigger"
      data-testid="tooltip-trigger"
      tabIndex={0}
      aria-describedby={open ? tipId : undefined}
    >
      {children}
      {/* TODO: portal-rendered tooltip goes here (only when `open`). */}
    </span>
  );
}
