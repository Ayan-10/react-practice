import { describe, it, expect } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "./index.jsx";

// Mount the WHOLE PlaylistBuilder app (navbar + library + playlist panel),
// exactly like a user would see it. The only thing broken is the add/remove
// state update, which lives in components/PlaylistPanel.jsx.
function renderApp() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
}

describe("m04 · PlaylistBuilder — immutable state updates", () => {
  // (1) App renders — PASSES on the stub.
  it("app renders: navbar + library grid are visible", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    // Library grid shows the song cards.
    expect(screen.getAllByTestId("song-card").length).toBeGreaterThan(0);
  });

  // (2) Neutral — PASSES on the stub. The playlist starts empty.
  it("starts with an empty playlist", () => {
    renderApp();
    expect(screen.getByTestId("playlist-count")).toHaveTextContent("0");
    expect(screen.getByTestId("playlist-empty")).toBeInTheDocument();
    expect(screen.queryAllByTestId("playlist-item")).toHaveLength(0);
  });

  // (3) BUG test — FAILS on the stub, PASSES on the solution.
  it("adds a song to the playlist when + Add is clicked", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-s1"));

    await waitFor(() =>
      expect(screen.getAllByTestId("playlist-item")).toHaveLength(1)
    );
    const playlist = screen.getByTestId("playlist");
    expect(within(playlist).getByText("Midnight City")).toBeInTheDocument();
    expect(screen.getByTestId("playlist-count")).toHaveTextContent("1");
  });

  // (3) BUG test — FAILS on the stub, PASSES on the solution.
  it("increments the navbar playlist count as songs are added", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByTestId("nav-count")).toHaveTextContent("Playlist · 0");
    await user.click(screen.getByTestId("add-s1"));
    await user.click(screen.getByTestId("add-s2"));

    await waitFor(() =>
      expect(screen.getByTestId("nav-count")).toHaveTextContent("Playlist · 2")
    );
    expect(screen.getAllByTestId("playlist-item")).toHaveLength(2);
  });

  // (3) BUG test — FAILS on the stub, PASSES on the solution.
  it("removes a song from the playlist when × is clicked", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("add-s3"));

    await waitFor(() =>
      expect(screen.getAllByTestId("playlist-item")).toHaveLength(1)
    );

    await user.click(screen.getByTestId("remove-s3"));

    await waitFor(() =>
      expect(screen.queryAllByTestId("playlist-item")).toHaveLength(0)
    );
    expect(screen.getByTestId("playlist-count")).toHaveTextContent("0");
  });
});
