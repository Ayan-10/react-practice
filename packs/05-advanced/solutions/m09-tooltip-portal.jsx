// SOLUTION — m09 HelpHint tooltip via React portal.
// Copy this over components/Tooltip.jsx to self-check.
import { useId, useState } from "react";
import { createPortal } from "react-dom";

export default function Tooltip({ label, children }) {
  const [open, setOpen] = useState(false);
  const tipId = useId();

  const show = () => setOpen(true);
  const hide = () => setOpen(false);

  return (
    <span
      className="hh-trigger"
      data-testid="tooltip-trigger"
      tabIndex={0}
      aria-describedby={open ? tipId : undefined}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="hh-tooltip"
            id={tipId}
            role="tooltip"
            data-testid="tooltip"
          >
            {label}
          </div>,
          document.body
        )}
    </span>
  );
}
