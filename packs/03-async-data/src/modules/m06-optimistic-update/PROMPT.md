# m06 — SocialLikes · Optimistic update (toggle like) with rollback

**Time box:** ~15 min

You're given a complete **SocialLikes** mini-app: a navbar, a post feed (Home),
and a Trending route — all working. The ONE thing to build is the like button's
optimistic behaviour.

> 👉 The file to edit is **`components/LikeButton.jsx`**. Everything else already
> works. The dev menu / tests mount the whole app.

A "like" button should feel instant: flip the UI **immediately**, then call the
server via `save(nextLiked)`. If the server call **fails**, roll back to the
previous value.

## Folder

```
m06-optimistic-update/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx  PostCard.jsx
    LikeButton.jsx           👈 BUILD THIS
  pages/    Home.jsx  Trending.jsx
  data/posts.js              local posts + default saveLike()
  styles.css
```

## Requirements

- Button `data-testid="like-btn"`; add a class containing `liked` when liked.
- Count in `data-testid="like-count"`.
- On click: optimistically toggle liked + adjust count, THEN call `save(nextLiked)`.
- If `save` **rejects**, revert liked + count to what they were before the click.
- `save` is a prop (tests inject a mock) and defaults to the local `saveLike`.

## Gotchas

- Capture the previous state before mutating so you can roll back exactly.
- Don't wait for the server before updating the UI — that's the whole point of
  "optimistic".

## Run

```
npx vitest run src/modules/m06-optimistic-update/
```
