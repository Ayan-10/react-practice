import RetryList from "../components/RetryList.jsx";
import { COINS } from "../data/coins.js";

export default function Home() {
  return (
    <section className="ct-page" data-testid="home-page">
      <h1 className="ct-page-title">Live market</h1>
      <p className="ct-page-sub">{COINS.length} coins tracked</p>
      {/* The feature under construction lives here (uses its default loader). */}
      <RetryList />
    </section>
  );
}
