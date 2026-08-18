import { Link } from "react-router-dom";

const ALBUMS = [
  { id: "a1", name: "Travel", count: 24 },
  { id: "a2", name: "Food", count: 12 },
  { id: "a3", name: "Pets", count: 8 },
];

export default function Albums() {
  return (
    <section className="ig-page" data-testid="albums-page">
      <Link to="/" className="ig-back" data-testid="back-home">
        ← Back to gallery
      </Link>
      <h1 className="ig-page-title">Albums</h1>
      <p className="ig-page-sub">{ALBUMS.length} albums</p>
      <ul className="ig-albums">
        {ALBUMS.map((a) => (
          <li key={a.id}>
            <strong>{a.name}</strong> — {a.count} photos
          </li>
        ))}
      </ul>
    </section>
  );
}
