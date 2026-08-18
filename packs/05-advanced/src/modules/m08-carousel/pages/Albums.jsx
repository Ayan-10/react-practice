import { Link } from "react-router-dom";
import { ALBUMS } from "../data/slides.js";

// A second real route so navigation works — the user's photo albums.
export default function Albums() {
  return (
    <section className="cg-page" data-testid="albums-page">
      <Link to="/" className="cg-back" data-testid="back-home">
        ← Back to gallery
      </Link>
      <h1 className="cg-page-title">Albums</h1>
      <p className="cg-page-sub">{ALBUMS.length} albums</p>
      <ul className="cg-album-list">
        {ALBUMS.map((a) => (
          <li key={a.id} className="cg-album-item">
            <span>{a.name}</span>
            <span>{a.count} photos</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
