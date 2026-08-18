// Local dataset for the FocusTimer mini-app. Works fully offline.
// In a real app you'd persist these; here they're local so the app always
// renders a believable history.

export const PRESETS = [
  { id: "p1", label: "Pomodoro", minutes: 25 },
  { id: "p2", label: "Short break", minutes: 5 },
  { id: "p3", label: "Deep work", minutes: 50 },
  { id: "p4", label: "Long break", minutes: 15 },
];

export const SESSIONS = [
  { id: "s1", task: "Write project proposal", minutes: 25, date: "2026-08-08", tag: "Writing" },
  { id: "s2", task: "Review pull requests", minutes: 15, date: "2026-08-08", tag: "Code" },
  { id: "s3", task: "Read research paper", minutes: 50, date: "2026-08-09", tag: "Reading" },
  { id: "s4", task: "Refactor auth module", minutes: 25, date: "2026-08-09", tag: "Code" },
  { id: "s5", task: "Plan sprint backlog", minutes: 25, date: "2026-08-10", tag: "Planning" },
  { id: "s6", task: "Design timer UI", minutes: 50, date: "2026-08-10", tag: "Design" },
];

/**
 * Total focused minutes across all recorded sessions. Kept as a tiny helper so
 * the History page has some derived stat to show (all local, offline).
 */
export function totalMinutes(sessions = SESSIONS) {
  return sessions.reduce((sum, s) => sum + s.minutes, 0);
}
