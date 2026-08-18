import { Link } from "react-router-dom";
import { GIFS } from "../data/gifs.js";
import GifCard from "../components/GifCard.jsx";

const TRENDING = GIFS.slice(0, 4);

export default function Trending() {
  return (
    <section className="gs-trending" data-testid="trending-page">
      <h1 className="gs-trending-heading">Trending GIFs</h1>
      <div className="gs-trending-grid">
        {TRENDING.map((gif) => (
          <GifCard key={gif.id} gif={gif} />
        ))}
      </div>
      <Link className="gs-back-link" data-testid="back-home" to="/">
        &larr; Back to search
      </Link>
    </section>
  );
}
