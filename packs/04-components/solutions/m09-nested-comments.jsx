// SOLUTION — m09 Nested comments (recursive tree + per-node collapse).
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

function Comment({ node }) {
  const [open, setOpen] = useState(true);
  const hasReplies = Array.isArray(node.replies) && node.replies.length > 0;

  return (
    <div className="comment" style={{ marginLeft: 16 }}>
      <div data-testid={`comment-${node.id}`}>
        {node.text}
        {hasReplies && (
          <button data-testid={`toggle-${node.id}`} onClick={() => setOpen((o) => !o)}>
            {open ? "−" : "+"}
          </button>
        )}
      </div>
      {hasReplies && open && (
        <div className="replies">
          {node.replies.map((child) => (
            <Comment key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comments({ comments = DEFAULT_TREE }) {
  return (
    <div>
      <h2>Comments</h2>
      {comments.map((c) => (
        <Comment key={c.id} node={c} />
      ))}
    </div>
  );
}
