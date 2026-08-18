import { useEffect, useState } from "react";
import { loadPhotos } from "../data/photos.js";

const PAGE_SIZE = 2;

/**
 * FEATURE — m05 PhotoWall infinite scroll. Read PROMPT.md.
 *
 * `load({ limit, skip })` resolves { products, total }. Append the next batch
 * (skip = items.length) on "Load more"; when everything is loaded, hide the
 * button and show the `end` marker.
 */
export default function PhotoGrid({ load = loadPhotos }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  // TODO: load the first batch on mount via a loadBatch(0) call in useEffect.
  // TODO: implement loadBatch(skip) that awaits load({ limit: PAGE_SIZE, skip })
  //       then APPENDS data.products to items and sets total.

  const hasMore = total === 0 ? false : items.length < total;

  return (
    <div className="pw-grid-wrap">
      <h2 className="pw-grid-title">Photos</h2>
      <div data-testid="product-list" className="pw-grid">
        {items.map((p) => (
          <div key={p.id} className="pw-tile" data-testid="product-item">
            {p.title}
          </div>
        ))}
      </div>

      {/* TODO: render load-more (onClick loadBatch(items.length)) while hasMore,
          else render <p data-testid="end">No more</p>. */}
      <button data-testid="load-more" className="pw-load-more">
        Load more
      </button>
    </div>
  );
}
