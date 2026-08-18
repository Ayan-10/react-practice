import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE DailyPlanner app (navbar + today page + todo list), exactly
// like a user would see it. The only thing to BUILD is the todo feature, which
// lives in components/TodoList.jsx.
//
// The planner seeds 3 starter tasks (from data/tasks.js):
//   t1 Water the plants — done
//   t2 Reply to emails  — active
//   t3 Plan the sprint  — active
// So on first render there are 3 todo-items and items-left is 2.

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

const items = () => screen.queryAllByTestId("todo-item");

async function add(user, text) {
  await user.type(screen.getByTestId("new-todo"), text);
  await user.click(screen.getByTestId("add-btn"));
}

describe("m06 · DailyPlanner — app renders", () => {
  it("renders navbar, home page and the seeded todo list", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("items-left")).toBeInTheDocument();
    expect(items().length).toBeGreaterThan(0);
  });

  it("navigates to the About route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-about"));
    expect(await screen.findByTestId("about-page")).toBeInTheDocument();
  });
});

describe("m06 · DailyPlanner — todo feature", () => {
  it("starts with the seeded tasks and the right items-left", () => {
    renderApp();
    expect(items()).toHaveLength(3);
    expect(screen.getByText("Water the plants")).toBeInTheDocument();
    // 2 of the 3 seeds are active (not done).
    expect(screen.getByTestId("items-left")).toHaveTextContent("2");
  });

  it("adds a todo and ignores empty input", async () => {
    const user = userEvent.setup();
    renderApp();
    await add(user, "buy milk");
    await user.click(screen.getByTestId("add-btn")); // empty, ignored
    expect(items()).toHaveLength(4);
    expect(screen.getByText("buy milk")).toBeInTheDocument();
    expect(screen.getByTestId("new-todo")).toHaveValue("");
    // new todo is active -> items-left goes 2 -> 3
    expect(screen.getByTestId("items-left")).toHaveTextContent("3");
  });

  it("toggles completion and updates items-left", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByTestId("items-left")).toHaveTextContent("2");
    const item = screen
      .getByText("Reply to emails")
      .closest('[data-testid="todo-item"]');
    await user.click(within(item).getByRole("checkbox")); // complete it
    expect(item.className).toMatch(/done/);
    expect(screen.getByTestId("items-left")).toHaveTextContent("1");
  });

  it("filters active and completed", async () => {
    const user = userEvent.setup();
    renderApp();
    // seeds: 2 active (t2,t3), 1 completed (t1)
    await user.click(screen.getByTestId("filter-active"));
    expect(items()).toHaveLength(2);
    expect(screen.queryByText("Water the plants")).not.toBeInTheDocument();

    await user.click(screen.getByTestId("filter-completed"));
    expect(items()).toHaveLength(1);
    expect(screen.getByText("Water the plants")).toBeInTheDocument();

    await user.click(screen.getByTestId("filter-all"));
    expect(items()).toHaveLength(3);
  });

  it("deletes a todo", async () => {
    const user = userEvent.setup();
    renderApp();
    const item = screen
      .getByText("Plan the sprint")
      .closest('[data-testid="todo-item"]');
    await user.click(within(item).getByText("×"));
    expect(screen.queryByText("Plan the sprint")).not.toBeInTheDocument();
    expect(items()).toHaveLength(2);
  });
});
