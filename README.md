# React Interview Practice

A **test-driven** React drill system for regaining machine-coding / OA speed.

Every module is a small, self-contained task on top of a **complete, working mini-app** — exactly
the shape real interviews use. They hand you a running app (navbar, routes, styling, data all
done) and ask you to either **fix a broken behavior** or **implement one missing piece**. A
**failing test suite** encodes the expected behavior. The app always renders on open; your job is
to edit the ONE marked file until the tests go **green**, respecting every `data-testid`.

> Strategy, rationale, and the full build log live in [`MEMORY.md`](./MEMORY.md).

---

## How it works

Each module is a **mini-app** folder under `src/modules/<mXX-name>/`:

```
mXX-name/
  App.jsx            app root — navbar + routes (already done)
  index.jsx          entry (just re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    <Feature>.jsx    👈 THE ONE FILE YOU EDIT (ships broken/stubbed)
  pages/             Home + a second route (already done)
  data/              local offline dataset
  styles.css
  PROMPT.md          the interview-style task + time box + hints
  index.test.jsx     the tests that must pass
```

1. The app **runs cleanly** on open — no compile errors, it renders in the browser.
2. Inside `components/<Feature>.jsx` a feature is **broken or stubbed** (look for `// TODO` or the
   docblock describing what to build). **This is the only file you touch.**
3. The **tests FAIL** on first run. That's the starting line.
4. Edit `components/<Feature>.jsx` until behavior is correct.
5. Re-run the tests until **GREEN**, then compare with `solutions/<mXX-name>` to learn the
   faster/cleaner path.

Tests assert on `data-testid` + visible behavior (mirroring OA graders). `fetch`/loaders are
mocked in tests for determinism; the running app uses local fallback data so it works offline.

---

## Quick start

Each **pack** is one self-contained Vite project (one `npm install` per pack).

```bash
cd packs/01-bugfix
npm install            # once per pack
npm run dev            # starts the dev server at http://localhost:5173
```

### 1. See the UI

Open **http://localhost:5173** in a browser. You'll land on a **menu of every module** in the
pack. Click any module to open its mini-app (navbar + pages). Use `← All modules` (top-left) to go
back to the menu. The app is fully interactive — you can drive the feature by hand as you build it.

### 2. Read the task

```bash
cat src/modules/m01-searchbar-outside-click/PROMPT.md
```
(Or just open `PROMPT.md` in your editor.) It states the goal, the required `data-testid`s, gotchas,
and a ~time box.

### 3. Watch it fail, then complete it

```bash
# run ONE module's tests — expected to FAIL at first
npm test -- m01-searchbar-outside-click

# edit the marked file:
#   src/modules/m01-searchbar-outside-click/components/<Feature>.jsx
# then re-run until GREEN
```

Handy variants:

```bash
npm test                       # run ALL modules in the pack once
npm run test:watch             # watch mode — re-runs on save (great while building)
npm test -- m03                # partial name match works too
```

> ⚠️ Note: `npm test` does a **single run** (it maps to `vitest run`). For a live re-running
> loop while you code, use `npm run test:watch`.

### 4. View the solution (after you attempt)

Reference solutions live in **`packs/<pack>/solutions/<mXX-name>.jsx`** (`.tsx` / `.js` for a few).
Just open the file to read it. To *run* the solution against the tests (self-check):

```bash
# from the pack folder — back up your file, drop the solution in, test, then restore
F=src/modules/m01-searchbar-outside-click/components/SearchBar.jsx   # the feature file
cp "$F" /tmp/mine.jsx
cp solutions/m01-searchbar-outside-click.jsx "$F"
npm test -- m01-searchbar-outside-click     # should be all green
cp /tmp/mine.jsx "$F"                        # restore your attempt
```

(The feature file name differs per module — it's the non-Navbar/Footer file in `components/`, and
`PROMPT.md` always names it explicitly.)

---

## The packs

| Pack | Focus | Modules | Language |
|------|-------|---------|----------|
| **01 — Bug-Fix** | Fix broken behavior (stale closures, effect deps, mutation, keys, cleanup) | 10 | JS |
| **02 — Feature-Build** | Implement a missing feature (chips, converter, cart, forms, context) | 10 | JS |
| **03 — Async / Data** | Fetch states, debounce, race, pagination, infinite scroll, polling | 10 | JS |
| **04 — Components** | Classic build-from-partial staples (tabs, modal, table, stepper) + TS | 12 | JS + 3 TS |
| **05 — Advanced** | Gap-fillers: reducers, memoization, DnD, state machine, portals, custom hooks | 10 | JS |

**52 modules total.** Every module is a full mini-app; the one file you edit is
`components/<Feature>.jsx` (named in each `PROMPT.md`).

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

### Pack 05 — Advanced
`m01` useReducer cart · `m02` undo/redo · `m03` memoization (useMemo/useCallback) ·
`m04` drag & drop reorder · `m05` state machine · `m06` multi-step form ·
`m07` keyboard menu · `m08` carousel · `m09` tooltip (portal) · `m10` custom hooks

---

## Recommended order

Beginner → advanced: **01 → 02 → 03 → 04 → 05**. Within a pack, go `m01 → mNN`.
If you're rusty, do all of Pack 01 first — it rebuilds muscle memory for the bugs interviews
love. Save the TS modules (Pack 04 `m10–m12`) and Pack 05 for last; Pack 05 closes the harder
gaps (reducers, memoization, DnD, state machines, custom hooks).

Aim for **10–25 min per module**. Speed is the goal, not novelty — if you finish fast, open the
solution and see how much shorter it is.

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

### Pack 05 — Advanced
- [ ] m01 useReducer cart
- [ ] m02 undo/redo
- [ ] m03 memoization
- [ ] m04 drag & drop reorder
- [ ] m05 state machine
- [ ] m06 multi-step form
- [ ] m07 keyboard menu
- [ ] m08 carousel
- [ ] m09 tooltip (portal)
- [ ] m10 custom hooks

---

## Notes

- **Edit only `components/<Feature>.jsx`** — the rest of each mini-app already works. `index.jsx`
  just re-exports `App`; don't edit it.
- **Respect `data-testid`s** — graders key off them; don't rename them.
- Tests never need internet (fetch is mocked). The live app falls back to local data offline.
- Pack 04 has TypeScript modules — check types with `npm run typecheck` (that pack only).
- Timer-based modules use fake timers in tests; if you write your own, drive them with
  `fireEvent` + `act(async () => vi.advanceTimersByTimeAsync(ms))` (userEvent + fake timers hangs).
- Each pack ships its own `README.md` with pack-specific detail.
