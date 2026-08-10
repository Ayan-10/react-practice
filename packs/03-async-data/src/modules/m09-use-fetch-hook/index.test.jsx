import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserList from "./index.jsx";

const USERS = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];

describe("m09 — useFetch hook", () => {
  it("shows loading then renders users", async () => {
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    render(<UserList loadUsers={loadUsers} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getAllByTestId("user-item")).toHaveLength(2)
    );
    expect(screen.queryByTestId("loading")).toBeNull();
  });

  it("shows an error when the fetch fails", async () => {
    const loadUsers = vi.fn().mockRejectedValue(new Error("nope"));
    render(<UserList loadUsers={loadUsers} />);
    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
    expect(screen.queryByTestId("loading")).toBeNull();
  });
});
