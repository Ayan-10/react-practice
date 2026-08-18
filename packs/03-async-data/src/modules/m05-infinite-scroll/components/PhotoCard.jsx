export default function PhotoCard({ photo }) {
  return (
    <figure className="pw-card" data-testid="photo-card">
      <div className="pw-card-thumb" aria-hidden="true" />
      <figcaption className="pw-card-title">{photo.title}</figcaption>
    </figure>
  );
}
