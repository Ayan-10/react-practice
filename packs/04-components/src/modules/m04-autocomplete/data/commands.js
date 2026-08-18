// Local dataset + default async loader for the CommandPalette mini-app.
// Works fully offline. Injectable in tests via the getSuggestions prop.

export const COMMANDS = [
  "Open File",
  "Open Folder",
  "Close Window",
  "Copy Line",
  "Comment Selection",
  "Format Document",
  "Find In Files",
  "Go To Definition",
];

/**
 * Default async suggestion loader: resolves to commands whose name contains
 * the query (case-insensitive). Async so the autocomplete's fetch flow is
 * exercised.
 */
export async function loadCommands(q) {
  const s = q.toLowerCase();
  return COMMANDS.filter((c) => c.toLowerCase().includes(s));
}
