// SOLUTION — m05 PhotoWall infinite scroll.
// Copy this over components/PhotoGrid.jsx to self-check.
import { useEffect, useState } from "react";
import { loadPhotos } from "../data/photos.js";

const PAGE_SIZE = 2;

export default function PhotoGrid({ load = loadPhotos }) {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  async function loadBatch(skip) {
    const data = await load({ limit: PAGE_SIZE, skip });
    setItems((prev) => [...prev, ...data.products]);
    setTotal(data.total);
  }

  useEffect(() => {
    loadBatch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [load]);

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

      {hasMore ? (
        <button
          data-testid="load-more"
          className="pw-load-more"
          onClick={() => loadBatch(items.length)}
        >
          Load more
        </button>
      ) : (
        <p data-testid="end">No more</p>
      )}
    </div>
  );
}
