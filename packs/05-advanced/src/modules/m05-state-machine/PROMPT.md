# m05 — CrossWalk · Traffic Light State Machine

**Time box:** ~20 min

You're given a complete **CrossWalk** mini-app: a navbar, a Home page with a
traffic light, and a Rules route — all working. The ONE thing to build is the
light's **finite state machine**.

> 👉 The file to edit is **`components/TrafficLight.jsx`**. The JSX is already
> wired to `nextState`; you only need to implement the transition logic.

## Requirements

The light cycles: **green → yellow → red → green** (and repeats forever).

- Define `TRANSITIONS`: a map from each state to the next
  (`{ green: "yellow", yellow: "red", red: "green" }`).
- Implement `nextState(current)` — a **pure** function returning the state that
  follows `current` per `TRANSITIONS` (no UI, no side effects).

The component already renders these `data-testid`s from state:

- `light` — element whose text + `data-state` reflect the current state.
- `next-btn` — advances the light via `nextState`.
- `walk` — shows **"Walk"** only when the state is `red` (pedestrians cross),
  otherwise **"Don't Walk"**.

## Gotchas

- `nextState` must be pure — same input, same output; no reading component state.
- The walk indicator flips to "Walk" exactly at `red`, and back at `green`.
- Export both `nextState` and `TRANSITIONS` (the test imports them directly).

## Run

```
npx vitest run src/modules/m05-state-machine/
```
