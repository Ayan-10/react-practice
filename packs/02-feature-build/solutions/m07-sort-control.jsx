// SOLUTION — m07 BookStore sort control. Copy over components/BookList.jsx to self-check.
//
// (Paths are relative to components/, i.e. where this file is copied to.)
import { useState } from "react";
import { BOOKS } from "../data/books.js";

export default function BookList() {
  const [books] = useState(BOOKS);
  const [sort, setSort] = useState("price-asc");

  // Copy before sorting so the source array is never mutated.
  const sorted = [...books].sort((a, b) => {
    switch (sort) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating-desc":
        return b.rating - a.rating;
      case "title-asc":
        return a.title.localeCompare(b.title);
      default:
        return 0;
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
