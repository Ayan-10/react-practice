import PlaylistPanel from "../components/PlaylistPanel.jsx";
import { SONGS } from "../data/songs.js";

export default function Home({ playlist, setPlaylist }) {
  return (
    <section className="pl-page" data-testid="home-page">
      <h1 className="pl-page-title">Build your playlist</h1>
      <p className="pl-page-sub">{SONGS.length} songs in the library</p>
      <PlaylistPanel playlist={playlist} setPlaylist={setPlaylist} />
    </section>
  );
}
