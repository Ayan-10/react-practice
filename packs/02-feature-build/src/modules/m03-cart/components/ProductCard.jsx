// Presentational card for a single product. Kept dumb on purpose so the
// feature file (CartManager.jsx) only worries about cart state + totals.
export default function ProductCard({ product, onAdd }) {
  return (
    <div className="gc-card" data-testid="product-card">
      <img src={product.image} alt={product.title} className="gc-card-img" />
      <div className="gc-card-body">
        <h3 className="gc-card-title">{product.title}</h3>
        <div className="gc-card-meta">
          <span className="gc-price">${product.price.toFixed(2)}</span>
          <span className="gc-unit">/{product.unit}</span>
        </div>
        <button
          className="gc-add-btn"
          data-testid={`add-${product.id}`}
          onClick={() => onAdd(product)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
