export default function CityCard({ city }) {
  return (
    <article className="ce-card" data-testid={`city-card-${city.id}`}>
      <h3 className="ce-card-name">{city.name}</h3>
      <p className="ce-card-desc">{city.description}</p>
    </article>
  );
}
