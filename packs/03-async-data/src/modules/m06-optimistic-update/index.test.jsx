import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import LikeButton from "./index.jsx";

describe("m06 — optimistic update", () => {
  it("updates the UI immediately on click", async () => {
    const user = userEvent.setup();
    // save resolves, but slowly — UI must update before it resolves.
    const save = vi.fn(() => new Promise((r) => setTimeout(r, 50)));
    render(<LikeButton save={save} initialCount={3} />);

    await user.click(screen.getByTestId("like-btn"));
    // Immediately after click (save not yet resolved) the UI already reflects it.
    expect(screen.getByTestId("like-btn")).toHaveTextContent("Liked");
    expect(screen.getByTestId("like-count")).toHaveTextContent("4");
    expect(save).toHaveBeenCalledWith(true);
  });

  it("rolls back when save fails", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockRejectedValue(new Error("network"));
    render(<LikeButton save={save} initialCount={3} />);

    await user.click(screen.getByTestId("like-btn"));
    await waitFor(() =>
      expect(screen.getByTestId("like-btn")).toHaveTextContent("Like")
    );
    expect(screen.getByTestId("like-count")).toHaveTextContent("3");
  });
});
