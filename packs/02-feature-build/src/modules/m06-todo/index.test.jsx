import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Todo from "./index.jsx";

async function add(user, text) {
  await user.type(screen.getByTestId("new-todo"), text);
  await user.click(screen.getByTestId("add-btn"));
}

describe("Todo list", () => {
  it("adds todos and ignores empty input", async () => {
    const user = userEvent.setup();
    render(<Todo />);
    await add(user, "buy milk");
    await user.click(screen.getByTestId("add-btn")); // empty, ignored
    expect(screen.getAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByText("buy milk")).toBeInTheDocument();
    expect(screen.getByTestId("new-todo")).toHaveValue("");
  });

  it("toggles completion and updates items-left", async () => {
    const user = userEvent.setup();
    render(<Todo />);
    await add(user, "task A");
    await add(user, "task B");
    expect(screen.getByTestId("items-left")).toHaveTextContent("2");
    const item = screen.getByText("task A").closest('[data-testid="todo-item"]');
    await user.click(within(item).getByRole("checkbox"));
    expect(item.className).toMatch(/done/);
    expect(screen.getByTestId("items-left")).toHaveTextContent("1");
  });

  it("filters active and completed", async () => {
    const user = userEvent.setup();
    render(<Todo />);
    await add(user, "one");
    await add(user, "two");
    const first = screen.getByText("one").closest('[data-testid="todo-item"]');
    await user.click(within(first).getByRole("checkbox")); // complete "one"

    await user.click(screen.getByTestId("filter-active"));
    expect(screen.getAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByText("two")).toBeInTheDocument();

    await user.click(screen.getByTestId("filter-completed"));
    expect(screen.getAllByTestId("todo-item")).toHaveLength(1);
    expect(screen.getByText("one")).toBeInTheDocument();
  });

  it("deletes a todo", async () => {
    const user = userEvent.setup();
    render(<Todo />);
    await add(user, "delete me");
    const item = screen.getByText("delete me").closest('[data-testid="todo-item"]');
    await user.click(within(item).getByText("×"));
    expect(screen.queryByText("delete me")).not.toBeInTheDocument();
  });
});
