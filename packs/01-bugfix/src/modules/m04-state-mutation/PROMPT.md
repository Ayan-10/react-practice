# PlaylistBuilder — Added songs don't show up

**Time box:** ~15 min · **Difficulty:** core · **Topic:** immutable state updates, array copies, React re-render bailout

## The app
You've been handed **PlaylistBuilder**, a small but complete music app:

```
m04-state-mutation/
├── App.jsx                    app root (layout + routes + shared playlist state)
├── components/
│   ├── Navbar.jsx            top bar (brand + live playlist count)
│   ├── PlaylistPanel.jsx  👈  THE FILE YOU FIX
│   ├── SongCard.jsx
│   └── Footer.jsx
├── pages/
│   ├── Home.jsx             library grid + playlist panel
│   └── SongDetail.jsx       /song/:id
├── data/songs.js            local dataset (offline)
└── styles.css
```

Run the pack (`npm run dev`) and open **m04** to see it live: a navbar with a
playlist counter, a grid of song cards, an "add" button on each, a live playlist
panel, and song detail pages. Everything works — **except one bug**.

## The bug
Click **+ Add** on a song → nothing happens. The playlist stays empty, the
count in the navbar stays at 0, and removing songs does nothing either. The data
is technically being added to the array, but the screen never updates.

This is the classic **direct state mutation** trap: the handler does
`playlist.push(song); setPlaylist(playlist)` — it mutates the SAME array and
passes the SAME reference back to `setState`, so React bails out of the
re-render and the UI never changes.

## Your task
Fix **only** `components/PlaylistPanel.jsx` so that:

1. Clicking **+ Add** on a song appends it to the playlist and the count updates.
2. Clicking **×** on a playlist item removes it and the count updates.
3. State is updated **immutably** — always hand React a brand-new array.

## Constraints
- Edit **only** `components/PlaylistPanel.jsx`. The rest of the app is correct.
- **Do NOT remove or change any `data-testid`** — the tests depend on them:
  `library-grid`, `playlist`, `playlist-item`, `playlist-count`,
  `add-<songId>` (in SongCard), `remove-<songId>`.
- Frontend only. No mutating `.push` / `.splice` on state.

## How to run
```bash
npm test -- m04
```
Tests mount the **whole app** and drive it like a user. They FAIL first; make
them pass.

## Hints (peek only if stuck)
- To add: `setPlaylist((prev) => [...prev, song])` — spread makes a NEW array.
- To remove: `setPlaylist((prev) => prev.filter((_, i) => i !== index))`.
- Never call `.push` / `.splice` on a value held in state and then re-set the
  same reference — React compares by reference and skips the render.
