import SongCard from "./SongCard.jsx";
import { SONGS } from "../data/songs.js";

/**
 * 🐞 THIS IS THE FILE YOU NEED TO FIX.
 *
 * The PlaylistBuilder shows a library of songs (left) and your live playlist
 * (right). Clicking "+ Add" on a song should append it to the playlist and the
 * count in the navbar should go up. Clicking "×" should remove it.
 *
 * BUG: the add/remove handlers MUTATE the existing `playlist` array in place
 * (`.push`, `.splice`) and then hand the SAME array reference back to
 * `setPlaylist`. Because the reference never changes, React bails out of the
 * re-render and the UI never updates — songs seem to vanish.
 *
 * Everything else in this project already works — only edit this component.
 *
 * DO NOT change or remove any existing data-testid attributes:
 *   library-grid, playlist, playlist-item, playlist-count,
 *   add-<songId> (in SongCard), remove-<songId>
 */
export default function PlaylistPanel({ playlist, setPlaylist }) {
  function addSong(song) {
    setPlaylist((prev) => [...prev, song]);
  }

  function removeSong(index) {
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
