# m10 — [TS] Tabs (typed)

**Time box:** ~12 min

Same behavior as m01 Tabs, but in **TypeScript** with properly typed props/state.

## Requirements

- Define and export a `Tab` type: `{ id: string; label: string; content: React.ReactNode }`.
- `Tabs` takes `{ tabs: Tab[] }`.
- Active tab id in state, typed as `string`.
- Buttons `data-testid="tab-<id>"`, active one has class `active`.
- Active content in `data-testid="panel"`; only one panel at a time; first active.

## Gotchas

- Type the `useState<string>` for the active id.
- No `any`. Props are fully typed.
