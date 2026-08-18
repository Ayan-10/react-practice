import { useState } from "react";
import { SLIDES } from "../data/slides.js";

/**
 * THE FEATURE TO BUILD — m08 SnapGallery carousel with wrap-around.
 *
 * Build an image/slide carousel driven by an `index` piece of state:
 *   - Show the current slide's label in data-testid="slide".
 *   - Show progress "N / total" in data-testid="slide-index" (1-based).
 *   - prev-btn / next-btn move backward / forward with WRAP-AROUND:
 *       next at the last slide → wraps to index 0
 *       prev at the first slide → wraps to the last slide
 *   - One dot button per slide: data-testid="dot-<i>" (0-based). Clicking a dot
 *     jumps directly to that slide. The active dot has aria-current="true".
 *
 * The slides come from ../data/slides.js (an array). Keep it deterministic —
 * no autoplay in the core (if you add autoplay, gate it behind a prop that
 * defaults to off).
 *
 * REQUIRED data-testids:
 *   - slide          (the current slide's label text)
 *   - slide-index    (e.g. "1 / 5")
 *   - prev-btn / next-btn
 *   - dot-<i>        (one per slide, 0-based; active dot aria-current="true")
 */
export default function Carousel() {
  const [index, setIndex] = useState(0);
  const slides = SLIDES;
  const current = slides[index];

  // TODO: implement prev/next (with wrap-around) and dot navigation.
  const prev = () => {
    // TODO: go to previous slide, wrapping from first to last.
  };
  const next = () => {
    // TODO: go to next slide, wrapping from last to first.
  };
  const goTo = (i) => {
    // TODO: jump to slide i.
  };

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
