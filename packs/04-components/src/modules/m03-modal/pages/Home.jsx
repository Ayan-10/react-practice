import Modal from "../components/Modal.jsx";
import { PHOTOS } from "../data/photos.js";

export default function Home() {
  return (
    <section className="ig-page" data-testid="home-page">
      <h1 className="ig-page-title">Gallery</h1>
      <p className="ig-page-sub">{PHOTOS.length} photos</p>
      <div className="ig-thumbs">
        {PHOTOS.map((p) => (
          <div key={p.id} className="ig-thumb" data-testid={`thumb-${p.id}`}>
            {p.label}
          </div>
        ))}
      </div>
      <Modal />
    </section>
  );
}
