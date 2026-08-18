// Presentational card for a single country. Kept dumb on purpose.
export default function CountryCard({ country }) {
  return (
    <div className="cs-card" data-testid="country-card">
      <h3 className="cs-card-title" data-testid="country-name">
        {country.name}
      </h3>
      <p className="cs-card-capital">{country.capital}</p>
      <div className="cs-card-meta">
        <span>{country.population.toLocaleString()} people</span>
      </div>
    </div>
  );
}
