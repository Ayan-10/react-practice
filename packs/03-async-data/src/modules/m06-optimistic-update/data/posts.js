// Local dataset for the SocialLikes mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   p1 Sunrise hike        — 12 likes
//   p2 Homemade ramen      — 40 likes
//   p3 New desk setup      — 8  likes
//   p4 Weekend roadtrip    — 25 likes

export const POSTS = [
  { id: "p1", title: "Sunrise hike", author: "Mia", likes: 12, liked: false },
  { id: "p2", title: "Homemade ramen", author: "Ken", likes: 40, liked: true },
  { id: "p3", title: "New desk setup", author: "Ravi", likes: 8, liked: false },
  { id: "p4", title: "Weekend roadtrip", author: "Sara", likes: 25, liked: false },
];

/**
 * Default async "save like" for the LikeButton feature. Resolves after a tick
 * so the optimistic update is observable; injectable in tests to force
 * success/failure. Resolves to the persisted liked value.
 */
export function saveLike(nextLiked) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(nextLiked), 0);
  });
}
