// SOLUTION — m02 SketchPad undo/redo with useReducer.
// Copy this over components/History.jsx to self-check.
import { useReducer } from "react";

export const initialState = { past: [], present: 0, future: [] };

export function historyReducer(state, action) {
  const { past, present, future } = state;
  switch (action.type) {
    case "set":
      return { past: [...past, present], present: action.value, future: [] };
    case "undo": {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      return {
        past: past.slice(0, -1),
        present: previous,
        future: [present, ...future],
      };
    }
    case "redo": {
      if (future.length === 0) return state;
      const next = future[0];
      return {
        past: [...past, present],
        present: next,
        future: future.slice(1),
      };
    }
    case "reset":
      return initialState;
    default:
      return state;
  }
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
