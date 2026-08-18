import CurrencyConverter from "../components/CurrencyConverter.jsx";
import { CURRENCIES } from "../data/currencies.js";

export default function Home() {
  return (
    <section className="tw-page" data-testid="home-page">
      <h1 className="tw-page-title">Convert your money</h1>
      <p className="tw-page-sub">{CURRENCIES.length} currencies supported</p>
      {/* The feature under construction lives here. */}
      <CurrencyConverter />
    </section>
  );
}
