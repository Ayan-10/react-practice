// SOLUTION — m03 Race condition.
import { useEffect, useState } from "react";

export default function RaceDetails({ load }) {
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
    <div>
      <h2>Details</h2>
      <button data-testid="select-1" onClick={() => setId(1)}>Item 1</button>
      <button data-testid="select-2" onClick={() => setId(2)}>Item 2</button>
      <p data-testid="detail">{detail}</p>
    </div>
  );
}
