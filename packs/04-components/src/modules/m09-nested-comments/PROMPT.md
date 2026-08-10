# m09 — Nested comments (tree)

**Time box:** ~18 min

Render a tree of comments recursively. Each comment can have `replies` (an array
of the same shape). Each node can collapse/expand its children.

## Requirements

- A comment shape: `{ id, text, replies?: Comment[] }`.
- Render each comment's text in `data-testid="comment-<id>"`.
- If a comment has replies, render a toggle `data-testid="toggle-<id>"`.
- Children start **expanded**. Clicking the toggle hides/shows that comment's
  direct children (and by extension their subtrees).
- When collapsed, none of that node's descendant comments are in the DOM.

## Gotchas

- Use a recursive component (a `Comment` that renders child `Comment`s).
- Collapse state is per-node — keep it local to each node, not a single global flag.
