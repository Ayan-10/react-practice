// SOLUTION — m09 ForumThread nested comments (recursive tree + per-node collapse).
// Copy this over components/Comments.jsx to self-check.
import { useState } from "react";
import { DEFAULT_TREE } from "../data/thread.js";

function Comment({ comment }) {
  const [expanded, setExpanded] = useState(true);
  const replies = comment.replies ?? [];
  const hasReplies = replies.length > 0;

  return (
    <div data-testid={`comment-${comment.id}`} className="ft-comment">
      <div className="ft-comment-row">
        {hasReplies && (
          <button
            className="ft-toggle"
            data-testid={`toggle-${comment.id}`}
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? "−" : "+"}
          </button>
        )}
        <span className="ft-comment-text">{comment.text}</span>
      </div>
      {hasReplies && expanded && (
        <div className="ft-comment-children" style={{ marginLeft: 16 }}>
          {replies.map((child) => (
            <Comment key={child.id} comment={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Comments({ comments = DEFAULT_TREE }) {
  return (
    <div className="ft-comments">
      {comments.map((c) => (
        <Comment key={c.id} comment={c} />
      ))}
    </div>
  );
}
