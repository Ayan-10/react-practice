import Cart from "../components/Cart.jsx";

export default function Home() {
  return (
    <section className="bb-page" data-testid="home-page">
      <h1 className="bb-page-title">Shop</h1>
      <p className="bb-page-sub">Add items and manage quantities in your cart.</p>
      <Cart />
    </section>
  );
}
