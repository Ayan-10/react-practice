import { useState } from "react";
import StarRating from "../components/StarRating.tsx";

export default function Home() {
  const [rating, setRating] = useState<number>(0);

  return (
    <section className="rw-page" data-testid="home-page">
      <h1 className="rw-page-title">Rate your experience</h1>
      <p className="rw-page-sub">Tap a star to leave a rating</p>
      {/* The feature under construction lives here. */}
      <StarRating value={rating} onChange={setRating} />
    </section>
  );
}
