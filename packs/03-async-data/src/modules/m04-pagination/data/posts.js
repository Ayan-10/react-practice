// BlogList data source for the m04 pagination mini-app.
// NOTE: the resolved field stays `products` because the feature component
// reads `data.products` — the domain is blog posts, the field name is generic.

export const POSTS = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "A gentle intro to useState and useEffect for everyday components.",
  },
  {
    id: 2,
    title: "Understanding the Event Loop",
    excerpt: "How JavaScript schedules async work behind the scenes.",
  },
  {
    id: 3,
    title: "CSS Grid in Ten Minutes",
    excerpt: "Lay out complex UIs with a few lines of grid template magic.",
  },
  {
    id: 4,
    title: "Debouncing Search Inputs",
    excerpt: "Stop hammering your API on every keystroke with a small delay.",
  },
  {
    id: 5,
    title: "Race Conditions in Data Fetching",
    excerpt: "Why the last request wins and how to cancel stale ones.",
  },
  {
    id: 6,
    title: "Testing React with Vitest",
    excerpt: "Fast, modern unit tests for components and hooks.",
  },
];

// Server-like paged loader. Resolves { products, total } so the feature
// component can slice by skip/limit and derive total pages from `total`.
export function loadPosts({ limit, skip }) {
  return Promise.resolve({
    products: POSTS.slice(skip, skip + limit),
    total: POSTS.length,
  });
}
