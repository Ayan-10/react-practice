import { Link } from "react-router-dom";

export default function HouseCard({ house }) {
  return (
    <Link to={`/house/${house.id}`} className="house-card" data-testid="house-card">
      <img src={house.image} alt={house.title} className="house-card-img" />
      <div className="house-card-body">
        <h3 className="house-card-title">{house.title}</h3>
        <p className="house-card-address">{house.address}</p>
        <div className="house-card-meta">
          <span>${house.price}/night</span>
          <span>{"★".repeat(house.rating)}</span>
        </div>
        <div className="house-card-specs">
          {house.beds} bd · {house.baths} ba
        </div>
      </div>
    </Link>
  );
}
