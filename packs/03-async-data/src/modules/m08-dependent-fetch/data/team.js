// Local dataset for the TeamDirectory mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   u1 Ada Lovelace   — Engineering
//   u2 Alan Turing    — Research
//   u3 Grace Hopper   — Platform

export const MEMBERS = [
  { id: "u1", name: "Ada Lovelace", team: "Engineering" },
  { id: "u2", name: "Alan Turing", team: "Research" },
  { id: "u3", name: "Grace Hopper", team: "Platform" },
];

// Projects keyed by member id. Shape the feature expects: [{ id, title }].
const PROJECTS = {
  u1: [
    { id: "p11", title: "Analytical Engine" },
    { id: "p12", title: "Note G" },
  ],
  u2: [
    { id: "p21", title: "Bombe" },
    { id: "p22", title: "Turing Test" },
    { id: "p23", title: "Morphogenesis" },
  ],
  u3: [{ id: "p31", title: "COBOL" }],
};

/**
 * Default async loader for the member list. Resolves to [{ id, name }].
 * Injectable in tests via the `loadUsers` prop.
 */
export function loadUsers() {
  return Promise.resolve(MEMBERS);
}

/**
 * Default async loader for a member's projects. Resolves to [{ id, title }].
 * Injectable in tests via the `loadPosts` prop.
 */
export function loadPosts(userId) {
  return Promise.resolve(PROJECTS[userId] || []);
}

export { PROJECTS };
