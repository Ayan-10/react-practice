import { Link } from "react-router-dom";
import { LIBRARY } from "../data/books.js";

// A second real route so navigation works and proves this is a full mini-app.
export default function Library() {
  return (
    <section className="ra-page" data-testid="library-page">
      <Link to="/" className="ra-back" data-testid="back-home">
        ← Back to home
      </Link>
      <h1 className="ra-page-title">Your library</h1>
      <p className="ra-page-sub">{LIBRARY.length} books</p>
      <ul className="ra-book-list">
        {LIBRARY.map((book) => (
          <li key={book.id} className="ra-book" data-testid="book-item">
            <span className="ra-book-title">{book.title}</span>
            <span className="ra-book-author">{book.author}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
