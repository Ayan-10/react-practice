import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE TaskBoard app (navbar + board + pages), exactly like a user
// would see it. The only thing broken is the list `key` in
// components/TaskList.jsx, which makes per-row checkbox state leak to the wrong
// task after a deletion.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m06 · TaskBoard — list key identity", () => {
  it("app renders: navbar + task board are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("task-list")).toBeInTheDocument();
    // The board shows the initial tasks.
    expect(screen.getByTestId("row-t1")).toBeInTheDocument();
    expect(screen.getByTestId("row-t4")).toBeInTheDocument();
  });

  it("deleting a row removes exactly that task from the board", async () => {
    const user = userEvent.setup();
    renderApp();

    expect(screen.getByTestId("row-t2")).toBeInTheDocument();
    await user.click(screen.getByTestId("remove-t2"));

    expect(screen.queryByTestId("row-t2")).not.toBeInTheDocument();
    // The others are untouched.
    expect(screen.getByTestId("row-t1")).toBeInTheDocument();
    expect(screen.getByTestId("row-t3")).toBeInTheDocument();
    expect(screen.getByTestId("row-t4")).toBeInTheDocument();
  });

  it("navigates to the Archive route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-archive"));
    expect(await screen.findByTestId("archive-page")).toBeInTheDocument();
  });

  it("keeps each row's checkbox tied to its own task after deleting a DIFFERENT row", async () => {
    const user = userEvent.setup();
    renderApp();

    // Mark task t3's checkbox as done.
    await user.click(screen.getByTestId("done-t3"));
    expect(screen.getByTestId("done-t3")).toBeChecked();

    // Delete a DIFFERENT row ABOVE it (t1). With array-index keys, every row
    // below shifts up an index and React re-matches the checked instance to the
    // wrong task — the checkmark "leaks" onto a neighbour.
    await user.click(screen.getByTestId("remove-t1"));

    // t3 is still on the board and must STILL be the one that's checked.
    await waitFor(() =>
      expect(screen.queryByTestId("row-t1")).not.toBeInTheDocument()
    );
    expect(screen.getByTestId("done-t3")).toBeChecked();
    // And a neighbour that was never checked must remain unchecked.
    expect(screen.getByTestId("done-t4")).not.toBeChecked();
    expect(screen.getByTestId("done-t2")).not.toBeChecked();
  });
});
