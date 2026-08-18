import { useReducer } from "react";

/**
 * THE FEATURE TO BUILD — m02 SketchPad undo/redo, driven by useReducer.
 *
 * Manage a single numeric value with full undo/redo history. The reducer must
 * handle these action types:
 *   - { type: "set", value }  → push present onto past, set new present, clear future
 *   - { type: "undo" }        → pop past → present, push old present to FRONT of future
 *                               (no-op if past is empty)
 *   - { type: "redo" }        → shift future → present, push old present onto past
 *                               (no-op if future is empty)
 *   - { type: "reset" }       → back to initialState
 *
 * State shape: { past: [], present: <number>, future: [] }   (initial present = 0)
 *
 * REQUIRED data-testids:
 *   - value       (shows the current present value)
 *   - inc-btn     (dispatch set present + 1)
 *   - dec-btn     (dispatch set present − 1)
 *   - undo-btn    (dispatch undo; disabled when past is empty)
 *   - redo-btn    (dispatch redo; disabled when future is empty)
 *   - reset-btn   (dispatch reset)
 *
 * Rendering rules:
 *   - undo-btn gets `disabled` when there is nothing in `past`.
 *   - redo-btn gets `disabled` when there is nothing in `future`.
 *
 * Export both `historyReducer` and `initialState` (the test imports them directly).
 */
export const initialState = { past: [], present: 0, future: [] };

export function historyReducer(state, action) {
  // TODO: implement the reducer (set / undo / redo / reset).
  return state;
}

export default function History() {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const { past, present, future } = state;

  return (
    <div className="ur-editor card">
      <div className="ur-value-row">
        <span className="ur-value-label">Value</span>
        <strong className="ur-value" data-testid="value">
          {present}
        </strong>
      </div>

      <div className="ur-controls">
        <button
          className="btn"
          data-testid="dec-btn"
          onClick={() => dispatch({ type: "set", value: present - 1 })}
        >
          −1
        </button>
        <button
          className="btn"
          data-testid="inc-btn"
          onClick={() => dispatch({ type: "set", value: present + 1 })}
        >
          +1
        </button>
      </div>

      <div className="ur-controls">
        <button
          className="btn secondary"
          data-testid="undo-btn"
          disabled={past.length === 0}
          onClick={() => dispatch({ type: "undo" })}
        >
          Undo
        </button>
        <button
          className="btn secondary"
          data-testid="redo-btn"
          disabled={future.length === 0}
          onClick={() => dispatch({ type: "redo" })}
        >
          Redo
        </button>
        <button
          className="btn secondary"
          data-testid="reset-btn"
          onClick={() => dispatch({ type: "reset" })}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
