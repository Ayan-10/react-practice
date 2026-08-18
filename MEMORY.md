# React Interview Practice — Memory & Strategy File

> This file is the single source of truth for the React practice system.
> Every session, read this first. Update it as we add scenarios, track progress, and refine the approach.

---

## 1. The Problem (why this exists)

- User was strong in React ~2 years ago, then shifted to backend (Java/Spring/microservices). No React practice since.
- Fundamentals are intact, but **speed is gone**. OA/machine-coding React tasks that should take 15-20 min take way too long; some run out of time.
- Companies (even for backend roles) gate interviews behind React OAs + a short (~30 min) machine-coding React section.
- Time budget for React is **small** — user is actively grinding DSA, LLD, HLD, backend. React must give **max interview ROI per minute**.

## 2. The Core Insight (what interviews actually test)

Interviews/OAs almost NEVER ask "build a React app from scratch." They give:
- A **fully working, pre-built React project** (routing, styling, scaffolding all done).
- One of:
  - a **broken feature** to fix (bug fix), OR
  - a **missing feature** to implement (small, scoped), OR
  - a **small UI component** to build and wire in.
- They just want to confirm you *truly* know React: state, effects, events, lists, forms, props, context, hooks, async, etc.

So we practice EXACTLY that shape. Not app-building. Fix/build small scoped things, fast.

## 3. The Practice Model (the mechanism)

Each **scenario** is a small, self-contained React project where:
1. The project **runs cleanly on `npm run dev`** — NO compile errors, NO crashes. It renders.
2. But a **feature is broken or missing**.
3. There is a **test suite** (Vitest + React Testing Library) that encodes the *expected* behavior.
4. On first run: **tests FAIL** (because the feature is broken/missing).
5. User's job: edit the source so the **tests PASS** — mimicking "make this feature work" in an interview.
6. Each project has **multiple independent modules/tasks**. Solve one, run its tests, move to the next.

### Rules for how I (Claude) build scenarios
- The failing part must be **isolated and clearly marked** (e.g., a `// TODO: implement` or an obvious bug) so the user knows *where* to work, like a real OA prompt.
- App must never fail to compile in the starting state. Broken = wrong behavior or unimplemented stub, NOT a syntax error.
- Tests must be **behavior-focused** (what the user sees/does), not implementation-coupled. Use React Testing Library queries (getByRole, getByText, user events).
- Each task gets a **PROMPT.md** describing the task like an interview would ("The counter should reset to 0 when...").
- Keep each task solvable in **10-25 min** to match interview pacing.
- Provide a **SOLUTION** (git-ignored or in a `solutions/` folder) so user can self-check after attempting.
- Difficulty tiers: `warmup` → `core` → `advanced`.

## 4. Tech Stack Decision

- **Vite + React 18** (fast, modern, what most OAs use now).
- **JavaScript first** (JSX). Optionally TS variants later since some OAs use TS.
- **Vitest + @testing-library/react + @testing-library/user-event + jsdom** for tests.
- No heavy UI libs — plain components + minimal CSS, so focus stays on React logic.
- `npm run dev` to run app, `npm test` to run tests, `npm test -- <file>` per module.

## 5. Topic Coverage Map (what we MUST cover for interviews)

Track coverage here. Mark [x] when a scenario exists for it.

### Fundamentals
- [ ] useState — counters, toggles, derived state
- [ ] Event handling — clicks, inputs, forms
- [ ] Conditional rendering
- [ ] Lists & keys — render, add, remove, edit
- [ ] Controlled inputs / forms + validation
- [ ] Props & lifting state up
- [ ] Component composition / children

### Hooks & Effects
- [ ] useEffect — data fetch, subscriptions, cleanup
- [ ] useEffect dependency bugs (stale closures, infinite loops)
- [ ] useRef — DOM refs, mutable values, previous value
- [x] useMemo / useCallback — memoization, perf (Pack 05 m03)
- [x] useReducer — complex state (Pack 05 m01 cart, m02 undo/redo)
- [x] useContext — theme/auth/global state (Pack 02 m10)
- [x] Custom hooks — extract & reuse logic (Pack 03 m09 useFetch, Pack 05 m10 hooks lib)

