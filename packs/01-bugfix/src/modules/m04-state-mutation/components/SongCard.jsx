import { Link } from "react-router-dom";

export default function SongCard({ song, onAdd }) {
  return (
    <div className="pl-song-card" data-testid="song-card">
      <Link to={`/song/${song.id}`} className="pl-song-cover-link">
        <img src={song.cover} alt={song.title} className="pl-song-cover" />
      </Link>
      <div className="pl-song-body">
        <Link to={`/song/${song.id}`} className="pl-song-title-link">
          <h3 className="pl-song-title">{song.title}</h3>
        </Link>
        <p className="pl-song-artist">{song.artist}</p>
        <div className="pl-song-meta">
          <span>{song.album}</span>
          <span>{song.duration}</span>
        </div>
        <button
          type="button"
          className="pl-btn pl-add-btn"
          data-testid={`add-${song.id}`}
          onClick={() => onAdd(song)}
        >
          + Add
        </button>
      </div>
    </div>
  );
}
