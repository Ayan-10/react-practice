// Local dataset for the QuickCmd mini-app. Works fully offline.
// The keyboard-navigable menu lists these commands.

export const COMMANDS = [
  { id: "c1", label: "New File" },
  { id: "c2", label: "Open Folder" },
  { id: "c3", label: "Save All" },
  { id: "c4", label: "Toggle Terminal" },
  { id: "c5", label: "Find in Files" },
];

// Shown on the second route — the raw keyboard shortcuts cheat-sheet.
export const SHORTCUTS = [
  { keys: "↑ / ↓", action: "Move between options" },
  { keys: "Home / End", action: "Jump to first / last option" },
  { keys: "Enter", action: "Select the active option" },
  { keys: "Escape", action: "Close the menu" },
];
