import { useState } from "react";

const DEFAULT_TREE = [
  {
    id: 1,
    text: "Root comment",
    replies: [
      { id: 2, text: "First reply", replies: [{ id: 4, text: "Nested reply" }] },
      { id: 3, text: "Second reply" },
    ],
  },
];

/**
 * MODULE m09 — Nested comments. Read PROMPT.md.
 *
 * Render recursively; each node can collapse its children.
 */
export default function Comments({ comments = DEFAULT_TREE }) {
  return (
    <div>
      <h2>Comments</h2>
      {/* TODO: render each top-level comment with a recursive Comment component */}
    </div>
  );
}
