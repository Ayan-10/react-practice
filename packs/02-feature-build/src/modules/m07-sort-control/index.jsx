import { useState } from "react";
import { fallbackProducts } from "../../shared/api.js";

/**
 * FEATURE MODULE m07 — Sort control.
 *
 * Render products and a sort dropdown. Sorting options:
 *   - "price-asc"  : price ascending
 *   - "price-desc" : price descending
 *   - "rating-desc": rating descending
 *   - "title-asc"  : title A→Z
 *
 * The list must reorder when the sort option changes. Don't mutate the source.
 *
 * Required data-testids:
 *   - sort-select
 *   - product-item (each row, in DOM order matching the sort)
 *   - product-title (title text within each row)
 */
const PRODUCTS = fallbackProducts;

export default function SortControl() {
  const [products] = useState(PRODUCTS);
  const [sort, setSort] = useState("price-asc");

  // TODO: derive `sorted` from products + sort (copy before sorting!)
  const sorted = products; // replace

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
