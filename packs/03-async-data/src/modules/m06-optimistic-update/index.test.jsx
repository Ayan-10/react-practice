import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

// The WHOLE SocialLikes mini-app (navbar + feed + a second route), mounted
// exactly like a user would see it.
import App from "./index.jsx";
// The feature under construction, imported DIRECTLY so we can inject a mock
// `save` (deterministic success/failure) to prove the optimistic behaviour.
import LikeButton from "./components/LikeButton.jsx";

function renderApp(initialEntries = ["/"]) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
}

describe("m06 · SocialLikes — app renders", () => {
  it("renders navbar, home page and the post feed", () => {
    renderApp();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(0);
  });

  it("navigates to the Trending route via the navbar", async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByTestId("nav-trending"));
    expect(await screen.findByTestId("trending-page")).toBeInTheDocument();
  });
});

describe("m06 · SocialLikes — optimistic update feature", () => {
  it("updates the UI immediately on click (before save resolves)", async () => {
    const user = userEvent.setup();
    // save resolves, but slowly — UI must update before it resolves.
    const save = vi.fn(() => new Promise((r) => setTimeout(r, 50)));
    render(<LikeButton save={save} initialCount={3} />);

    await user.click(screen.getByTestId("like-btn"));
    // Immediately after click (save not yet resolved) the UI already reflects it.
    const btn = screen.getByTestId("like-btn");
    expect(btn.className).toMatch(/liked/);
    expect(within(btn).getByTestId("like-count")).toHaveTextContent("4");
    expect(save).toHaveBeenCalledWith(true);
  });

  it("rolls back when save fails", async () => {
    const user = userEvent.setup();
    const save = vi.fn().mockRejectedValue(new Error("network"));
    render(<LikeButton save={save} initialCount={3} />);

    await user.click(screen.getByTestId("like-btn"));
    await waitFor(() =>
      expect(screen.getByTestId("like-btn").className).not.toMatch(/liked/)
    );
    expect(screen.getByTestId("like-count")).toHaveTextContent("3");
  });
});
