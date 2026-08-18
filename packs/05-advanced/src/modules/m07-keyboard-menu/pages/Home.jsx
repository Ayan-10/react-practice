import Menu from "../components/Menu.jsx";

export default function Home() {
  return (
    <section className="km-page" data-testid="home-page">
      <h1 className="km-page-title">Command palette</h1>
      <p className="km-page-sub">
        Open the menu and navigate the options with your keyboard.
      </p>
      <Menu />
    </section>
  );
}
