import Carousel from "../components/Carousel.jsx";

export default function Home() {
  return (
    <section className="cg-page" data-testid="home-page">
      <h1 className="cg-page-title">Featured</h1>
      <p className="cg-page-sub">Swipe through the highlights with the arrows or dots.</p>
      <Carousel />
    </section>
  );
}
