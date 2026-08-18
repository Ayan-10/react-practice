import BookList from "../components/BookList.jsx";
import { BOOKS } from "../data/books.js";

export default function Home() {
  return (
    <section className="bs-page" data-testid="home-page">
      <h1 className="bs-page-title">Browse the catalog</h1>
      <p className="bs-page-sub">{BOOKS.length} books available</p>
      {/* The feature under construction lives here. */}
      <BookList />
    </section>
  );
}
