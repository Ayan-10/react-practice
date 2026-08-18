import { useState } from "react";
import ProductFilters from "../components/ProductFilters.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";

export default function Home() {
  // The filters panel reports its filtered result set up here; the grid renders
  // whatever the current filters produce. Starts as the full catalog.
  const [visible, setVisible] = useState(PRODUCTS);

  return (
    <section className="pf-page" data-testid="home-page">
      <h1 className="pf-page-title">Catalog</h1>
      <p className="pf-page-sub">{PRODUCTS.length} products in stock</p>

      <ProductFilters onFiltersChange={setVisible} />

      <div className="pf-grid">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
