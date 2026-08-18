import { useParams, Link } from "react-router-dom";
import { getSongById } from "../data/songs.js";

export default function SongDetail() {
  const { id } = useParams();
  const song = getSongById(id);

  if (!song) {
    return (
      <section className="pl-page" data-testid="song-page">
        <p>Song not found.</p>
        <Link to="/">← Back to library</Link>
      </section>
    );
  }

  return (
    <section className="pl-page" data-testid="song-page">
      <Link to="/" className="pl-back">← Back to library</Link>
      <img src={song.cover} alt={song.title} className="pl-detail-cover" />
      <h1 className="pl-page-title">{song.title}</h1>
      <p className="pl-page-sub">{song.artist}</p>
      <div className="pl-detail-meta">
        <span>{song.album}</span>
        <span>{song.duration}</span>
      </div>
    </section>
  );
}
