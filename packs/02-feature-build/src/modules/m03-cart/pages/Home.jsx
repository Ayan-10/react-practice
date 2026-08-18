import CartManager from "../components/CartManager.jsx";
import { PRODUCTS } from "../data/products.js";

export default function Home() {
  return (
    <section className="gc-page" data-testid="home-page">
      <h1 className="gc-page-title">Your grocery run</h1>
      <p className="gc-page-sub">{PRODUCTS.length} fresh items in stock</p>
      {/* The feature under construction lives here. */}
      <CartManager />
    </section>
  );
}
