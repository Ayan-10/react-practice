import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";

// The WHOLE PhotoWall mini-app, mounted like a user would see it.
import App from "./App.jsx";
// The feature under construction, imported DIRECTLY so we can inject a mock
// loader with a deterministic total.
import PhotoGrid from "./components/PhotoGrid.jsx";

const ALL = [
  { id: 1, title: "A" },
  { id: 2, title: "B" },
  { id: 3, title: "C" },
  { id: 4, title: "D" },
];

function makeLoad() {
  return vi.fn(({ limit, skip }) =>
    Promise.resolve({ products: ALL.slice(skip, skip + limit), total: ALL.length })
  );
}

describe("m05 — app renders (PhotoWall mini-app)", () => {
  it("mounts the app shell with navbar and home page", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByTestId("photowall-app")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });

  it("navigates to the albums route", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    await user.click(screen.getByTestId("nav-albums"));
    expect(screen.getByTestId("albums-page")).toBeInTheDocument();
  });
});

describe("m05 — infinite scroll", () => {
  it("loads the first batch on mount", async () => {
    render(<PhotoGrid load={makeLoad()} />);
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(2)
    );
  });

  it("appends the next batch on load-more", async () => {
    const user = userEvent.setup();
    const load = makeLoad();
    render(<PhotoGrid load={load} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("load-more"));
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(4)
    );
    expect(load).toHaveBeenLastCalledWith({ limit: 2, skip: 2 });
  });

  it("shows an end marker when everything is loaded", async () => {
    const user = userEvent.setup();
    render(<PhotoGrid load={makeLoad()} />);
    await waitFor(() => screen.getAllByTestId("product-item"));

    await user.click(screen.getByTestId("load-more"));
    await waitFor(() =>
      expect(screen.getAllByTestId("product-item")).toHaveLength(4)
    );
    expect(screen.queryByTestId("load-more")).toBeNull();
    expect(screen.getByTestId("end")).toHaveTextContent(/no more/i);
  });
});
