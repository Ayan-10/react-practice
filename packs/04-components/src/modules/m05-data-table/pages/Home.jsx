import DataTable from "../components/DataTable.jsx";

export default function Home() {
  return (
    <section className="st-page" data-testid="home-page">
      <h1 className="st-page-title">Sales</h1>
      <p className="st-page-sub">Filter and sort the product sales.</p>
      <DataTable />
    </section>
  );
}
