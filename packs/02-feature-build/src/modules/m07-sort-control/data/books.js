// Local dataset for the BookStore mini-app. Works fully offline.
// Prices and ratings are DISTINCT so sort tests are unambiguous.
//
//   1 A Tale of Two Cities — $12 — 4.5
//   2 Brave New World       — $30 — 4.8
//   3 Crime and Punishment  — $18 — 4.1
//   4 Dune                  — $25 — 4.9
//   5 East of Eden          — $40 — 4.0
//   6 Fahrenheit 451        — $9  — 4.6

export const BOOKS = [
  {
    id: 1,
    title: "A Tale of Two Cities",
    author: "Charles Dickens",
    price: 12,
    rating: 4.5,
    cover: "https://picsum.photos/seed/bk1/200/300",
  },
  {
    id: 2,
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 30,
    rating: 4.8,
    cover: "https://picsum.photos/seed/bk2/200/300",
  },
  {
    id: 3,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    price: 18,
    rating: 4.1,
    cover: "https://picsum.photos/seed/bk3/200/300",
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    price: 25,
    rating: 4.9,
    cover: "https://picsum.photos/seed/bk4/200/300",
  },
  {
    id: 5,
    title: "East of Eden",
    author: "John Steinbeck",
    price: 40,
    rating: 4.0,
    cover: "https://picsum.photos/seed/bk5/200/300",
  },
  {
    id: 6,
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    price: 9,
    rating: 4.6,
    cover: "https://picsum.photos/seed/bk6/200/300",
  },
];
