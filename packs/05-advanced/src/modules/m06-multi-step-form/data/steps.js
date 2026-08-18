// Local dataset for the ApplyFlow mini-app. Works fully offline.
// Metadata for the 3-step wizard + FAQ content for the second route.

export const STEPS = [
  { id: 1, title: "Your name" },
  { id: 2, title: "Contact email" },
  { id: 3, title: "Review & submit" },
];

export const TOTAL_STEPS = STEPS.length;

export const FAQ = [
  {
    q: "Can I go back and edit a previous step?",
    a: "Yes — the Back button returns you to the prior step and clears errors.",
  },
  {
    q: "Why must I confirm my email?",
    a: "Cross-field validation catches typos before your application is sent.",
  },
  {
    q: "What happens after I submit?",
    a: "The form submits asynchronously and shows a success message when done.",
  },
];
