// Local dataset for the SearchResults mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
// A handful of "saved" search results shown on the second route.

export const SAVED_RESULTS = [
  { id: "r1", title: "How to center a div", site: "cssguide.dev" },
  { id: "r2", title: "React useEffect cleanup", site: "reactdocs.io" },
  { id: "r3", title: "Debounce vs throttle", site: "jsweekly.com" },
  { id: "r4", title: "Big-O cheat sheet", site: "algos.wiki" },
];
