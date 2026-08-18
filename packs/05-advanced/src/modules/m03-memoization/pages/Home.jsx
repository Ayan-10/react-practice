import PrimeList from "../components/PrimeList.jsx";

export default function Home() {
  return (
    <section className="ml-page" data-testid="home-page">
      <h1 className="ml-page-title">Prime Lab</h1>
      <p className="ml-page-sub">
        Count primes up to N — and prove memoization stops needless recompute.
      </p>
      <PrimeList />
    </section>
  );
}
