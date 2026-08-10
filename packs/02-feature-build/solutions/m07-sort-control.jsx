// SOLUTION — m07 Sort control.
import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

const PRODUCTS = fallbackProducts;

export default function SortControl() {
  const [products] = useState(PRODUCTS);
  const [sort, setSort] = useState("price-asc");

  const sorted = [...products].sort((a, b) => {
    switch (sort) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "rating-desc": return b.rating - a.rating;
      case "title-asc": return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  return (
    <div>
      <h2>Products</h2>
      <select data-testid="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="price-asc">Price ↑</option>
        <option value="price-desc">Price ↓</option>
        <option value="rating-desc">Rating ↓</option>
        <option value="title-asc">Title A→Z</option>
      </select>
      <ul>
        {sorted.map((p) => (
          <li key={p.id} data-testid="product-item">
            <span data-testid="product-title">{p.title}</span> — ${p.price} — ⭐{p.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}
