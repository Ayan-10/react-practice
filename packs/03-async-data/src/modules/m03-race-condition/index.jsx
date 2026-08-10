import { useEffect, useState } from "react";

/**
 * MODULE m03 — Race condition. Read PROMPT.md.
 *
 * BUG: the fetch result is applied unconditionally, so a slow earlier request
 * can overwrite a fast later one. Ignore stale responses.
 */
export default function RaceDetails({ load }) {
  const [id, setId] = useState(1);
  const [detail, setDetail] = useState("");

  useEffect(() => {
    // BUG: no guard against stale responses.
    load(id).then((value) => {
      setDetail(value);
    });
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
