import Tabs from "../components/Tabs.tsx";
import { DEFAULT_TABS } from "../data/tabs.ts";

export default function Home() {
  return (
    <section className="se-page" data-testid="home-page">
      <h1 className="se-page-title">Settings</h1>
      <p className="se-page-sub">{DEFAULT_TABS.length} sections</p>
      {/* The feature under construction lives here (uses its default tabs). */}
      <Tabs />
    </section>
  );
}
