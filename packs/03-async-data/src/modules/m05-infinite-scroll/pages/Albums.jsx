import { Link } from "react-router-dom";
import PhotoCard from "../components/PhotoCard.jsx";
import { PHOTOS } from "../data/photos.js";

export default function Albums() {
  const featured = PHOTOS.slice(0, 4);
  return (
    <section className="pw-albums" data-testid="albums-page">
      <header className="pw-albums-head">
        <h1 className="pw-albums-title">Albums</h1>
        <Link className="pw-back-link" data-testid="back-link" to="/">
          ← Back to wall
        </Link>
      </header>
      <div className="pw-album-grid">
        {featured.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    </section>
  );
}
