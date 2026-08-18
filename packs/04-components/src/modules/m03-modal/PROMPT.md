# m03 — ImageGallery · Modal (lightbox)

**Time box:** ~15 min

You're given a complete **ImageGallery** mini-app: a navbar, a gallery page
(Home) with a lightbox modal, and an Albums route — all working. The feature to
focus on is the modal.

> 👉 The file to edit is **`components/Modal.jsx`**. The dev menu / tests mount
> the whole app.

## Folder

```
m03-modal/
  App.jsx                    app root (navbar + routes)
  index.jsx                  entry (re-exports App)
  components/
    Navbar.jsx  Footer.jsx
    Modal.jsx                👈 THE FEATURE
  pages/    Home.jsx  Albums.jsx
  data/photos.js             local photo dataset
  styles.css
```

## Requirements

- `data-testid="open-btn"` opens the modal.
- Open state renders a `data-testid="backdrop"` wrapping a `data-testid="modal"`.
- Close on: `data-testid="close-btn"`, a backdrop click, and Escape.
- A click INSIDE the modal content must NOT close it (stop propagation).

## Run

```
npx vitest run src/modules/m03-modal/
```
