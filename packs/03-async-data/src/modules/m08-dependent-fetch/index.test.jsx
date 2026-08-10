import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import DependentFetch from "./index.jsx";

const USERS = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];
const POSTS = {
  1: [{ id: 11, title: "Engines" }, { id: 12, title: "Bernoulli" }],
  2: [{ id: 13, title: "Computable" }],
};

describe("m08 — dependent fetch", () => {
  it("loads users and shows a no-selection prompt", async () => {
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    const loadPosts = vi.fn();
    render(<DependentFetch loadUsers={loadUsers} loadPosts={loadPosts} />);

    await waitFor(() => screen.getByText("Ada"));
    expect(screen.getByTestId("no-selection")).toHaveTextContent(/pick a user/i);
    expect(loadPosts).not.toHaveBeenCalled();
  });

  it("loads posts for the selected user", async () => {
    const user = userEvent.setup();
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    const loadPosts = vi.fn((id) => Promise.resolve(POSTS[id]));
    render(<DependentFetch loadUsers={loadUsers} loadPosts={loadPosts} />);

    await waitFor(() => screen.getByText("Ada"));
    await user.selectOptions(screen.getByTestId("user-select"), "1");

    await waitFor(() =>
      expect(screen.getAllByTestId("post-item")).toHaveLength(2)
    );
    expect(loadPosts).toHaveBeenCalledWith("1");

    await user.selectOptions(screen.getByTestId("user-select"), "2");
    await waitFor(() =>
      expect(screen.getAllByTestId("post-item")).toHaveLength(1)
    );
  });
});
