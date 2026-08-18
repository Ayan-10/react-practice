// Local dataset for the HelpHint mini-app. Works fully offline.
// Trigger + tooltip copy used on the Home page.

export const HINTS = [
  { id: "h1", trigger: "Username", label: "Your public handle, 3–20 characters." },
  { id: "h2", trigger: "API key", label: "Found under Settings → Developer." },
  { id: "h3", trigger: "Webhook", label: "We POST events here in real time." },
];

// Items shown on the second (Docs) route.
export const DOCS = [
  { id: "d1", title: "Getting started", mins: 5 },
  { id: "d2", title: "Authentication", mins: 8 },
  { id: "d3", title: "Rate limits", mins: 3 },
];
