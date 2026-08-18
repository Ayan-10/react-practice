import { Link } from "react-router-dom";
import BookCard from "../components/BookCard.jsx";
import { BOOKS } from "../data/books.js";

// A second real route so navigation works. (Pretend these are our top picks.)
// Proves the app is a full mini-app, not a single screen.
const BESTSELLERS = [...BOOKS]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 2);

export default function Bestsellers() {
  return (
    <section className="bs-page" data-testid="bestsellers-page">
      <Link to="/" className="bs-back" data-testid="back-catalog">
        ← Back to catalog
      </Link>
      <h1 className="bs-page-title">Bestsellers</h1>
      <p className="bs-page-sub">{BESTSELLERS.length} top picks</p>
      <div className="bs-grid">
        {BESTSELLERS.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
