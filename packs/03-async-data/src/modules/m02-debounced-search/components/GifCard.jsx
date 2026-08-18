export default function GifCard({ gif }) {
  return (
    <div className="gs-card" data-testid="gif-card">
      <div className="gs-card-thumb" aria-hidden="true" />
      <div className="gs-card-title">{gif.title}</div>
    </div>
  );
}
