// Local dataset for the HookBox mini-app. Works fully offline.
// A fixed localStorage key + a couple of copy strings used by the demo.

export const LS_KEY = "hookbox:note";

// Items shown on the second (About) route.
export const HOOKS = [
  { id: "k1", name: "useToggle", blurb: "Boolean state with a flip helper." },
  { id: "k2", name: "usePrevious", blurb: "The value from the previous render." },
  { id: "k3", name: "useDebounce", blurb: "A value that settles after a delay." },
  { id: "k4", name: "useLocalStorage", blurb: "State mirrored to localStorage." },
];
