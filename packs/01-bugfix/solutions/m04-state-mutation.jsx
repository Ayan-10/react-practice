// SOLUTION — m04 PlaylistBuilder PlaylistPanel immutable updates.
// This is the FIXED version of components/PlaylistPanel.jsx. Attempt it yourself
// first, then compare. To self-check: copy this over components/PlaylistPanel.jsx.
import SongCard from "./SongCard.jsx";
import { SONGS } from "../data/songs.js";

export default function PlaylistPanel({ playlist, setPlaylist }) {
  function addSong(song) {
    // FIX: build a NEW array so React sees a changed reference and re-renders.
    setPlaylist((prev) => [...prev, song]);
  }

  function removeSong(index) {
    // FIX: filter returns a NEW array; never mutate the existing one.
    setPlaylist((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div className="pl-columns">
      <section className="pl-library">
        <h2 className="pl-section-title">Library</h2>
        <div className="pl-library-grid" data-testid="library-grid">
          {SONGS.map((song) => (
            <SongCard key={song.id} song={song} onAdd={addSong} />
          ))}
        </div>
      </section>

      <aside className="pl-panel">
        <h2 className="pl-section-title">
          Your Playlist{" "}
          <span className="pl-count" data-testid="playlist-count">
            {playlist.length}
          </span>
        </h2>
        <ul className="pl-playlist" data-testid="playlist">
          {playlist.length === 0 ? (
            <li className="pl-empty" data-testid="playlist-empty">
              No songs yet — add some from the library.
            </li>
          ) : (
            playlist.map((song, i) => (
              <li
                className="pl-playlist-item"
                data-testid="playlist-item"
                key={song.id + "-" + i}
              >
                <span className="pl-playlist-title">{song.title}</span>
                <span className="pl-playlist-artist">{song.artist}</span>
                <button
                  type="button"
                  className="pl-remove-btn"
                  data-testid={`remove-${song.id}`}
                  onClick={() => removeSong(i)}
                >
                  ×
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  );
}
