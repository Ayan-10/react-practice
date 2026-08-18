import ExpenseList from "../components/ExpenseList.jsx";

export default function Home() {
  return (
    <section className="et-page" data-testid="home-page">
      <h1 className="et-page-title">Expenses</h1>
      <p className="et-page-sub">Filter by category, add new expenses, track the total.</p>
      <ExpenseList />
    </section>
  );
}
