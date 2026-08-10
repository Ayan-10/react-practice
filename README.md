# React Interview Practice

A **test-driven** React drill system for regaining machine-coding / OA speed.

Each module is a small, self-contained task on top of a working app — exactly the shape real
interviews use. Something is **broken** (bug fix) or **missing** (feature build). A **failing
test suite** encodes the expected behavior. The app always renders on open; your job is to edit
the source until the tests go **green**, respecting every `data-testid`.

> Strategy, rationale, and the full build log live in [`MEMORY.md`](./MEMORY.md).

---

## How it works

1. The project **runs cleanly** — no compile errors, it renders.
2. A feature is **broken or stubbed** (look for `// TODO` or an obvious bug).
3. The **tests FAIL** on first run. That's the starting line.
4. You edit `modules/<module>/index.jsx` (or `.tsx`) to make behavior correct.
5. Re-run tests until **GREEN**. Then compare with `solutions/<module>` to learn the faster path.

Tests assert on `data-testid` + visible behavior (mirroring OA graders). `fetch`/loaders are
mocked in tests for determinism; the running app uses real free public APIs with hardcoded
fallbacks so it works offline.

---

## Quick start

Each **pack** is one Vite project (one `npm install`). Pick a pack and go:

```bash
cd packs/01-bugfix
npm install            # once per pack
npm run dev            # opens the module menu at localhost:5173
```

Work a single module:

```bash
# read the task
cat src/modules/m01-searchbar-outside-click/PROMPT.md

# watch it fail (this is expected)
npm test -- m01-searchbar-outside-click

# edit src/modules/m01-searchbar-outside-click/index.jsx ... then re-run until green
```

Run every test in a pack:

```bash
npm test               # watch mode
npm run test:run       # single run (CI-style)
```

Self-check against the reference **after** you attempt:

```bash
# solutions live in packs/<pack>/solutions/<module>.jsx|.tsx
```

---

## The packs

| Pack | Focus | Modules | Language |
|------|-------|---------|----------|
| **01 — Bug-Fix** | Fix broken behavior (stale closures, effect deps, mutation, keys, cleanup) | 10 | JS |
| **02 — Feature-Build** | Implement a missing feature (chips, converter, cart, forms, context) | 10 | JS |
| **03 — Async / Data** | Fetch states, debounce, race, pagination, infinite scroll, polling | 10 | JS |
| **04 — Components** | Classic build-from-partial staples (tabs, modal, table, stepper) + TS | 12 | JS + 3 TS |

**42 modules total.**

### Pack 01 — Bug-Fix
`m01` searchbar outside-click · `m02` stale-closure interval · `m03` effect infinite loop ·
`m04` state mutation · `m05` missing effect dep · `m06` list key bug · `m07` controlled input ·
`m08` form preventDefault · `m09` memory leak · `m10` derived-state-in-state

### Pack 02 — Feature-Build
`m01` filter chips · `m02` currency converter · `m03` cart · `m04` schema form ·
`m05` star rating · `m06` todo · `m07` sort control · `m08` search filter ·
`m09` stepper · `m10` theme toggle (Context)

### Pack 03 — Async / Data
`m01` fetch states · `m02` debounced search · `m03` race condition · `m04` pagination ·
`m05` infinite scroll · `m06` optimistic update · `m07` retry · `m08` dependent fetch ·
`m09` useFetch hook · `m10` polling

### Pack 04 — Components
`m01` tabs · `m02` accordion · `m03` modal · `m04` autocomplete · `m05` data table ·
`m06` stopwatch · `m07` progress stepper · `m08` pagination component · `m09` nested comments ·
`m10` tabs **[TS]** · `m11` useFetch **[TS]** · `m12` star rating **[TS]**

---

## Recommended order

Beginner → advanced, roughly: **01 → 02 → 03 → 04**. Within a pack, go `m01 → mNN`.
If you're rusty, do all of Pack 01 first — it rebuilds the muscle memory for the bugs
interviews love. Save the TS modules (Pack 04 `m10–m12`) for last.

Aim for **10–25 min per module**. Speed is the goal, not novelty — if you finish fast,
open the solution and see how much shorter it is.

---

## Master progress tracker

Tick modules as you clear them (all tests green, ideally within the time box).

### Pack 01 — Bug-Fix
- [ ] m01 searchbar outside-click
- [ ] m02 stale-closure interval
- [ ] m03 effect infinite loop
- [ ] m04 state mutation
- [ ] m05 missing effect dep
- [ ] m06 list key bug
- [ ] m07 controlled input
- [ ] m08 form preventDefault
- [ ] m09 memory leak
- [ ] m10 derived-state-in-state

### Pack 02 — Feature-Build
- [ ] m01 filter chips
- [ ] m02 currency converter
- [ ] m03 cart
- [ ] m04 schema form
- [ ] m05 star rating
- [ ] m06 todo
- [ ] m07 sort control
- [ ] m08 search filter
- [ ] m09 stepper
- [ ] m10 theme toggle

### Pack 03 — Async / Data
- [ ] m01 fetch states
- [ ] m02 debounced search
- [ ] m03 race condition
- [ ] m04 pagination
- [ ] m05 infinite scroll
- [ ] m06 optimistic update
- [ ] m07 retry
- [ ] m08 dependent fetch
- [ ] m09 useFetch hook
- [ ] m10 polling

### Pack 04 — Components
- [ ] m01 tabs
- [ ] m02 accordion
- [ ] m03 modal
- [ ] m04 autocomplete
- [ ] m05 data table
- [ ] m06 stopwatch
- [ ] m07 progress stepper
- [ ] m08 pagination component
- [ ] m09 nested comments
- [ ] m10 tabs [TS]
- [ ] m11 useFetch [TS]
- [ ] m12 star rating [TS]

---

## Notes

- **Respect `data-testid`s** — graders key off them; don't rename them.
- Tests never need internet (fetch is mocked). The live app falls back to local data offline.
- Timer-based modules use fake timers in tests; if you write your own, drive them with
  `fireEvent` + `act(async () => vi.advanceTimersByTimeAsync(ms))` (userEvent + fake timers hangs).
- Each pack ships its own `README.md` with pack-specific detail.
