// Local dataset for the MovieRatings mini-app. Works fully offline.
// A tiny catalogue of films the user can rate. Kept here so the module is
// fully self-contained (no reliance on shared/api.js).
//
//   m1 Interstellar      — Sci-Fi  — 2014
//   m2 The Grand Budapest — Comedy — 2014
//   m3 Parasite          — Thriller — 2019
//   m4 Spirited Away     — Anime   — 2001

export const MOVIES = [
  {
    _id: "m1",
    title: "Interstellar",
    genre: "Sci-Fi",
    year: 2014,
    image: "https://picsum.photos/seed/mr1/400/250",
  },
  {
    _id: "m2",
    title: "The Grand Budapest Hotel",
    genre: "Comedy",
    year: 2014,
    image: "https://picsum.photos/seed/mr2/400/250",
  },
  {
    _id: "m3",
    title: "Parasite",
    genre: "Thriller",
    year: 2019,
    image: "https://picsum.photos/seed/mr3/400/250",
  },
  {
    _id: "m4",
    title: "Spirited Away",
    genre: "Anime",
    year: 2001,
    image: "https://picsum.photos/seed/mr4/400/250",
  },
];

/** The film that appears on the Home screen for rating. */
export const FEATURED = MOVIES[0];
