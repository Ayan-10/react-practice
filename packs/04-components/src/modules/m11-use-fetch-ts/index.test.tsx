import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import UserList, { type User } from "./index.tsx";

const USERS: User[] = [
  { id: 1, name: "Ada" },
  { id: 2, name: "Alan" },
];

describe("m11 — [TS] useFetch", () => {
  it("shows loading then renders users", async () => {
    const loadUsers = vi.fn().mockResolvedValue(USERS);
    render(<UserList loadUsers={loadUsers} />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await waitFor(() =>
      expect(screen.getAllByTestId("user-item")).toHaveLength(2)
    );
  });

  it("shows an error on failure", async () => {
    const loadUsers = vi.fn().mockRejectedValue(new Error("x"));
    render(<UserList loadUsers={loadUsers} />);
    await waitFor(() => expect(screen.getByTestId("error")).toBeInTheDocument());
  });
});
