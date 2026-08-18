import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="pf-card"
      data-testid="product-card"
    >
      <img src={product.image} alt={product.name} className="pf-card-img" />
      <div className="pf-card-body">
        <h3 className="pf-card-title">{product.name}</h3>
        <p className="pf-card-cat">{product.category}</p>
        <div className="pf-card-meta">
          <span>${product.price}</span>
          <span>{"★".repeat(product.rating)}</span>
        </div>
      </div>
    </Link>
  );
}