### Async & Data
- [ ] Fetch + loading/error/success states
- [ ] Debounced search / typeahead
- [ ] Race conditions & cleanup on unmount
- [ ] Pagination / infinite scroll
- [ ] Optimistic updates

### Common Interview Components (build-from-partial)
- [ ] Todo list (add/toggle/delete/filter)
- [ ] Star rating
- [ ] Accordion / collapsible
- [ ] Tabs
- [ ] Modal / dialog
- [x] Tooltip (Pack 05 m09 — portal)
- [x] Pagination controls (Pack 04 m08)
- [ ] Autocomplete / search suggestions
- [ ] Stopwatch / timer
- [ ] Form with validation
- [ ] Shopping cart (qty, total)
- [x] Carousel / image slider (Pack 05 m08)
- [x] Data table (sort/filter/search) (Pack 04 m05)
- [x] Traffic light / state machine (Pack 05 m05)
- [x] Toggle theme (dark/light) (Pack 02 m10)
- [x] Progress bar / stepper (Pack 04 m07, Pack 05 m06 multi-step form)
- [x] Nested comments / tree (Pack 04 m09)
- [x] Drag & drop reorder (advanced) (Pack 05 m04)
- [x] Infinite scroll (advanced) (Pack 03 m05)

### Common Bug-Fix Patterns (interviews love these)
- [ ] Stale closure in event handler / effect
- [ ] Missing/incorrect useEffect deps
- [ ] Mutating state directly (no re-render)
- [ ] Wrong key in list (state leakage between rows)
- [ ] Not preventing default on form submit
- [ ] Async setState / batching misunderstanding
- [ ] Infinite render loop
- [ ] Uncontrolled ↔ controlled input warning
- [ ] Memory leak (no cleanup)
- [ ] Incorrect derived state stored in state

## 6. Analysis of the User's REAL Questions (the templates we replicate)

The user sent 6 real samples. These define the exact shape. Key takeaways:

1. **Bugfix: SearchBar outside-click** — pre-built travel app, search dropdown won't close on outside click / on route change. Must use `useRef` + `document` mousedown listener + `useEffect` cleanup + `useLocation` to close on navigation. MUST preserve existing `data-testid`s (`search-input`, `search-div`, `apartment-name-search-result`, `auth-dropdown-btn`). 3 failing tests. → **Topic: refs, event listeners, effect cleanup, router side effects.**
2. **Feature: Apartment filter chips** — dynamically generate filter chips (amenities/countries/ratings) from already-loaded data, toggle chips, AND-logic multi-filter, Clear All, frontend-only filtering. Strict `data-testid` format `filter-chip-{label-lowercase}`. 9 failing tests. → **Topic: derived data, list filtering, multi-select toggle state, conditional render.**
3. **Machine coding (60 min)**: component design, API handling, optimization, **pagination, infinite scroll**.
4. **Web fundamentals round**: **build a form component from a data schema** — render fields from schema (name/email/age), store input in schema onSubmit. → **Topic: dynamic/controlled forms, validation.**
5. **PayPal: Currency Converter** — dropdown selection, live convert on input, proper state mgmt. → real currency API (Frankfurter).
6. **Cart Management System** — dynamic cart items, qty/total state, real-time UI updates.

**Recurring interview signals across all of them:**
- Small, scoped task on top of an existing app (never build from zero).
- Heavy reliance on **`data-testid`** for grading → all our tests key off `data-testid`.
- **API data fetching** is almost always involved (cards/lists from an API).
- Behaviors tested: toggle state, derived/filtered data, controlled inputs, effects+cleanup, async loading/error, list rendering.

## 7. FINALIZED Decisions (locked with user 2026-08-09)

