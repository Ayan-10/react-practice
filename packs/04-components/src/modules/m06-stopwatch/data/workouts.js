// Local dataset for the GymTimer mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   w1 Warm-up jog       — 5 min
//   w2 Squats            — 3 min
//   w3 Plank hold        — 2 min
//   w4 Cool-down stretch — 4 min

export const WORKOUTS = [
  { id: "w1", name: "Warm-up jog", minutes: 5 },
  { id: "w2", name: "Squats", minutes: 3 },
  { id: "w3", name: "Plank hold", minutes: 2 },
  { id: "w4", name: "Cool-down stretch", minutes: 4 },
];
