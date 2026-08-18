// Local dataset for the ForumThread mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
// A small nested comment tree: a root with two replies, one of which has a
// grandchild reply.

export const DEFAULT_TREE = [
  {
    id: 1,
    text: "Root comment",
    replies: [
      { id: 2, text: "First reply", replies: [{ id: 4, text: "Nested reply" }] },
      { id: 3, text: "Second reply" },
    ],
  },
];

// Community rules shown on the second route.
export const RULES = [
  { id: 1, text: "Be respectful — no personal attacks." },
  { id: 2, text: "Stay on topic within each thread." },
  { id: 3, text: "No spam or self-promotion." },
];
