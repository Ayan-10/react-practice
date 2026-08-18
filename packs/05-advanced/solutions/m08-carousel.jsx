// SOLUTION — m08 SnapGallery carousel with wrap-around.
// Copy this over components/Carousel.jsx to self-check.
import { useState } from "react";
import { SLIDES } from "../data/slides.js";

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const slides = SLIDES;
  const n = slides.length;
  const current = slides[index];

  const prev = () => setIndex((i) => (i - 1 + n) % n);
  const next = () => setIndex((i) => (i + 1) % n);
  const goTo = (i) => setIndex(((i % n) + n) % n);

  return (
    <div className="cg-carousel">
      <div className="cg-stage">
        <button
          className="cg-arrow"
          data-testid="prev-btn"
          onClick={prev}
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div
          className="cg-slide"
          data-testid="slide"
          style={{ background: current.color }}
        >
          {current.label}
        </div>

        <button
          className="cg-arrow"
          data-testid="next-btn"
          onClick={next}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <p className="cg-index" data-testid="slide-index">
        {index + 1} / {slides.length}
      </p>

      <div className="cg-dots" role="tablist" aria-label="Choose slide">
        {slides.map((s, i) => (
          <button
            key={s.id}
            className={"cg-dot" + (i === index ? " is-active" : "")}
            data-testid={`dot-${i}`}
            aria-current={i === index ? "true" : undefined}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
