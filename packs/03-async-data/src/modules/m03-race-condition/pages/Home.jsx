import CityDetails from "../components/CityDetails.jsx";

export default function Home() {
  return (
    <div className="ce-home" data-testid="home-page">
      <h1 className="ce-home-title">Explore Cities</h1>
      <p className="ce-home-lead">Pick a city to load its details.</p>
      <CityDetails />
    </div>
  );
}
