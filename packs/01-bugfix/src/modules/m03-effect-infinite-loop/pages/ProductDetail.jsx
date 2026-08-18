import { useParams, Link } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";

// A second route so navigation is real. Shows one product's details.
export default function ProductDetail() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="pf-page" data-testid="product-page">
        <p>Product not found.</p>
        <Link to="/">← Back to catalog</Link>
      </section>
    );
  }

  return (
    <section className="pf-page" data-testid="product-page">
      <Link to="/" className="pf-back">← Back to catalog</Link>
      <img src={product.image} alt={product.name} className="pf-detail-img" />
      <h1 className="pf-page-title">{product.name}</h1>
      <p className="pf-page-sub">{product.category}</p>
      <div className="pf-detail-meta">
        <span>${product.price}</span>
        <span>{"★".repeat(product.rating)}</span>
      </div>
    </section>
  );
}
