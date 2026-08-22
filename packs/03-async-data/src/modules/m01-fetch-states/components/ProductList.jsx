// TODO: implement fetch states (loading / error / empty / data) — see PROMPT.md
import { loadSneakers } from "../data/sneakers.js";

/**
 * THE FEATURE TO BUILD — m01 SneakerShop fetch states.
 *
 * `load` returns a promise resolving to { products, total }. It is injected as a
 * prop so tests can supply deterministic mocks; it defaults to the local
 * offline loader.
 *
 * TODO: track loading + error state.
 * TODO: call load() on mount; on success store products, on failure set error;
 *       always stop loading when done. Use an `active` cleanup flag.
 * TODO: render exactly ONE of loading / error / empty / product-list.
 */
export default function ProductList({ load = loadSneakers }) {
  // TODO: implement the fetch-states behavior described in PROMPT.md.
  return (
    <div className="ss-listing">
      <h2 className="ss-feature-title">Sneakers</h2>
      <p>Nothing yet.</p>
    </div>
  );
}
