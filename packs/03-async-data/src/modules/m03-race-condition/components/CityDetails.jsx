import { useEffect, useState } from "react";
import { loadCity } from "../data/cities.js";

/**
 * FEATURE — CityExplorer race condition (STUB, buggy on purpose).
 *
 * Clicking select-1 / select-2 changes the selected city id. An effect calls
 * load(id) and renders the result in data-testid="detail".
 *
 * BUG: the effect applies the load result UNCONDITIONALLY, so a slow earlier
 * request can overwrite a fast later one. Fix = ignore stale responses via an
 * `active` cleanup flag. See PROMPT.md.
 */
export default function CityDetails({ load = loadCity }) {
  const [id, setId] = useState(1);
  const [detail, setDetail] = useState("");

  useEffect(() => {
    let active = true;
    load(id).then((value) => {
      if (active) setDetail(value);
    });
    return () => {
      active = false;
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
