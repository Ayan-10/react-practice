import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ListKeyBug from "./index.jsx";

describe("People notes — list key identity", () => {
  it("keeps each note tied to the correct person after deleting a row", async () => {
    const user = userEvent.setup();
    render(<ListKeyBug />);

    await user.type(screen.getByTestId("note-u1"), "alice-note");
    await user.type(screen.getByTestId("note-u2"), "bob-note");
    await user.type(screen.getByTestId("note-u3"), "carol-note");

    // Delete the first person (Alice).
    await user.click(screen.getByTestId("remove-u1"));

    // Bob and Carol must still show THEIR notes.
    expect(screen.getByTestId("note-u2")).toHaveValue("bob-note");
    expect(screen.getByTestId("note-u3")).toHaveValue("carol-note");
    expect(screen.queryByTestId("row-u1")).not.toBeInTheDocument();
  });
});
