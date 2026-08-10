import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StateMutation from "./index.jsx";

describe("Tags — immutable updates", () => {
  it("adds a new tag to the list", async () => {
    const user = userEvent.setup();
    render(<StateMutation />);
    expect(screen.getAllByTestId("tag-item")).toHaveLength(2);
    await user.type(screen.getByTestId("tag-input"), "redux");
    await user.click(screen.getByTestId("add-tag"));
    expect(screen.getAllByTestId("tag-item")).toHaveLength(3);
    expect(screen.getByText("redux")).toBeInTheDocument();
  });

  it("clears the input after adding", async () => {
    const user = userEvent.setup();
    render(<StateMutation />);
    await user.type(screen.getByTestId("tag-input"), "vite");
    await user.click(screen.getByTestId("add-tag"));
    expect(screen.getByTestId("tag-input")).toHaveValue("");
  });

  it("removes a tag when its × is clicked", async () => {
    const user = userEvent.setup();
    render(<StateMutation />);
    await user.click(screen.getByTestId("remove-hooks"));
    expect(screen.getAllByTestId("tag-item")).toHaveLength(1);
    expect(screen.queryByText("hooks")).not.toBeInTheDocument();
  });
});
