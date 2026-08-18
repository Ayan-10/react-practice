import { useState } from "react";
import { DEFAULT_TREE } from "../data/thread.js";

/**
 * THE FEATURE TO BUILD — m09 ForumThread nested comments.
 *
 * Render the comment tree recursively; each node with replies can collapse /
 * expand its children (expanded by default). Collapsing a node hides its whole
 * subtree while leaving siblings untouched.
 *
 * REQUIRED data-testids: comment-<id> (each node), toggle-<id> (only nodes
 * that have replies).
 */
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
