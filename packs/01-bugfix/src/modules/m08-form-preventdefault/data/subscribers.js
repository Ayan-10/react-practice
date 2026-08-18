// Local seed data for the NewsletterSignup mini-app. Works fully offline.
// In a real app you'd POST to an API; here it's local so the app always renders.

export const SUBSCRIBERS = [
  { id: "s1", email: "ada@example.com", plan: "Weekly digest" },
  { id: "s2", email: "grace@example.com", plan: "Product news" },
  { id: "s3", email: "linus@example.com", plan: "Weekly digest" },
];

// A tiny helper to build a new subscriber record from an email address.
// Mirrors what a backend would return after a successful signup.
export function makeSubscriber(email) {
  const clean = email.trim().toLowerCase();
  return {
    id: `s-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    email: clean,
    plan: "Weekly digest",
  };
}

// Basic email shape check used by the signup form.
export function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email.trim());
}
