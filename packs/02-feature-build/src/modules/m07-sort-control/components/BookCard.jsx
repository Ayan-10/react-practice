// Presentational card for a single book. Used by the Bestsellers page.
export default function BookCard({ book }) {
  return (
    <div className="bs-card" data-testid="book-card">
      <img className="bs-card-img" src={book.cover} alt={book.title} />
      <div className="bs-card-body">
        <h3 className="bs-card-title" data-testid="book-card-title">
          {book.title}
        </h3>
        <p className="bs-card-author">{book.author}</p>
        <div className="bs-card-meta">
          <span>${book.price}</span>
          <span>⭐{book.rating}</span>
        </div>
      </div>
    </div>
  );
}
