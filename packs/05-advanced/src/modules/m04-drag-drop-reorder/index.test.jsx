import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE TaskFlow mini-app, mounted exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can unit-test the
// pure reorder helper and fire drag events at the list.
import ReorderList, { reorder } from "./components/ReorderList.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

const list = () => [
  { id: "t1", title: "A" },
  { id: "t2", title: "B" },
  { id: "t3", title: "C" },
  { id: "t4", title: "D" },
];
const ids = (arr) => arr.map((x) => x.id);

describe("m04 · TaskFlow — app renders", () => {
  it("renders navbar and the board home page", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByTestId("reorder-list")).toBeInTheDocument();
  });

  it("navigates to the Archive route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-archive"));
    expect(await screen.findByTestId("archive-page")).toBeInTheDocument();
  });
});

describe("m04 · reorder — pure helper", () => {
  it("moves an item DOWN to the target's index", () => {
    const out = reorder(list(), "t1", "t3");
    expect(ids(out)).toEqual(["t2", "t3", "t1", "t4"]);
  });

  it("moves an item UP to the target's index", () => {
    const out = reorder(list(), "t4", "t2");
    expect(ids(out)).toEqual(["t1", "t4", "t2", "t3"]);
  });

  it("is a no-op when fromId === toId", () => {
    const out = reorder(list(), "t2", "t2");
    expect(ids(out)).toEqual(["t1", "t2", "t3", "t4"]);
  });

  it("does not mutate the input array", () => {
    const input = list();
    const snapshot = JSON.stringify(input);
    reorder(input, "t1", "t4");
    expect(JSON.stringify(input)).toBe(snapshot);
  });
});

describe("m04 · ReorderList — drag & drop UI", () => {
  it("reorders via dragStart/dragOver/drop events", () => {
    render(<ReorderList />);
    expect(screen.getByTestId("order")).toHaveTextContent("t1,t2,t3,t4");

    const source = screen.getByTestId("item-t1");
    const target = screen.getByTestId("item-t3");

    fireEvent.dragStart(source);
    fireEvent.dragOver(target);
    fireEvent.drop(target);

    // t1 moved to t3's position.
    expect(screen.getByTestId("order")).toHaveTextContent("t2,t3,t1,t4");
  });
});
