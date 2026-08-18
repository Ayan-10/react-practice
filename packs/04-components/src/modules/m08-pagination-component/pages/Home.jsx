import PaginationDemo from "../components/Pagination.jsx";

export default function Home() {
  return (
    <section className="sr-page" data-testid="home-page">
      <h1 className="sr-page-title">Search results</h1>
      <p className="sr-page-sub">Browse pages with the pager below.</p>
      <PaginationDemo />
    </section>
  );
}
