import ProductList from "../components/ProductList.jsx";
import { SNEAKERS } from "../data/sneakers.js";

export default function Home() {
  return (
    <section className="ss-page" data-testid="home-page">
      <h1 className="ss-page-title">Shop sneakers</h1>
      <p className="ss-page-sub">{SNEAKERS.length} styles available</p>
      {/* The feature under construction lives here (uses its default loader). */}
      <ProductList />
    </section>
  );
}
