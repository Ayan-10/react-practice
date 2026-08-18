import { useState } from "react";
import { BOOKS } from "../data/books.js";

/**
 * FEATURE TO BUILD — the sort control.
 *
 * Render the book catalog and a <select> that reorders it. Options:
 *   - "price-asc"   : price ascending  (this is the DEFAULT)
 *   - "price-desc"  : price descending
 *   - "rating-desc" : rating descending
 *   - "title-asc"   : title A→Z (localeCompare)
 *
 * The list must reorder when the sort option changes. NEVER mutate BOOKS —
 * copy before sorting (e.g. `[...books].sort(...)`).
 *
 * Required data-testids (do not change): sort-select, book-item, book-title.
 */
export default function BookList() {
  const [books] = useState(BOOKS);
  const [sort, setSort] = useState("price-asc");

  const sorted = [...books].sort((a, b) => {
    switch (sort) {
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      case "title-asc":
        return a.title.localeCompare(b.title);
      case "price-asc":
      default:
        return a.price - b.price;
    }
  });

  return (
    <div className="bs-feature">
      <h2 className="bs-feature-title">Catalog</h2>

      <label className="bs-sort-label">
        Sort by:{" "}
        <select
          className="bs-sort-select"
          data-testid="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
          <option value="rating-desc">Rating ↓</option>
          <option value="title-asc">Title A→Z</option>
        </select>
      </label>

      <ul className="bs-book-list" data-testid="book-list">
        {sorted.map((b) => (
          <li key={b.id} className="bs-book-item" data-testid="book-item">
            <img className="bs-book-cover" src={b.cover} alt={b.title} />
            <div className="bs-book-info">
              <span className="bs-book-title" data-testid="book-title">
                {b.title}
              </span>
              <span className="bs-book-author">{b.author}</span>
              <span className="bs-book-meta">
                ${b.price} · ⭐{b.rating}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