- **API strategy**: Each data-driven module fetches from a **real free public API** with a **hardcoded local fallback** so it works offline. APIs chosen:
  - `dummyjson.com` (products → for cart, listings, pagination, infinite scroll, cards)
  - `jsonplaceholder.typicode.com` (posts/users/comments → tables, lists)
  - `restcountries.com` (countries → dropdowns, filters)
  - `frankfurter.app` (currency rates → currency converter; no key needed)
  - Fallback: a local `fallbackData` object returned when fetch fails, so the app always renders offline.
- **Language**: Mostly **JavaScript (JSX)**. A few **TypeScript** modules only in the *advanced* pack.
- **Build mode**: **Fully autonomous.** Build one pack completely, then move to the next. No pausing for feedback.
- **Test grading**: Vitest + React Testing Library + user-event + jsdom. Tests assert on `data-testid` and visible behavior, mirroring OA graders. `fetch` is mocked in tests for determinism (so tests never need internet), but the app itself uses real APIs when run via `npm run dev`.
- **Module size**: SMALL. One focused task per module (matches 15-30 min OA slots). Never bundle multiple concepts into one module.

## 8. Folder Structure (FINAL)

```
react-practice/
  MEMORY.md
  README.md                     <- user-facing usage guide + master progress tracker
  packs/
    01-bugfix/                  <- one Vite project = one "pack" (one npm install)
      package.json
      vite.config.js            <- vitest config inline
      index.html
      src/
        main.jsx
        App.jsx                 <- lists all modules as routes/links so `npm run dev` shows them
        shared/
          api.js                <- fetch helpers + fallback data (reused)
          testServer.js         <- fetch mock helpers for tests
        modules/
          m01-searchbar-outside-click/
            PROMPT.md           <- the "interview question" + time box + testids
            index.jsx           <- the component the user edits (broken/stubbed)
            index.test.jsx      <- failing tests to make pass
          m02-.../
      solutions/                <- reference solutions mirroring modules/ (attempt first!)
        m01-searchbar-outside-click.jsx
    02-feature-build/
    03-async-data/
    04-components/
```

- One Vite project per pack → single `npm install` per pack, fast to jump between modules.
- `App.jsx` renders a menu of all modules so `npm run dev` always shows something (never a blank/broken screen).
- Each module is self-contained: its own `PROMPT.md`, component, and test file.

## 9. Pack & Module Plan (the full build list — check off as built)

### PACK 01 — Bug-Fix (fix broken behavior; mirrors samples #1) — JS  ✅ BUILT & VERIFIED
- [x] m01 SearchBar closes on outside click (ref + mousedown + cleanup + route change)  [from real Q1]
- [x] m02 Stale closure: counter in setInterval always adds to stale value (functional update / ref)
- [x] m03 useEffect infinite loop: object dep recreated every render
- [x] m04 Direct state mutation: pushing to array in state → no re-render
- [x] m05 Missing effect dependency: search doesn't refetch on query change
- [x] m06 List key bug: using index as key causes wrong row state on delete
- [x] m07 Controlled/uncontrolled warning: input value undefined → controlled
- [x] m08 Form submit reloads page: missing preventDefault
- [x] m09 Memory leak: fetch sets state after unmount / no cleanup on subscription
- [x] m10 Derived-state-in-state bug: filtered list stored in state, goes stale

### PACK 02 — Feature-Build (implement missing feature; mirrors samples #2,#4,#5,#6) — JS  ✅ BUILT & VERIFIED
- [x] m01 Apartment/product filter chips (amenities/country/rating, AND logic, Clear All)  [from real Q2]
- [x] m02 Currency converter (Frankfurter API, dropdowns, live convert)  [from real Q5]
- [x] m03 Cart management (add/remove/qty, total, real-time)  [from real Q6]
- [x] m04 Schema-driven form (render fields from schema, validate, store onSubmit)  [from real Q4]
- [x] m05 Star rating component (hover, click, controlled value)
- [x] m06 Todo list (add/toggle/delete/filter tabs)
- [x] m07 Sort control (sort listings by price/rating/title)
- [x] m08 Search filter (client-side filter list by text input)
- [x] m09 Multi-step form / stepper (next/back, progress, validation per step)
- [x] m10 Theme toggle via Context (light/dark, persists)

