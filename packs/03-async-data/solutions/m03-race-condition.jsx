// SOLUTION — m03 CityExplorer race condition. Copy over components/CityDetails.jsx to self-check.
import { useEffect, useState } from "react";
import { loadCity } from "../data/cities.js";

export default function CityDetails({ load = loadCity }) {
  const [id, setId] = useState(1);
  const [detail, setDetail] = useState("");

  useEffect(() => {
    let active = true; // only the latest effect run stays "active"
    load(id).then((value) => {
      if (active) setDetail(value);
    });
    return () => {
      active = false; // stale run is neutralized on id change / unmount
    };
  }, [id, load]);

  return (
    <section className="ce-details">
      <h2 className="ce-details-title">City Details</h2>
      <div className="ce-details-controls">
        <button className="ce-btn" data-testid="select-1" onClick={() => setId(1)}>
          Paris
        </button>
        <button className="ce-btn" data-testid="select-2" onClick={() => setId(2)}>
          Tokyo
        </button>
      </div>
      <p className="ce-details-body" data-testid="detail">{detail}</p>
    </section>
  );
}
