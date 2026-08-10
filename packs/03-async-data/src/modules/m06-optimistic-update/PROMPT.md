# m06 — Optimistic update (toggle like) with rollback

**Time box:** ~15 min

A "like" button should feel instant: flip the UI **immediately**, then call the
server. If the server call **fails**, roll back to the previous value.

## Requirements

- Button `data-testid="like-btn"`; label shows `Liked` when liked, else `Like`.
- Count in `data-testid="like-count"`.
- On click: optimistically toggle liked + adjust count, THEN call `save(nextLiked)`.
- If `save` **rejects**, revert liked + count to what they were before the click.
- While saving you may disable the button, but it must return to enabled after.

## Gotchas

- Capture the previous state before mutating so you can roll back exactly.
- Don't wait for the server before updating the UI — that's the whole point of
  "optimistic".