### PACK 03 — Async / Data (fetch, states, pagination; mirrors sample #3) — JS  ✅ BUILT & VERIFIED
- [x] m01 Fetch cards with loading/error/empty/success states (dummyjson products)
- [x] m02 Debounced search / typeahead (debounce hook + fetch)
- [x] m03 Race condition fix (ignore stale responses / active flag)
- [x] m04 Pagination controls (page numbers, next/prev, disabled edges)
- [x] m05 Infinite scroll (load-more append + end marker; sentinel note in PROMPT)
- [x] m06 Optimistic update (toggle like, rollback on failure)
- [x] m07 Retry on error + refetch button
- [x] m08 Dependent fetch (select user → load that user's posts)
- [x] m09 Custom useFetch hook (extract fetch logic, loading/error/data)
- [x] m10 Polling / auto-refresh with cleanup

### PACK 04 — Components (classic build-from-partial; interview staples) — JS + a few TS  ✅ BUILT & VERIFIED
- [x] m01 Tabs (active tab state, ARIA)
- [x] m02 Accordion (single/multi open)
- [x] m03 Modal / dialog (open/close, Esc, backdrop click, focus)
- [x] m04 Autocomplete / combobox (fetch suggestions, keyboard nav)
- [x] m05 Data table (sort by column, search filter)
- [x] m06 Stopwatch / timer (start/stop/reset, useRef interval)
- [x] m07 Progress bar / stepper
- [x] m08 Pagination component (reusable, truncated pages)
- [x] m09 Nested comments / tree (recursive render, collapse)
- [x] m10 [TS] Tabs in TypeScript (typed props)
- [x] m11 [TS] useFetch hook in TypeScript (generics)
- [x] m12 [TS] Star rating in TypeScript (typed props/state)

## 9b. MINI-APP CONVERSION (locked with user 2026-08-10) — THE CURRENT SHAPE

**User correction:** the original modules were single component files (`index.jsx`). The
user wants each module to be a **complete, independent, working React project** — a real
OA / machine-coding round: you get working boilerplate (Navbar + pages/routes + multiple
components + data + styling) and must fix ONE bug or build ONE feature in ONE file.
User approved using any UI library where helpful. "Do the same for all of the modules."

### Mini-app architecture (per module) — matches the verified m01 reference
```
mXX-slug/
  App.jsx            app root: layout + <Routes> (NO own <Router>; relative routes)
  index.jsx          entry: `export { default } from "./App.jsx";`
  components/         Navbar.jsx, <the buggy/feature file>, cards, Footer, …
  pages/             Home.jsx (+ a 2nd route + maybe a detail route)
  data/              local dataset + async helper (offline; mirrors real fetch)
  styles.css
  index.test.jsx     mounts WHOLE app via <MemoryRouter>, drives bug/feature via UI
  PROMPT.md          interview-style prompt + folder tree + testids + run cmd
solutions/mXX-slug.jsx   the FIXED single file (copy over the target file to self-check)
```

**Invariants (all must hold):**
- Whole app compiles + renders on the stub. Only the ONE target file is broken/stubbed.
- Stub test run: the "app renders" + neutral tests PASS; only the bug/feature test(s) FAIL.
- Solution (copy `solutions/mXX-slug.jsx` over the target file) → ALL tests PASS.
- Each module has its OWN DISTINCT DOMAIN (see table). Preserve all `data-testid`s.
- Mini-app uses relative routes; dev menu wraps each in its own `<MemoryRouter>` (App.jsx).
- The target file to edit is named in PROMPT.md (👈), stays the ONLY thing broken.

### Domain assignments (distinct app per module)
**PACK 01 — Bug-Fix**
- m01 HouseFinder — search dropdown won't close (outside-click/route) — ✅ DONE (reference)
- m02 FocusTimer (pomodoro) — stale closure: timer stuck at +1
- m03 ProductFilters (shop) — effect infinite loop from object dep
- m04 PlaylistBuilder (music) — direct state mutation, no re-render on add
- m05 WeatherDash — missing effect dep: city change doesn't refetch
- m06 TaskBoard (kanban) — index-as-key: wrong row deleted/state leak
- m07 ProfileSettings — controlled/uncontrolled input warning
- m08 NewsletterSignup — form reloads page, missing preventDefault
- m09 LiveFeed — memory leak: setState after unmount / no cleanup
- m10 ExpenseTracker — derived-state-in-state goes stale after edit

**PACK 02 — Feature-Build**
- m01 StayFinder (rentals) — filter chips (amenities/country/rating, AND, Clear All)
- m02 TravelWallet — currency converter (Frankfurter, dropdowns, live convert)
- m03 GroceryCart — cart mgmt (add/remove/qty/total, real-time)
- m04 JobApply — schema-driven form (render from schema, validate, store onSubmit)
- m05 MovieRatings — star rating component (hover/click/controlled)
- m06 DailyPlanner — todo list (add/toggle/delete/filter tabs)
- m07 BookStore — sort control (price/rating/title)
- m08 ContactsApp — search filter (client-side text filter)
- m09 CheckoutFlow — multi-step form / stepper (next/back, progress, per-step validate)
- m10 ReaderApp — theme toggle via Context (light/dark, persists)

**PACK 03 — Async / Data**
- m01 SneakerShop — fetch cards: loading/error/empty/success states
- m02 GifSearch — debounced typeahead (debounce hook + fetch)
- m03 CityExplorer — race condition fix (ignore stale responses)
- m04 BlogList — pagination controls (page numbers, next/prev, disabled edges)
- m05 PhotoWall — infinite scroll (load-more append + end marker)
- m06 SocialLikes — optimistic update (toggle like, rollback on failure)
- m07 CryptoTicker — retry on error + refetch button
- m08 TeamDirectory — dependent fetch (select user → load posts)
- m09 CountryStats — custom useFetch hook (loading/error/data)
- m10 StatusMonitor — polling / auto-refresh with cleanup

**PACK 04 — Components**
- m01 DocsViewer — Tabs (active tab state, ARIA)
- m02 FaqPage — Accordion (single/multi open)
- m03 ImageGallery — Modal/dialog (open/close, Esc, backdrop, focus)
- m04 CommandPalette — Autocomplete/combobox (fetch suggestions, keyboard nav)
- m05 SalesTable — Data table (sort by column, search filter)
- m06 GymTimer — Stopwatch/timer (start/stop/reset, useRef interval)
- m07 OnboardWizard — Progress bar / stepper
- m08 SearchResults — Pagination component (reusable, truncated pages)
- m09 ForumThread — Nested comments / tree (recursive render, collapse)
- m10 [TS] SettingsTabs — Tabs in TypeScript (typed props)
- m11 [TS] DataLoader — useFetch hook in TypeScript (generics)
- m12 [TS] RateWidget — Star rating in TypeScript (typed props/state)

### Verify command (per module)
`npx vitest run src/modules/<mXX>/ --pool=forks --poolOptions.forks.singleFork=true --reporter=dot --test-timeout=8000`
Self-check: cp target file → /tmp backup; cp `solutions/mXX.jsx` over it; run (expect ALL pass); restore backup.

## 10. Workflow Per Session (for the user)

1. `cd packs/<pack>` → `npm install` (once per pack) → `npm run dev` to open the module menu.
2. Open the current module's `PROMPT.md` → read the task + time box.
3. `npm test -- <module-name>` → watch it FAIL (that's the starting point).
4. Edit `modules/<module>/index.jsx` to make behavior correct.
5. Re-run tests until GREEN. Respect all `data-testid`s.
6. Compare with `solutions/<module>.jsx` to learn the cleaner/faster approach (speed is the goal).
7. Tick the checkbox in section 9 and log time in section 11.

## 11. Progress Log

| Date | Pack/Module | Topic | Status | Notes |
|------|-------------|-------|--------|-------|
| 2026-08-09 | — | setup | folder + memory created | Real Qs received, plan finalized |
| 2026-08-09 | Pack 01 | Bug-Fix (10) | ✅ built + verified | stubs fail, solutions pass |
| 2026-08-09 | Pack 02 | Feature-Build (10) | ✅ built + verified | fixed nested-component remount in m01 |
| 2026-08-09 | Pack 03 | Async/Data (10) | ✅ built + verified | 23/23 solution tests pass; fake-timer tests use act() |
| 2026-08-09 | Pack 04 | Components (12, incl. 3 TS) | ✅ built + verified | 38/38 solution tests pass; stubs 34 fail; TS via esbuild |
| 2026-08-10 | Pack 01 / m03 | effect infinite loop | 🔧 fixed runner hang | stub's runaway loop hung the worker; added a render-count cap (`c<25`) so it fails fast & clean (848ms) without touching the dependency bug students must fix. Full pack now runs 10/10, no worker crash |
| 2026-08-10 | Pack 01 (all 10) | MINI-APP CONVERSION | ✅ done + verified | m01-m10 converted to full mini-apps (App+pages+components+data+styles). Domains: HouseFinder, FocusTimer, ShopFilters, PlaylistBuilder, WeatherDash, TaskBoard, ProfileSettings, NewsletterSignup, LiveFeed, ExpenseTracker. Build green (131 modules). Full suite: 16 bug tests fail on stubs, all neutral pass; each solution → all pass. m07-m10 finished in main thread after batch subagents hit usage limit. m08 bug redesigned (jsdom doesn't reload → assert defaultPrevented). |
| 2026-08-14 | Pack 02 (all 10) | MINI-APP CONVERSION | ✅ done + verified | m01-m10 converted to full feature-build mini-apps (App+pages+components+data+styles, each its own MemoryRouter in dev menu). Domains: StayFinder, TravelWallet, GroceryCart, JobApply, MovieRatings, DailyPlanner, BookStore, ContactsApp, CheckoutFlow, ReaderApp. Build green (130 modules). Full stub suite: 39 feature tests fail, all 22 app-render/nav neutral tests pass; each solution → its suite fully green (10/10 verified via self-check). NOTE: m03/m04/m06 solutions had to be rewritten from old single-file versions (wrong data source/import depth/markup) to match new scaffold — m05 was already correct. Feature files & solutions/ live at pack level (solutions/mXX-slug.jsx copied over components/<Feature>.jsx). Feature file→testid map: m01 FilterChips, m02 CurrencyConverter, m03 CartManager, m04 SchemaForm, m05 StarRating, m06 TodoList, m07 BookList, m08 ContactList, m09 CheckoutWizard, m10 ThemeContext. m07 title-asc test passes on stub (seed already alpha-ordered) but price/rating tests fail cleanly — distinction still valid. |
| 2026-08-16 | ALL PACKS (01-04) | SOLVED IN-PLACE — full suite green | ✅ done + verified | Worked every module's target file directly to green (not just via solutions/). Final full-suite verification, all 4 packs: **01=48/48, 02=61/61, 03=30/30, 04=38/38 → 177/177 tests pass**; every pack `vite build` succeeds. Pack 01 bugfix: applied each module's documented fix (m10 ExpenseList = derive filtered/total in render instead of storing in state). Pack 02 feature-build: implemented m02 CurrencyConverter (useEffect fetchRate + loading + stale-guard), m03 CartManager (add/inc/dec/remove-at-0 + totals), m04 SchemaForm (controlled + validate + coerced payload + error-<name>), m05 StarRating (hover preview + onChange to page summary), m06 TodoList (add/toggle/delete/filter/items-left), m07 BookList ([...books].sort by price/rating/title), m08 ContactList (case-insensitive filter + no-results), m09 CheckoutWizard (per-step validate + back + submit), m10 ThemeContext (real useState provider + toggle). Packs 03 & 04 were already fully implemented and green from prior session work. |
| 2026-08-18 | Pack 05 (new, 10 modules) | ADVANCED / GAP-FILL PACK | ✅ built + verified | New `packs/05-advanced` created to close coverage gaps the user flagged (useReducer, useMemo/useCallback, DnD, state machine, custom hooks were unchecked in §5). JS-only, same mini-app architecture as Packs 01-04 (App + relative Routes + Navbar/Footer + Feature stub + Home + second page + data + styles + PROMPT + test + solutions/). Each feature ships as a `// TODO` stub that still compiles/renders (matches real OA shape: boilerplate app + one clearly-marked file to implement). Modules: m01 BudgetBuddy(useReducer cart, .bb-), m02 SketchPad(undo/redo reducer history, .ur-), m03 PrimeLab(useMemo/useCallback/React.memo perf w/ compute-count proof, .ml-), m04 TaskFlow(HTML5 drag&drop reorder + pure reorder() helper, .df-), m05 CrossWalk(finite state machine traffic light + pure nextState, .sm-), m06 ApplyFlow(3-step form, cross-field confirm-email validation, async submit success/error, .af-), m07 QuickCmd(keyboard listbox: arrow/Home/End/Enter/Esc roving focus, .km-), m08 SnapGallery(carousel next/prev/dots wrap-around, .cg-), m09 HelpHint(tooltip via createPortal on hover+focus, aria-describedby, .hh-), m10 HookBox(custom hooks lib: useToggle/usePrevious/useDebounce/useLocalStorage in components/hooks.js + wired Demo.jsx, .hb-). Verified: all 10 stubs run (33 pass app-render/no-op + 39 fail feature = 72 tests, NO compile errors); each solution swapped in → its module fully green (8+10+5+7+6+8+8+6+6+8 all pass); `vite build` green (125 modules). m01 built by hand as template; m02-m10 by 3 parallel subagents then independently re-verified. Pack 05 is LOWER priority than 01-04 (added after user asked to reconfirm coverage). |
| 2026-08-17 | Pack 03 m06-m10 + Pack 04 (all 12) | MINI-APP CONVERSION | ✅ done + verified | CORRECTION to 2026-08-16 entry: "green from prior work" meant tests passed, NOT that modules were mini-apps — Pack 03 m06-m10 and ALL of Pack 04 were still single `index.jsx` files. Converted all 17 to full mini-apps (App.jsx + relative Routes + components/{Navbar,Footer,Feature} + pages/{Home,second} + data/ + styles.css + rewritten index.test.jsx mounting whole app + a direct-feature block). Test files fully rewritten (full-rewrite approved). Pack 03 domains: m06 SocialLikes(.sl-/LikeButton), m07 CryptoTicker(.ct-/RetryList), m08 TeamDirectory(.td-/DependentFetch), m09 CountryStats(.cs-/UserList+useFetch), m10 StatusMonitor(.sm-/Poller). Pack 04 domains: m01 DocsViewer(Tabs), m02 FaqPage(Accordion), m03 ImageGallery(Modal), m04 CommandPalette(Autocomplete), m05 SalesTable(DataTable), m06 GymTimer(.gt-/Stopwatch), m07 OnboardWizard(Stepper), m08 SearchResults(.sr-/Pagination), m09 ForumThread(.ft-/Comments), m10 [TS] SettingsTabs(Tabs.tsx), m11 [TS] DataLoader(UserList.tsx+useFetch<T>), m12 [TS] RateWidget(StarRating.tsx). Solutions/ kept as self-check copies (m09 realigned to new .ft- feature; m10/m11 solutions inline their data as self-contained copies). **Final full-suite: 01=48, 02=61, 03=41, 04=62 → 212/212 tests pass; all 4 `vite build` green; Pack 04 `tsc --noEmit` exit 0.** m06/m07 conversions done in main thread + 4 parallel subagents for the rest; 2 subagents hit usage limits but had already written conforming files (verified on disk). |

## 12. Next Action (for Claude across sessions)

- Build packs in order 01 → 04. Within a pack: scaffold Vite project, shared api.js + test helpers, then each module (component stub + PROMPT.md + failing test + solution).
- Verify each pack: `npm install`, `npm run dev` renders, `npm test` shows the intended tests FAILING (not erroring on compile), and each solution makes them PASS.
- Keep this file updated: tick module checkboxes, update progress log.
